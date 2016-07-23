---
author: jeromechan
comments: true
date: 2015-06-11 09:32:00
slug: php-regular-expression
title: PHP正则表达式
wordpress_id: 264
permalink: /2015/06/11/php-regular-expression/
categories:
- Programming
tags:
- 正则表达式
---

**一、介绍**

正则表达式，大家在开发中应该是经常用到，现在很多开发语言都有正则表达式的应用，比如javascript，java，.net,php等等，我今天就把我对正则表达式的理解跟大家唠唠，不当之处，请多多指教！

需要知道的术语——下面的术语你知道多少?

Δ  定界符
Δ  字符域
Δ  修饰符
Δ  限定符
Δ  脱字符
Δ  通配符(正向预查，反向预查)
Δ  反向引用
Δ  惰性匹配
Δ  注释
Δ  零字符宽

定位
我们什么时候使用正则表达式呢？不是所有的字符操作都用正则就好了，php在某些方面用正则反而影响效率。当我们遇到复杂文本数据的解析时候，用正则是比较好的选择。
优点
正则表达式在处理复杂字符操作的时候，可以提高工作效率，也在一定程度节省你的代码量。
缺点
我们在使用正则表达式的时候，复杂的正则表达式会加大代码的复杂度，让人很难理解。所以我们有的时候需要在正则表达式内部添加注释。<!-- more -->

**二、通用模式**

¤ 定界符，通常使用 "/"做为定界符开始和结束,也可以使用"#"。
什么时候使用"#"呢?一般是在你的字符串中有很多"/"字符的时候，因为正则的时候这种字符需要转义，比如uri。
使用"/"定界符的代码如下.


<blockquote>$regex = '/^http:\/\/([\w.]+)\/([\w]+)\/([\w]+)\.html$/i';
$str = 'http://www.youku.com/show_page/id_ABCDEFG.html';
$matches = array();
if(preg_match($regex, $str, $matches)){
var_dump($matches);
}
echo "\n";</blockquote>


preg_match中的$matches[0]将包含与整个模式匹配的字符串。
使用"#"定界符的代码如下.这个时候对"/"就不转义!


<blockquote>$regex = '#^http://([\w.]+)/([\w]+)/([\w]+)\.html$#i';
$str = 'http://www.youku.com/show_page/id_ABCDEFG.html';
$matches = array();
if(preg_match($regex, $str, $matches)){
var_dump($matches);
}
echo "\n";</blockquote>




¤ 修饰符:用于改变正则表达式的行为。
我们看到的('/^http:\/\/([\w.]+)\/([\w]+)\/([\w]+)\.html/**i**')中的最后一个"i"就是修饰符,表示忽略大小写，还有一个我们经常用到的是"x"表示忽略空格。
贡献代码:





<blockquote>$regex = '/HELLO/';
$str = 'hello word';
$matches = array();
if(preg_match($regex, $str, $matches)){
echo 'No i:Valid Successful!',"\n";
}
if(preg_match($regex.'i', $str, $matches)){
echo 'YES i:Valid Successful!',"\n";
}</blockquote>


¤ 字符域:[\w]用方括号扩起来的部分就是字符域。
¤ 限定符:如[\w]{3,5}或者[\w]*或者[\w]+这些[\w]后面的符号都表示限定符。现介绍具体意义。
{3,5}表示3到5个字符。{3,}超过3个字符，{,5}最多5个，{3}三个字符。
* 表示0到多个
+ 表示1到多个
¤ 脱字符号（^:）
（1）放在字符域(如:[^\w])中表示否定(不包括的意思)——“反向选择”
（2）放在表达式之前，表示以当前这个字符开始。(/^n/i,表示以n开头)
注意，我们经常管"\"叫"跳脱字符"。用于转义一些特殊符号，如".","/"

**三、通配符(lookarounds)
**

断言某些字符串中某些字符的存在与否！
格式:
正向预查:(?=) 相对应的 (?!)表示否定意思
反向预查:(?<=) 相对应的 (?前后紧跟字符


<blockquote>$regex = '/(?<=c)d(?=e)/';  /* d 前面紧跟c, d 后面紧跟e*/
$str = 'abcdefgk';
$matches = array();
if(preg_match($regex, $str, $matches)){
var_dump($matches);
}
echo "\n";</blockquote>


否定意义:


<blockquote>$regex = '/(?
$str = 'abcdefgk';
$matches = array();
if(preg_match($regex, $str, $matches)){
var_dump($matches);
}
echo "\n";</blockquote>


字符宽度:零
验证零字符代码


<blockquote>$regex = '/HE(?=L)LO/i';
$str = 'HELLO';
$matches = array();

if(preg_match($regex, $str, $matches)){
var_dump($matches);
}
echo "\n";
打印不出结果！

$regex = '/HE(?=L)LLO/i';
$str = 'HELLO';
$matches = array();

if(preg_match($regex, $str, $matches)){
var_dump($matches);
}
echo "\n";
能打印出结果!</blockquote>


说明:(?=L)意思是HE后面紧跟一个L字符。但是(?=L)本身不占字符，要与(L)区分，（L）本身占一个字符。

**四、捕获数据
**

没有指明类型而进行的分组,将会被获取,供以后使用。

> 指明类型指的是通配符。所以只有圆括号起始位置没有问号的才能被捕捉。

> 在同一个表达式内的引用叫做反向引用。

> 调用格式: \编号(如\1)。


<blockquote>$regex = '/^(Chuanshanjia)[\w\s!]+\1$/';
$str = 'Chuanshanjia thank Chuanshanjia';
$matches = array();

if(preg_match($regex, $str, $matches)){
var_dump($matches);
}
echo "\n";</blockquote>


> 避免捕获数据
格式:(?:pattern)
优点:将使有效反向引用数量保持在最小，代码更加、清楚。

>命名捕获组
格式:(?P<组名>) 调用方式 (?P=组名)


<blockquote>arrray(3) {

[0] =>
string(28) “chuanshanjia Is chuanshanjia”
[“author”] =>
string(12) “chuanshanjia”
[1] =>
string(12) “chuanshanjia"
}</blockquote>


**五、惰性匹配**

(记住：会进行两部操作,请看下面的原理部分)
格式:限定符?
原理:"?"：如果前面有限定符，会使用最小的数据。如“*”会取0个，而“+”会取1个，如过是{3,5}会取3个。
先看下面的两个代码:
代码1


<blockquote>$regex = '/heL*/i';
$str = 'heLLLLLLLLLLLLLLLL';
if(preg_match($regex, $str, $matches)){
var_dump($matches);
}

echo "\n";
结果1:
array(1) {
[0] =>
string(8) "heLLLLLLLLLLLLLLLL"
}</blockquote>


代码2


<blockquote>$regex = '/heL*?/i';
$str = 'heLLLLLLLLLLLLLLLL';

if(preg_match($regex, $str, $matches)){
var_dump($matches);
}
echo "\n";
结果2:
array(1) {
[0] =>
string(2) "he"
}</blockquote>




代码3,使用“+”





<blockquote>$regex = '/heL+?/i';

$str = 'heLLLLLLLLLLLLLLLL';
if(preg_match($regex, $str, $matches)){
var_dump($matches);
}
echo "\n";

结果3
array(1) {

[0] =
string(3) "heL"
}</blockquote>




代码4,使用{3,5}





<blockquote>$regex = '/heL{3,10}?/i';
$str = 'heLLLLLLLLLLLLLLLL';

if(preg_match($regex, $str, $matches)){
var_dump($matches);
}

echo "\n";
结果4
array(1) {
[0] =>
string(5) "heLLL"
}</blockquote>


**六、正则表达式的注释**


格式:(?# 注释内容)
用途:主要用于复杂的注释


贡献代码:是一个用于连接MYSQL数据库的正则表达式


<blockquote>$regex = '/
^host=(?<!\.)([\d.]+)(?!\.) (?#主机地址)
\|
([\w!@#$%^&*()_+\-]+) (?#用户名)
\|
([\w!@#$%^&*()_+\-]+) (?#密码)
(?!\|)$/ix';

$str = 'host=192.168.10.221|root|123456';
$matches = array();

if(preg_match($regex, $str, $matches)){
var_dump($matches);
}

echo "\n";</blockquote>


**七、特殊字符
**

特殊字符      解释
*                   0到多次
+                  1到多次还可以写成{1,}
?                  0或1次
.                   匹配除换行符外的所有单个的字符
\w                [a-zA-Z0-9_]
\s                 空白字符(空格，换行符，回车符）[\t\n\r]
\d                 [0-9]


<blockquote>本篇文章为转载文章，因为觉得写得的确是好，二次分享给大家，版权归原作者“川山甲”所有。
原文链接：http://www.cnblogs.com/baochuan/archive/2012/03/12/2391135.html</blockquote>
