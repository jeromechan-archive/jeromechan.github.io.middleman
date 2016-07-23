---
author: jeromechan
comments: true
date: 2014-06-29 00:51:36
slug: how-to-translate-var-name-between-camel-and-underline
title: 代码规范之驼峰vs下划线风格转换方案
wordpress_id: 6
permalink: /2014/06/29/how-to-translate-var-name-between-camel-and-underline/
categories:
- Programming
tags:
- PHP
---

转换书写风格的方案均基于递归深度遍历，对key值重新建构，将value值重新赋值。

让我们一起来看看以下详细代码实现。



	
  1. 下划线风格=>驼峰风格




    
     1     /**
     2      * @static 数组键名翻译成驼峰写法
     3      * @param $in 源数组
     4      * @return array 输出数组
     5      */
     6     public static function arrKeysToCamelCase($in)
     7     {
     8         if(empty($in)||!is_array($in))
     9             return $in;
    10         $reCopyRes = array();
    11         foreach($in as $key=>$val)
    12         {
    13             $reKey = self::ucFirstWord($key);
    14             if(!is_array($val)){
    15                 $reCopyRes[$reKey] = $val;
    16             }else{
    17                 $reCopyRes[$reKey] = self::arrKeysToCamelCase($val);
    18             }
    19         }
    20         return $reCopyRes;
    21     }<!-- more -->
    22     /**
    23      * @static 将单词的首字母转换成大写(首单词除外)
    24      * @param $word 源单词字符串
    25      * @return string 输出单词字符串
    26      */
    27     public static function ucFirstWord($word)
    28     {
    29         if(!is_string($word)){
    30             return $word;
    31         }else{
    32             $wordArr = explode('_',$word);
    33             if(!empty($wordArr)){
    34                 $index = 0;
    35                 foreach($wordArr as &$wd)
    36                 {
    37                     if($index==0){
    38                         $index++;
    39                         continue;
    40                     }
    41                     $wd = ucfirst($wd);
    42                 }
    43                 $outStr = implode('',$wordArr);
    44                 return $outStr;
    45             }else{
    46                 return $word;
    47             }
    48         }
    49     }





	
  2. 驼峰风格=>下划线风格




    
     1     /**
     2      * @static 数组键名翻译成下划线写法
     3      * @param $in 源数组
     4      * @return array 输出数组
     5      */
     6     public static function arrKeysToUnderlineCase($in)
     7     {
     8         if(empty($in)||!is_array($in))
     9             return $in;
    10         $reCopyRes = array();
    11         foreach($in as $key=>$val)
    12         {
    13             $reKey = self::lcFirstWord($key);
    14             if(!is_array($val)){
    15                 $reCopyRes[$reKey] = $val;
    16             }else{
    17                 $reCopyRes[$reKey] = self::arrKeysToUnderlineCase($val);
    18             }
    19         }
    20         return $reCopyRes;
    21     }
    22 
    23     /**
    24      * @static 将单词的首字母转换成小写
    25      * @param $word 源单词字符串
    26      * @return string 输出单词字符串
    27      */
    28     public static function lcFirstWord($word)
    29     {
    30         if(!is_string($word)){
    31             return $word;
    32         }else{
    33             preg_match_all('/([a-z0-9_]*)([A-Z][a-z0-9_]*)?/',$word,$matches,PREG_PATTERN_ORDER);
    34             if(!empty($matches)){
    35                 $strPattern1 = !empty($matches[1][0])?trim($matches[1][0]):'';
    36                 $subMatch = array_filter($matches[2]);
    37                 $strPattern2 = !empty($subMatch)?trim(implode('_',$subMatch)):'';
    38                 $strPattern2 = !empty($strPattern2) && !empty($strPattern1)?'_'.$strPattern2:$strPattern2;
    39                 $outStr = strtolower($strPattern1.$strPattern2);
    40             }else{
    41                 $outStr = $word;
    42             }
    43             return $outStr;
    44         }
    45     }






