---
author: jeromechan
comments: true
date: 2014-06-29 00:57:55
slug: git-basic-knowledge-1
title: Git基础知识讲解（一）
wordpress_id: 22
permalink: /2014/06/29/git-basic-knowledge-1/
categories:
- Programming
tags:
- Git
---

_备注：本文内容来源于作者分享的PPT之“Finding Mr.Git”_

一、 一览众山，随便看看



	
  1. 版本控制的那些事儿，简单谈谈历史痕迹 

	
  2. Git是什么神器 

	
  3. 文件级别的基本操作 

	
  4. 分支级别基本操作 

	
  5. 项目管理中Git的使用 

	
  6. 托管商Github.com平台介绍 

	
  7. 其他你们想问而我知道的 

	
  8. 参考资料链接



二、 侬晓得使用Git经常说的一句话是什么吗？
[![image](/images/2014-06-29-git-basic-knowledge-1/image_thumb46.png)](/images/2014-06-29-git-basic-knowledge-1/image46.png)


三、 那些年，版本控制的那些事儿

其实，可以简单归结成以下几幅图
[![image](/images/2014-06-29-git-basic-knowledge-1/image_thumb47.png)](/images/2014-06-29-git-basic-knowledge-1/image47.png)


<!-- more -->四、 Git是领军人物
实现外观上，Git是这样子做到与众不同的
[![image](/images/2014-06-29-git-basic-knowledge-1/image_thumb48.png)](/images/2014-06-29-git-basic-knowledge-1/image48.png)


五、什么是Git 



	
  1. 宏观上看，跟其他的VCS系统用途区别不大，都是代码仓库管理员，>=BAND4的 

	
  2. 微观上看，具备如下特点：
1. 近乎所有操作都是本地执行
2. 时刻保持数据完整性
3. 多数操作仅添加数据 

	
  3. Git仓库文件的三种状态：已提交，已修改，已暂存 

	
  4. Git的三个工作区域，如下图：
[![image](/images/2014-06-29-git-basic-knowledge-1/image_thumb49.png)](/images/2014-06-29-git-basic-knowledge-1/image49.png)


六、 Git文件级别的基本操作



	
  1. 初始化仓库


    
    $ git init




	
  2. 添加文件


    
    $ git add *.php




	
  3. 克隆分支


    
    $ git clone git://github.com/schacon/grit.git




	
  4. 检查当前检出分支的文件状态


    
    $ git status




	
  5. 忽略指定文件


    
    $ cat .gitignore *.[oa] *~




	
  6. 查看提交历史


    
    $ git log –[option] XXX




	
  7. 比较已暂存和上次提交快照间的区别


    
     $ git diff –cached




	
  8. 提交更新


    
    $ git commit -m “XXX“


例外，暂存步骤可以跳过，如下

    
    $ git commit -a -m "XXX“




	
  9. 移除文件


    
    $ rm grit.gemspec
    $ git rm grit.gemspec




	
  10. 移动文件


    
    $ git mv file_from file_to


等同于

    
    $ mv README.txt README
    $ git rm README.txt
    $ git add README




	
  11. 撤销上一次提交并重新提交


    
    $git commit –amend –m ‘XXX’




	
  12. 取消已经暂存的文件


    
    $git reset HEAD benchmarks.rb




	
  13. 取消对文件的修改


    
    $git checkout -- benchmarks.rb




	
  14. 推送数据到Remotes


    
    $git push origin master




	
  15. 从Remotes抓取数据


    
    $git fetch [remote-name]
    $git pull origin master





