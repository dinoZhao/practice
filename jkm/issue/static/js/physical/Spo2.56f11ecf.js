webpackJsonp([52],{BROO:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Twi+"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);var s=n("MDiA");var u=function(t){n("KZQz")},r=n("VU/8")(i.a,s.a,!1,u,"data-v-40a9542c",null);e.default=r.exports},KZQz:function(t,e){},MDiA:function(t,e,n){"use strict";var a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"temperature"},[n("headLine"),t._v(" "),n("header",[t._v("请输入体温数据")]),t._v(" "),n("div",{staticClass:"panel",attrs:{id:"panel"}},[n("div",{staticClass:"input-item-box"},[n("div",{staticClass:"input-item"},[n("span",{attrs:{id:""}},[t._v("\n\t\t\t血氧饱和度\n\t\t")]),t._v(" "),n("input",{attrs:{type:"text",name:"",id:"",value:"",placeholder:"请输入"},on:{input:t.inputbloodO2}}),n("span",{staticClass:"unit"},[t._v("%")])]),t._v(" "),n("div",{staticClass:"input-item"},[n("span",{attrs:{id:""}},[t._v("\n\t\t\t脉率\n\t\t")]),t._v(" "),n("input",{attrs:{type:"text",name:"",id:"",value:"",placeholder:"请输入"},on:{input:t.inputRate}}),n("span",{staticClass:"unit"},[t._v("BPM")])]),t._v(" "),n("div",{staticClass:"save-button",on:{click:t.save}},[t._v("\n\t\t\t\t保存\n\t\t\t")])])])],1)},staticRenderFns:[]};e.a=a},"Twi+":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(n("35/Y")),i=n("vMlw");o(n("yt7g"));function o(t){return t&&t.__esModule?t:{default:t}}e.default={name:"Spo2",components:{headLine:a.default},data:function(){return{bloodO2:"",inputbloodRate:""}},methods:{showToast:function(t){var e=/^\+?[1-9][0-9]*$/;return console.log(e.test(t)),!!e.test(t)||(this.showtoast("请填入数字"),!1)},inputbloodO2:function(t){this.showToast(t.target.value)&&(this.bloodO2=t.target.value),console.log(t.target.value)},inputRate:function(t){this.showToast(t.target.value)&&(this.inputbloodRate=t.target.value),console.log(t.target.value)},save:function(){var t=this;if(""==t.bloodO2&&""==t.inputbloodRate)return t.showtoast("表单填写不全"),!1;var e={recordTime:(new Date).getTime(),type:"ibs",value:t.bloodO2,unit:"%",condition:""},n={recordTime:(new Date).getTime(),type:"rate",value:t.inputRate,unit:"BMP",condition:""},a=[];a.push(e),a.push(n);var o={timeStamp:(new Date).getTime(),deviceId:"",idNumber:"",hospital:"FuCongKJXZ",exams:a,medicalRecordFolderId:1259044016};(0,i.savePhysicalExamData)(o).then(function(t){console.log(t)})}},created:function(){},mounted:function(){}}},kTDm:function(t,e,n){"use strict";var a=o(n("/5sW")),i=o(n("BROO"));function o(t){return t&&t.__esModule?t:{default:t}}n("paoi"),new a.default({el:"#Spo2",render:function(t){return t(i.default)}})}},["kTDm"]);
//# sourceMappingURL=Spo2.56f11ecf.js.map