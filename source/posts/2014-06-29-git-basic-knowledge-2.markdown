---
author: jeromechan
comments: true
date: 2014-06-29 12:47:41
slug: git-basic-knowledge-2
title: GIT基础知识讲解（二）
wordpress_id: 40
permalink: /2014/06/29/git-basic-knowledge-2/
categories:
- Programming
tags:
- Git
---

七、Git分支级别的基本操作

1. 查看/编辑 本地（远程）分支信息


$ git branch -[option] 

另，该命令后紧接英文短语，执行的是创建分支的操作（仅创建而不切换） 

2. 分支的合并（详见PPT-10）

    
    $ git checkout master



    
    $ git merge iss53


分支的合并如下图流程示例 

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb.png)](/images/2014-06-29-git-basic-knowledge-2/image.png)

<!-- more -->3. 分支的衍合（详见PPT-11）

    
    $ git checkout experiment



    
    $ git rebase master


分支的衍合如下图流程示例

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb1.png)](/images/2014-06-29-git-basic-knowledge-2/image1.png)

八、想做就做，听你的

下面是一个有趣的例子，你也来实战一下吧

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb2.png)](/images/2014-06-29-git-basic-knowledge-2/image2.png)

注意点：Merge和Rebase的区别：

merge是执行2个待合并版本以及公共基线版本的3方合并；

rebase是将待合并版本之一的变动作为补丁应用到另一个待合并分支上。

九、分支衍合行为规范

Do not rebase commits that you have pushed to a public repository.

（一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行衍合操作。）

如果你遵循这条金科玉律，就不会出差错。否则，人民群众会仇恨你，你的朋友和家人也会嘲笑你，唾弃你。

再谈merge 和 rebase 的区别：

1），从文件结果看，merge 和 rebase 可以达到同样效果。
2），从历史纪录看，他们存在差异：merge 显示合并后的多父结点，呈现环形，而 rebase 呈现线性结果，即它对分支历史进行合并操作。rebase 提供更好的历史呈现方式（似分支从未曾发生过），但有风险。掌握一条原则：Do not rebase commits that you have pushed to a public repository. 即，不要对你提交过的分支进行 rebase。因为本地的改变会造成远端的困惑。

十、分支衍合的协作风险

如下图示例

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb3.png)](/images/2014-06-29-git-basic-knowledge-2/image3.png)

After you do that, your commit history will contain both the C4 and C4' commits, which have

different SHA-1 hashes but introduce the same work and have the same commit message.

十一、漫步在项目协作中的Mr.Git

如何给项目贡献代码？

如果你是没有Git的可怜人，通过邮件提交补丁可以是普通patch或format-patch，后者为佳。

经过apply或am将代码合并到目标分支上进行验证，确认稳定后，再将其并入master分发主干上。

拥有Git的人，这一块的操作就甭提有多方便了。

如果你拥有Mr.Git，那么通往罗马的大道有如下几条（寡人称之为Git合并模式）：

（1）直接合并进入本地的master主干分支进行验证；

（2）为特性分支提供一个用于合并用途的develop-branch；

（3）复杂项目的并行贡献

（4）大项目的特性并入长期分支

（5）衍合流程引入代码

（6）挑拣（cherry-pick）流程引入补丁代码

PS: Git项目的合并方式采用的是模式（4）

十二、常见Git的合并模式示例

（1）直接合并进入本地的master主干分支进行验证；

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb4.png)](/images/2014-06-29-git-basic-knowledge-2/image4.png)

（2）为特性分支提供一个用于合并用途的develop-branch；

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb5.png)](/images/2014-06-29-git-basic-knowledge-2/image5.png)

（3）复杂项目的并行贡献

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb6.png)](/images/2014-06-29-git-basic-knowledge-2/image6.png)

（4）大项目的特性并入长期分支

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb7.png)](/images/2014-06-29-git-basic-knowledge-2/image7.png)

（5）衍合流程引入代码

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb8.png)](/images/2014-06-29-git-basic-knowledge-2/image8.png)

（6）挑拣（cherry-pick）流程引入补丁代码

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb9.png)](/images/2014-06-29-git-basic-knowledge-2/image9.png)

This pulls the same change introduced in e43a6, but you get a new commit SHA-1 value, because the date applied is different. Now your history looks like Figure 5-27.

十三、推荐：Github.com，一个神奇的网站

当前世界首屈一指，最大没有之一的Git项目代码托管网站

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb10.png)](/images/2014-06-29-git-basic-knowledge-2/image10.png)

十四、参考链接

1. Git官方文档
[http://](http://www.git-scm.com/documentation)[www.git-scm.com/documentation](http://www.git-scm.com/documentation)[/](http://www.git-scm.com/documentation)

2. TortoiseGit
[https://](https://code.google.com/p/tortoisegit/)[code.google.com/p/tortoisegit](https://code.google.com/p/tortoisegit/)[/](http://www.git-scm.com/documentation)

3. Git下载
[http://](http://www.git-scm.com/downloads)[www.git-scm.com/downloads](http://www.git-scm.com/downloads)

4. msysGit, another GUI Client
[http://](http://msysgit.github.io/)[msysgit.github.io](http://msysgit.github.io/)

十五、结束语

[![image](/images/2014-06-29-git-basic-knowledge-2/image_thumb11.png)](/images/2014-06-29-git-basic-knowledge-2/image11.png)
