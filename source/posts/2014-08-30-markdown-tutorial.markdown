---
author: jeromechan
comments: true
date: 2014-08-30 06:15:49
slug: markdown-tutorial
title: Markdown之旅
wordpress_id: 130
permalink: /2014/08/30/markdown-tutorial/
categories:
- Programming
- Translation
tags:
- markdown
- markdown基础知识
---

[![markdown-logo](/images/2014-08-30-markdown-tutorial/markdown-logo.png)](/images/2014-08-30-markdown-tutorial/markdown-logo.png)




**Part 1**




让我们开始学习Markdown基本语法吧。 首先我们先学习两种文字格式：_斜体（italics）_和**粗体（bold）**






	
  * _斜体（italics）_
 Tips：
在需要改变为斜体的文字前后，各增加两条下划线，例如：_斜体文本_



	
  * **粗体（bold）**
 Tips:
在需要改变为粗体的文字前后，各增加两个星号，例如：**粗体文本**



	
  * **_斜体（italics） + 粗体（bold）_**
 Tips：
在需要改变为斜体+粗体的文字前后，先增加下划线使得文本成为斜体，然后再增加星号，使其在斜体的前提下，增加粗体的效果，例如：**_斜体文本+粗体文本_**




**Part 2**




让我们来看看另外一种Markdown格式——“Header”。“Header”经常被用作网站、杂志文章和提示弹窗，渲染出能够体现重点关注的标题部分。其中，“Header”总共区分有六级，如下所示：




    # Header one




    ## Header two




    ### Header three




    #### Header four




    ##### Header five




    ###### Header six




样式如下所示：





# **Header one**




## **Header two**




### **Header three**




#### **Header four**




##### **Header five**




###### **Header six**




**Part 3**






	
  * 为文本添加直接超链接（Inline Link）
  Tips：
["超链接标题"]("超链接地址")，例如：[Search for it.](www.google.com)

	
  * 为文本添加引用超链接（Reference Link）
  Tips：
例如：
Do you want to [see something fun][REF LINK VAR HERE]?
[REF LINK VAR HERE]: www.google.com
需要注意的是，引用超链接的定义需要放置在引用上下文的下方。




**Part 4**






	
  * 添加直接图片
  Tips：
添加图片的Markdown语法与文本添加超链接相似，不同在于，需要在其最前面增加一个感叹号“!”（Exclamation Point），例如：
!["替换文本 Alt Text"]("图片地址")
替换文本可以解决当图片地址受损之时，在图片位置上呈现出相应的说明文字。

	
  * 添加引用图片
  Tips：
  其Markdown语法类似于Part 3讲解过的为文本添加引用超链接，不同在于，需要在其最前面添加一个感叹号“!”。例如：
![The first father][First Father]
![The second first father][Second Father]
[First Father]: http://octodex.github.com/images/founding-father.jpg
[Second Father]: http://octodex.github.com/images/foundingfather_v2.png




**Part 5**




如果你需要对引述的文字内容作一些特殊的标识，或者是为杂志文章设计醒目的引文格式，Markdown的“块引用（blockquote）”将会对你非常有用处。块引用会使得读者对引述的句子或者段落更容易注意到。例如：




_"The sin of doing nothing is the deadliest of all the seven sins. It has been said that for evil men to accomplish their purpose it is only necessary that good men should do nothing."_




那么，如何为你的文字段落添加块引用呢？






	
  * 添加块引用
  Tips：
创建一个块引用，你只需要在引述的段落之前，放置一个大于号（greater than）">"，例如：
> This is a blockquote sentence.




**Part 6**




本部分为童鞋们介绍如何使用Markdown书写列表格式。 众所周知的是，列表主要区分为两类：有序（ordered），无序（unordered）。另外，有一种更为时髦的叫法，无序列表称为“Lists with bullet points”，有序列表称为“Lists with numbers”。




那么，如何使用Markdown语法创建两类列表呢？下面紧接着介绍书写的方法。






	
  * 创建无需列表
  Tips：
 在列表的每一项条目之前，放置一个星号（asterist）“*”，例如：
* Milk
* Eggs
* Rice

	
  * 创建无序列表
  Tips：
  在列表的每一项条目之前，放置一个数字，加上一个点号（period）“.”，例如：
1. Buy shoes
2. Do shopping
3. Finish homework




**Part 7**




我们有很多地方式实现段落的格式化。下面我们来介绍Markdown在创建段落和列表对其段落的两种方式。






	
  * Hard Break
  Tips：
为非列表的段落文字划分段落格式，HB的切分方式是向需要截成段落的文字处，插入回车（return）2次。例如：
Do I contradict myself?
“回车1次”
“回车2次”I am large, I contain multitudes.

	
  *   为列表的段落文字进行分行并对齐，即上文所述的“列表对其段落”，HB的切分方式是向需要截成段落的文字处，插入回车（return）2次，并在第2次回车之后，增加一个空格（blank），例如：
1. Do I contradict myself?
“回车1次”
“回车2次”“空格1个”I am large, I contain multitudes.
2. Anything else here.

	
  * Soft Break
  Tips:
  为非列表的段落文字划分段落格式，SB的切分方式是向需要截成段落的文字处，插入空格（blank）2次。例如：
Do I contradict myself?“空格1次”“空格2次”I am large, I contain multitudes.为列表的段落文字进行分行并对齐，即上文所述的“列表对其段落”，SB的切分方式是向需要截成段落的文字处，插入空格（blank）2次之后，增加一个回车（return），例如：
1. Do I contradict myself?“空格1次”“空格2次”
“回车1个”I am large, I contain multitudes.
2. Anything else here.




效果图如下：




【段落】




Do I contradict myself?
Very well then I contradict myself,
(I am large, I contain multitudes.)




【列表对其段落】






	
  1. Crack three eggs over a bowl.
Now, you're going to want to crack the eggs in such a way that you don't make a mess. If you _do_ make a mess, use a towel to clean it up!

	
  2. Pour a gallon of milk into the bowl.
Basically, take the same guidance as above: don't be messy, but if you are, clean it up!




**Part 8**




恭喜你，阅读至此，如果前面谈到的知识你都掌握了，那么你已经具备了编写Markdown文档的基本能力。




不管你是否相信，但是你也只是刚刚踏入Markdown的学习门槛，而Markdown的扩展性是非常强大的，Markdown目前已经可以支持编写类似于表格（table）、预定义列表（definition list）、页脚备注（footnotes）等等。




因为那是Markdown的扩展内容，并不是必不可少的，所以本篇文章只介绍了Markdown的基础知识。




如果你想要学习到更多的Markdown的应用知识，欢迎跳转至其他的一些Markdown教程和应用平台进行知识提升。以下列出了部分可供各位参考：






	
  * [http://daringfireball.net/projects/markdown/](http://daringfireball.net/projects/markdown/)

	
  * [http://en.wikipedia.org/wiki/Markdown#Syntax_examples](http://en.wikipedia.org/wiki/Markdown#Syntax_examples)

	
  * [http://johnmacfarlane.net/babelmark2/faq.html](http://johnmacfarlane.net/babelmark2/faq.html)

	
  * [http://idratherbewriting.com/2013/06/04/exploring-markdown-in-collaborative-authoring-to-publishing-workflows/](http://idratherbewriting.com/2013/06/04/exploring-markdown-in-collaborative-authoring-to-publishing-workflows/)




声明：本篇文章内容由本人翻译自MarkdownTutorial.COM，欲阅读原版，请跳转至[Markdown Tutorial](http://markdowntutorial.com/)
