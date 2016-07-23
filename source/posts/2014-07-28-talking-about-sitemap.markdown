---
author: jeromechan
comments: true
date: 2014-07-28 16:26:56
slug: talking-about-sitemap
title: 浅谈sitemap协议及其应用
wordpress_id: 48
permalink: /2014/07/29/talking-about-sitemap/
categories:
- Programming
tags:
- Sitemap Protocol
- wordpress
---

很多人都知道，一个站点建立起来之后，不仅内容要丰富，还有另外一点非常重要，那就是搜索引擎的爬取与收录。

众所周知的著名搜索引擎，国际上有Google，Yahoo!，Bing，国内通用的有百度，搜狗，360搜索等。当前国情决定，国际上著名的在国内发展地都不怎么样，要么发展路线左倾，与方针精神不相符合然后各种关键词词库过滤，要么特例独行直接放弃陪你们这么玩。这其中著名的产物应该当属伟大的墙无疑。不知道伟大的墙是什么？[点击这里](http://baike.baidu.com/link?url=K8sYMHBU2GewuCXIkD6YbhymvsQCMWKb-BNs5iZoiYAbpOV4LWR64iwKC_K_Ed7PYBF-G3Vp34j60USGwduISOOnFzFhxVNQ619NE_4GLAS) 进一步了解。

前面分析了国际著名Search Engine的国内发展情况，“革命尚未成功，仍需更加努力”。接着我们来聊聊国内的引擎。在作者高中刚接触计算机的时候，听闻的是“百谷虎”是身边最多人使用的，因为他是三个引擎的结果集合。直到高三之后才发现，原来那是一个山寨的网站，呵呵。百度，当属目前互联网最大的中文搜索引擎无疑，在Google“回家”之后，更是肆无忌惮地称霸中原了，搜狗，搜搜啥的，只能喝喝菜汤啥的就觉得相比往年已是N*100%的增长，啥狗啥更懂你的，其实等你真正用起来的时候就会发现，其实他们更多的是其合作方提供的外卖。360搜索算是异军突起，凭借着安全领域揽到的N亿群体，直接进军百度帝国的搜索领域，其初期不遵循robots协议的做法为同行业所谴责，但与此同时也为其快速发展提供了很大的帮助，这是否能说是不择手段呢？这或许每个人都会有不同的看法。360搜索的强势也带来了很高的回报，发布1年之后，保守估计，确实快速蚕食了百度的超2-3成左右的份额。

好了，好像已经偏题了，其实前面说那么多也无非是让大家都了解了解我们身边的搜索引擎的发展态势。继续今天的主题，就是sitemap。

那么什么是sitemap？我们来看下wikipedia的定义：


<blockquote>A site map (or sitemap) is a list of pages of a web site accessible to crawlers or users. It can be either a document in any form used as a planning tool for Web design, or a Web page that lists the pages on a Web site, typically organized in hierarchical fashion.</blockquote>


简单了说，就是一个站点的树形层级结构，站点的脑图，根据它可以遍历整个站点的角角落落。

那么，我们为什么需要它呢？因为sitemap可以提供给搜索引擎，提供给spider一个内容爬取的大道入口。搜索引擎如何知道你上线了一个站点，如何知道你发布了一篇博客，如何知道你的站点里含了哪些其他存档的文章 等等。如果你的站点有了sitemap，spider会在它的周期内很快收录你站点中的所有文章，按照权重提供到用户的搜索结果中。

以上只是说明了sitemap的好处和作用，不要误解sitemap是引擎收录文章的唯一入口。当然不是，只是说，如果你有了sitemap，符合指定搜索引擎所适配的sitemap，那么会收录地更快更好。具体可以抽空学习SEO知识，你会收获更多。

接下来介绍一下sitemap协议。


<blockquote>sitemap通用的做法是使用XML Schema书写的文档形式，必须包含XML tags，同时文档中包含的内容必须是被处理（Entity escaping）过的，同时文档必须符合UTF-8编码。

其中，sitemap必须满足以下条件：

> 
> 
	
>   * 以<urlset></urlset>包含所有其他XML节点；
> 
	
>   * 在urlset中参照协议标准定义相应的命名空间；
> 
	
>   * 至少包含一个以父节点存在的有效的<url>；
> 
	
>   * 在<url>节点中至少包含一个<loc>节点，以说明需要被爬取内容的链接；
> 
	
>   * sitemap中仅允许包含相同域名的站点，如果是多个域名，则需要书写多个sitemap；
> 

</blockquote>


前面谈到了Entity escaping是什么呢？给大家一张图相信大家就知道了，简单说就是把一些特殊字符用其他的形式表示起来。如下图所示：


<blockquote> Character               Escape Code
Ampersand    &         &amp;
Single Quote   '          &apos;
Double Quote "          &quot;
Greater Than >          &gt;
Less Than      <          &lt;</blockquote>


以下提供一个简单的sitemap.xml示例供大家参考：

    
    
    
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
          <loc>http://www.example.com/</loc>
          <lastmod>2005-01-01</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
       </url>
    </urlset> 
    


如果需要在同一个站点中维护不同subdomain的sitemap，那么可以参考如下做法：

http://www.sitemaphost.com/sitemap-host1.xml
http://www.sitemaphost.com/sitemap-host2.xml
http://www.sitemaphost.com/sitemap-host3.xml

以下做一些关于wordpress的sitemap的介绍。

wordpress制作sitemap，最为简单的途径，就是可以借助其平台强大的plugin功能，但是不管你是否相信，wordpress的plugin开启地越多，对wp系统的运行效率的影响越大。所以，能手工添加还是尽量走手工添加定期更新为佳，毕竟搜索引擎也不会每天日以继夜地抓取你的小站点，你也不会日以继夜分秒必争地更新着你的博客文章。所以个人小博客站点类，建议手工添加sitemap文件。

在手工添加这条道路上，Google和Baidu提供了许许多多地做法，都可以达到不错的效果。我这里只简单介绍本站博客的做法。



	
  1. 在wp根目录下新增sitemap.php文件，填充以下代码：

    
    
    
    '; ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc></loc>
            <lastmod></lastmod>
            <changefreq>always</changefreq>
            <priority>1.0</priority>
        </url>
        get_results("SELECT * FROM $wpdb->posts WHERE post_status = 'publish' ORDER by post_modified DESC"); ?>
        
            <url>
                <loc>ID); ?></loc>
                <lastmod>post_modified, false); ?></lastmod>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
            </url>
        
    </urlset>
    




	
  2. 新增sitemap_gen.php，填充以下代码，用以生成XML文件：

    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://DOMAIN:PORT/sitemap.php");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $output = curl_exec($ch);
    file_put_contents('./sitemap.xml', $output);
    curl_close($ch);
    




	
  3. 上传到站点根目录，浏览器执行“http://DOMAIN:PORT/sitemap_gen.php，就这样sitemap.xml就在站点根目录生成成功了。

	
  4. 剩下的步骤，就是向Google和Baidu等各大搜索引擎提交sitemap.xml访问地址。


参考资料：
Sitemap Protocol：[http://www.sitemaps.org
](http://www.sitemaps.org%20)Simply Making Sitemap：[http://www.xml-sitemaps.com
](http://www.xml-sitemaps.com)Google Sitemap Generator WP Plugin：[http://wordpress.org/plugins/google-sitemap-generator/
](http://wordpress.org/plugins/google-sitemap-generator/)Sitemap Formats And Guidelines：[https://support.google.com/webmasters/answer/183668](https://support.google.com/webmasters/answer/183668)

