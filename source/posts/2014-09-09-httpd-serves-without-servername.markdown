---
author: jeromechan
comments: true
date: 2014-09-09 10:29:41
slug: httpd-serves-without-servername
title: 缺省ServerName的Apache Http Server主机解析流程
wordpress_id: 147
permalink: /2014/09/09/httpd-serves-without-servername/
categories:
- LAMP
- Programming
tags:
- ServerAlias
- ServerName
---

##### 第一部分：了解ServerName、ServerAlias区别


ServerName：主机域名的解析入口，每一个虚拟主机在配置之时是必须的；
ServerAlias：域名别名，在配置了ServerName的基础上，想要集成“一主机多域名”的结构，ServerAlias是不错的选择。



##### 第二部分：如果主机缺省了ServerName的配置会如何发展


官方是这样解释的：


    
    
    # Ensure that Apache listens on port 80
    Listen 80
    # Listen for virtual host requests on all IP addresses
    NameVirtualHost *:80
    
    < VirtualHost *:80>
        DocumentRoot /www/example1
        ServerName www.example.com
        # Other directives here
    < /VirtualHost>
    







<blockquote>The asterisks match all addresses, so the main server serves no requests. Due to the fact that www.example.com is first in the configuration file, it has the highest priority and can be seen as the default or primary server. That means that if a request is received that does not match one of the specified ServerName directives, it will be served by this first VirtualHost. [Reference Link](http://httpd.apache.org/docs/2.2/vhosts/examples.html)</blockquote>




最后一句话已经提及，如果缺省了ServerName，则该请求域名会被映射到第一台虚拟主机配置中。 那么，哪一台是第一台呢？难道就是配置过程中，或者Include引入过程中的排在第一位置的吗？



##### 第三部分：哪台主机是第一位置


我们准备以下用例进行分析：

**第一步：重现错误解析现象**

    
    
    >>vim /etc/hosts
    # 当前服务器IP是192.168.1.100
    192.168.1.100 aa.example.com
    192.168.1.100 bb.example.com
    192.168.1.100 ab.example.com
    192.168.1.100 none.servername.com
    
    >>vim /apache2/config/extra/httpd-vhosts.conf
    Include conf/extra/ab.example.com-vhosts.conf
    Include conf/extra/none.servername.com-vhosts.conf ##未配置ServrName
    Include conf/extra/aa.example.com-vhosts.conf
    Include conf/extra/bb.example.com-vhosts.conf
    
    >>/apache2/bin/apachectl -S
    VirtualHost configuration:
    wildcard NameVirtualHosts and _default_ servers:
    *:80                   is a NameVirtualHost
         default server aa.example.com (/apache2/conf/extra/aa.example.com-vhosts.conf:1)
         port 80 namevhost aa.example.com (/apache2/conf/extra/aa.example.com-vhosts.conf:1)
         port 80 namevhost ab.example.com (/apache2/conf/extra/ab.example.com-vhosts.conf:1)
         port 80 namevhost aa.example.com (/apache2/conf/extra/none.servername.com-vhosts.conf:1) ## 此行：none.servername.com-vhosts.conf被错误映射到了aa.example.com
         port 80 namevhost bb.example.com (/apache2/conf/extra/bb.example.com-vhosts.conf:1)
    
    



**第二步：将hosts解析顺序作部分调整，观察修改后的解析结果**

    
    
    >>vim /etc/hosts
    # 当前服务器IP是192.168.1.100
    192.168.1.100 bb.example.com ## 将该域名修改置于最前面
    192.168.1.100 aa.example.com
    192.168.1.100 ab.example.com
    192.168.1.100 none.servername.com
    
    >>/apache2/bin/apachectl -S
    VirtualHost configuration:
    wildcard NameVirtualHosts and _default_ servers:
    *:80                   is a NameVirtualHost
         default server aa.example.com (/apache2/conf/extra/aa.example.com-vhosts.conf:1)
         port 80 namevhost aa.example.com (/apache2/conf/extra/aa.example.com-vhosts.conf:1)
         port 80 namevhost ab.example.com (/apache2/conf/extra/ab.example.com-vhosts.conf:1)
         port 80 namevhost bb.example.com (/apache2/conf/extra/none.servername.com-vhosts.conf:1) ## 此行：none.servername.com-vhosts.conf被错误映射到了bb.example.com
         port 80 namevhost bb.example.com (/apache2/conf/extra/bb.example.com-vhosts.conf:1)
    
    



**第三步：分析前两步的现象**
从前面两步可以发现，未配置ServerName属性的虚拟主机，会优先根据本服务器的DNS解析机制依次解析，然后会将未配置ServerName的主机配置项，分配给第一条被DNS解析遇到的本服务器虚拟主机域名。

通过以上的分析，相信大家已经了解了缺省了ServerName的主机会如何解析了吧。这也就是为什么常常我们发现自己的配置没有错误抛出，但是域名解析路径紊乱的原因之一。
