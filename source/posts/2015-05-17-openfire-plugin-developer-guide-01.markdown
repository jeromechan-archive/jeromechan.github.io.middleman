---
author: jeromechan
comments: true
date: 2015-05-17 15:26:42
slug: openfire-plugin-developer-guide-01
title: Openfire Plugin开发指南（一）
wordpress_id: 244
permalink: /2015/05/17/openfire-plugin-developer-guide-01/
categories:
- Java
- Translation
tags:
- openfire
- openfire plugin
---

**一、简介**

Openfire plugin使得Openfire自身的功能得到了很好的扩展和增强。这篇文档旨在引导开发者如何进行Openfire plugin的开发。

**二、plugin的结构**

plugin的源码放置在Openfire源码根目录的plugins目录下。当plugin以jar包或者war包的形式部署了之后，它将会自动解压成原始的文件夹层级结构，类似的plugin目录结构如下：

Plugin Structure
myplugin/
|- plugin.xml <- Plugin定义文件
|- readme.html <- 可选，插件说明文件，直接呈现给最终的用户阅读
|- changelog.html <- 可选，插件变更日志文件，直接呈现给最终的用户阅读
|- logo_small.gif <- 可选，插件的小号Logo图片(16x16)，只支持.gif和.png格式
|- logo_large.gif <- 可选，插件的大号Logo图片(32x32)，只支持.gif和.png格式
|- classes/ <- 插件所需要的资源文件 (类似地，例如插件的属性配置文件)
|- database/ <- 可选，插件的数据库模型文件，可内置包含数据库版本升级的模型文件
|- i18n/ <- 可选，插件的i18n多语言支持文件
|- lib/ <- 插件所依赖的库（即JAR包）
|- web <- 可选，插件的控制台页面相关文件
|- WEB-INF/
|- web.xml <- 生成的web.xml，包含了等待编译的jsp配置
|- web-custom.xml <- 可选，用户自定义的web.xml，包含用户的servlets配置
|- images/ <- 可选，插件的控制台页面所需要的图片资源文件，只支持.gif与.png格式

plugin中的web目录提供的是插件在管理员控制台中的管理功能，下面会撰写更为详细的相关内容。 其中，plugin.xml定义了plugin主要的类，下面是一个例子：<!-- more -->

<!-- Sample plugin.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<plugin>
<!-- Main plugin class -->
<class>org.example.ExamplePlugin</class>

<!-- Plugin meta-data -->
<name>Example Plugin</name>
<description>This is an example plugin.</description>
<author>Jive Software</author>

<version>1.0</version>
<date>07/01/2006</date>
<url>http://www.igniterealtime. org/projects/openfire/plugins.jsp</url>
<minServerVersion>3.0.0</minServerVersion>
<licenseType>gpl</licenseType>

<!-- Admin console entries -->
<adminconsole>
<!-- More on this below -->
</adminconsole>
</plugin>

以下的这一些元数据字段可以在plugin.xml被设置：



	
  * name：plugin的名称

	
  * description：plugin的描述

	
  * author：plugin的作者

	
  * version：plugin的版本号

	
  * date：发布plugin的日期，格式必须是MM/dd/yyyy，类似地“07/01/2006”

	
  * url：关于plugin更详尽信息的超链接

	
  * minServerVersion：plugin所支持的Openfire最低版本号，假如版本号高于当前运行的Openfire版本，plugin将不会被启动

	
  * databaseKey：假如plugin需要自己的数据库表，那么databaseKey节点必须要设置一个schema name（通常地，schema name设置成与plugin名称相同）。对于每一类Openfire所支持的数据库，数据库的schema文件都必须放置在plugin下的database目录下。例如：plugin名称为“foo”，那么该plugin的schema文件命名应该类似与“foo_mysql.sql”，“foo_oracle.sql”等。我们推荐把数据库表的命名都增加Openfire的前缀“of”，避免与同一数据库中的其他应用的数据库表结构的命名相冲突。在schema脚本文件中，应该在ofVersion表中增加一条记录，使得Openfire可以跟踪plugin的版本信息，类似地：INSERT INTO ofVersion (name, version) VALUES ('foo', 0);

	
  * databaseVersion：数据库schema版本号（PS：当一个数据库被定义之时就具有的）。新的plugin在定义其数据库之时，数据库版本号将从0开始计数。假使在后面版本的plugin需要升级其数据库结构，那么升级的schema脚本文件需要放置到目录database/upgrade的每一个升级版本的文件夹下，目录结构类似地：database/upgrade/1和database/upgrade/2可以包含文件“foo_mysql.sql”与“foo_oracle.sql”，文件内包含了每一个版本的数据库结构的相关变更项目。在每一项数据库发生升级之时，都需要把ofVersion中的plugin版本记录更新，类似地：UPDATE ofVersion set version=1 where name='foo';

	
  * parentPlugin：plugin的父插件的名称（）。当plugin拥有一个父插件（parent plugin），那么当前plugin将使用它父插件的类加载器，而不是自己新增一个类加载器。这一机制使得插件之间工作起来变得更加紧密。一个作为子节点的插件，如果没有其父插件的存在，它将无法独立工作。

	
  * licenseType：定义着当前插件的官方所遵循的协议。有效的数值类似地：（1）“commercial”：插件的发布与传衍遵循着商业的协议

（2）“gpl”：the GNU Public License（GPL）

（3）“apache”：the Apache License

（4）“internal”：限制在内部使用，并且不准备二次发布传衍

（5）“other”：plugin所遵循的协议不在所列的协议范围之内，那么便可以使用other项，在其中需要撰写清楚相关协议的细节假设plugin没有指定任何协议，那么插件默认指定为other项。

在plugin中还有一些额外的文件，给用户提供了更多的信息（这些文件都放置在了plugin的根目录下）：

	
  * readme.html：可选，插件的说明文件，呈现给最终用户阅读

	
  * changelog.html：可选，插件的变更文件，呈现给最终用户阅读

	
  * logo_small.png：可选，插件的logo小图片，仅限于.png和.gif格式

	
  * logo_large.png：可选，插件的logo大图片，仅限于.png和.gif格式

	
  * plugin的类文件必须实现Openfire API中所定义的Plugin接口，自然地，类文件有默认的一个无参数的构造器。plugin的类文件实现了Plugin接口中的initializing和destroying接口。


// plugin的实现例子
package org.example;
import org.jivesoftware.openfire.container.Plugin;
import org.jivesoftware.openfire.container.PluginManager;
import java.io.File;
/**
* A sample plugin for Openfire.
*/
public class ExamplePlugin implements Plugin {
public void initializePlugin(PluginManager manager, File pluginDirectory) {
// Your code goes here
}

public void destroyPlugin() {
// Your code goes here
}
}

**常用的plugin最佳实践**

在选择一个插件的包名之时，我们推荐可以选择一些具备唯一性的标识，类似地，可以选用你的自定义字符串或者是组织名称来尽可能地避免包或者类命名的冲突。例如，假设每个人使用的包名都是org.example.PluginName，就算是PluginName是不相同的，但是你依然会遇到这里或那里的类名冲突，这不是玩笑，在集群部署环境之下，该问题尤其突出。






