---
author: jeromechan
comments: true
date: 2014-08-16 04:05:39
slug: talking-about-linux-user-management
title: 谈谈Linux用户管理
wordpress_id: 76
permalink: /2014/08/16/talking-about-linux-user-management/
categories:
- Programming
tags:
- Linux
- Linux用户
---

	谈起Linux，没有接触过的童鞋们可能会望而却步，其实不然。今天恰好遇到好些童鞋询问相关于Linux的一些终端命令操作的问题，自己正好有一想法，接下来会陆续写一些关于Linux的日常应用的博客文章。使用Linux系统，首先你一定要是Linux的用户。今天咱们就先来谈谈Linux关于用户的一些事情。

	Linux的用户管理有两个很重要的概念，一个是用户，一个是组。用户与组是一对多的关系。当你创建用户之时，会自然产生一个与你用户名相同的一个组，是新增用户所建立的默认组关系。
	在用户的权限管理上，一个用户可以独立具备多项权限，一个组也可以具备多项权限，当一个用户属于一个组之时，它便自然地拥有了整个组的权限，因为它成为了这个组的成员。
	下面来逐一解释用户和组的常用操作：

组（group）：
1. 查看系统的组信息
Linux中的信息都以文件形式存储，权限配置文件当然也不例外。

    
    
    >> more /etc/group
    




2. 查看当前用户所属的组

    
    
    >> groups
    




3. 新增组

    
    
    >> groupadd [GROUP_NAME]
    




4. 删除组

    
    
    >> groupdel [GROUP_NAME]
    




5. 修改组信息
看到这里，可能大家会自然地联想到，groupmod这样子的一个命令，当然，linux是强大的，这个命令不出意料地存在着，但groupmod并不能修改所有的group信息，只能修改GID、重命名、修改组密码和unique属性

    
    
    >> groupmod -g [NEW_GID] #修改GID
    >> groupmod -n [NEW_GROUP_NAME] #重命名
    >> groupmod -o #unique属性，-o全称为--non-unique
    >> groupmod -p [NEW_PASSWORD] #修改组密码
    




如果需要修改组所包含的用户列表，可以打开文件/etc/group文件，找到相应的组名进行编辑，/etc/group文件内容格式说明如下，可供参考和阅读：
[GROUP_NAME] : [GROUP_PASSWORD] : [GID] : [GROUP_USER_LIST]
示例：root:x:511:user1,user2,user3
Tips：密码段的“x”（或者“*”）是特殊的字符，表示没有设置密码（或者是设定了但是被shadow技术隐藏了，口令被加密后实际存放到了/etc/shadow，只有超级用户才能读取该文件），同时，修改/etc/group或者/etc/passwd文件，都需要root权限，请确保su - 切换到root下，再作该类操作。

6. 其他
现在的linux/mac的UI功能界面都发展地非常完善，可以找找自己的发行版OS是否有用户管理的界面操作功能（普遍都会存在的），界面操作和windows操作习惯是相似地，那样子可以更容易让人理解和入门，也不失为一种便捷的linux用户管理的方式。

用户（user）：
1. 新增用户

    
    
    >> useradd [USER_NAME] #新增用户，默认在/home下生成与用户名同名的用户主目录
    >> useradd -d /home/[USER_HOME_DIR_NAME] [USER_NAME] #新增用户，同时指定自定义的用户主目录
    >> useradd -g [EXIST_GROUP_NAME] [USER_NAME] #新增用户，同时关联一个已存在的组
    >> useradd -G [EXIST_GROUP_NAME] [USER_NAME] #新增用户，同时增量关联一个已存在的组
    >> useradd -s /bin/false [USER_NAME] #新增用户，同时禁用其默认登录的shell权限
    




2. 修改用户信息
方式一：终端命令

    
    
    >> usermod -d /home/[USER_HOME_DIR_NAME] [USER_NAME] #指定自定义的用户主目录
    >> usermod -g [EXIST_GROUP_NAME] [USER_NAME] #强制关联一个已存在的组为默认组
    >> usermod -G [EXIST_GROUP_NAME] [USER_NAME] #增量关联一个已存在的组
    >> usermod -s /bin/false [USER_NAME] #禁用用户默认登录的shell权限
    




方式二：编辑/etc/passwd配置
先说说/etc/passwd文件内容格式说明：
[USER_NAME] : [USER_PASSWORD] : [UID] : [GID] : [USER_FULL_NAME] : [USER_HOME_DIR] : [USER_LOGIN_SHELL]
示例：root:x:0:0:root:/root:/bin/bash

3. 修改密码

    
    
    >> passwd [USER_NAME] 
    



若只是修改当前登录用户的密码，直接
    
    
    >> passwd 
    



即可。

4. 增加sudoer权限

    
    
    >> su -
    >> visudo
    



此时切换到了sudo配置文件的编辑页面，在文件底，增加一行配置：
[USER_NAME]   ALL=(ALL)   ALL #切换sudo需要输入当前登录的具备root权限用户的密码
或者
[USER_NAME]   ALL=(ALL)   NOPASSWD:ALL #切换sudo不需要重新输入密码
，编辑完后 :wq 即可。
备注：以上格式做一些说明吧，避免有的童鞋不知所以然哈
[USER_NAME]    [MACHINE_NAME]=([SWITCH_IDENTITY/USER_NAME])   [COMMAND]
示例：%wheel    ALL=(ALL)   NOPASSWD: ALL #允许wheel用户组中的用户在不输入该用户的密码的情况下使用所有命令 
