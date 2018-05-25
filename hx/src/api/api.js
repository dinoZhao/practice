import axios from 'axios'
import config from './config'
import requestUrlMap from './requestUrlMap'
import store from '../store/'


let requestUrl = window.location.protocol + '//' + window.location.host
let aaa = Promise.resolve('float like a butterfly')
requestUrl = requestUrl.indexOf('http://192.168.1.') > 0 ? 'http://192.168.1.' : requestUrl
requestUrlMap.forEach(function(itemObj) {
	if(requestUrl === itemObj.originUrl) {
		requestUrl = itemObj.requestUrl
	}
});
//在发送前更新token
let accessToken, xhrHeaderConfigs = {
	'Content-Type': 'application/json',
	'AppId': '079b8de8-0894-411b-aa48-853bb48f069d'
};
axios.interceptors.request.use(config => {
	accessToken = localStorage.getItem('accessToken');
	if(accessToken) { //本地存在时 添加表头x-access-token
		xhrHeaderConfigs['x-auth-token'] = accessToken;

		config.headers = xhrHeaderConfigs;
	};
	return config;
}, err => {
	console.error(err);
});
//在响应被 then 或 catch 处理前拦截它们,统一对401等系统错误的处理逻辑，参数为http状态码
axios.interceptors.response.use((response) => {
	return response
}, (error) => {
	for(var i in error){
		console.log(i)
	}
	let response = error && error.response;
	//401错误处理
	if(response.status == 401) {
		let preAuthUrl = window.location.href
		if(location.href.indexOf("login")<1) {
			localStorage.setItem("preAuthUrl", preAuthUrl)
		}
	     window.location.hash = "#/"
		return false
	}
store.commit('SETCUE',[response.data.resultMessage,"2","提示",true])
	
	console.log(response.data.resultMessage)
	return Promise.reject(error);

})

function dispose(data) {
	if(typeof data == "string") {
		return JSON.parse(data)
	} else {
		return data
	}
}
//接口实现类
class API {
	//	登录
	login(param) {
		return axios({
			method: 'post',
			headers: {
				"x-auth-token": localStorage.getItem('accessToken'),
				"AppId": "079b8de8-0894-411b-aa48-853bb48f069d"
			},
			url: requestUrl + '/aiaf/sgw/v1/security/login',
			data: param
		}).then(res => dispose(res.data));
	};
	//获得个人信息
	getProfile(param) {
		return axios({
			method: 'get',
			headers: {
				"x-auth-token": localStorage.getItem('accessToken'),
				"AppId": "079b8de8-0894-411b-aa48-853bb48f069d"
			},
			url: requestUrl + '/aiaf/sgw/v1/myprofile',
			data: param
		}).then(res => dispose(res.data));
	};
	//	退出
	logout(param) {
		return axios({
			method: 'post',
			headers: {
				"x-auth-token": localStorage.getItem('accessToken'),
				"AppId": "079b8de8-0894-411b-aa48-853bb48f069d"
			},
			url: requestUrl + '/aiaf/sgw/v1/security/logout',
			data: param
		}).then(res => dispose(res.data));
	};
	//  验证码登录
	//1.获得loginId
	getLoginId(param) {
		config.Method = "GET";
		config.params = param;
		return axios.get(requestUrl + '/aiaf/sgw/security/createLogin', config).then(res => dispose(res.data));
	};
	//2.验证手机是否已注册
	validateClientId(param) {
		config.Method = "GET";
		config.params = param;
		return axios.get(requestUrl + '/aiaf/sgw/security/validateClientId', config).then(res => dispose(res.data));
	};
	//3.发送验证码
	getCaptcha(param) {
		config.Method = "GET";
		config.params = param;
		return axios.get(requestUrl + '/aiaf/sgw/v1/security/smsCaptcha', config).then(res => dispose(res.data));
	};
	//4 验证码登录
	onlyLogin(param) {
		return axios({
			method: 'post',
			headers: {
				"x-auth-token": localStorage.getItem('accessToken'),
				"AppId": "079b8de8-0894-411b-aa48-853bb48f069d"
			},
			url: requestUrl + '/aiaf/sgw/v1/security/mobile/onlyLogin',
			data: param
		}).then(res => dispose(res.data));
	}
	//验证码登录结束
}

export default new API()