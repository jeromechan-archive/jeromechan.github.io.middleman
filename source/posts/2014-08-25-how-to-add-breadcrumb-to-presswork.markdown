---
author: jeromechan
comments: true
date: 2014-08-25 03:42:43
slug: how-to-add-breadcrumb-to-presswork
title: 关于PressWork增加导航面包屑的实现
wordpress_id: 125
permalink: /2014/08/25/how-to-add-breadcrumb-to-presswork/
categories:
- Programming
tags:
- presswork面包屑
- wordpress 主题
---

很开心，周末为自己的博客更换了新装，没错，就是PressWork。它是一个自定义很强的开源wp模板项目，但是还是缺少很多实用的模块，这一部分还是需要童鞋们自己根据自己的需求去定制。
这次我先来介绍对于PressWork的导航面包屑（Breadcrumb）的定制实现。

一、由于默认样式的情况，作者决定在header中新增面包屑的option


    
    
    /**
     * Add breadcrumb to header option
     * @author chenjinlong
     * @description presswork/functions.php
     */
    if(empty($pw_default_options)) {
    	$pw_default_options = array(
                      // 新增breadcrumb选项
    		"header_option" => "header_logo,nav,breadcrumb"
                      // 其他配置项目 …
             );
    }
    




二、新增面包屑实现函数


    
    
    /**
     * Deal with breadcrumb for single post | page. 
     * @author chenjinlong
     * @description presswork/functions.php
     */
    function pw_get_breadcrumb(){
        $home = '<a href="'.home_url().'">首页</a>' . ' » ';
        $category_parent_top = '';
        if(is_single()){
            $categorys = get_the_category();
            $category_parent_top = get_category_parents($categorys[0]->term_id, true, ' » ');
            $title = the_title('', '', false);
        }elseif(is_page()){
            $title = the_title('', '', false);
        }else{
            $title = '';
        }
        return $home . $category_parent_top . $title;
    }
    




三、增加元素输出逻辑分支



    
    
    /**
     * Add page breadcrumb for single post top. 
     * @author chenjinlong
     * @description presswork/functions.php, ‘pw_get_element’ function
     */
    if($pw_add_name=="breadcrumb"){
        echo '<li>';
        if(is_single() || is_page()){
            $handle = pw_get_breadcrumb();
            echo $handle;
        }
        echo '</li>';
    }
    




参照以上的步骤，简单版的面包屑导航就弄好了，如果需要提高视觉美感，再自己增加css样式的支持即可，因为每个人要求不一，这里就不作建议样式了。
