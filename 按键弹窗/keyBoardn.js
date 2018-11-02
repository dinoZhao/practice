

	
	$.fn.keyBoard = function (params) {
		var isinput=true;
		var inputNum = params.inputNum || 6,//验证码位数
			captchaItemGroup = params.captchaItemGroup,//验证码节点
			inputNode = params.inputNode,//真实输入
			currentClassName = params.currentClassName,//当前item样式类名
			inputComplete = params.inputComplete,//输入完成回调函数
			captchaArr = [],//用数组来存储验证码过渡值
			keyboarddom='<div class="row safe-keyboard" id="safeKeyboard">' +
				'<div class="button" id="key1">1</div>' +
				'<div class="button" id="key2">2</div>' +
				'<div class="button" id="key3">3</div>' +
				'<div class="button" id="key4">4</div>' +
				'<div class="button" id="key5">5</div>' +
				'<div class="button" id="key6">6</div>' +
				'<div class="button" id="key7">7</div>' +
				'<div class="button" id="key8">8</div>' +
				'<div class="button" id="key9">9</div>' +
				'<div class="button" id=""></div>' +
				'<div class="button" id="key0">0</div>' +
				'<div class="button" id="keyDelete"></div></div>';
			var captchadom='<div class="captcha-box"><div class="captcha-container">'+
				'<p id="captcha-tel">验证码已发送至<span></span></p>'+
				'<span class="captcha-tips" id="receive-tips">重新发验证码<span>60</span> 秒</span>'+
				'<p class="captcha-tips" id="Send-again">重新发送</p>'+
				'<div id="captcha-groups" class="row">'+
					'<div class="blank"><span class="captcha-item"></span></div>'+
					'<div class="blank"><span class="captcha-item"></span></div>'+
					'<div class="blank"><span class="captcha-item"></span></div>'+
					'<div class="blank"><span class="captcha-item"></span></div>'+
					'<input type="hidden" name="" id="" value="" />'+
					'<div id="error-message" style="display: none;"><img src="./warn.png" />验证码错误，请重新输入</div>'+
				'</div><div class="close-btn"><img onclick="colseWin()" src="./close-icont.png" /></div>'+
			'</div></div>';
				
			var	keyBoardNode=$(keyboarddom+captchadom)
		
		$('body').append(keyBoardNode);
		$(this).on('touchend', function (e) {//点击输入框
			e.stopPropagation();
			e.preventDefault();
			if (e.currentTarget.id == 'captcha-groups') {
				inputNode.val('');
				captchaItemGroup.text('');
				captchaArr.splice(0, captchaArr.length);
				captchaItemGroup.removeClass(currentClassName)
			}
			keyBoardNode.show();
			if (captchaArr.length == 0) {
				captchaItemGroup.eq(0).addClass(currentClassName);
			}
		});
		
//		数字键点击事件
		keyBoardNode.find('.button').on('touchend', function (e) {
			if(isinput&&captchaArr.length>=4){
				captchaArr.splice(0, captchaArr.length);
				isinput=false;
			}
			e.stopPropagation();
			e.preventDefault();
			var $this = $(this), 
				itemId = $this.attr('id');
			captchaItemGroup.removeClass(currentClassName);
			if (itemId == 'keyDelete') {
				if (captchaArr.length < 1) return false;
				captchaItemGroup.eq(captchaArr.length - 1).text("");
				captchaArr.pop();				
			} else {
				if (itemId.indexOf('key') == -1) return false;
				$('.captcha-item').eq(captchaArr.length).text($this.text());
				
				captchaArr.push($this.text());
				if (captchaArr.length == inputNum) {
					keyBoardNode.hide();
					inputNode.val(captchaArr.join(''));
					inputComplete(inputNode.val());
				}
			}
			captchaItemGroup.eq(captchaArr.length < 2 ? 0 : captchaArr.length - 1).addClass(currentClassName);
		});
		
	}
	
	

