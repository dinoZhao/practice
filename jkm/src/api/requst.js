import axios from 'axios'
import config from './api'
//查询知识标签
export const getKnowledgeTag = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/products/yqb?productCode=' + params.productCode;
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
// 远程门诊
export const getOutpatientRecord = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/outpatient/getOutpatientRecord';
    return axios(config).then(res => res && res.data);
}
// 查询预约专家列表
export const getRemoteClinic = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/getRemoteClinic';
    return axios(config).then(res => res && res.data);
}
//查询专家预约时间
export const getDoctorSchedule = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/getDoctorSchedule';
    return axios(config).then(res => res && res.data);
}
// 提交预约
export const submitAppointment = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/outpatient/submitAppointment';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//医生登录
export const userLogin = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/doctorLogin';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//获取所有患者列表
export const getAllPatients = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/fileEstablishment/getAllPatients';
    return axios(config).then(res => res && res.data);
}
//查询单个患者健康档案
export const getSinglePatients = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/fileEstablishment/getPatientArchives';
    return axios(config).then(res => res && res.data);
}
//查询单个病人健康档案历史数据
export const getSingleHistoryRecord=(params) =>{
	config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/fileEstablishment/getPatientHistoryData';
    return axios(config).then(res => res && res.data);
}
//健康体检-创建病历-开始检测
export const createMedicalRecord=(params) =>{
	config.method = "POST";
    config.params = {};
    config.data = JSON.stringify(params);
    config.url = '/integratedMachine/physicalExam/createMedicalRecord';
    return axios(config).then(res => res && res.data);
}
//预约记录接收接口
export const getAppointmentRecord=(params) =>{
	config.method = "GET";
    config.params = params;
    config.url = 'integratedMachine/physicalExam/getAppointmentRecord';
    return axios(config).then(res => res && res.data);
}
//查询健康体检全部记录
export const getAllAppointmentRecord=(params) =>{
	config.method = "GET";
    config.params = params;
    config.url = 'integratedMachine/physicalExam/getAllAppointmentRecord';
    return axios(config).then(res => res && res.data);
}
//疾病筛查结果
export const getExamScreening=(params) =>{
	config.method = "GET";
    config.params = params;
    config.url = 'integratedMachine/getExamScreening';
    return axios(config).then(res => res && res.data);
}
//建档
export const saveFileEstablishment = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/saveFileEstablishment';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//查询远程门诊全部记录
export const getOutpatientHistory = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/outpatient/getOutpatientHistory';
    return axios(config).then(res => res && res.data);
}
//刷身份证读取档案信息
export const readPatientMsg = (params) => {
    config.method = 'GET';
    config.params = params;
    config.url = '/integratedMachine/getFileEstablishment';
    return axios(config).then(res => res && res.data);
}

//查看今日任务
export const getTodayTasks = (params) => {
    config.method = 'GET';
    config.params = params;
    config.url = '/integratedMachine/getTodayMission';
    return axios(config).then(res => res && res.data);
}

//读取身份证
export const getFileEstablishment = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/getFileEstablishment';
    return axios(config).then(res => res && res.data);
}

//读取身份证
export const getSomethingDo = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/getTodoList';
    return axios(config).then(res => res && res.data);
}
//查患者信息
export const queryPatientInfoCommand = (params)=>{
	config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/queryPatientInfoCommand';
    return axios(config).then(res => res && res.data);
}
//确认预约
export const submitAppointmentCommand = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/submitAppointmentCommand';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//接入信息
export const clinicAppointmentAccess = (params)=>{
	config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/clinicAppointmentAccess';
    return axios(config).then(res => res && res.data);
}
//查询远程门诊接入信息
export const queryClinicAppointmentInfo = (params)=>{
	config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/queryClinicAppointmentInfo';
    return axios(config).then(res => res && res.data);
}
//查询是否已经建档
export const checkArchives = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/getFileEstablishmentStatus';
    return axios(config).then(res => res && res.data);
}

//诊疗完毕
export const rakeCareEnd = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/changeTreatStatus';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//上传文件
export const uploadFile = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/uploadFile';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//更新文件
export const updateAppointment = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/updateAppointment';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}

//健康体检-查询检测结果
export const getDetectionResult = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/physicalExam/getSingleDetectionResult';
    return axios(config).then(res => res && res.data);
}
//获取检测结果
export const getSingleDetectionResult = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = 'integratedMachine/physicalExam/getSingleDetectionResult';
    return axios(config).then(res => res && res.data);
}
//打印体检报告
export const printingReport = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/physicalExam/printMedicalRecord';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//更新提交报告时间
export const updatePhysicalExamTime = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/physicalExam/updatePhysicalExamTime';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//查询病历打印状态
export const getStatusPrint = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/physicalExam/getMedicalRecordPrintingStatus';
    return axios(config).then(res => res && res.data);
}
//跟新romeid
export const submitAppointmentRoomId = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/submitAppointmentRoomId';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//获取知识标签（优才计划）
export const getTagOfTalent = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/content/knowledge/classification';
    return axios(config).then(res => res && res.data);
}
//获取知识内容列表（优才计划）
export const getTalentContent = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/content/knowledge';
    return axios(config).then(res => res && res.data);
}
