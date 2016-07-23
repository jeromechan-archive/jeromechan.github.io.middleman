/**
 * BASE64 EN/DECODER
 */
function base64_encode(){
	var str=CryptoJS.enc.Utf8.parse($("#txt-source").val());
	var base64=CryptoJS.enc.Base64.stringify(str);
	$("#txt-result").val(base64);
}
function base64_decode(){
	var words  = CryptoJS.enc.Base64.parse($("#txt-result").val());
	$("#txt-source").val(words.toString(CryptoJS.enc.Utf8));
}

/**
 * XML Formatter
 */
function xml_minify() {
    //var pd = require('pretty-data.js').pd;
    var pd = new pp;
    var prettyStr = $("#txt-xml-pretty").val();
    var isPreserveComments = $("#ck-xml-formatter-preserve-comments").is(':checked') ? true : false;
    var minifyStr = pd.xmlmin(prettyStr, isPreserveComments);
    $("#txt-xml-minify").val(minifyStr);
}
function xml_pretty() {
    //var pd = require('pretty-data.js').pd;
    var pd = new pp;
    var minifyStr = $("#txt-xml-minify").val();
    var prettyStr = pd.xml(minifyStr, true);
    $("#txt-xml-pretty").val(prettyStr);
}

/**
 * SQL Formatter
 */
function sql_minify() {
    //var pd = require('pretty-data.js').pd;
    var pd = new pp;
    var prettyStr = $("#txt-sql-pretty").val();
    var isPreserveComments = $("#ck-sql-formatter-preserve-comments").is(':checked') ? true : false;
    var minifyStr = pd.sqlmin(prettyStr, isPreserveComments);
    $("#txt-sql-minify").val(minifyStr);
}
function sql_pretty() {
    //var pd = require('pretty-data.js').pd;
    var pd = new pp;
    var minifyStr = $("#txt-sql-minify").val();
    var prettyStr = pd.sql(minifyStr, true);
    $("#txt-sql-pretty").val(prettyStr);
}

/**
 * CSS Formatter
 */
function css_minify() {
    //var pd = require('pretty-data.js').pd;
    var pd = new pp;
    var prettyStr = $("#txt-css-pretty").val();
    var isPreserveComments = $("#ck-css-formatter-preserve-comments").is(':checked') ? true : false;
    var minifyStr = pd.cssmin(prettyStr, isPreserveComments);
    $("#txt-css-minify").val(minifyStr);
}
function css_pretty() {
    //var pd = require('pretty-data.js').pd;
    var pd = new pp;
    var minifyStr = $("#txt-css-minify").val();
    var prettyStr = pd.css(minifyStr, true);
    $("#txt-css-pretty").val(prettyStr);
}

/**
 * SQL Generator
 */
function generate(){
    var excelSource = $("#txt-excelSource").val();
    $.ajax({
        type: "POST",
        url: "../action/create_table_sql_build.php",
        data: {
            excelSource: excelSource
        }
    }).done(function (data) {
        $("#txt-sqlResult").val(data);
    });
}

/**
 * Initial Loading
 */
$(function(){
    $('.nav-sidebar').on('click', 'li', function(e){
    	switch($(this).attr("id")){
			case "li-base64":
				common.li_base64_click();
				break;
			case "li-json":
				common.li_json_click();
				break;
            case "li-sql":
                common.li_sql_click();
                break;
            case "li-xml":
                common.li_xml_click();
                break;
            case "li-sql-formatter":
                common.li_sql_formatter_click();
                break;
            case "li-css-formatter":
                common.li_css_formatter_click();
                break;
			default:
				break;
		}
    });
    common.init();

    // 初始化版本声明信息
    get_copyright_date();
});

var common = {
	"li_base64_click" : function(){
		$.each($('.nav-sidebar li'), function(key, value){
			if($(this).attr("id") == "li-base64"){
				$("#li-base64").addClass("active");
			}else{
				$(this).removeClass("active");
			}
		});
		$("#div-json").css("display", "none");
        $("#div-sql").css("display", "none");
		$("#div-base64").css("display", "block");
        $("#div-xml").css("display", "none");
        $("#div-sql-formatter").css("display", "none");
        $("#div-css-formatter").css("display", "none");
	},
	"li_json_click" : function(){
		$.each($('.nav-sidebar li'), function(key, value){
			if($(this).attr("id") == "li-json"){
				$("#li-json").addClass("active");
			}else{
				$(this).removeClass("active");
			}
		});
		$("#div-base64").css("display", "none");
        $("#div-sql").css("display", "none");
		$("#div-json").css("display", "block");
        $("#div-xml").css("display", "none");
        $("#div-sql-formatter").css("display", "none");
        $("#div-css-formatter").css("display", "none");
	},
    "li_sql_click" : function(){
        $.each($('.nav-sidebar li'), function(key, value){
            if($(this).attr("id") == "li-sql"){
                $("#li-sql").addClass("active");
            }else{
                $(this).removeClass("active");
            }
        });
        $("#div-base64").css("display", "none");
        $("#div-json").css("display", "none");
        $("#div-sql").css("display", "block");
        $("#div-xml").css("display", "none");
        $("#div-sql-formatter").css("display", "none");
        $("#div-css-formatter").css("display", "none");
    },
    "li_xml_click" : function(){
        $.each($('.nav-sidebar li'), function(key, value){
            if($(this).attr("id") == "li-xml"){
                $("#li-xml").addClass("active");
            }else{
                $(this).removeClass("active");
            }
        });
        $("#div-base64").css("display", "none");
        $("#div-json").css("display", "none");
        $("#div-sql").css("display", "none");
        $("#div-xml").css("display", "block");
        $("#div-sql-formatter").css("display", "none");
        $("#div-css-formatter").css("display", "none");
    },
    "li_sql_formatter_click" : function(){
        $.each($('.nav-sidebar li'), function(key, value){
            if($(this).attr("id") == "li-sql-formatter"){
                $("#li-sql-formatter").addClass("active");
            }else{
                $(this).removeClass("active");
            }
        });
        $("#div-base64").css("display", "none");
        $("#div-json").css("display", "none");
        $("#div-sql").css("display", "none");
        $("#div-xml").css("display", "none");
        $("#div-sql-formatter").css("display", "block");
        $("#div-css-formatter").css("display", "none");
    },
    "li_css_formatter_click" : function(){
        $.each($('.nav-sidebar li'), function(key, value){
            if($(this).attr("id") == "li-css-formatter"){
                $("#li-css-formatter").addClass("active");
            }else{
                $(this).removeClass("active");
            }
        });
        $("#div-base64").css("display", "none");
        $("#div-json").css("display", "none");
        $("#div-sql").css("display", "none");
        $("#div-xml").css("display", "none");
        $("#div-sql-formatter").css("display", "none");
        $("#div-css-formatter").css("display", "block");
    },
    "init" : function(){
        var container, options, json, editor;

        container = document.getElementById('jsoneditor');

        options = {
            mode: 'code',
            modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
            error: function (err) {
                alert(err.toString());
            }
        };

        json = {
            "array": [1, 2, 3],
            "boolean": true,
            "null": null,
            "number": 123,
            "object": {"a": "b", "c": "d"},
            "string": "Hello World"
        };

        editor = new JSONEditor(container, options, json);
    }
};