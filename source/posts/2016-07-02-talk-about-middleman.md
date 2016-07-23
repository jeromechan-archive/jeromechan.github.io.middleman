---
title: 说说使用middleman的那些事情
date: 2016-07-02 09:00:00
description: “middleman实践分析及其简明教程”
keywords: “middleman, jekyll, 静态网站”
categories:
- middleman
- jekyll
tags:
- middleman
- jekyll
---

![](/images/2016-07-02-talk-about-middleman/DraggedImage.png)

#### 一、什么是静态网站

随着互联网发展的脚步，现在的个人博客网站已经不再局限于国内几大门户网站所提供的博客撰写服务。
记得上大学那会儿，为了阅读一些名人诸如国民岳父韩寒、李承鹏、徐静蕾等博主的文章和思想，每天必定会上博客上转上两遍，翻阅近十篇进行阅读。那个时候的博客页面加载速度，在寝室512k的带宽状况下，简直令人没有了脾气。

那个时候并没有太多纯静态网站的做法，有的是一些根据脚本生成指定的某些html页面，用于解决一些高流量访问的问题，例如门户站点的首页，其中只需要保持少量的动态加载元素，对付高流量高并发并不是困难的。

而个人博客、企业宣传页面不同于上文的需求场景，其更新频率定期，没有过多的注册用户信息的管理，不涉及复杂的交互实现，只需要满足查看和评论的功能即可。

> 评论功能自然是需要实现r+w操作的，但是现在已经存在了很多第三方协助托管评论信息的平台，例如国内的多说，国外的disqus。只需要开发者简单地嵌入少量html+js代码即可完成评论功能的实现。

故而，纯静态网站应运而生，各类纯静态网站生成工具也出现了较大的发展前景。下面说道的middleman就是一个静态网站的generator工具。

#### 二、放弃jekyll转投middleman

![](/images/2016-07-02-talk-about-middleman/DraggedImage-1.png)

这部分并不是说jekyll技术已经落后，而是从自身角度来看为什么自己会转投middleman。
自己是从2014年开始使用jekyll的，源于阅读了较多的大神yuguo对于前端栈的技术篇章，也就两年的光景，但是自己经历了从2.X版本变迁到3.X版本的过程。
对于为什么自己放弃jekyll转投middleman，下面分2点作出阐述。

第一点，我们先来说说2.X到3.X版本的更迭细节。
![](/images/2016-07-02-talk-about-middleman/DraggedImage-2.png)
以上变迁的情况说明，大家都知道，jekyll 2.X里包含了ruby和python两门技术，而以上的更迭看来，一方面减少了非必需包的依赖，留出了定制空间，移除了python的依赖。或许jekyll作者更喜欢ruby only吧。

这些变更并不是向前兼容的，如果你的jekyll是2.X版本，请留意升级后带来的源代码修改的成本。虽然它不是向前兼容，但是升级过程并不会引入更多的包依赖，而恰恰是因为这点，_config.yml需要作出的变更会较多，例如coderay的highlighter引擎建议要更换为rouge；需要分页插件，则需要增加gems:[jekyll-paginate]作出依赖声明，等等。

而这里包含了一点自己无法接受的变更，看官方声明：

> **!! Don't set a permalink**   
> Setting a permalink in the front matter of your blog page will cause pagination to break. Just omit the permalink.

以上意思是说，如果你使用了pagination，那么permalink的使用会阻断pagination的执行。也就是说，如果你有一个分页列表的页面，因为你在该页面中使用了permalink改写路径，那么页面中的paginator.posts将会失效，页面内容也将加载失败。

	<!-- This loops through the paginated posts，if you had used permalink settings, the paginator parsing job will fail. -->
	{% for post in paginator.posts %}
	  <h1><a href="{{ post.url }}">{{ post.title }}</a></h1>
	  <p class="author">
	    <span class="date">{{ post.date }}</span>
	  </p>
	  <div class="content">
	    {{ post.content }}
	  </div>
	{% endfor %}

第二点，就要说到liquid的语法。
我们来假设这么个场景，在一个列表加载的页面中，我们需要在循环内判断到达指定加载条目预设上限之时，循环执行break跳出。
这个场景使用liquid引擎是这么写的：

	{% assign var = 0 %}
	{% for post in site.posts %}
	    {% assign var = var | plus: 1 %}
	    {% if var > 5 %}
	        {% break %}
	    {% endif %}
	{% endfor %}

也可以这么写：

	{% assign var = 0 %} // 这句话可有可无，因为increment会将var初始化为0
	{% for post in site.posts %}
	    {% increment var %}  // 这句话会自动执行一个print语句，将var打印出来
	    {% if var > 5 %}
	        {% break %}
	    {% endif %}
	{% endfor %}

前者的写法让人觉得做一个简单的运算都需要去背记liquid的各种filters，让人觉得麻烦不已。
后者的写法会凭空多出一个默认的print效果，这个也是UI界面编写之时无法接受的。

#### 三、为什么不选用WordPress等LAMP架构的博客框架

![](/images/2016-07-02-talk-about-middleman/DraggedImage-3.png)

作为一名php开发者，wordpress是必须鼓捣的框架之一，但是为什么最终放弃了选用wp作为个人博客首选呢？
原因其实不复杂，主要有以下五个方面：   
1. 涉及数据库技术，数据的灾备流程过于复杂，维护时间成本高；   
2. wp框架体量重，适合开发较大型的cms内容管理站点，对于个人博客有点大材小用，如同杀鸡用了牛刀；   
3. 扩展插件多是其亮点，同时也是拖慢wp站点的一大坑点，php的通用单线程处理机制决定了其瓶颈，就算升级了鸟哥的php7估计也根治不了多扩展插件wp站点的加载时长的问题；   
4. 需要关注的安全问题较多，可定制化有限，如果不合适的定制会引发无法升级的问题；   
5. 需要一台VPS或者Web Host主机，也就是将多出一份硬件方面的开销，如果要求访问稳定、连接速度可接受的主机，购买价格也会逐级上升。   

#### 四、简明middleman实践之路
##### 4.1 由于middleman是ruby语言的作品，先了解以下关于ruby语言的关键概念。

![](/images/2016-07-02-talk-about-middleman/DraggedImage-4.png)

1. ruby：顾名思义，指的就是ruby语言。   
2. rvm：全名ruby version manager，注意它和jvm不是一个含义哦。rvm是管理ruby本身，也包含了ruby插件的管理。   
3. rails：指的是ruby著名开发框架，认识ruby的人都认识它。   
4. rubygems：ruby程序包管理器，可以将ruby程序打包成gem，作为一个独立安装单元安装到计算机中。   
5. gem：指的是封装起来的ruby应用程序，或者代码库。终端中使用的gem命令，是指使用rubygems安装程序应用。   
6. gemfile：配置文件，用于定义指定应用所依赖的包，然后可以提供给bundle命令执行，类似于shell命令中的.sh脚本。   
7. rake：该程序包是ruby所需要安装的包中最为关键的一个。rake是一个ruby的构建工具，类似于Make、ant、maven、gradle不等。rakefile便是其执行的构建任务配置文件，其中涉及特定的DSL撰写方式，类似于groovy在gradle中的应用一样。   
8. rakefile：rake构建任务中所涉及的任务配置文件。   
9. bundle：等同于批量执行gem命令，配置好gemfile之后，使用bundle install可以实现包，及其依赖包的自动下载与安装。     

##### 4.2 middleman的安装疑问

middleman依赖于rubygems、bundle、gemfile、rake等工具或框架。在安装一系列ruby依赖库的过程中，会遇到connection fail，error loading，can’t be found等问题，这些问题的原因是因为[rubygems.org](https://www.rubygems.org)在国内访问不稳定的缘故。  

正所谓兵来将挡，水来土掩，方法总是比困难要多得多。  
国内的大淘宝，还有ruby-china官方，都给大家做了一个同步频率为15mins的ruby gems的镜像，我们可以将自己本地的ruby gems、bundle源配置切换到国内。   
参见这里：   
- ruby-china官方源：http://ruby-china.org   
- 大淘宝的镜像源：http://ruby.taobao.org

在安装各项依赖之时，建议先配置好gemfile，然后使用命令bundle install自动实现下载和安装，而不是使用middleman server逐项发现缺失库，因为从操作效率上是得不偿失的。

##### 4.3 slim VS liquid

![](/images/2016-07-02-talk-about-middleman/14674858884718.png)

关于liquid的一些用法和自己不感冒之处，前面已经提及了部分，这里不再大施笔墨赘述。
这里说说slim的情况。

liquid是jekyll默认配置的官方模板引擎，而slim也是middleman首推的前端引擎。
liquid有很多晦涩不易入门的语法结构，而slim相对而言就显得优雅了许多。

slim所倡导的是，一切页面元素、样式、js均可结构化。使用slim可以大大简化前端页面渲染的逻辑实现结构，没有了liquid般的html+js+liquid+css混合搭配在.html文件里使用的尴尬，映入眼帘的均是层次分明，结构清晰的模板语法。

下面作一下两者的对比，孰好各位看官心中自有结论。

- html+js+css+liquid混合应用

```	
<!-- html+js+css+liquid混合应用 -->
<head>
    <meta name="theme-color" content="{{ page.color }}">
    <link rel="stylesheet" href="{{ "/assets/css/main.css" | prepend:site.baseurl }}">
    <link rel="canonical" href="{{ page.url | replace:'index.html','' | prepend:site.baseurl | prepend: 	site.url }}">
    <link rel="alternate" type="application/rss+xml" title="{{ site.title }}" href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}" />
</head>
```

- slim的前端结构

```
<!-- html+js+css+slim混合应用 -->
doctype html
html lang="ja"
  head
    meta charset="utf-8"
    title The Elevatorpitch
    meta name="viewport" content="width=device-width, initial-scale=1.0"
    css:
      body {
        padding-top: 20px;
        padding-bottom: 40px;
      }
  body
    div class="container-narrow"
      div class="masthead visible-desktop"
script src="/js/theelevatorpitch.js"
```

更多slim应用可以关注我的gist：[Use slim engine for building html tags](https://gist.github.com/jeromechan/0432a89f3e9810e9ba26052606e56f38)

#### 五、Try the way you like

前端技术的不断发展，纯静态网站的性能问题也逐步被放大，在我们使用静态网站生成工具的同时，性能问题也一定需要着重考虑。
例如，gzip压缩、js+css压缩、单次加载批量样式文件和js文件、html页面布局层次简化、js依赖关系处理、css继承关系的整理、前端cache/data等缓冲区域技术的应用、异步ajax请求时长的监控、sass/less的样式结构简化和预处理，等等方面。

只要始终坚持用户至上，读者至上的原则，一定能够找到最适合自己预想的方案。

前面所涉及的参考资料有如下，感兴趣可以自己翻翻看看：   
- [Liquid官方文档](https://shopify.github.io/liquid/)   
- [Jekyll关于pagination说明](http://jekyllrb.com/docs/pagination/)   
- [Middleman官方文档](https://middlemanapp.com/basics/install/)   
- [Jekyll中paginate与permalink的冲突](https://www.reddit.com/r/Jekyll/comments/3uhk2j/cant_get_pagination_working_with_jekyll_301/)   
- [Upgrading Jekyll 2 to 3 on GitHub Pages](http://blog.virtuacreative.com.br/upgrade-jekyll-2-to-3-gh-pages.html)   
- [How to use slim engine for building html tags？](https://gist.github.com/jeromechan/0432a89f3e9810e9ba26052606e56f38)   

