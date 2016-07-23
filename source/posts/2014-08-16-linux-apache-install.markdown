---
author: jeromechan
comments: true
date: 2014-08-16 07:39:54
slug: linux-apache-install
title: Linux下的Apache安装
wordpress_id: 84
permalink: /2014/08/16/linux-apache-install/
categories:
- LAMP
- Programming
tags:
- apache linux 安装
- Apache安装
- LAMP环境搭建
---

	说到LAMP/WAMP服务器环境的搭建，相信PHPer都无一不会，但是对于Freshman来说，这一块的内容还是需要认真学习，从中可以学习到许多环境配置上的基础常识，自己动手捣腾过的东西才印象深刻，犹如“好记性不如烂笔头”的说法一般。
	关于LAMP/WAMP环境的搭建，准备细分为几篇文章进行讲解，希望能为更多需要该项知识的人提供更为全面的配置流程规范。本篇文章，我们先Apache在Linux服务器环境下的搭建。
	
	



<blockquote>Tips：在搭建PHP之前，一定要先安装搭建好Apache/Nginx的容器环境。</blockquote>




	
1. 检查环境中Apache的依赖包是否已经安装齐全
（a）APR(Apache Portable Runtime) Project：apr, apr-util, apr-iconv(optional)
	Download：[http://apr.apache.org/](http://apr.apache.org/)
（b）PERL Language Support
	Download：[http://www.perl.org/](http://www.perl.org/)
（c）PCRE Library：A set of functions that implement regular expression pattern matching using the same syntax and semantics as Perl 5.
	Download：[http://sourceforge.net/projects/pcre/](http://sourceforge.net/projects/pcre/)

2. 安装APR
（a）解压下载的tar包

    
    
    >> tar zxvf apr.tar.gz -C [TARGET_DIR]
    >> tar zxvf apr-util.tar.gz -C [TARGET_DIR]
    



（b）安装

#先安装apr.tar.gz

    
    
    >> ./configure —prefix=[INSTALL_DIR]
    >> make
    >> make install
    




#再安装apr-util.tar.gz

    
    
    >> ./configure —prefix=[INSTALL_DIR] —with-apr=[APR_INSTALL_DIR]
    >> make
    >> make install
    




备注：若需要规划安装目录和系统/usr/local目录之间的关系，可以参考软链接（symbolic link）的创建，语法如

    
    
    >> ln -s [SOURCE_FILE_OR_FOLDER] [TARGET_REF_SYMBOLIC_LINK_DIR]
    




3. 安装PERL与PCRE
PERL的安装参照官方网站教程进行安装即可，关于PCRE的安装简单如下：

    
    
    >> ./configure —prefix=[INSTALL_DIR]
    >> make
    >> make install
    




4. 安装Apache HTTP Server
（a）解压缩httpd.tar.gz
（b）进入解压后的目录，定制需要开启的httpd模块，类似：

    
    
    >> ./configure —prefix=[INSTALL_DIR] —enable-so —enable-rewrite=shared —with-mpm=prefork —with-apr=[APR_INSTALL_DIR] —with-apr-util=[APR_UTIL_INSTALL_DIR] —with-pcre=[PCRE_INSTALL_DIR] 
    >> make 
    >> make install
    




5. 启动httpd服务

    
    
    >> [HTTPD_INSTALL_DIR]/bin/apachectl -k start 
    >> ps -ef | grep httpd （或者ps aux | grep httpd）#查看是否启动httpd成功
    




备注：可以拷贝apachectl到服务目录（/etc/init.d）中，作为服务项（service命令）启动，例如

    
    
    >> cp [HTTPD_INSTALL_DIR]/bin/apachectl /etc/init.d/httpd
    >> service https start
    



6. 操作快捷Tips

（a）Apache .configure命令范例

    
    
    ./configure --prefix=/opt/tuniu/apache2 --with-apr=/usr/local/apr/bin/apr-1-config --with-apr-util=/usr/local/apr/bin/apu-1-config --enable-so --enable-rewrite --enable-ssl --enable-cgi --enable-mods-shared=all --with-ssl=/usr/lib64/openssl --enable-proxy --enable-proxy-http
    



（b）安装mod_ssl依赖
在安装mod_ssl过程中需要依赖[SSL/TLS Encryption库](http://httpd.apache.org/docs/2.2/ssl/)，建议使用开源的OpenSSL。下载官方见这里：[https://www.openssl.org/](https://www.openssl.org/)

资料提示：许多童鞋们会被搜索引擎导向[ModSSL.COM](http://www.modssl.org/)，其实不然，ModSSL的扩展tar包安装不支持Apache Http Server 2.

