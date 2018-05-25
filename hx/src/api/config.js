import Qs from 'qs'

let accessToken, xhrHeaderConfigs = {
        'Content-Type':'application/json',
        'AppId': '079b8de8-0894-411b-aa48-853bb48f069d'
    };
accessToken =  localStorage.getItem('accessToken');
if (accessToken) {
    xhrHeaderConfigs['x-auth-token'] = accessToken;
}

export default {
    url: '',
    baseUrl: '',
    method: 'GET',
    transformRequest: [function (data) {
        data.CustData = JSON.stringify(data.CustData);
        data = Qs.stringify(data);
        return data;
    }],

    transformResponse: [function (data) {
        return data;
    }],

    headers: xhrHeaderConfigs,

    params: {
        
    },

    paramsSerializer: function(params) {
        return Qs.stringify(params)
    },

    data: {
        
    },

    //超时设置
    timeout: 60000,

    // default 表明是否有跨域请求需要用到证书 
	withCredentials: false, 

	responseType: 'json', 

	onUploadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},

    //download时执行的操作
	onDownloadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},

    //定义了接收到的response响应数据的最大长度。
	maxContentLength: 2000,

    //default 定义了根据HTTP响应状态码决定是否接收或拒绝获取到的promise。如果 validateStatus 返回 true (或设置为 null 或 undefined ),promise将被接收;否则,promise将被拒绝。 
	validateStatus: function (status) {
	    return status >= 200 && status < 300;
	},

    // default  定义了在Node.js中redirect的最大值，如果设置为0，则没有redirect。 
	maxRedirects: 5, 
}
