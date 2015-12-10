/**
 * Created by mm on 2015/8/16.
 */
var dateFormat = function (dateTime, fmt) {
    var o = {
        "M+": dateTime.getMonth() + 1,
        "d+": dateTime.getDate(),
        "h+": dateTime.getHours(),
        "m+": dateTime.getMinutes(),
        "s+": dateTime.getSeconds(),
        "q+": Math.floor((dateTime.getMonth() + 3) / 3),
        "S": dateTime.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
                                         (("00" + o[k]).substr((""
                                             + o[k]).length)));
        }
    }
    return fmt;
};