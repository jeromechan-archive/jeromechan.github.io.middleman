/**
 * Created by chenjinlong on 5/21/15.
 */

/**
 * 获取并设置版权信息的年份声明
 */
function get_copyright_date() {
    var currentDate = new Date();
    var fullYearStr = currentDate.getFullYear();

    var copyrightStr = "© AboutCoder 2013-" + fullYearStr;

    $("#a-copyright-text").html(copyrightStr);
}