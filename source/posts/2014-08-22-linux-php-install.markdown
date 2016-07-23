---
author: jeromechan
comments: true
date: 2014-08-22 06:43:11
slug: linux-php-install
title: Linux下的PHP安装
wordpress_id: 96
permalink: /2014/08/22/linux-php-install/
categories:
- LAMP
- Programming
tags:
- LAMP环境搭建
- php linux 安装
---




<blockquote>Tips：在安装php之前，请确认服务环境的httpd服务已经安装成功。若还没有安装apache http serer，参考这里：[Linux下的Apache安装](http://aboutcoder.com/2014/08/16/linux%e4%b8%8b%e7%9a%84apache%e5%ae%89%e8%a3%85/)</blockquote>




	
1. 检查机器环境
首先要确认机器环境中的php是否已经安装了其他版本，是否需要共存多版本，机器版本是否已经符合要求... 
可以参考的shell命令：

    
    
    >> whereis php #环境变量已配置的php
    >> ls /usr/local/php #常用php安装目录（或软链接目录）
    





 2. PHP基本安装
（a）下载php的tar包
官方地址：http://www.php.net 
（b） 解压下载好的php压缩包

    
    
    >> tar zxvf php-5.3.3.tar.gz
    



（c）生成makefile并编译安装





<blockquote>Tips：./configure —help可以查看到配置选项，如果需要定制，选择适合的选项作为安装配置也未尝不可。</blockquote>






    
    
    >> ./configure —prefix=/usr/local/php5 —with-apxs2=/usr/local/apache2/bin/apxs —with-config-file-path=/usr/local/php5/lib 
    



—prefix=PATH：指定安装目录
—with-apxs2=PATH：指定已安装好的apache apxs文件，关联Apache http server，生成libphp5.so
—with-config-file-path=PATH：指定php.ini的文件存放目录

Tips：安装过程中，视每个人的机器环境不同，会出现一些依赖包缺少的异常发生，致使安装失败。这时候不要着急，按照提示信息安装对应的依赖包就好，好事多磨嘛，haha

（d）关于php.ini文件的配置，可以自行Google或者百度就好，上面的相关说明文章多如牛毛，这里就不啰嗦了。

3. Apache HTTP Server与PHP的关联配置
（a）配置入口文件

    
    
    <ifmodule dir_module="">
    	DirectoryIndex index.html index.php
    </ifmodule>
    



（b）配置php解析模块

    
    
    LoadModule php5_module modules/libphp5.so
    








<blockquote>Tips：这里容易混淆的是，libphp5.so其实是php源码编译安装之时生成的，而非apache自己包含的。</blockquote>





（c）添加解析文件类型

    
    
    AddType application/x-httpd-php .php
    




4. PHP扩展安装
（a）扩展的认识
php的扩展区分为php自带扩展和自定义扩展包，php自带的扩展位于php安装包下的 /ext 文件夹下，而额外的自定义扩展，则需要通过PECL平台下载，地址为：[http://pecl.php.net/packages.php ](http://pecl.php.net/packages.php )
（b）安装扩展
安装的过程中，我们需要认识一个命令：phpize





<blockquote>Tips：phpize命令位于php安装目录的/bin文件夹下，是用来扩展php扩展模块的，通过phpize可以新增php的外挂模块。</blockquote>





以下举例（安装pdo_mysql扩展）说明：

    
    
    >> cd pdo_mysql
    >> /usr/local/php5/bin/phpize
    >> ./configure —prefix=/usr/local/php5/extensions —with-php-config=/usr/local/php5/bin/php-config
    >> make
    >> make test
    >> make install
    



此时，当make install执行完成后，在terminal中会打印出.so扩展文件存放的目录路径。然后再进一步配置php.ini文件中的“extension_dir=”和“extension=pdo_mysql.so”即可。

5. 启动apache

    
    
    >> /usr/local/apache2/bin/apachectl -k start
    >> /usr/local/apache2/bin/apachectl -k stop
    >> /usr/local/apache2/bin/apachectl -k restart
    




此时，可以通过浏览器访问指定的虚拟主机，通过php函数phpinfo()可以查看到当前php安装的情况，包括php.ini配置文件路径、已安装扩展配置情况和apache http server的关联配置情况等。
