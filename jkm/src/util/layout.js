//ymm 采用rem来做移动端适配，参照标准是设备的横向分辨率，这里是1920px
//example: 0.01rem=1px
import "static/css/init.css"

((global, doc) => {
    let docNode = doc.documentElement,
        resizeEventName = 'orientation' in global ? 'orientation' : 'resize',
        recalcRemHandler = () => {
            let clientWidth = docNode.clientWidth || doc.body.clientWidth;
            if (!clientWidth) {
                return false;
            }
            docNode.style.fontSize = clientWidth / 19.2 + 'px';
        }
    if (!doc.addEventListener) {
        return;
    }
    global.addEventListener(resizeEventName, recalcRemHandler, false);
    doc.addEventListener('DOMContentLoaded', recalcRemHandler, false);
})(window, document);
//暴露给原生的方法
window.loginAgain = () => {
    window.location.href = "../user/login.html";
    window.android ? window.android.cancellation() : "";
    sessionStorage.clear();
}
