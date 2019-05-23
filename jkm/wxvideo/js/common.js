function alertDefault(msg, func,title) {
	if (!title){title="提示"};
	var floatWin = $("<div class='win'><div class='win-shadow'></div><div class='win-box'><div class='win-tit'>"+title+"</div>" +
		"<div class='win-cnt text-center'>" + msg + "</div><div class='win-bot'><a class='btn' id='iKnow'>我知道了</a></div></div></div>");

    floatWin.find('#iKnow, .win-shadow').on('click', function(e){
    	e.stopPropagation();
		e.preventDefault();
        floatWin.remove();
        if (func)
        func();
    });
	$('body').append(floatWin);
}
//转化number
function toNum(val) {
	if (typeof val == 'number') {
		return val;
	} else if (typeof val == 'string') {
		return parseFloat(val.formatNumber(false));
	} else {
		return 0;
	}
}
String.prototype.formatNumber = Number.prototype.formatNumber = function (thousSep, decimalSize, sign) {
	if (typeof thousSep == 'undefined') {
		thousSep = true;
	}
	if (typeof decimalSize == 'undefined') {
		decimalSize = false;
	}

	var num = parseFloat((this + '').replace(/[^eE\d\.\-]+/g, ''));
	if (isNaN(num)) {
		num = 0;
	}
	if (typeof sign !== 'undefined' && sign && num >= 0) {
		sign = '+';
	} else {
		sign = '';
	}
	if (decimalSize !== false) {
		num = num.toFixed(decimalSize);
	}
	num += '';
	if (thousSep) {
		var matches = num.match(/^(-?(?:\d{1,2})??)((?:\d{3})*)((?:\.\d*)?)$/);
		if (matches) {
			num = matches[1].replace(/^(-?\d+)$/, function (match) {
				if (matches[2]) {
					return match + ',';
				} else {
					return match;
				}
			}) + matches[2].replace(/\d{3}/g, function (match, index) {
				if (index == 0) {
					return match;
				} else {
					return ',' + match;
				}
			}) + matches[3];
		}
	}
	return sign + num;
};
// 判断内容为空
function empty(input) {
	return (typeof input == 'undefined' || !input || /^\s*(null|0|undefined|false|no)\s*$/i.test(input) || (input instanceof Array && !input.length) || (typeof input == 'object' && ((!Object.keys(input).length) || (('length' in input) && !input.length))));
}
function processNumeric(data) {
	if (typeof data == 'object') {
		for (var i in data) {
			var val = data[i];
			switch (typeof val) {
				case 'string':
					if (/^[+\-]?\d+(\.\d+)?$/.test(val) && !(/^0\d+$/.test(val)) && (1*val < Number.MAX_SAFE_INTEGER)) {
						data[i] = toNum(val);
					}
					break;
				case 'object':
					processNumeric(val);
					break;
			}
		}
	}
}

function invoke(func, args, invoker) {
	if (!(args instanceof Array)) {
		args = [];
	}
	if (!invoker) {
		invoker = this;
	}
	if (!(args instanceof Array)) {
		args = [];
	}
	if (typeof func == 'function') {
		return func.apply(invoker, args);
	}
	return true;
}

//防止重复提交ajax处理
function beforeSendHandle(XMLHttpRequest) {
	//设置请求头headers，加入token
	var accessToken = sessionStorage.getItem("accessToken");
	if (empty(accessToken)) {
		accessToken = localStorage.getItem('accessToken');
	}
	if (accessToken) {
		XMLHttpRequest.setRequestHeader("x-auth-token", accessToken);
	}
	XMLHttpRequest.setRequestHeader("AppId", '50815d32-64e5-4dc7-a5e1-13816ffd196f');
	XMLHttpRequest.setRequestHeader("appSecret", 'hdOv56nThwaZPfh0zP9x');
}

function doPost(requestUrl, parameters, onerror, noauth,noNum,isglobal) {
	var config = {
		type: "POST",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		data: parameters,
		url: requestUrl,
		contentType: "application/json; charset=utf-8",
		timeout:60000
	};
	if(isglobal){
		config.global=false;
	}
	if (requestUrl.indexOf('172.16.1.30:8002') == -1) {
		config.beforeSend = beforeSendHandle;
	}
	return $.ajax(config).fail(function (xhr) {
		default_errorCallback(xhr, onerror, noauth);
	}).done(function (data) {
		if(!noNum){
			processNumeric(data);
		}
	});
}

function doGet(requestUrl, parameters, onerror, noauth,noNum,isglobal) {
	if (typeof parameters == 'object') {
		var qStr = '';
		for (var i in parameters) {
			var param = parameters[i];
			if (typeof param == 'object') {
				param = JSON.stringify(param);
			}
			param += '';
			qStr += '&' + i + '=' + encodeURIComponent(param);
		}
		qStr = qStr.substring(1);
		if (qStr) {
			var mark = '?';
			if (requestUrl.indexOf('?') >= 0) {
				mark = '&';
			}
			requestUrl += mark + qStr;
		}
	}
	var config = {
		type: "GET",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: requestUrl,
		contentType: "application/json; charset=utf-8",
		timeout:60000
	};
	if(isglobal){
		config.global=false;
	}
	if (requestUrl.indexOf('172.16.1.30:8002') == -1) {
		config.beforeSend = beforeSendHandle;
	}
	return $.ajax(config).fail(function (xhr) {
		default_errorCallback(xhr, onerror, noauth);
	}).done(function (data) {
		if(!noNum){
			processNumeric(data);
		}
	});
}

function default_errorCallback(XMLHttpRequest, onerror, noauth) {
	if (XMLHttpRequest.statusText == 'timeout') {
		alertDefault('请求超时');
		return;
	}
	if (empty(noauth)) {
		//var isGoOn = authErrorHandle(XMLHttpRequest);
	} else {
		var isGoOn = true;
	}
	var errorMessage = XMLHttpRequest.responseText;
	if (!errorMessage) {
		return false;
	}
	var msg = JSON.parse(errorMessage).resultMessage;
	if (isGoOn && typeof onerror != 'function') {
		onerror = function (msg) {
			alertDefault(msg);
		};
	}
	return invoke(onerror, [msg], this);
}
window.nativeView={
	toast:function(options){
		if(nativeView.toast.isshowing){
			return;
		}
		if(typeof options==="string"){
			options={msg:options};
		}
		var msg=options.msg;
		var html='<div class="u-toast"><div class="toast-wrap"><div class="toast-msg-wrap"><p class="toast-bg"></p><p class="toast-msg">'+options.msg+'</p></div></div></div>';
		nativeView.toast.$html=$(html);
		$("body").append(nativeView.toast.$html);
		nativeView.toast.isshowing=true;
		var _time=options.showtime||2000;
		window.setTimeout(function(){
			nativeView.toast.$html.fadeOut(function(){
				nativeView.toast.$html.remove();
				nativeView.toast.isshowing=false;
			});
		},_time);
	}
	
};
function isNum(val) {
	if (typeof val == 'number') {
		return true;
	} else if (typeof val == 'string') {
		return 'NaN' === val || /^[+-]?(0|([1-9]\d{0,2}((,\d{3})*|\d*)))(\.\d+)?([eE]-?\d+)?$/g.test(val);
	} else {
		return false;
	}
}
function dateFormat(date, format) {
	if (!date) {
		return '';
	} else if (isNum(date)) {
		date = /^\d+$/g.test(date) ? new Date(1*date) : new Date(date);
	} else if (typeof date == 'string') {
		date = new Date(date);
	}
	format = format || 'Y-m-d';
	if (Object.prototype.toString.apply(date.getFullYear()) != '[object Number]') {
		date = new Date(0);
	}
	
	var year = date.getFullYear() + '';
	var month = (date.getMonth() + 1) + '';
	var day = date.getDate() + '';
	var weekDay = date.getDay() + '';
	var weekDay_ISO8601 = weekDay;
	if (weekDay_ISO8601 == '0') {
		weekDay_ISO8601 = 7;
	}
	var hours = date.getHours() + '';
	var minutes = date.getMinutes() + '';
	var seconds = date.getSeconds() + '';

	var d = new Date(date);
	d.setUTCMinutes(d.getUTCMinutes() - d.getTimezoneOffset());
	var week = d.toUTCString().substr(0, 3);
	var mon = d.toUTCString().substr(8, 3);

	var d = new Date(date);
	d.setDate(1);
	d.setMonth(d.getMonth() + 1);
	d.setHours(-1);
	var dayTotal = d.getDate();

	var weeks = {
		Mon: {
			en: 'Monday',
			cn: '一',
		},
		Tue: {
			en: 'Tuesday',
			cn: '二',
		},
		Wed: {
			en: 'Wednesday',
			cn: '三',
		},
		Thu: {
			en: 'Thursday',
			cn: '四',
		},
		Fri: {
			en: 'Friday',
			cn: '五',
		},
		Sat: {
			en: 'Saturday',
			cn: '六',
		},
		Sun: {
			en: 'Sunday',
			cn: '日',
		},
	};

	var months = {
		Jan: {
			en: 'January',
			cn: '一',
		},
		Feb: {
			en: 'February',
			cn: '二',
		},
		Mar: {
			en: 'March',
			cn: '三',
		},
		Apr: {
			en: 'April',
			cn: '四',
		},
		May: {
			en: 'May',
			cn: '五',
		},
		Jun: {
			en: 'June',
			cn: '六',
		},
		Jul: {
			en: 'July',
			cn: '七',
		},
		Aug: {
			en: 'August',
			cn: '八',
		},
		Sep: {
			en: 'September',
			cn: '九',
		},
		Oct: {
			en: 'October',
			cn: '十',
		},
		Nov: {
			en: 'November',
			cn: '十一',
		},
		Dec: {
			en: 'December',
			cn: '十二',
		},
	}

	return format
		.replace(/Y/g, year)
		.replace(/y/g, year.slice(-2))
		.replace(/m/g, ('0' + month).slice(-2))
		.replace(/n/g, month)
		.replace(/M/g, mon)
		.replace(/F/g, months[mon].en)
		.replace(/_F/g, months[mon].cn)
		.replace(/t/g, dayTotal)
		.replace(/j/g, day)
		.replace(/d/g, ('0' + day).slice(-2))
		.replace(/D/g, week)
		.replace(/l/g, weeks[week].en)
		.replace(/_l/g, weeks[week].cn)
		.replace(/w/g, weekDay)
		.replace(/N/g, weekDay_ISO8601)
		.replace(/H/g, ('0' + hours).slice(-2))
		.replace(/G/g, hours)
		.replace(/i/g, ('0' + minutes).slice(-2))
		.replace(/s/g, ('0' + seconds).slice(-2));
}

Date.prototype.format = function (format) {
	return dateFormat(this, format);
}
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)"); 
	var r =  window.location.search.substr(1).match(reg);
	var strValue = "";
	if (r!=null){
	 strValue= unescape(r[2]);
	}
	return strValue;
};