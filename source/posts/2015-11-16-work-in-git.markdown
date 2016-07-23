---
author: jeromechan
comments: true
date: 2015-11-16 09:51:05
slug: work-in-git
title: Git软件开发过程
wordpress_id: 302
permalink: /2015/11/16/work-in-git/
categories:
- Management
tags:
- Git
- git flow
- github flow
- git流程
- git软件开发过程
- mike flow
---

#### 一、关于Git与Subversion的区别


[![DraggedImage](/images/2015-11-16-work-in-git/DraggedImage1-1024x1013.png)](/images/2015-11-16-work-in-git/DraggedImage1.png)


#### 二、目前我们用Subversion是怎么执行软件过程的


[![DraggedImage-1](/images/2015-11-16-work-in-git/DraggedImage-1-1024x437.png)](/images/2015-11-16-work-in-git/DraggedImage-1.png)


#### 三、优势与缺点





	
  1. 架构

	
    * Git：分布式，所有的teammates本地可以clone一份独立完整的仓库，而不仅仅是某一个版本的镜像拷贝；开发者可以在本地clone仓库中完成所有vcs的操作，只有当需要协同工作提交代码到远程仓库的时候，才需要联上网络。

	
    * Subversion：中央集中式，所有的teammates都面向同样一个远程仓库工作；checkout出来的本地工作区代码只是远程仓库某一版本的一份镜像拷贝。




	
  2. 仓库结构与URL

	
    * Git：对于Git而言，仓库会独立于开发者的本地磁盘中，在仓库的根目录中只包含了一个”.git”文件夹，所有的branches、trunk(PS：git中名称为master)、tags均是通过命令操作而生成的，并非通过URL路径。
在Git中，URL类似于ssh://git@example.com/path/to/git-repo.git，仅仅是指向了仓库的一个标识。

	
    * Subversion：分支的url类似于svn+ssh://svn@example.com/svn/trunk，每一个分支独占一个唯一URL，每一个URL都会直接定位到每一个分支在远程仓库中的路径位置。
对于Subversion，会有一个trunk分支作为开发主线分支，会有很多branches分支作为并行分支，tags则是mark上某一特定的发布版本。




	
  3. 分支管理

	
    * Git：Git分支相对于其他的vcs是非常不一样的设计理念，一个Git分支仅仅指的是指向某一确定版本的简单指针，因此，Git的分支是无拷贝、无新建目录、几乎无开销的。

	
    * Subversion：正如我们所知道的，SVN中的分支仅仅是项目的一份拷贝，是一个具有特殊含义的普通文件夹；多分支则是多文件夹的形式。




	
  4. 提交操作

	
    * Git：若你使用的是Git，你的提交操作不受网络的影响，你的提交仅仅影响了本地仓库，仅当你需要于远端仓库同步内容之时，才需要使用到网络；
另外的，在你本地仓库还存在一个so-called Staging Area，并非你的所有文件需要在一次提交中全部commit，你可以选择指定的变更放入staging area中，从而在本次提交中仅仅包含你所选定的变更条目；
关于Git的版本号，大家都知道，Git是分布式的vcs，要想和svn、cvs一般生成revision#5，revision#6类似的递增数值作为唯一版本号是不可取的，但是我们也同样需要一个唯一的标识来辨别每一次提交，而Git的做法是使用了”commit hashes”。

	
    * Subversion：当你使用的是SVN，假设你要提交代码，以下是你的提交过程：

	
      * 首先设备必须是联网的，可以与远端中央仓库建立连接；

	
      * 将提交的内容立即传输到远端中央仓库；

	
      * 远端中央仓库生成递增的版本号，并赋予本地分支。







	
  5. 协同工作

	
    * Git：若你使用的是Git，你需要决定何时将你的本地仓库的内容同步上传到远端仓库分享出来，而Git不会为你作任何的自动上传的操作；
这样子的分享过程相对于其他的中央仓库式的vcs系统来说是更加安全的，所发生的冲突也只会发生于你的本地（仓库）而非远端服务器的仓库，这将更能帮助你规避打乱teammates工作内容冲突的风险。

	
    * Subversion：当你将本地分支内容作commit操作之时，你的内容便会分享到远端中央仓库中，其他teammates也都能同步到你所提交的内容。





<!-- more -->


#### 四、集成工具简介





	
  1. SourceTree：开源的Git源代码管理工具

	
  2. TortoiseGit：开源的Git源代码管理工具

	
  3. EGit：Eclipse插件，最新Mars版本已经自带

	
  4. Gitflow Nightly：Eclipse插件，支持Git-Flow




#### 五、常用Git基础知识




<blockquote>认识Git的几个关键目录</blockquote>


[![DraggedImage-2](/images/2015-11-16-work-in-git/DraggedImage-2.png)](/images/2015-11-16-work-in-git/DraggedImage-2.png)



	
  * Working directory：工作区

	
  * Index directory：暂存区

	
  * Local repository：本地仓库

	
  * Remote repository：远端仓库




<blockquote>常用的Git操作</blockquote>


[![134623_LGJb_1469576](/images/2015-11-16-work-in-git/134623_LGJb_1469576.png)](/images/2015-11-16-work-in-git/134623_LGJb_1469576.png)



	
  1. clone：克隆项目到本地工作区，类似svn checkout

	
  2. checkout：创建/切换本地仓库的指定分支到工作区中

	
  3. commit：将本地工作区代码提交到本地仓库

	
  4. push：将本地仓库代码同步到远端仓库

	
  5. pull / fetch：将远端仓库的代码同步到本地仓库/工作区

	
    * pull：fetch + merge，该操作会影响工作区

	
    * fetch：从远端仓库获取并更新到本地仓库中，不影响工作区




	
  6. merge / rebase：从指定分支(_PS:分支名称常跟在命令之后_)中获取更新并合并到当前分支

	
    * merge：

	
    * rebase：




	
  7. stash：备份/唤出当前的现场状态（包含工作区和暂存区）

	
    * git stash [save -a “msg”] 备份当前的现场状态

	
    * git stash list 显示已保存的现场状态列表

	
    * git stash pop/apply [--index][<stash>] 恢复工作状态，若不含带参数，则从状态栈中获取最新的。pop在获取完成后，从栈中移除该状态，apply则不会从栈中移除

	
    * git stash clear 清空状态栈中的所有内容

	
    * git drop 删除状态栈中的指定状态







#### 六、可供参考的高阶应用方案




<blockquote>什么是Git-SVN的扩展开发模式，即本地开发应用Git的强大分支特性，当最终push操作的时候，目标仓库设定为SVN远端仓库。
这里点到为止，只提及一下，以便有既想使用Git又纠结无法脱离Subversion的开发者去使用，这确实是一种很赞的“曲线救国”方案。

什么是Git Stash的开发模式，即一个工程师可以并行开发多项内容，要求用到切换分支的操作，而在没有提交到本地仓库之前，可以使用git stash命令将当前分支的工作区和暂存区的状态镜像下来。当回过头来需要继续开发的时候，使用git stash pop将指定的状态唤出后，可以继续未完成的内容。</blockquote>




#### 七、Git-Flow介绍




<blockquote>一图胜过千言万语</blockquote>


[![DraggedImage-3](/images/2015-11-16-work-in-git/DraggedImage-3.png)](/images/2015-11-16-work-in-git/DraggedImage-3.png)


<blockquote>关键几个分支的概念全解</blockquote>





	
  * 主分支

	
    * branch：保存当前开发成果的分支

	
    * master：保存当前可供生产部署的代码，在每次发布之时推荐为每次新增发布的代码都打上一个TAG，供后续代码维护使用




	
  * 辅助分支

	
    * Feature：开发完整功能、新特性，从develop分支发起的分支

	
    * Release：用于发布新的产品版本而设计的，支持从develop分支派生

	
    * Hotfix：属于计划外创建的可供生产部署的代码分支，普遍场景是软件遇到了异常情况或发生了严重必须要立即修复的缺陷之时。支持从master分支（或者其中的某一个TAG版本）中派生出来




	
  * 分支命名惯例

	
    * Feature分支：feature-*

	
    * Release分支：release-*

	
    * Hotfix分支：hotfix-*







#### 八、GitHub Flow


[![DraggedImage-4](/images/2015-11-16-work-in-git/DraggedImage-4.png)](/images/2015-11-16-work-in-git/DraggedImage-4.png)


#### 九、Mike Flow (Base on 《Git in Practice》)




<blockquote>Single Pattern</blockquote>


[![DraggedImage-5](/images/2015-11-16-work-in-git/DraggedImage-5.png)](/images/2015-11-16-work-in-git/DraggedImage-5.png)


<blockquote>Multiple Pattern</blockquote>


[![DraggedImage-6](/images/2015-11-16-work-in-git/DraggedImage-6.png)](/images/2015-11-16-work-in-git/DraggedImage-6.png)


#### 十、Jerome Flow (I call it this name^_^)


[![jerome-git-flow](/images/2015-11-16-work-in-git/jerome-git-flow1.jpg)](/images/2015-11-16-work-in-git/jerome-git-flow1.jpg)


#### _参考资料_





	
  * [A successful Git branching model - Vincent Driessen](http://nvie.com/posts/a-successful-git-branching-model/)

	
  * [基于git的源代码管理模型-Git-Flow](http://www.ituring.com.cn/article/56870)

	
  * [5 Fundamental differences between GIT & SVN](http://boxysystems.com/index.php/5-fundamental-differences-between-git-svn/)

	
  * [What's the difference between 'git merge' and 'git rebase'?](http://stackoverflow.com/questions/16666089/whats-the-difference-between-git-merge-and-git-rebase)

	
  * [Git的merge和rebase ](http://blog.jobbole.com/84664/)

	
  * [Git中分支merge和rebase的适用场景及区别](http://blog.csdn.net/rryqsh/article/details/8230560)

	
  * [InfoQ - Git历险记](http://www.infoq.com/cn/git-adventures)

	
  * [10 Tips to Push Your Git Skills to the Next Level](http://www.oschina.net/translate/10-tips-git-next-level?cmp)

	
  * [《Git in Practice》-Manning Press - Mike McQuaid](http://book.douban.com/subject/26107548/)

	
  * [Interview with Mike McQuaid about Git in Practice](http://www.infoq.com/articles/interview-Mike-McQuaid-git-practice)

	
  * [GIT Conventions](http://www.oschina.net/translate/git-conventions?cmp)

	
  * [git使用简介](http://www.oschina.net/question/565065_68194)

	
  * [Git-Branching-Basic-Branching-and-Merging](http://www.git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

	
  * [Git-Branching-Rebasing](http://www.git-scm.com/book/en/v2/Git-Branching-Rebasing)

	
  * [Switching from Subversion to Git](http://www.git-tower.com/learn/git/ebook/mac/appendix/from-subversion-to-git)



