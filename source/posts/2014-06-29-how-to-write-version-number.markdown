---
author: jeromechan
comments: true
date: 2014-06-29 00:59:42
slug: how-to-write-version-number
title: 关于文档的版本号理解
wordpress_id: 27
permalink: /2014/06/29/how-to-write-version-number/
categories:
- Programming
tags:
- 项目管理
---

版本号在生活中，研发工作中经常会遇到，但是是否有深入了解过为什么文档的版本号的后面一长串数字的代表含义吗？

下面来详细讲讲关于文档版本号的那些事儿。

以下文摘了来自于百度百科对于[文档版本](http://baike.baidu.com/link?url=zyM5AztTLt_Lki4Zzxk4POABOIVnp3YuUN_AtJy02tbRjFKEC4IL0_fwP5Hs9mpU1sv6u10yRSZnrkZasZe0XK)的释义：


<blockquote>“ 通常指[软件](http://baike.baidu.com/view/37.htm)程序发行的次数[版本号](http://baike.baidu.com/view/421712.htm)，一般文件版本形如 x.x.x 其中第一个X极有可能是软件[内核](http://baike.baidu.com/view/1366.htm)的版本，第二个X就是发行的正式版本的版本号，而第三个X代表的通常是软件更改修正的次数，软件版本的类别。文件版本可以分为以下几种：1.文件源版本（文件的核心开发版本） 2.文件修改版（其他用户或者产品生产单位更新或者升级的版本） 3.文件[破解版](http://baike.baidu.com/view/10096.htm)（其他用户或者技术组为了自己使用对[源文件](http://baike.baidu.com/view/385166.htm)所做的反编译版本） 4.文件合作版（与其他单位或者院校的合作版本） 5.文件定制版 （特指某个企业为定制版） 6.文件内部版本（仅限生产单位内部使用） ”</blockquote>


然后，对于自己涉及的研发文档作了如下的版本号规范（仅供参考）：

<!-- more -->


<blockquote>“ 关于版本号的说明：  
规范版本号格式为"A.B.C.D"，以下列出各个数值发生变更的条件。  
A：核心版本号，当发生核心机制、新增重大内容、变更项涉及面广的时候（仅发生在成功上线后）；  
B：一般发行的正式版本号，当发生变更项系一般的非重大变更内容的时候（仅发生在成功上线后）；  
C：文档修订次数，当文档发生了任意变更，该版本号按1递增；  
D：变更日期，例如"911"(9月11日),"1109"(11月09日)。 ”</blockquote>


以上是对于文档的版本号管理，而互联网产品的版本号与文档的版本号规范有一定区分，后面的文章会对互联网产品的版本号常用规范作出分析。
