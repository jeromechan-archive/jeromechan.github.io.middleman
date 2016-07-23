---
author: jeromechan
comments: true
date: 2014-06-29 00:58:27
slug: using-command-to-control-service-on-windows
title: Windows环境下使用命令行管理服务
wordpress_id: 24
permalink: /2014/06/29/using-command-to-control-service-on-windows/
categories:
- Programming
tags:
- 系统运维
---

一、创建服务

1.1 命令”sc create”官方说明


描述:
在注册表和服务数据库中创建服务项。
用法:
`sc <server> create [service name] [binPath= ] <option1> <option2>...`




选项:
注意: 选项名称包括等号。
等号和值之间需要一个空格。
`type= <own|share|interact|kernel|filesys|rec>`




(默认 = own)




start= <boot|system|auto|demand|disabled|delayed-auto>




(默认 = demand)




error= <normal|severe|critical|ignore>




(默认 = normal)




binPath= <BinaryPathName>
group= <LoadOrderGroup>
tag= <yes|no>
depend= <依存关系(以 / (斜杠) 分隔)>
obj= <AccountName|ObjectName>




(默认 = LocalSystem)




DisplayName= <显示名称>
password= <密码>




<!-- more -->





1.2 使用示例


`> sc create "Memcached Master" start=auto binPath="D:\memcached\memcached.exe -d install -m 32 -p 11211" DisplayName= "Memcached Master"
（图示：添加指定目录的memcache服务）`


二、删除服务
2.1 命令”sc delete”官方说明


描述:
从注册表删除服务项。
如果服务正在运行，或另一进程已经打开
到此服务的句柄，服务将简单地标记为
删除。
用法:
`sc <server> delete [service name]`


2.2 使用示例


> sc delete “Memcached Master”
（图示：添加指定目录的Memcached Master服务）


三、手工操作简述

步骤1. 打开注册表编辑器（`Win+R打开运行 → regedit → 回车`）
步骤2. 寻找服务键值目录（`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services`），一般服务会以相同的名字在这里显示一个主健，对应其键值进行CURD操作即便可。
