// 1）、首页全部清空历史堆栈
// 2）、其他非首页的tab主页返回到首页
// 3）、屏蔽登录、注册等一些认证页面

import {shieldPageList, mainPageList} from './shield'
import { getURLParameter,dateFormat,empty  } from 'utils/util'

var currentPath = window.location.pathname;
const historyUrlKey = 'historyUrl';
// const homePagePath = '/cloudmm/issue/recommend.html';
var personId = getURLParameter('personId');
if(personId){
	sessionStorage.setItem('personId',personId)
}
var _historyUrl = getHistoryUrl();
if (mainPageList.indexOf(currentPath) > -1) {
    sessionStorage.setItem(historyUrlKey, window.location.href);
} else if (_historyUrl.length && _historyUrl[_historyUrl.length - 1] != window.location.href) {
    saveUrlToHistory();
}else if(_historyUrl.length<1){
	sessionStorage.setItem(historyUrlKey, window.location.href);
}
//获取历史堆栈
function getHistoryUrl () {
    var historyUrl = sessionStorage.getItem(historyUrlKey);
    return !!historyUrl ? historyUrl.split(',') : [];
}

//将当前url推入历史堆栈
function saveUrlToHistory () {
    if (isShieldPage(window.location.pathname)) {
        return false;
    }
    var historyUrl = getHistoryUrl();
    historyUrl.push(window.location.href);
    sessionStorage.setItem(historyUrlKey, historyUrl.join(','));
}

function isShieldPage (pathname) {
    return shieldPageList.indexOf(pathname) > -1;
}

export const goBack = function () {
    var targetUrl = '';
    var historyUrl = getHistoryUrl();

    if (isShieldPage(window.location.pathname)) {
        targetUrl = historyUrl.length && historyUrl[historyUrl.length - 1];
    } else if (mainPageList.indexOf(window.location.pathname) > -1) {
        return 0;
    } else {
        targetUrl = historyUrl.pop() && historyUrl.pop();
        sessionStorage.setItem(historyUrlKey, historyUrl.join(','));
    }
    if(targetUrl){
    	window.location.href = targetUrl;
    }
    return 1;
}

//关闭从后寻找历史堆栈中最近的一个tab主页，没有的话直接返回主页
// export const closeToIndex = function () {
//     var historyUrl = getHistoryUrl();
//     var targetUrl = '';
//     var index = historyUrl.length - 1;
//     if (index) {
//         while (index--) {
//             var urlItem = historyUrl[index];
//             if (urlItem.indexOf('/cloudmm/issue/recommend.html') > 0
//                 || urlItem.indexOf('/cloudmm/issue/knowledge.html') > 0
//                 || urlItem.indexOf('/cloudmm/issue/baby.html') > 0
//                 || urlItem.indexOf('/cloudmm/issue/live.html') > 0
//                 || urlItem.indexOf('/cloudmm/issue/home.html') > 0
//                 ) {
//                     targetUrl = urlItem;
//                     break;
//             }
//         }
//         targetUrl = targetUrl || `${window.location.protocol}//${window.location.host}${homePagePath}`;
//         window.location.href = targetUrl;
//     }
// }