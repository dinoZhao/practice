/**
 * Created by YY on 2018/2/4.
 */
// /**
//  * 弹出式提示框，默认1.2秒自动消失
//  * @param message 提示信息
//  * @param style 提示样式，有alert-success、alert-danger、alert-warning、alert-info
//  * @param time 消失时间
//  */
// var prompt = function (message, style, time)
// {
//     style = (style === undefined) ? 'alert-success' : style;
//     time = (time === undefined) ? 30000 : time;
//     $('<div>')
//         .appendTo('body')
//         .addClass('alert ' + style)
//         .html(message)
//         .show()
//         .delay(time)
//         .fadeOut();
// };
//
// // 成功提示
// var success_prompt = function(message, time)
// {
//     prompt(message, 'alert-success', time);
// };
//
// // 失败提示
// var fail_prompt = function(message, time)
// {
//     prompt(message, 'alert-danger', time);
// };
//
// // 提醒
// var warning_prompt = function(message, time)
// {
//     prompt(message, 'alert-warning', time);
// };
//
// // 信息提示
// var info_prompt = function(message, time)
// {
//     prompt(message, 'alert-info', time);
// };

function alert(tips,msg, func) {
    // var floatWin = $("<div class='win'><div class='win-shadow'></div><div class='win-box'><div class='win-tit'>提示</div>" +
    //     "<div class='win-cnt text-center'>" + msg + "</div><div class='win-bot'><a class='btn' id='iKnow'>确定</a></div></div></div>");
    var floatWin = $("<div class='win'>" + "<div class='win-shadow'></div><div class='win-box'><div class='win-tit'>"+tips+"</div>" +
        "<div class='win-cnt text-center'>" + msg + "</div><div class='win-bot'><a class='btn' id='iKnow'>确定</a></div></div></div>");

    floatWin.find('#iKnow, .win-shadow').on('touchend', function(e){
        e.stopPropagation();
        e.preventDefault();
        floatWin.remove();
        if (func)
            func();
    });
    $('body').append(floatWin);
}