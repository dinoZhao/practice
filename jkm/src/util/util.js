import Vue from 'vue'
import { weeks as weeksMap, months as monthsMap } from '../config/date'
import patterns from '../config/regExps'
import { userAgentGroups } from '../config/userAgent';
import _alert from 'components/common/alert'
import _choose from 'components/common/choose'
import _loading from 'components/common/loading'
import _toast from 'components/common/toast'
import _construction from 'components/common/construction/construction'

//传参公交车，欢迎上车
var bus = new Vue()
Vue.prototype.bus = bus
/**
 * 格式化数字（字符串）
 *
 * @param {Boolean} thousSeparate	货币千分位
 * @param {Number}  decimalSize		小数位
 */
String.prototype.formatNumber = Number.prototype.formatNumber = function(thousSeparate, decimalSize) {
	let num = parseFloat((this + '').replace(/[^eE\d\.\-]+/g, ''));
	num = Object.prototype.toString.apply(num) === '[object Number]' ? num : 0;
	num = num.toFixed(!!decimalSize ? decimalSize : 0);
	num += '';
	if(!!thousSeparate) {
		let matches = num.match(/^(-?(?:\d{1,2})??)((?:\d{3})*)((?:\.\d*)?)$/);
		if(!!matches) {
			num = matches[1].replace(/^(-?\d+)$/, (mathch) => {
				return mathch + (!!matches[2] ? ',' : '')
			}) + matches[2].replace(/\d{3}/g, (match, index) => {
				return(index === 0 ? '' : ',') + match
			}) + matches[3];
		}
	}
	return num;
}

/**
 * 非空校验
 *
 * @param {Any} input
 */
export const empty = (input) => {
	return(typeof input == 'undefined' ||
		!input ||
		/^\s*(null|0|undefined|false|no)\s*$/i.test(input) ||
		(input instanceof Array && !input.length) ||
		(typeof input == 'object' && ((!Object.keys(input).length) ||
			(('length' in input) && !input.length))));
}

/**
 * 格式化日期
 *
 * @param {String/Number/Date}   date	日期
 * @param {String}				format	期望输出的日期格式
 */
export const dateFormat = (date, format) => {
	if(!date)
		return '';
	format = format || 'Y-m-d';
	let _date = new Date(date);
	let [year, month, day, weekDay, hours, minutes, seconds] = [_date.getFullYear() + '', (_date.getMonth() + 1) + '', _date.getDate() + '', _date.getDay() + '', _date.getHours() + '', _date.getMinutes() + '', _date.getSeconds() + '']
	let [monthEn, weekEn] = [_date.toUTCString().substr(8, 3), _date.toUTCString().substr(0, 3)];
	let weekDay_ISO8601 = (weekDay === '0') ? '7' : weekDay;
	return format.replace(/Y/g, year) //1970
		.replace(/y/g, year.slice(-2)) //70
		.replace(/m/g, ('0' + month).slice(-2)) //09
		.replace(/n/g, month) //9
		.replace(/M/g, monthEn) //Sep
		.replace(/F/g, monthsMap[monthEn].en) //September
		.replace(/\_F/g, monthsMap[monthEn].cn) //九
		.replace(/j/g, day) //9
		.replace(/d/g, ('0' + day).slice(-2)) //09
		.replace(/D/g, weekEn) //Sun
		.replace(/l/g, weeksMap[weekEn].en) //Sunday
		.replace(/_l/g, weeksMap[weekEn].cn) //日
		.replace(/w/g, weekDay) //0
		.replace(/N/g, weekDay_ISO8601) //7
		.replace(/H/g, ('0' + hours).slice(-2)) //06
		.replace(/G/g, hours) //6
		.replace(/i/g, ('0' + minutes).slice(-2)) //06
		.replace(/s/g, ('0' + seconds).slice(-2)); //06
}

/**
 * 正则匹配各类文本
 *
 * @param {String/Number}   target	匹配文本
 * @param {String}			type	类型（tel/idNo/cnName）
 */
export const isType = (target, type) => {
	return typeof type === 'string' && patterns[type] && patterns[type].test(target);
}

/**
 * 获取url search参数
 *
 * @param {String}   key
 */
export const getURLParameter = (key) => {
	return decodeURIComponent((new RegExp(`[?|&]${key}=([^&;]+?)(#|&|;|$)`, 'i').exec(window.location.search) || [, ''])[1]) || null;
}

/**
 * 获取url search参数
 *
 * @param {String}   key
 */
export const makeTrackableURL = (url) => {
	let hash = '',
		search = '',
		currentSearch = window.location.search;
	let params = [],
		resultParams = [];
	let [hashIndex, searchIndex] = [url.indexOf('#'), url.indexOf('?')];

	if(searchIndex > 0) {
		search = url.substr(searchIndex + 1);
		url = url.substr(0, searchIndex);
	}

	if(hashIndex > 0) {
		hash = url.substr(hashIndex);
		url = url.substr(0, hashIndex);
	}

	params.forEach((param) => {
		let reg = new RegExp(`[?|&]((${param})=([^&]+))(&|#|$)`, 'i');
		let match = reg.exec(currentSearch);
		if(match && reg.exec(search) === null) {
			if(match[1]) {
				resultParams.push(match[1]);
			}
		}
	});
	url += `?${search === '' ? '' : search + '&'}${resultParams.join('&')}${hash}`;
	return decodeURIComponent(url);
}

/**
 * 一般将特殊的组件挂载到body根结构下
 *
 * @param {Object:Component}   vm  Vue实例
 * @param {Object}   component
 * @param {String}   property	属性名
 */
export const mountToBody = (vm, component, property) => {
	if(typeof component !== 'object' || vm instanceof Vue !== true) {
		return false;
	}
	if(!vm[property]) {
		const Component = Vue.extend(component);
		vm[property] = new Component();
		vm[property].$mount();
		document.querySelector('body').appendChild(vm[property].$el);
	}
}
//根据身份证号码得到年龄
export const GetAgeByIdNum = (identityCard) => {
	var len = (identityCard + "").length;
	var strBirthday = "";
	if(len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
	{
		strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
	}
	if(len == 15) {
		strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
	}
	//时间字符串里，必须是“/”
	var birthDate = new Date(strBirthday);
	var nowDateTime = new Date();
	var age = nowDateTime.getFullYear() - birthDate.getFullYear();
	//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
	if(nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

Vue.prototype.alertDefault = function(params) {
	mountToBody(this, _alert, '$alertDefault');
	this.$alertDefault.show(params);
}
Vue.prototype.globechoose = function(params) {
	mountToBody(this, _choose, '$globechoose');
	this.$globechoose.show(params);
}
Vue.prototype.showLoading = function(params) {
	mountToBody(this, _loading, '$showLoading');
	this.$showLoading.show(params);
}
Vue.prototype.hideLoading = function(params) {
	this.$showLoading.hide(params);
}
Vue.prototype.showtoast = function(params) {
	mountToBody(this, _toast, '$showtoast');
	this.$showtoast.show(params);
}
Vue.prototype.construction = function(params) {
	mountToBody(this, _construction, '$construction');
	this.$construction.show(params);
}
/**身份证验证**/
Vue.prototype.IdentityCodeValid = function(code) {
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	};
	var tip = "";
	var pass = true;

	var borithyear = code.substring(6, 10);
	var borithmoth = code.substring(10, 12);
	var borithday = code.substring(12, 14);
	var dateStr = borithyear + '-' + borithmoth + '-' + borithday;
	if(formatDate(new Date(dateStr)) != dateStr) {
		pass = false;
	} else if(!city[code.substr(0, 2)]) {
		tip = "地址编码错误";
		pass = false;
	} else {
		//18位身份证需要验证最后一位校验位
		if(code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for(var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]) {
				tip = "身份证号码填写错误";
				pass = false;
			}
		} else {
			pass = false;
		}

	}
	return pass;
}

function formatDate(date, format) {
	if(!date) return;
	if(!format) format = "yyyy-MM-dd";
	switch(typeof date) {
		case "string":
			date = new Date(date.replace(/-/, "/"));
			break;
		case "number":
			date = new Date(date);
			break;
	}
	if(!date instanceof Date) return;
	var dict = {
		"yyyy": date.getFullYear(),
		"M": date.getMonth() + 1,
		"d": date.getDate(),
		"H": date.getHours(),
		"m": date.getMinutes(),
		"s": date.getSeconds(),
		"MM": ("" + (date.getMonth() + 101)).substr(1),
		"dd": ("" + (date.getDate() + 100)).substr(1),
		"HH": ("" + (date.getHours() + 100)).substr(1),
		"mm": ("" + (date.getMinutes() + 100)).substr(1),
		"ss": ("" + (date.getSeconds() + 100)).substr(1)
	};
	return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
		return dict[arguments[0]];
	});
}
export function getDateMsg(para,type, exp) {
	var date = new Date(para)
	if(type == 'day') {
		var day = date.getDay()
		switch(day) {
			case 1:
				return exp + "一";
				break;
			case 2:
				return exp + "二"
				break;
			case 3:
				return exp + "三"
				break;
			case 4:
				return exp + "四"
				break;
			case 5:
				return exp + "五"
				break;
			case 6:
				return exp + "六"
				break;
			case 0:
				return exp + "日"
				break;
			default:
				break;
		}
	}
}