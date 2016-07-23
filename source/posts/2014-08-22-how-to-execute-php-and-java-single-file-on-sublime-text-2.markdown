---
author: jeromechan
comments: true
date: 2014-08-22 04:02:46
slug: how-to-execute-php-and-java-single-file-on-sublime-text-2
title: 关于Sublime Text 2 支持执行PHP、JAVA单文件的配置说明
wordpress_id: 94
permalink: /2014/08/22/how-to-execute-php-and-java-single-file-on-sublime-text-2/
categories:
- Programming
tags:
- Build System
- sublime text
---

Sublime Text目前非常流行，其功能强大到许多的web开发者爱不释手无法自拔，哈哈。最近自己也由原来的BBEdit转战为Sublime Text，由于自己常常会使用到单文件调试代码片段的执行情况，所以让Sublime Text支持单文件调试php、java文件的需求迫在眉睫。





<blockquote>Tips：本人使用的是Sublime Text 2，version 3没有尝试过，不过在版本更新说明中对于Build System的变更不大，也是可以支持的。</blockquote>





Sublime Text 的构建系统（Build System）可以让我们通过外部程序来运行文件，并可以在Sublime Text 的Console中查看输出，其功能配置在“Tools > Build System”。
构建系统包括三部分：
（1）使用JSON格式保存配置文件（.sublime-build）
（2）使用Sublime Text命令驱动构建过程
（3）可选的，还可以包括一个外部的可执行文件（脚本或二进制文件）
文件格式：

    
    
    {
        "cmd": ["python", "-u", "$file"],
        "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
        "selector": "source.python"
    }
    




cmd：
包括命令及其参数数组，若非指定绝对路径，优先从系统PATH变量中获得；

file_regrex：
可选选项，Perl格式的Regular Expression可以获取cmd的错误输出；

selector：
可选选项，在选定Tools > Build System > Automatic时生效，由系统根据当前文件情况尝试自动选择构建系统；

target：
可选选项。运行的Sublime Text命令，缺省为exec（Packages/Default/exec.py）。该命令从*.build-system中获取配置的选项数据；

variants：
可选选项。该项配置下的内容是主构建系统配置项目的备选内容。如果构建系统中的selector与激活的文件相匹配，variants中的变量“name”则会出现在Command Palette（Tools > Build System）下；

name：
仅适用于variant中。用来识别系统中的不同构建系统。如果“name”为“Run”，则会显示在Command Palette下，并且通过快捷键“Command + shift + B”调用；

以下是含带variants的构建系统示例：

    
    
    {
        "selector": "source.python",
        "cmd": ["date"],
    
        "variants": [
            { "cmd": ["ls -l *.py"],
              "name": "List Python Files",
              "shell": true
            },
            { "cmd": ["wc", "$file"],
              "name": "Word Count (current file)"
            },
            { "cmd": ["python", "-u", "$file"],
              "name": "Run"
            }
        ]
    }
    



根据以上的设定，按 Ctrl + B 会运行*date*命令, 按 Crtl + Shift + B 会运行Python 解释器，并且在构建系统激活时将剩余的备选项显示在Command Palette中

常见的Sublime Text构建系统内置变量有：




<blockquote>$file_path		当前文件所在路径, 比如 C:\Files.
$file	当前文件的完整路径, 比如 C:\Files\Chapter1.txt.
$file_name	当前文件的文件名, 比如 Chapter1.txt.
$file_extension		当前文件的扩展名, 比如 txt.
$file_base_name	当前文件仅包含文件名的部分, 比如 Document.
$packages	Packages 文件夹的完整路径.
$project	当前项目文件的完整路径.
$project_path		当前项目文件的路径.
$project_name	当前项目文件的名称.
$project_extension	当前项目文件的扩展部分.
$project_base_name	当前项目仅包括名的部分.</blockquote>





下面是本人的Build System的配置细节，提供给各位童鞋参考：
1、php
快捷键：
Command + B

配置详情：

    
    
    {
        "cmd": ["php", "$file"],
        "file_regex": "php$",
        "selector": "source.php"
    }
    




2、Java
快捷键：
Command + B（编译） => Command + shift + B（执行）

配置详情：

    
    
    {
        "cmd": ["javac", "-encoding", "UTF-8", "$file"],
        "file_regex": "^(...*?):([0-9]*):?([0-9]*)",
        "selector": "source.java",
        "encoding": "UTF-8",
        "variants": [{
            "name": "Run",
            "cmd": ["java", "$file_base_name"],
            "encoding": "UTF-8"
        }]
    }
    




参考资料链接：
非官方Build System说明：[http://sublime-text-unofficial-documentation.readthedocs.org/en/sublime-text-2/reference/build_systems.html](http://sublime-text-unofficial-documentation.readthedocs.org/en/sublime-text-2/reference/build_systems.html)

