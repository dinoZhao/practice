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
//公卫服务--查询健康体检表
export const queryHealthyCheck=(params) =>{
	config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/publicService/queryHealthyCheck';
    return axios(config).then(res => res && res.data);
}
//公卫服务-查询健康体检表列表2
export const queryHealthyCheckDetail=(params) =>{
	config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/publicService/queryHealthyCheckDetail';
    return axios(config).then(res => res && res.data);
}
//公卫服务-导入最新监测数据
export const queryHealthProperties=(params) =>{
	config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/publicService/queryHealthProperties';
    return axios(config).then(res => res && res.data);
}
//公卫服务-更新保存健康体检表
export const updateHealthyCheck=(params)=>{
	config.method = "POST";
	config.params = {}
	config.data = JSON.stringify(params)
	config.url = '/integratedMachine/publicService/updateHealthyCheck';
	return axios(config).then(res => res && res.data);
}
//远程门诊-查看病历
export const viewMedicalRecord=(params) =>{
	config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/outpatient/viewMedicalRecord';
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
    config.url = `course/liveBroadcasts`;
    return axios(config).then(res => res && res.data);
}
//一体机-体检数据保存
export const savePhysicalExamData = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/examUpload';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}

//血糖状态更新
export const updateglu = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/physicalExam/updatePhysicalExamGluCondition';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//查询建档记录（居民列表）
export const getResidentList = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/getFileEstablishmentRecords';
    return axios(config).then(res => res && res.data);
}
//体检记录列表（疾病筛查，健康体检）
export const getExamAndScreenList = (params) => {
    config.method = "GET";
    config.params = params;
    config.url = '/integratedMachine/getExamAndScreenList';
    return axios(config).then(res => res && res.data);
}
//主页-月度统计
export const getMonthlyLists = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/getDataStatistics';
  return axios(config).then(res => res && res.data);
}
export const getRecommend = () => {
  config.method = "GET";
  config.url = '/integratedMachine/getRecommend';
  return axios(config).then(res => res && res.data);
}
export const getTodayMission = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/getTodayMission';
  return axios(config).then(res => res && res.data);
}
//高血压随访列表
export const queryHBPFollowUp = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/publicService/queryHBPFollowUp';
  return axios(config).then(res => res && res.data);
}
//根据id查询高血压随访记录
export const querySingleHBPFollowUp = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/publicService/querySingleHBPFollowUp';
  return axios(config).then(res => res && res.data);
}
//添加高血压随访记录
export const postHBPFollowUp = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/publicService/postHBPFollowUp';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//健康体检表列表
export const queryHealthyCheckList = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/publicService/queryHealthyCheckList';
  return axios(config).then(res => res && res.data);
}
//公卫服务-查询个人档案
export const queryPersonalRecord = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/publicService/queryPersonalRecord';
  return axios(config).then(res => res && res.data);
}
//公卫服务-更新个人档案
 
export const updatePersonalRecord = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/publicService/updatePersonalRecord';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//公卫服务-查询归档列表
export const queryFollowHolders = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/publicService/queryFollowHolders';
  return axios(config).then(res => res && res.data);
}
//公卫服务-更新归档列表
 
export const addFollowHolder = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/publicService/addFollowHolder';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//打印报告pdf
export const getpdf = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/publicService/pdf';
  return axios(config).then(res => res && res.data);
}
//获取远程门诊地址
export const getAddress = (params)=>{
  config.method = "GET";
  config.params=params
  config.url = '/third/aid/exam/doctor/getReservationAddress';
  return axios(config).then(res => res && res.data);
}
//根据地区/医院查询预约专家医院/科室列表
export const getHospital = (params)=>{
  config.method = "GET";
  config.params=params
  config.url = '/integratedMachine/outpatient/getSpecialistDepartments';
  return axios(config).then(res => res && res.data);
}


//查询用户最新体检报告
export const getRecentExamRecord = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/getRecentExamRecord';
  return axios(config).then(res => res && res.data);
}

//远程门诊-过号
export const missClinicAppointment = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/missClinicAppointment';
  return axios(config).then(res => res && res.data);
}
//就诊
export const visitClinicAppointment = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/visitClinicAppointment';
  return axios(config).then(res => res && res.data);
}
//首页-任务完成情况
export const missionAccomplished = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/getTaskAccomplishment';
  return axios(config).then(res => res && res.data);
}
//首页-今日任务（数据统计）
export const getTaskStatistics = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/getTaskStatistics';
  return axios(config).then(res => res && res.data);
}
//首页-公卫统计
export const getServiceStatistics = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/getServiceStatistics';
  return axios(config).then(res => res && res.data);
}
//首页-检测统计
export const getExamStatistics = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/getExamStatistics';
  return axios(config).then(res => res && res.data);
}
//提交远程协诊请求requestAssistClinic
export const requestAssistClinic = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/assistClinic/requestAssistClinic';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//查询当天有排班的医生列表queryDoctorListToday
export const queryDoctorListToday = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/queryDoctorListToday';
  return axios(config).then(res => res && res.data);
}
//获取预约某医生的预约记录queryAppointmentDetailByDoctor
export const queryAppointmentDetailByDoctor = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/queryAppointmentDetailByDoctor';
  return axios(config).then(res => res && res.data);
}
//查询pad是否是单机（未连接盒子）
export const judgePadStandalone = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/judgePadStandalone';
  return axios(config).then(res => res && res.data);
}
//cancelAppointment
export const cancelAppointment = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/cancelAppointment';
  return axios(config).then(res => res && res.data);
}
//优才计划-直通车
export const getLiveShowList = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/throughTrain/getLiveShowList';
  return axios(config).then(res => res && res.data);
}
//优才计划-直通车-直通扶贫办
export const getLiveShowDetail = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/throughTrain/getLiveShowDetail';
  return axios(config).then(res => res && res.data);
}
//医生更新患者病历
export const doctorUpdatePhysicalExam = (data) => {
  config.method = "POST";
  config.url = '/integratedMachine/physicalExam/doctorUpdatePhysicalExam';
  config.params = {};
  config.data = JSON.stringify(data);
  return axios(config).then(res => res && res.data);
}
//rongyun/token
export const rongyunToken = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/chat/rongyun/token';
  return axios(config).then(res => res && res.data);
}
//优才计划-直通车-开播提醒
export const updateBroadcastReminder = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/throughTrain/updateBroadcastReminder';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//获取系统时间戳
export const getSystemCurrentTimeMillis = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/getSystemCurrentTimeMillis';
  return axios(config).then(res => res && res.data);
}
//胸痛今日检查
export const getTodayExamList = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/cpc/getTodayExamList';
   return axios(config).then(res => res && res.data);
}
//胸痛中心更新今日检查
export const updateTodayExam = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/cpc/updateTodayExam';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//胸痛协诊列表
export const getCoDiagnosisList = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/cpc/getCoDiagnosisList';
   return axios(config).then(res => res && res.data);
}
//胸痛转诊列表
export const getReferralList = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/cpc/getReferralList';
   return axios(config).then(res => res && res.data);
}
//胸痛康复列表
export const getRecoveryList = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/cpc/getRecoveryList';
   return axios(config).then(res => res && res.data);
}
//胸痛更新已读未读状态
export const updateCpcCache = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/cpc/updateCpcCache';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//胸痛中心-数据汇总
export const getDataSummary = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/cpc/getDataSummary';
  return axios(config).then(res => res && res.data);
}

//查询pad系统消息
export const getSystemMessage = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/getSystemMessage';
  return axios(config).then(res => res && res.data);
}

//更新pad未读系统（当日）
export const updateUnreadSystemMessage = (data) => {
    config.method = 'POST';
    config.url = '/integratedMachine/updateUnreadSystemMessage';
    config.params = {};
    config.data = JSON.stringify(data);
    return axios(config).then(res => res && res.data);
}
//查询用户时间区间体检报告
export const getPeriodExamRecord = (params) => {
  config.method = "GET";
  config.params = params;
  config.url = '/integratedMachine/cpc/getPeriodExamRecord';
  return axios(config).then(res => res && res.data);
}
