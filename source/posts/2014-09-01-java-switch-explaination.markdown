---
author: jeromechan
comments: true
date: 2014-09-01 09:55:49
slug: java-switch-explaination
title: 详解Switch语句的使用
wordpress_id: 140
permalink: /2014/09/01/java-switch-explanation/
categories:
- Java
- Programming
- Translation
tags:
- JAVA Switch
- Switch语句
---

与 if-then和if-then-else语句不同，switch语句可以有许多可以执行的分支。一个switch可以使用的类型包括如下类型：





<blockquote>基本数据类型：byte, short, char, int
枚举类型：enum
对象类型：Charater, Byte, Short, Integer</blockquote>




以下这个例子SwitchDemo，声明了一个int类型的month变量，使用了switch语句，根据月份的数值，输出月份的英文单词。


    
    
    public class SwitchDemo {
    public static void main(String[] args) {
        int month = 8;
        String monthString;
        switch (month) {
            case 1:  monthString = "January";
                     break;
            case 2:  monthString = "February";
                     break;
            case 3:  monthString = "March";
                     break;
            case 4:  monthString = "April";
                     break;
            case 5:  monthString = "May";
                     break;
            case 6:  monthString = "June";
                     break;
            case 7:  monthString = "July";
                     break;
            case 8:  monthString = "August";
                     break;
            case 9:  monthString = "September";
                     break;
            case 10: monthString = "October";
                     break;
            case 11: monthString = "November";
                     break;
            case 12: monthString = "December";
                     break;
            default: monthString = "Invalid month";
                     break;
        }
        System.out.println(monthString);
    }
    }
    



在以上的例子当中，结果输出了
    
    
    August
    




一个switch的case主体被称为switch block，一个switch block可以包含多个case，或者仅仅是default分支。
Switch语句将验证它的表达式，验证通过后，将执行验证通过的case分支之后的所有语句。

类似地，你也可以使用if-then-else语句实现SwitchDemo效果：


    
    
    int month = 8;
    if (month == 1) {
        System.out.println("January");
    } else if (month == 2) {
        System.out.println("February");
    }
    ...  // and so on
    



关于到底是使用if-then-else语句，还是switch语句，需要根据实际的可读性和测试程序的表达式情况而定。if-then-else适用于数值范围的判断条件，而switch则适用于单数值，枚举数值和简单对象的判断。

另外，switch还有一个有趣的关键语句——break。每一个break语句的出现，跳出了整个switch循环结构。
控制流会逐个switch block顺序执行。break语句是重要的，因为假设没有break，所有switch block中的语句都会跳过不判断。自匹配正确的第一个case起，其他在该case之后的switch block会按顺序逐个执行，直到遇到break语句。
以下程序SwitchDemoFallThrough展示了在没有书写break语句的时候，代码的执行结果：


    
    
    public class SwitchDemoFallThrough {
    
    public static void main(String[] args) {
        java.util.ArrayList<string> futureMonths =
            new java.util.ArrayList<string>();
    
        int month = 8;
    
        switch (month) {
            case 1:  futureMonths.add("January");
            case 2:  futureMonths.add("February");
            case 3:  futureMonths.add("March");
            case 4:  futureMonths.add("April");
            case 5:  futureMonths.add("May");
            case 6:  futureMonths.add("June");
            case 7:  futureMonths.add("July");
            case 8:  futureMonths.add("August");
            case 9:  futureMonths.add("September");
            case 10: futureMonths.add("October");
            case 11: futureMonths.add("November");
            case 12: futureMonths.add("December");
                     break;
            default: break;
        }
    
        if (futureMonths.isEmpty()) {
            System.out.println("Invalid month number");
        } else {
            for (String monthName : futureMonths) {
               System.out.println(monthName);
            }
        }
    }
    }
    



以上程序输出结果为：

    
    
    August
    September
    October
    November
    December
    



对于以上例子，从技术上分析，代码最后的一个break语句是多余的，因为此时，尽管没有break语句，程序依然会跳出switch循环。这里推荐童鞋们善于使用break语句，如此一来，可以使得我们的代码结构可读性更高，更容易维护，更少的异常错误的发生。default这类switch block，处理的是当前面所有case分支都没有匹配的情况下，则switch进入default进行处理。

以下示例代码SwitchDemp2，给我们呈现了一个statement可以拥有多个case标签。
（示例代码实现了计算指定月份所拥有的自然天数）


    
    
    class SwitchDemo2 {
    public static void main(String[] args) {
    
        int month = 2;
        int year = 2000;
        int numDays = 0;
    
        switch (month) {
            case 1: case 3: case 5:
            case 7: case 8: case 10:
            case 12:
                numDays = 31;
                break;
            case 4: case 6:
            case 9: case 11:
                numDays = 30;
                break;
            case 2:
                if (((year % 4 == 0) && 
                     !(year % 100 == 0))
                     || (year % 400 == 0))
                    numDays = 29;
                else
                    numDays = 28;
                break;
            default:
                System.out.println("Invalid month.");
                break;
        }
        System.out.println("Number of Days = "
                           + numDays);
    }
    }
    



以上程序输出结果为：


    
    
    Number of Days = 29
    



**在Switch中使用String**
从Java SE 7版本开始，我们就可以在switch循环中使用String Object作为判断的表达式了。接下来的代码片段StringSwitchDemo，实现了根据String对象类型的month变量，输出指定月份的序号。


    
    
    public class StringSwitchDemo {
    
    public static int getMonthNumber(String month) {
    
        int monthNumber = 0;
    
        if (month == null) {
            return monthNumber;
        }
    
        switch (month.toLowerCase()) {
            case "january":
                monthNumber = 1;
                break;
            case "february":
                monthNumber = 2;
                break;
            case "march":
                monthNumber = 3;
                break;
            case "april":
                monthNumber = 4;
                break;
            case "may":
                monthNumber = 5;
                break;
            case "june":
                monthNumber = 6;
                break;
            case "july":
                monthNumber = 7;
                break;
            case "august":
                monthNumber = 8;
                break;
            case "september":
                monthNumber = 9;
                break;
            case "october":
                monthNumber = 10;
                break;
            case "november":
                monthNumber = 11;
                break;
            case "december":
                monthNumber = 12;
                break;
            default: 
                monthNumber = 0;
                break;
        }
    
        return monthNumber;
    }
    
    public static void main(String[] args) {
    
        String month = "August";
    
        int returnedMonthNumber =
            StringSwitchDemo.getMonthNumber(month);
    
        if (returnedMonthNumber == 0) {
            System.out.println("Invalid month");
        } else {
            System.out.println(returnedMonthNumber);
        }
    }
    }
    



以上程序输出结果为：


    
    
    8
    



关于以上例子的编写，在每一个switch block中的case判断，等同于执行了在每一次匹配判断之时，使用了String.equals方法。以上的例子也正是使用了String.toLowerCase方法，确保了在每一次case的判断中，都是以小写形式的字符串进行匹配。

Note： 在以上StringSwitchDemo例子中包含了month == null的判断，确保了在每一个case判断语句中不会抛出空指针NullPointerException异常。

**以下作一些本人对switch使用基础的理解**
含带break语句的switch block

    
    
    switch(X)  
    {  
      case A:  
          System.out.println("A");
          break;
      case B:
          System.out.println("B");
          break;
      case C:
          System.out.println("C");
          break;
      default:
          System.out.println("Default");
          break;
    }
    



等同于


    
    
    if(X == A){
        System.out.println("A");
    }else if(X == B){
        System.out.println("B");
    }else if(X == C){
        System.out.println("C");
    }else{
        System.out.println("Default");
    }
    



未含带break语句的switch block

    
    
    switch(X)  
    {  
      case A:  
          System.out.println("A");
          break;
      case B:
          System.out.println("B");
      case C:
          System.out.println("C");
          break;
      default:
          System.out.println("Default");
          break;
    }
    



等同于


    
    
    if(X == A){
        System.out.println("A");
    }else if(X == B || X == C){
        System.out.println("B");
        System.out.println("C");
    }else{
        System.out.println("Default");
    }
    



阅读完以上，童鞋们应该已经明白了switch的使用方法了。哈哈，如果对你有用，可以分享给更多身边的朋友（可以使用右侧板块的文章分享功能）。

声明：除文章结尾处本人的理解观点描述外，本篇文章主要内容由本人翻译自Docs.Oracle.COM，欲阅读原版，请跳转至 [The switch Statement](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html)
