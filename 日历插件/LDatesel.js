window.LCalendar = (function() {
	var MobileCalendar = function() {
		this.gearDate=null;
		this.minY = 1900;
		this.minM = 1;
		this.minD = 1;
		this.maxY = 2099;
		this.maxM = 12;
		this.maxD = 31;
	}
	MobileCalendar.prototype = {
		init: function(params) {
			this.type = params.type;
			this.allowModify = params.allowModify;
			this.format = params.format || 'Y-m-d';//日期格式
			this.modifyTips = params.modifyTips;
			this.triggerEle = document.querySelector(params.trigger); 
			this.trigger = this.triggerEle.querySelector('input');
			this.oncomplete = params.oncomplete;
			this.onchange = params.onchange;
			this.onshow = function() {
				
			};
			this.onhide = function() {

			};

			if(this.trigger.tagName !== "INPUT") {
				var pltext = this.trigger.getAttribute("placeholder");
				this.trigger.setAttribute("title", pltext);
				this.trigger.innerHTML = pltext;
				var clsname = this.trigger.className;
				if(clsname.indexOf("clsname") < 0) {
					this.trigger.className = clsname + " placeholder";
				}

			}
			if(this.trigger.getAttribute("data-lcalendar") != null) {
				var arr = this.trigger.getAttribute("data-lcalendar").split(',');
				var minArr = arr[0].split('-');
				this.minY = ~~minArr[0];
				this.minM = ~~minArr[1];
				this.minD = ~~minArr[2];
				var maxArr = arr[1].split('-');
				this.maxY = ~~maxArr[0];
				this.maxM = ~~maxArr[1];
				this.maxD = ~~maxArr[2];
			}
			this.setMinDate(params.minDate);
			this.setMaxDate(params.maxDate);

			this.bindEvent(this.type);
		},
		setMinDate: function(datestr) {
			if(datestr) {
				var minArr = datestr.split('-');
				this.minY = ~~minArr[0];
				this.minM = ~~minArr[1];
				this.minD = ~~minArr[2];
			}
		},
		setMaxDate: function(datestr) {
			if(datestr) {
				var maxArr = datestr.split('-');
				this.maxY = ~~maxArr[0];
				this.maxM = ~~maxArr[1];
				this.maxD = ~~maxArr[2];
			}
		},
		closeCalendar: function() {
			if(this.gearDate != null) {
				document.body.removeChild(this.gearDate);
			}
			this.gearDate = null;
			this.onhide();
			window.LCalendar.hadOne = false;
			var evt;
			try {
				evt = new CustomEvent('input');
			} catch(e) {
				//兼容旧浏览器(注意：该方法已从最新的web标准中删除)
				evt = document.createEvent('Event');
				evt.initEvent('input', true, true);
			}
			this.triggerEle.dispatchEvent(evt);
		},
		bindEvent: function(type) {
			var _self = this;
			//呼出日期插件
			function popupDate(e) {
				e.stopPropagation();
				e.preventDefault();
				if(window.LCalendar.hadOne) {
					return;
				}
				if (!_self.allowModify) {
					if (!empty(_self.modifyTips)) {
//						如果不让修改,就提示话术
						alert(_self.modifyTips);
						return;
					}
				}
				_self.gearDate = document.createElement("div");
				_self.gearDate.className = "gearDate";
				_self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
					'<div class="date_btn_box">' +
					'<div class="date_btn lcalendar_cancel">取消</div>' +
					'<div class="date_btn lcalendar_clear">清空</div>' +
					'<div class="date_btn lcalendar_finish">完成</div>' +
					'</div>' +
					'<div class="date_roll_mask">' +
					'<div class="date_roll">' +
					'<div>' +
					'<div class="gear date_yy" data-datetype="date_yy"></div>' +
					'<div class="date_grid">' +
					'<div>年</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear date_mm" data-datetype="date_mm"></div>' +
					'<div class="date_grid">' +
					'<div>月</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear date_dd" data-datetype="date_dd"></div>' +
					'<div class="date_grid">' +
					'<div>日</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>';
				document.body.appendChild(_self.gearDate);

				var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
				lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
				var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
				lcalendar_finish.addEventListener('touchstart', finishMobileDate);
				var lcalendar_clear = _self.gearDate.querySelector(".lcalendar_clear");
				lcalendar_clear.addEventListener('touchstart', clearMobileDate);
				var date_yy = _self.gearDate.querySelector(".date_yy");
				var date_mm = _self.gearDate.querySelector(".date_mm");
				var date_dd = _self.gearDate.querySelector(".date_dd");
				date_yy.addEventListener('touchstart', gearTouchStart);
				date_mm.addEventListener('touchstart', gearTouchStart);
				date_dd.addEventListener('touchstart', gearTouchStart);
				date_yy.addEventListener('touchmove', gearTouchMove);
				date_mm.addEventListener('touchmove', gearTouchMove);
				date_dd.addEventListener('touchmove', gearTouchMove);
				date_yy.addEventListener('touchend', gearTouchEnd);
				date_mm.addEventListener('touchend', gearTouchEnd);
				date_dd.addEventListener('touchend', gearTouchEnd);

				_self.e_date_yy = date_yy;
				_self.e_date_mm = date_mm;
				_self.e_date_dd = date_dd;

				dateCtrlInit();

				_self.onshow();

				window.LCalendar.hadOne = true;
				e.preventDefault();
				e.stopPropagation();
				LCalendar.current = _self;
			}
			//初始化年月日插件默认值
			function dateCtrlInit() {
				var date = new Date();
				var dateArr = {
					yy: date.getFullYear(),
					mm: date.getMonth(),
					dd: date.getDate() - 1
				};
				var initV = _self.trigger.tagName === "INPUT" ? _self.trigger.value : _self.trigger.innerHTML;
				if(/^\d{4}-\d{1,2}-\d{1,2}$/.test(initV)) {
					rs = initV.match(/(^|-)\d{1,4}/g);
					dateArr.yy = rs[0] - _self.minY;
					dateArr.mm = rs[1].replace(/-/g, "") - 1;
					dateArr.dd = rs[2].replace(/-/g, "") - 1;
				} else {
					dateArr.yy = dateArr.yy - _self.minY;
					dateArr.mm = _self.minM - 1;
					dateArr.dd = _self.minD - 1;
				}
				_self.e_date_yy.setAttribute("val", dateArr.yy);
				_self.e_date_mm.setAttribute("val", dateArr.mm);
				_self.e_date_dd.setAttribute("val", dateArr.dd);
				setDateGearTooth();
			}

			//重置日期节点个数
			function setDateGearTooth() {
				var passY = _self.maxY - _self.minY + 1;
				var date_yy = _self.e_date_yy;
				var itemStr = "";
				if(date_yy && date_yy.getAttribute("val")) {
					//得到年份的值
					var yyVal = parseInt(date_yy.getAttribute("val"));
					//p 当前节点前后需要展示的节点个数
					for(var p = 0; p <= passY - 1; p++) {
						itemStr += "<div class='tooth'>" + (_self.minY + p) + "</div>";
					}
					date_yy.innerHTML = itemStr;
					var top = Math.floor(parseFloat(date_yy.getAttribute('top')));
					if(!isNaN(top)) {
						top % 2 == 0 ? (top = top) : (top = top + 1);
						top > 8 && (top = 8);
						var minTop = 8 - (passY - 1) * 2;
						top < minTop && (top = minTop);
						date_yy.style["transform"] = 'translate3d(0,' + top + 'em,0)';
						date_yy.style["-webkit-transform"] = 'translate3d(0,' + top + 'em,0)';
						date_yy.style["-ms-transform"] = 'translate3d(0,' + top + 'em,0)';
						date_yy.style["-moz-transform"] = 'translate3d(0,' + top + 'em,0)';
						date_yy.setAttribute('top', top + 'em');
						yyVal = Math.abs(top - 8) / 2;
						date_yy.setAttribute("val", yyVal);
					} else {
						date_yy.style["transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
						date_yy.style["-webkit-transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
						date_yy.style["-ms-transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
						date_yy.style["-moz-transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
						date_yy.setAttribute('top', 8 - yyVal * 2 + 'em');
					}
				} else {
					return;
				}
				var date_mm = _self.e_date_mm;
				if(date_mm && date_mm.getAttribute("val")) {
					itemStr = "";
					//得到月份的值
					var mmVal = parseInt(date_mm.getAttribute("val")) || 0;
					var maxM = 11;
					var minM = 0;
					//当年份到达最大值
					if(yyVal == passY - 1) {
						maxM = _self.maxM - 1;
					}
					//当年份到达最小值
					if(yyVal == 0) {
						minM = _self.minM - 1;
					}
					//p 当前节点前后需要展示的节点个数
					for(var p = 0; p < maxM - minM + 1; p++) {
						itemStr += "<div class='tooth'>" + (minM + p + 1) + "</div>";
					}
					date_mm.innerHTML = itemStr;
					if(mmVal > maxM) {
						mmVal = maxM;
						date_mm.setAttribute("val", mmVal);
					} else if(mmVal < minM) {
						mmVal = maxM;
						date_mm.setAttribute("val", mmVal);
					}
					date_mm.style["transform"] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
					date_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
					date_mm.style["-ms-transform"] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
					date_mm.style["-moz-transform"] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
					date_mm.setAttribute('top', 8 - (mmVal - minM) * 2 + 'em');
				} else {
					return;
				}
				var date_dd = _self.e_date_dd;
				if(date_dd && date_dd.getAttribute("val")) {
					itemStr = "";
					//得到日期的值
					var ddVal = parseInt(date_dd.getAttribute("val")) || 0;
					//返回月份的天数
					var maxMonthDays = calcDays(yyVal, mmVal);
					//p 当前节点前后需要展示的节点个数
					var maxD = maxMonthDays - 1;
					var minD = 0;
					//当年份月份到达最大值
					if(yyVal == passY - 1 && _self.maxM == mmVal + 1) {
						maxD = _self.maxD - 1;
					}
					//当年、月到达最小值
					if(yyVal == 0 && _self.minM == mmVal + 1) {
						minD = _self.minD - 1;
					}
					for(var p = 0; p < maxD - minD + 1; p++) {
						itemStr += "<div class='tooth'>" + (minD + p + 1) + "</div>";
					}
					date_dd.innerHTML = itemStr;
					if(ddVal > maxD) {
						ddVal = maxD;
						date_dd.setAttribute("val", ddVal);
					} else if(ddVal < minD) {
						ddVal = minD;
						date_dd.setAttribute("val", ddVal);
					}
					date_dd.style["transform"] = 'translate3d(0,' + (8 - (ddVal - minD) * 2) + 'em,0)';
					date_dd.style["-webkit-transform"] = 'translate3d(0,' + (8 - (ddVal - minD) * 2) + 'em,0)';
					date_dd.style["-ms-transform"] = 'translate3d(0,' + (8 - (ddVal - minD) * 2) + 'em,0)';
					date_dd.style["-moz-transform"] = 'translate3d(0,' + (8 - (ddVal - minD) * 2) + 'em,0)';
					date_dd.setAttribute('top', 8 - (ddVal - minD) * 2 + 'em');
				} else {
					return;
				}
			}

			//求月份最大天数
			function calcDays(year, month) {
				if(month == 1) {
					year += _self.minY;
					if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 4000 != 0)) {
						return 29;
					} else {
						return 28;
					}
				} else {
					if(month == 3 || month == 5 || month == 8 || month == 10) {
						return 30;
					} else {
						return 31;
					}
				}
			}
			//触摸开始
			function gearTouchStart(e) {
				e.preventDefault();
				var target = e.target;
				while(true) {
					if(!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break;
					}
				}
				clearInterval(target["int_" + target.id]);
				target["old_" + target.id] = e.targetTouches[0].screenY;
				target["o_t_" + target.id] = (new Date()).getTime();
				var top = target.getAttribute('top');
				if(top) {
					target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
				} else {
					target["o_d_" + target.id] = 0;
				}
				target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
			}
			//手指移动
			function gearTouchMove(e) {
				e.preventDefault();
				var target = e.target;
				while(true) {
					if(!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break;
					}
				}
				target["new_" + target.id] = e.targetTouches[0].screenY;
				target["n_t_" + target.id] = (new Date()).getTime();
				var f = (target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
				target["pos_" + target.id] = target["o_d_" + target.id] + f;
				target.style["transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
				target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
				target.style["-ms-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
				target.style["-moz-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
				target.setAttribute('top', target["pos_" + target.id] + 'em');
				if(e.targetTouches[0].screenY < 1) {
					gearTouchEnd(e);
				};
			}
			//离开屏幕
			function gearTouchEnd(e) {
				e.preventDefault();
				var target = e.target;
				while(true) {
					if(!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break;
					}
				}
				var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
				if(Object.prototype.toString.apply(flag) != '[object Number]'){
					return;
				}
				if(Math.abs(flag) <= 0.2) {
					target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
				} else {
					if(Math.abs(flag) <= 0.5) {
						target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
					} else {
						target["spd_" + target.id] = flag / 2;
					}
				}
				if(!target["pos_" + target.id]) {
					target["pos_" + target.id] = 0;
				}
				rollGear(target);
			}
			//缓动效果
			function rollGear(target) {
				var d = 0;
				var stopGear = false;

				function setDuration() {
					target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
					stopGear = true;
				}
				var passY = _self.maxY - _self.minY + 1;
				clearInterval(target["int_" + target.id]);
				target["int_" + target.id] = setInterval(function() {
					var pos = target["pos_" + target.id];
					var _spd = target["spd_" + target.id];
					var speed = (Object.prototype.toString.apply(_spd) != '[object Number]') ? 0 : _spd * Math.exp(-0.03 * d);
					pos += speed;
					if(Math.abs(speed) > 0.1) {} else {
						var b = Math.round(pos / 2) * 2;
						pos = b;
						setDuration();
					}
					if(pos > 8) {
						pos = 8;
						setDuration();
					}
					switch(target.dataset.datetype) {
						case "date_yy":
							var minTop = 8 - (passY - 1) * 2;
							if(pos < minTop) {
								pos = minTop;
								setDuration();
							}
							if(stopGear) {
								var gearVal = Math.abs(pos - 8) / 2;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "date_mm":
							var date_yy = _self.e_date_yy;
							//得到年份的值
							var yyVal = parseInt(date_yy.getAttribute("val")) || 0;
							var maxM = 11;
							var minM = 0;
							//当年份到达最大值
							if(yyVal == passY - 1) {
								maxM = _self.maxM - 1;
							}
							//当年份到达最小值
							if(yyVal == 0) {
								minM = _self.minM - 1;
							}
							var minTop = 8 - (maxM - minM) * 2;
							if(pos < minTop) {
								pos = minTop;
								setDuration();
							}
							if(stopGear) {
								var gearVal = Math.abs(pos - 8) / 2 + minM;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "date_dd":
							var date_yy = _self.e_date_yy;
							var date_mm = _self.e_date_mm;
							//得到年份的值
							var yyVal = parseInt(date_yy.getAttribute("val")) || 0;
							//得到月份的值
							var mmVal = parseInt(date_mm.getAttribute("val")) || 0;
							//返回月份的天数
							var maxMonthDays = calcDays(yyVal, mmVal);
							var maxD = maxMonthDays - 1;
							var minD = 0;
							//当年份月份到达最大值
							if(yyVal == passY - 1 && _self.maxM == mmVal + 1) {
								maxD = _self.maxD - 1;
							}
							//当年、月到达最小值
							if(yyVal == 0 && _self.minM == mmVal + 1) {
								minD = _self.minD - 1;
							}
							var minTop = 8 - (maxD - minD) * 2;
							if(pos < minTop) {
								pos = minTop;
								setDuration();
							}
							if(stopGear) {
								var gearVal = Math.abs(pos - 8) / 2 + minD;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "time_hh":
							if(pos < -38) {
								pos = -38;
								setDuration();
							}
							if(stopGear) {
								var gearVal = Math.abs(pos - 8) / 2;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "time_mm":
							if(pos < -110) {
								pos = -110;
								setDuration();
							}
							if(stopGear) {
								var gearVal = Math.abs(pos - 8) / 2;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						default:
					}
					target["pos_" + target.id] = pos;
					target.style["transform"] = 'translate3d(0,' + pos + 'em,0)';
					target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
					target.style["-ms-transform"] = 'translate3d(0,' + pos + 'em,0)';
					target.style["-moz-transform"] = 'translate3d(0,' + pos + 'em,0)';
					target.setAttribute('top', pos + 'em');
					d++;
				}, 16);
			}
			//控制插件滚动后停留的值
			function setGear(target, val) {
				val = Math.round(val);
				target.setAttribute("val", val);
				if(/date/.test(target.dataset.datetype)) {
					setDateGearTooth();
				} else {
					setTimeGearTooth();
				}
				finishMobileDate();
			}

			//取消
			function closeMobileCalendar(e) {
				e.preventDefault();
				var evt;
				try {
					evt = new CustomEvent('input');
				} catch(e) {
					//兼容旧浏览器(注意：该方法已从最新的web标准中删除)
					evt = document.createEvent('Event');
					evt.initEvent('input', true, true);
				}
				_self.triggerEle.dispatchEvent(evt);
				document.body.removeChild(_self.gearDate);
				_self.gearDate = null;
				_self.onhide();
				window.LCalendar.hadOne = false;
			}

			//清空日期输入框
			function clearMobileDate(e) {
				if(_self.trigger.tagName === "INPUT") {
					_self.trigger.value = "";
				} else {
					var pltext = _self.trigger.getAttribute("title");
					_self.trigger.innerHTML = pltext;
				}
				var clsname = _self.trigger.className;
				if(clsname.indexOf("clsname") < 0) {
					_self.trigger.className = clsname + " placeholder";
				}
				if(_self.onchange&&$("#app").length > 0) {
					_self.onchange("");
				}
				closeMobileCalendar(e);
			}
			//日期确认
			function finishMobileDate(e) {
				var passY = _self.maxY - _self.minY + 1;
				var date_yy = parseInt(Math.round(_self.e_date_yy.getAttribute("val")) || 0);//年
				var date_mm = parseInt(Math.round(_self.e_date_mm.getAttribute("val")) || 0) + 1;//月
				date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
				var date_dd = parseInt(Math.round(_self.e_date_dd.getAttribute("val")) || 0) + 1;
				date_dd = date_dd > 9 ? date_dd : '0' + date_dd;//日
				//格式化
				var lastV = _self.format.replace(/Y/g, date_yy % passY + _self.minY).replace(/m/g, date_mm).replace(/d/g, date_dd);
				if(_self.trigger.tagName === "INPUT") {
					_self.trigger.value = lastV;
				} else {
					_self.trigger.innerHTML = lastV;
				}
				//这是什么鬼
				var clsname = _self.trigger.className;
				clsname = clsname.replace("placeholder", "");
				_self.trigger.className = clsname;
				if(_self.onchange) {//数值改变
					_self.onchange(lastV);
				}
				if(e) {//完成
					closeMobileCalendar(e);
					if(_self.oncomplete) {
						_self.oncomplete(lastV);
					}
				}

			}

           _self.triggerEle.addEventListener('click', {
				"date": popupDate
			}[type]);
		}
		
//		bindevent结束
	}
//原型结束

	window.addEventListener("hashchange", function() {
		if(window.LCalendar.current) {
			window.LCalendar.current.closeCalendar();
		}

	});

	return MobileCalendar;

})();