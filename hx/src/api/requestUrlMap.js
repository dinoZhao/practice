let urlMap = [
//	本地测试环境
	{
		originUrl: 'http://localhost:8020',
		requestUrl: 'http://172.16.1.90:8080'
	}, 
	{
		originUrl: 'http://127.0.0.1:8020',
		requestUrl: 'http://172.16.1.90:8080'
	},
//	{
//		originUrl: 'http://localhost:8081',
//		requestUrl: 'http://172.16.1.90:8080'
//	},
	{
		originUrl: 'http://localhost:8080',
		requestUrl: 'http://172.16.1.129:8080'
	},
	{
		originUrl: 'http://192.168.1.',
		requestUrl: 'http://172.16.1.90:8080'
	},
//	内网测试
	{
		originUrl: 'http://172.16.1.108',
		requestUrl: 'http://172.16.1.129:8080'
	}, 
	
	
//  预发&生产
{
		originUrl: 'http://106.75.215.117/',
		requestUrl: 'http://172.16.1.129:8080'
	},
	{
		originUrl: 'https://www.fc18.com.cn',
		requestUrl: 'https://www.fc18.com.cn'
	}
]

export default urlMap