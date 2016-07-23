---
title: "解决fastjson反序列化日期0000-00-00失败的方案"
date: 2016-07-22 09:00:00
description: "解决fastjson反序列化日期0000-00-00失败的方案"
keywords: "fastjson,date,0000-00-00,deserialize"
categories:
- fastjson
tags:
- fastjson
---

#### 一、案例场景复原
示例场景里涉及两个class：`TestDemo.java`, `DateBeanDemo.java`。

```java
// DateBeanDemo.java
public class DateBeanDemo {
	/**
	 * dateStr field with Date.class
	 */
    private Date dateStr;

    /**
     * Get dateStr <br>
     *
     * @return Returns the dateStr. <br>
     */
    public Date getDateStr() {
        return dateStr;
    }

    /**
     * Set dateStr <br>
     *
     * @param dateStr The dateStr to set. <br>
     */
    public void setDateStr(Date dateStr) {
        this.dateStr = dateStr;
    }
}
```

```java
// 示例执行例子
public class TestDemo {
    public static String jsonStr = "{\"dateStr\":\"0000-00-00\"}";
    public static void main(String[] args) {
        DateBeanDemo resultObject = JSON.parseObject(TestDemo.jsonStr, DateBeanDemo.class);
    }
}
```

执行以上的main方法之后，并没有获取预期的结果，而是在fastjson的序列化解析中便发生了异常，如下

```
Exception in thread "main" com.alibaba.fastjson.JSONException: For input string: "0000-00-00"
	at com.alibaba.fastjson.parser.DefaultJSONParser.parseObject(DefaultJSONParser.java:555)
	at com.alibaba.fastjson.JSON.parseObject(JSON.java:251)
	at com.alibaba.fastjson.JSON.parseObject(JSON.java:227)
	at com.alibaba.fastjson.JSON.parseObject(JSON.java:186)
	at excel.TestDemo.main(TestDemo.java:23)
Caused by: java.lang.NumberFormatException: For input string: "0000-00-00"
	at java.lang.NumberFormatException.forInputString(NumberFormatException.java:48)
	at java.lang.Long.parseLong(Long.java:419)
	at java.lang.Long.parseLong(Long.java:468)
	at com.alibaba.fastjson.parser.deserializer.DateDeserializer.cast(DateDeserializer.java:56)
	at com.alibaba.fastjson.parser.deserializer.AbstractDateDeserializer.deserialze(AbstractDateDeserializer.java:98)
	at Fastjson_ASM_DateBeanDemo_1.deserialze(Unknown Source)
	at com.alibaba.fastjson.parser.DefaultJSONParser.parseObject(DefaultJSONParser.java:551)
	... 4 more
```

通过百度查阅了部分网上撰写的方案，可以使用fastjson中的注解`@JSONField(format="")`来重新定义`DateBeanDemo.dateStr`，如下：

```java
@JSONField(format = "yyyy-MM-dd",parseFeatures={Feature.AllowISO8601DateFormat})
private Date dateStr;
```

然而，并没有解决这个exception的问题。同时还怀疑了注解是否在反序列化之时没有被使用到，经过查阅源码，fastjson已将其反序列化的开关定义了`true`。

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER})
public @interface JSONField {
    int ordinal() default 0;
    String name() default "";
    String format() default "";
    boolean serialize() default true;
    boolean deserialize() default true; // 默认定义了true，反序列化之时也使用该注解
    SerializerFeature[] serialzeFeatures() default {};
    Feature[] parseFeatures() default {};
    String label() default "";
}
```

#### 二、原因剖析

经查找fastjson中相关代码发现，当代码执行到`com.alibaba.fastjson.parser.deserializer.DateDeserializer.class`的执行方法`cast()`中之时，所使用的JSONParser中所含带的dateFormat依旧是默认的`yyyy-MM-dd HH:mm:ss`，而并非注解@JSONField中所定义的`yyyy-MM-dd`。
所以发生了转换字段失败。

![](/images/2016-07-22-resolve-the-fastjson-problems-about-date/14691655278897.jpg)

再深究一层，为什么不是@JSONField中所定义的`yyyy-MM-dd`作为JSONParser中的dateFormat呢？其实仔细阅读一遍`cast()`代码逻辑就会发现，并不是fastjson丢弃了JSONField的扫描，而是在方法中有这么一段：

```java
// 检查格式是否符合ISO8601的DateFormat规范
if(!dateLexer.scanISO8601DateIfMatch(false)) {
    break label122;
}
```

当执行到以上代码段之时，由于字符串`0000-00-00`并不是ISO8601的DateFormat规范之内，故而代码便会`break label122`执行跳出逻辑。紧接着执行的就是`DateFormat dateFormat1 = parser.getDateFormat();`，此时，parser依然是global定义的parser，DateFormat并没有使用`@JSONField`中所定义的。

#### 三、解决方案：新增date反序列化解析器

解决方案并非只有一种，在众多解决方案中自己选择了"新增date反序列化解析器"的办法。除此之外还有诸如设置`JSON.DEFFAULT_DATE_FORMAT`属性的办法，也同样可以解决这一问题。下面作两种办法的对比和阐述。

- 方案1：设置属性`JSON.DEFFAULT_DATE_FORMAT` 

这一方案只涉及修改`main()`方法代码即可实现，

```java
// 示例执行例子
public class TestDemo {
    public static String jsonStr = "{\"dateStr\":\"0000-00-00\"}";
    public static void main(String[] args) {
        JSON.DEFFAULT_DATE_FORMAT = "yyyy-MM-dd";
        DateBeanDemo resultObject = JSON.parseObject(TestDemo.jsonStr, DateBeanDemo.class);
    }
}
```

但是翻阅fastjson中对于`JSON.DEFFAULT_DATE_FORMAT`可知，该属性属于静态属性，一旦设置影响全局。

```
// com.alibaba.fastjson.JSON.class
public abstract class JSON implements JSONStreamAware, JSONAware {
    public static String DEFFAULT_DATE_FORMAT;
    // ...
```

- 方案2：新增date反序列化解析器

主要思路是以fastjson原生的`DateDeserializer.class`为基础，定制化一个可以解析`0000-00-00`的日期反序列化解析器。  
该方式是fastjson函数`JSON.parseObject()`的一个应用场景，通过定制化`ParserConfig`参数，达到局部改变JSON解析逻辑的目的。  
如下：

```java
package jeromechan.fixbug.fastjson;

import com.alibaba.fastjson.parser.DefaultJSONParser;
import com.alibaba.fastjson.parser.deserializer.DateDeserializer;
import java.lang.reflect.Type;

/**
 * Copyright © 2016 Jerome Chan. All rights reserved.
 * An extended DateDeseializer for parsing '0000-00-00'.
 * 
 * @author chenjinlong
 * @CreateDate 7/20/16 5:55 PM
 */
public class JCDateDeserializer extends DateDeserializer {
    public static final JCDateDeserializer instance = new JCDateDeserializer();

    public JCDateDeserializer() {
    }

    protected <T> T cast(DefaultJSONParser parser, Type clazz, Object fieldName, Object val)
    {
        if (val == null) {
            return null;
        } else if (val instanceof String) {
            String strVal = (String) val;
            if (strVal.length() == 0) {
                return null;
            } else if (strVal.equals("0000-00-00")) {
                parser.setDateFormat("yyyy-MM-dd");
            }
        }
        return super.cast(parser, clazz, fieldName, val);
    }
}
```

```java
// 示例执行例子
public class TestDemo {
    public static String jsonStr = "{\"dateStr\":\"0000-00-00\"}";
    public static void main(String[] args) {        
        ParserConfig jcParserConfig = new ParserConfig();
        jcParserConfig.putDeserializer(Date.class, JCDateDeserializer.instance);
        DateBeanDemo resultObject = JSON.parseObject(TestDemo.jsonStr, DateBeanDemo.class, jcParserConfig, JSON.DEFAULT_PARSER_FEATURE);
    }
}
```

假设觉得这种解析办法可以作为整个项目内的全局特性，感兴趣的话可以将定制好的`JCDateDeserializer`利用spring框架注入到项目容器中。这同样是对于方案2很不错的延伸。

#### 四、参考资料
- fastjson在github上的issues：[https://github.com/alibaba/fastjson/issues/414](https://github.com/alibaba/fastjson/issues/414)


