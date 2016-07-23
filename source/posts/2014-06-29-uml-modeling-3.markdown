---
author: jeromechan
comments: true
date: 2014-06-29 00:54:46
slug: uml-modeling-3
title: UML基础建模知识小结（三）
wordpress_id: 12
permalink: /2014/06/29/uml-modeling-3/
categories:
- Programming
tags:
- 面向对象设计
---

3. UML行为建模图
3.1 用例图(Use Case Diagram)
（1）参与者(Actor)
在寻找用例图中的参与者时候，先要确定系统的边界，然后确定系统的涉众，从中确认出驱动用例的动作来源，从而确定参与者。参与者是位于边界之外的。参与者并非只能是人，也可以非人，因为有些需求是没有人参与的。如果没有人参与，这是就需要去找到指令或者计算机动作的来源。
（2）用例(Use Case)
判断用例是否准确的依据有：
1. 用例是相对独立的：这意味着它不需要与其他用例交互而独自完成参与者的目的，即用例从功能上说是完备的。
2. 用例的执行结果对参与者来说是可观测的和有意义的。
[![image](/images/2014-06-29-uml-modeling-3/image_thumb10.png)](/images/2014-06-29-uml-modeling-3/image10.png) <!-- more -->
[![image](/images/2014-06-29-uml-modeling-3/image_thumb11.png)](/images/2014-06-29-uml-modeling-3/image11.png)
3. 用例必须由一个参与者发起，不存在没有参与者的用例，用例不应该自动启动，也不应该主动启动另一个用例。
[![image](/images/2014-06-29-uml-modeling-3/image_thumb12.png)](/images/2014-06-29-uml-modeling-3/image12.png)
4. 用例必然是以动宾短语形式出现的。
[![image](/images/2014-06-29-uml-modeling-3/image_thumb13.png)](/images/2014-06-29-uml-modeling-3/image13.png)
5. 参与者是用例驱动的来源，然而，用例的粒度大小则由需求的要求而定，最适合需求的用例和用例描述才是最适合的。
但是，容易步入一些分析中的误区。
（1）目标和步骤的误区
[![image](/images/2014-06-29-uml-modeling-3/image_thumb14.png)](/images/2014-06-29-uml-modeling-3/image14.png)
应该以完整目标为用例，而不应该以步骤作为用例。
（2）边界的超越
参与者对于用例的操作都应该位于合法系统边界之内，不可以越界驱动用例。
[![image](/images/2014-06-29-uml-modeling-3/image_thumb15.png)](/images/2014-06-29-uml-modeling-3/image15.png)
右图中的“应征立减活动”用例并非属于“促销产品部管理员”职权范围之内，此处为越界的用例，是不正确的。
3.2 活动图
（1）用例活动图
用例活动图是最经常使用的。用例表达了参与者的一个目标，用例场景则描述了如何来达到这个目标。活动图用来描述用例场景，也就是通常所说的业务流程。
（2）对象活动图
详见图示与解说。
（3）泳道
详见图示与解说。
下图是根据业务场景所进行的建模。
[![image](/images/2014-06-29-uml-modeling-3/image_thumb16.png)](/images/2014-06-29-uml-modeling-3/image16.png)
3.3 时序图
[![image](/images/2014-06-29-uml-modeling-3/image_thumb17.png)](/images/2014-06-29-uml-modeling-3/image17.png)
3.4 状态图
状态图显示一个状态机，状态机主要用于描述对象的状态变化以确定何种行为改变了对象状态，以及对象状态变化对系统的影响。通常，状态机用于描述实体类对象的整个生命周期内的状态变迁以获得对这个实体对象的理解，同时获得系统和实体对象互相影响的关系。
需要注意的是，状态图通常只用于描述单个对象的行为，如果要描述对象间的交互，最好采用时序图或者协作图。
状态图包含的元素有：
1. 初始状态
2. 状态：包含entry/入口行为，do/执行的行为，event/事件-事件行为，exit/退出行为。
3. 复合状态
4. 转移
5. 事件
6. 条件：常常是一个布尔表达式
7. 最终状态
如下例子详述：
[![image](/images/2014-06-29-uml-modeling-3/image_thumb18.png)](/images/2014-06-29-uml-modeling-3/image18.png)
当然，UML的知识不止于以上所述，正所谓“路漫漫其修远兮，吾将上下而求索，不断努力地去求索…”
Thank you very much!
