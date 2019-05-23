webpackJsonp([45],{J0L7:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var i,s,o=n("bOdI"),a=(i=o)&&i.__esModule?i:{default:i},l=n("vMlw"),c=n("yt7g");e.default=(s={name:"tuberculosisList",components:{},data:function(){return{result:[],ishighBP:!1}},methods:{gotoform:function(t,e){var n=e||"";window.location.href="tuberculosis.html?type="+t+"&id="+n},initialize:function(){setTimeout(function(){var e=document.body.clientHeight-t(".content-head").outerHeight()-30;t(".content-list").css("max-height",e+"px"),t(".content-list").css("overflow","auto")},300)},gototaburl:function(t){switch(t){case"个人档案":var e="index.html";break;case"健康体检表":e="healthList.html";break;case"高血压随访":e="hypertension.html";break;case"门诊记录":case"转诊记录":e="";return void this.construction();default:e=""}(0,c.empty)(e)||(window.location.href=e)}}},(0,a.default)(s,"components",{}),(0,a.default)(s,"created",function(){var t=this,e={personId:(0,c.getURLParameter)("personId")||sessionStorage.getItem("personId")};(0,l.queryHealthyCheckList)(e).then(function(e){t.result=e.result,t.initialize()}),(0,l.queryFollowHolders)(e).then(function(e){e.holders.includes("highBP")&&(t.ishighBP=!0)})}),(0,a.default)(s,"mounted",function(){}),s)}).call(e,n("7t+N"))},Ts03:function(t,e,n){"use strict";var i=a(n("/5sW")),s=a(n("pWuo")),o=n("yt7g");function a(t){return t&&t.__esModule?t:{default:t}}n("paoi"),new i.default({el:"#tuberculosisList",render:function(t){return t(s.default)}}),i.default.filter("fmat",function(t){if(t)return(0,o.dateFormat)(parseInt(t),"Y-m-d G:i")})},gKrs:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAYFBMVEUAAAA8nP8/nf88m/88nP88nP88nP88nP88nP89nP88nf8+nf89o/9Dof9NqP9Ns/88nP89nP89nP88nP89nP89nP89nf88m/89nP88nP9Bnf9BoP9An/8/m/8+nv88m/8G5VbEAAAAH3RSTlMA+iT28OPeva6XjDUZEwsFguzIwKOfcGZQSC8rCEU6ZwWB/AAAAVtJREFUSMeUk1mOgzAQRNu7TWz2PYS6/y1HYmYCSQjg91nSU7eq1bQD75zRBWOFNq7jdIExUXhBJeOJcqsACNsOPGRZ4ENrBYDqdqBwC8imT7dZ2jcSsN+2zBIGka/G6uUCLMn2nGDAnKddvGMw4TO/a6iD1W8K+v4ePiRKTwf4EvLxNkeinuiQqYZ8mRU0ajqlhg6b3gzK6VyaSpi1wwTK0wW8QvK8KWM7vc3zToeM/V/ZwtEnwE7oYP90CH9V8gK/S1XI6apEOarlFyDT61IqMS7VNXRdomYpUKGPkXooIg6RxkipAKcOlmIksujIoY2TWjgyGOKkAYY0eJzEoalAiJMCCmLINuf+yrz+EdhPp3VQAwAQg0DQAv7VYoDwGAGXXNrCLj2i79EgaOS0XDojOliJBoWQ4i7FQhUmZXlrOdm1LAAg1AjUBJ8CalECkQ/RHBIqVzeXRNLRAuoOLc0XCezsAAAAAElFTkSuQmCC"},"mh+O":function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tuberculosisList healthservice"},[i("div",{staticClass:"left"},[i("ul",{staticClass:"left-list"},[i("li",{staticClass:"left-item item",on:{click:function(e){e.stopPropagation(),t.gototaburl("个人档案")}}},[t._v("个人档案")]),t._v(" "),i("li",{staticClass:"left-item item",on:{click:function(e){e.stopPropagation(),t.gototaburl("健康体检表")}}},[t._v("健康体检表")]),t._v(" "),i("li",{staticClass:"left-item item",on:{click:function(e){e.stopPropagation(),t.gototaburl("高血压随访")}}},[t._v("高血压随访")]),t._v(" "),i("li",{staticClass:"left-item item on",on:{click:function(e){e.stopPropagation(),t.gototaburl("结核病随访")}}},[t._v("结核病随访")]),t._v(" "),i("li",{staticClass:"left-item item",on:{click:function(e){e.stopPropagation(),t.gototaburl("门诊记录")}}},[t._v("门诊记录")]),t._v(" "),i("li",{staticClass:"left-item item",on:{click:function(e){e.stopPropagation(),t.gototaburl("转诊记录")}}},[t._v("转诊记录")])])]),i("div",{staticClass:"tuberculosisList-content"},[i("div",{staticClass:"content-head"},[i("div",{staticClass:"content-head-left"},[t._v("\n\t\t\t\t随访信息\n\t\t\t")]),i("div",{staticClass:"content-head-right",on:{click:function(e){e.stopPropagation(),t.gotoform("newadd")}}},[i("img",{attrs:{src:n("gKrs")}}),i("span",{staticStyle:{color:"#3C9BFF"}},[t._v("新增")])])]),t._v(" "),i("ul",{staticClass:"content-list"},t._l(t.result,function(e,n){return i("li",{staticClass:"list-item"},[i("div",{staticClass:"list-item-left"},[t._v("\n\t\t\t\t\t体检时间："+t._s(t._f("fmat")(e.medicalExaminationTime))+"\n\t\t\t\t")]),i("div",{staticClass:"list-item-center"},[t._v("\n\t\t\t\t\t健康评价："),i("span",{class:["有异常"==e.healthAssessment?"red":""]},[t._v(t._s(e.healthAssessment))])]),i("div",{staticClass:"list-item-right",on:{click:function(n){n.stopPropagation(),t.gotoform("lookover",e.physicalExamTableId)}}},[i("span",[t._v("查看")])])])}))])])},staticRenderFns:[]};e.a=i},pWuo:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("J0L7"),s=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);var a=n("mh+O");var l=function(t){n("zeG8")},c=n("VU/8")(s.a,a.a,!1,l,null,null);e.default=c.exports},zeG8:function(t,e){}},["Ts03"]);
//# sourceMappingURL=tuberculosisList.977402b6.js.map