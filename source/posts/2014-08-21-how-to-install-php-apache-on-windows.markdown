---
author: jeromechan
comments: true
date: 2014-08-21 02:56:51
slug: how-to-install-php-apache-on-windows
title: windows下的PHP与Apache安装
wordpress_id: 89
permalink: /2014/08/21/how-to-install-php-apache-on-windows/
categories:
- LAMP
- Programming
tags:
- Apache安装
- php安装
- WAMP
---

站内的关联的其他几篇文章讲述了[LAMP环境搭建](http://aboutcoder.com/2014/08/16/linux%e4%b8%8b%e7%9a%84apache%e5%ae%89%e8%a3%85/)的过程与建议Tips。今天要来讲讲的是关于WAMP，毕竟环境是Windows的童鞋们还是居多的。

1. 安装Apache HTTP SERVER + PHP
    关于如何安装Apache HTTP SERVER和PHP的过程，这一步在Windows环境下可以简单点到略过，官方都提供了.exe安装包或portable的zip包，双击按提示安装好，然后将PHP-Install-DIR/bin配置到环境变量Path中即可。
    
    



<blockquote>Tips：先安装Apache，再安装PHP，再作二者关联。</blockquote>





2. PHP配置
    说到PHP配置，首先要知道PHP的配置文件是php.ini，再安装好的PHP目录内，会包含几个不同用途的php.ini文件，不同的php版本之间会有所差异，大致的文件如：php.ini-development, php.ini-production, php.ini-test, php.ini，而php.ini是默认读取的配置文件。
    




<blockquote>   php.ini-development：开发环境常用的属性配置概况
    php.ini-test：测试环境常用的属性配置概况
    php.ini-production：生产环境常用的属性配置概况</blockquote>





    读者可以根据需要，学习其中的配置含义，配置出自己系统最合适的配置项目。
    
    开发者最常用到的配置，便是扩展配置了，没有扩展，php无法实现curl远程调用，无法实现mysql，pgsql连接，更无法实现gd开发。
    在扩展配置中，我们必须认识“extension_dir”和“extension=”配置项目，前者指向扩展链接库文件所在的目录，后者配置所需要的扩展链接库文件。
    例如，我们配置pdo_mysql的扩展：

    
    
        extension_dir=“D:/php/ext”
        extension=pdo_mysql.dll
    








<blockquote>   Tips：Windows下的PHP安装好之后很友好，都为大家根据相应的vc版本编译好了dll扩展文件，可以为大家省下不少时间。找不到的扩展可以到官方的pecl上找：[http://pecl.php.net/packages.php](http://pecl.php.net/packages.php)</blockquote>





    配置好了php，此时apache容器仍然不能解析运行php文件，因为我们还差将两者关联起来的其他一些简单配置，下面我们来讲讲这一块。

3. 在Apache HTTP Server中配置关联php语言解析模块
    php是以module的方式与apache关联起来的。

    Tips：Apache HTTP Server主配置文件是httpd.conf。

    在httpd.conf文件中，新增module加载项：


    
    
        LoadModule php5_module D:/php/php5apache2_2.dll //关联并加载php解析模块
        PHPIniDir “D:/php”//关联PHP安装目录及其php.ini，该项配置后，可以在phpinfo()中的属性“Loaded Configuration File”检查是否关联php.ini成功
    




    然后，告诉apache它现在可以执行.php文件了：


    
    
        AddType application/x-httpd-php .php //让.php格式文件存储php代码并可以被执行
        AddType application/x-httpd-php .html //让.html格式文件存储php代码并可以被执行
        AddType application/x-httpd-php .txt //让.txt格式文件存储php代码并可以被执行
    




    到这里，Apache与php之间的关联关系就建立起来了。

4. 启动Apache，准备执行php文件，你可能会遇到如下情况：
    （1）php扩展配置没有生效，在phpinfo()中没有发现新增的扩展
    答：a. 检查扩展配置项目按上文要求正确；
            b. 是否按官方要求将libeay32.dll, ssleay32.dl拷贝到C:/windows/system32/下；
            官方原文如下：
            




<blockquote>【vatozana at yahoo dot com】 3 years ago
I had problems registering Curl extentions and it was cause by the old dll of libeay32.dll and  ssleay32.dll  which were already in my c:\windows\system32 I replaced them and all is now fine!!
</blockquote>




5. 其他参考：
    最官方的莫过于php.net，该站旗下有关联的许多对php很有好处的二级站点，这里可以找到：[http://cn2.php.net/sites.php](http://cn2.php.net/sites.php)
