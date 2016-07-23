---
author: jeromechan
comments: true
date: 2014-06-29 00:53:52
slug: uml-modeling-2
title: UML基础建模知识小结（二）
wordpress_id: 10
permalink: /2014/06/29/uml-modeling-2/
categories:
- Programming
tags:
- 面向对象设计
---

2. UML结构建模图
结构图定义了一个模型的静态架构，例如类，对象，接口和物理组件。另，结构图也被用作对元素间关联和依赖关系进行建模。
2.1 包
包常用来在较高的层次描述着类或用例之间的交互关系，同时将模型根据不同的思维逻辑，划分成为了不同的容器。
[![image](/images/2014-06-29-uml-modeling-2/image_thumb.png)](/images/2014-06-29-uml-modeling-2/image.png)
上图包含了关于包的合并，包的导入，嵌套连接符。关于每个包内的元素要求，尽量要做到，同一个包中，赋予这些类或引入包相同的继承层次，通常认为把通过符合相关联的类、以及与它们相协作的类放在同一个包内。
<!-- more -->2.2 类与类图
“类”是对一组具有相同属性、操作、关系和语意的对象的描述，在图形上常常把它画为一个矩形。如下图：
[![image](/images/2014-06-29-uml-modeling-2/image_thumb1.png)](/images/2014-06-29-uml-modeling-2/image1.png)
以上的图属于类图类别中的“设计类”，而还有一个不为人知的“分析类”并未包含阐述，如下：
[![image](/images/2014-06-29-uml-modeling-2/image_thumb2.png)](/images/2014-06-29-uml-modeling-2/image2.png)
分析类主要应用于Conceptual Modeling阶段，旨在RUP用例驱动的过程中进一步将需求以更为贴近开发的角度去描述。
“分析类”是从业务需求向系统设计转化的过程中最为主要的元素，它们在高层次抽象出系统实现业务需求的原型，业务需求通过分析类被逻辑化，成为可以被计算机可以理解的语意。
分析类的抽象层次具有三高的特点：
（1）高于设计实现：专注解决需求问题，避免实现问题的干扰
（2）高于语言实现：不依赖于任一语言的限制
（3）高于实现方式：不需提前考虑实现的方式
2.3 关系
（1）关联(Association)
[![image](/images/2014-06-29-uml-modeling-2/image_thumb3.png)](/images/2014-06-29-uml-modeling-2/image3.png)
可以使用“知道”二字描述两者间的关系。
在很多的画图中并不需要特意地强调关联关系的方向性，而Rose中提供了额外的带方向的关联关系画图方法。
（2）依赖(Dependency)
[![image](/images/2014-06-29-uml-modeling-2/image_thumb4.png)](/images/2014-06-29-uml-modeling-2/image4.png)
可以使用“知道并使用”描述两者间的关系。
依赖关系统统都是带箭头的，在OOD中，双向依赖是一种非常不好的结构，我们在设计的时候总应该保持单向依赖，杜绝双向依赖关系的发生。
（3）包含(Include)与扩展(Extends)
[![image](/images/2014-06-29-uml-modeling-2/image_thumb5.png)](/images/2014-06-29-uml-modeling-2/image5.png)
包含关系用来把一个较复杂的用例所表示的功能分解成较小的步骤。（箭头指向分解出来的功能子用例）
扩展关系是指用例功能的延伸，相当于为基础用例提供一个附加功能。（箭头指向基础用例）
（4）泛化(Generalization)
泛化关系是程序中继承关系的UML表示法。
[![image](/images/2014-06-29-uml-modeling-2/image_thumb6.png)](/images/2014-06-29-uml-modeling-2/image6.png)
参见程序设计中的继承关系的详细阐述。
（5）实现(Realize)
实现关系特别用于在用例模型中连接用例和用例实现，说明基本用例的一个实现方式。开发中常见的如类与接口的关系，表示类是接口所有特征和行为的实现。
[![image](/images/2014-06-29-uml-modeling-2/image_thumb7.png)](/images/2014-06-29-uml-modeling-2/image7.png)
（6）聚合(Aggregation)与组合(Composition)
聚合关系用于类图，特别用于表示实体对象之间的关系，表达整体由部分构成的语义。
组合关系用于类图，用于表示实体对象的关系，表达整体拥有部分的语意。
组合关系是一种强依赖的特殊聚合关系，如果整体不存在了，则部分也等同于消亡。而与组合关系不同的是，聚合关系的整体和部分不是强依赖的，即使整体不复存在了，部分仍然存在。
[![image](/images/2014-06-29-uml-modeling-2/image_thumb8.png)](/images/2014-06-29-uml-modeling-2/image8.png)
（7）精化(Refine)
精化关系用于用例模型，一个基本用力可以分解出许多更小的关键精化用例。这些更小的精化用例更细致地展示了基本用例的核心业务。
与泛化关系不同的是，精化关系表示由基本对象可以分解为更明确的、更为精细的子对象，这些子对象并没有增加、减少、改变基本对象的行为和属性，仅仅是更加细致和明确化了。在泛化关系中，基本对象被泛化成为子对象之后，子对象继承了基本对象的所有特征，并且子对象可以增加、改变基本对象的行为和属性。另一方面，精化关系仅用于建模阶段，在实现语言中是没有精化这一概念的。
[![image](/images/2014-06-29-uml-modeling-2/image_thumb9.png)](/images/2014-06-29-uml-modeling-2/image9.png)
（总结）关系的强弱顺序
泛化==实现>组合>聚合>关联>依赖
