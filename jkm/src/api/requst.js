import axios from 'axios'
import config from './api'
//查询知识标签
export const getKnowledgeTag =(params)=>{
    config.method = "GET";
    config.params = params;
    config.url = '/products/yqb?productCode='+params.productCode;
    return axios(config).then(res => res && res.data);
}

// 取消关注问题、收藏文章、点赞
export const cancelAttention = (data) => {
    config.method = 'POST';
    config.url = '/notice/recordMessage';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}