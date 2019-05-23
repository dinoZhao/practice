<template>
	<div class="archives">
		<div class="title">基本信息</div>
		<div class="content">
			<div class="basic">
				<div class="item">
					<div>姓名</div><input placeholder="请输入" readonly  v-model="name" type="text" /></div>
				<div class="item">
					<div>性别</div>
					<!--<select v-model='gender' readonly  name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="1"  disabled="disabled">男</option>
						<option value="0"  disabled="disabled">女</option>
					</select>-->
					<input placeholder="请输入" readonly  :value="gender==='1'?'男':'女'" type="text" />
				</div>
				<div class="item">
					<div>出生日期</div><input :value="birthday" placeholder="" readonly type="text" /></div>
				<div class="item">
					<div>身份证号</div><input placeholder="请输入" readonly  v-model="idNumber" type="text" /></div>
				<div class="item">
					<div>民族</div>
					<select v-model="nationality" name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="汉族">汉族</option>
						<option value="少数民族">少数民族</option>
					</select>
					</div>
				<div class="item">
					<div>常住类型</div>
					<select v-model="residentType" name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="户籍">户籍</option>
						<option value="非户籍">非户籍</option>
					</select>
				</div>
				<div class="item">
					<div>血型</div>
					<select v-model='bloodType' name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="A型">A型</option>
						<option value="B型">B型</option>
						<option value="O型">O型</option>
						<option value="AB型">AB型</option>
						<option value="不详">不详</option>
					</select>
				</div>
				<div class="item">
					<div>RH阴性</div>
					<select v-model="RH" name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="阴性">阴性</option>
						<option value="阳性">阳性</option>
						<option value="不详">不详</option>
					</select>
				</div>
				<div class="item">
					<div>本人电话</div><input v-model="phoneNumber" placeholder="请输入" type="tel" /></div>
				<div class="item">
					<div>文化程度</div>
					<select v-model="educationalLevel" name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="1">研究生</option>
						<option value="2">大学本科</option>
						<option value="3">大学专科和专科学校</option>
						<option value="4">中等专业学校</option>
						<option value="5">技工学校</option>
						<option value="6">高中</option>
						<option value="7">初中</option>
						<option value="8">小学</option>
						<option value="9">文盲或半文盲</option>
						<option value="10">不详</option>
					</select>
				</div>
				<div class="item">
					<div>职业</div>
					<select v-model="career" name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="0">国家机关、党群组织、企业、事业单位负责人</option>
						<option value="1">专业技术人员</option>
						<option value="2">办事人员和有关人员</option>
						<option value="3">商业、服务业人员</option>
						<option value="4">农、林、牧、渔、水利业生产人员</option>
						<option value="5">生产、运输设备操作人员及有关人员</option>
						<option value="6">军人</option>
						<option value="7">不便分类的其他从业人员</option>
						<option value="8">无职业</option>
					</select>
				</div>
				<div class="item">
					<div>工作单位</div><input v-model="workUnits" placeholder="请输入" type="text" /></div>
				<div class="item">
					<div>联系人姓名</div><input v-model="contactName" placeholder="请输入" type="text" /></div>
				<div class="item">
					<div>联系电话</div><input v-model="contactNumber" placeholder="请输入" type="tel" /></div>
				<div class="item">
					<div>婚姻状况</div>
					<select v-model="maritalStatus" name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="未婚">未婚</option>
						<option value="已婚">已婚</option>
						<option value="丧偶">丧偶</option>
						<option value="离婚">离婚</option>
						<option value="未说明的婚姻状况">未说明的婚姻状况</option>
					</select>
				</div>
			</div>
			<div class="more">
				<div class="detail">
					<div class="title">医疗费用支付方式</div>
					<div class="payselect paymentMethod" data-type='paymentMethod' @click="choose">
						<div class="item item1">
							<div class="selectbox"></div>
							<div>城镇职工基本医疗保险</div>
						</div>
						<div class="item item1">
							<div class="selectbox"></div>
							<div>城镇居民基本医疗保险</div>
						</div>
						<div class="item item1">
							<div class="selectbox"></div>
							<div>新型农村合作医疗</div>
						</div>
						<div class="item item1">
							<div class="selectbox"></div>
							<div>贫困救助</div>
						</div>
						<div class="item item1">
							<div class="selectbox"></div>
							<div>商业医疗保险</div>
						</div>
						<div class="item item1">
							<div class="selectbox"></div>
							<div>全公费</div>
						</div>
						<div class="item item1">
							<div class="selectbox"></div>
							<div>全自费</div>
						</div>
						<div class="item item1">
							<div class="selectbox"></div>
							<div>其他</div>
						</div>
					</div>
				</div>
				<div class="detail">
					<div class="title">药物过敏史</div>
					<div class="payselect drugAllergyHistory" data-type='drugAllergyHistory' @click="choose">
						<div class="item item3  default">
							<div class="selectbox"></div>
							<div>无</div>
						</div>
						<div class="item item3">
							<div class="selectbox"></div>
							<div>青霉素</div>
						</div>
						<div class="item item3">
							<div class="selectbox"></div>
							<div>磺胺</div>
						</div>
						<div class="item item3">
							<div class="selectbox"></div>
							<div>链霉素</div>
						</div>
						<div class="item item3">
							<div class="selectbox"></div>
							<div>其他</div>
						</div>
					</div>
				</div>
				<div class="detail">
					<div class="title">暴露史</div>
					<div class="payselect exposureHistory" data-type='exposureHistory' @click="choose">
						<div class="item item3  default">
							<div class="selectbox"></div>
							<div>无</div>
						</div>
						<div class="item item3">
							<div class="selectbox"></div>
							<div>化学品</div>
						</div>
						<div class="item item3">
							<div class="selectbox"></div>
							<div>毒物</div>
						</div>
						<div class="item item3">
							<div class="selectbox"></div>
							<div>射线</div>
						</div>
					</div>
				</div>
				<div class="detail">
					<div class="title">残疾情况</div>
					<div class="payselect disability" data-type='disability' @click="choose">
						<div class="item item4 default">
							<div class="selectbox"></div>
							<div>无残疾 </div>
						</div>
						<div class="item item4">
							<div class="selectbox"></div>
							<div>视力残疾</div>
						</div>
						<div class="item item4">
							<div class="selectbox"></div>
							<div>听力残疾</div>
						</div>
						<div class="item item4">
							<div class="selectbox"></div>
							<div>言语残疾</div>
						</div>
						<div class="item item4">
							<div class="selectbox"></div>
							<div>肢体残疾</div>
						</div>
						<div class="item item4">
							<div class="selectbox"></div>
							<div>智力残疾</div>
						</div>
						<div class="item item4">
							<div class="selectbox"></div>
							<div>精神残疾</div>
						</div>
						<div class="item item4">
							<div class="selectbox"></div>
							<div>其他残疾</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getURLParameter, dateFormat } from 'utils/util'
	import {queryPersonalRecord} from 'API/requst'
	
	export default {
		data() {
			return {
				personUniqueId:'',//患者MCS唯一标识
				personDocumentId:'',//个人档案Id；调更新服务时,为空是创建，不为空是更新
				name: '', //姓名
				gender: '', //性别
				birthday: '', //出生日期
				idNumber: '', //身份证
				nationality: '', //民族
				residentType: '', //常住类型
				bloodType: '', //血型
				RH: '',
				phoneNumber: '', //电话
				educationalLevel: '', //文化程度
				career: '', //职业
				workUnits: '', //工作单位
				contactName: '', //联系人
				contactNumber: '', //联系人电话
				maritalStatus: '', //婚姻状况
				paymentMethod: [], //医疗费用支付方式
				drugAllergyHistory: [], //药物过敏史
				exposureHistory: [], //暴露史
				disability: [], //残疾
				records:{}
			}
		},
		inject: ['updaterecord'],
		created() {
			this.queryrecord()
		},
		mounted() {

		},
		watch: {
			records(cur, pre) {
				Object.assign(this, cur)
				this.layout('paymentMethod',this.paymentMethod)
				this.layout('drugAllergyHistory',this.drugAllergyHistory)
				this.layout('exposureHistory',this.exposureHistory)
				this.layout('disability',this.disability)
				this.birthday=cur.idNumber.slice(6, 10) + '-' + cur.idNumber.slice(10, 12) + '-' + cur.idNumber.slice(12, 14)
			},
			idNumber(cur) {
				this.birthday = cur.slice(6, 10) + '-' + cur.slice(10, 12) + '-' + cur.slice(12, 14)
			}
		},
		computed: {
           
		},
		activated() {
			
		},
		methods: {
			queryrecord(){
				var self=this;
				queryPersonalRecord({
					personId:sessionStorage.getItem('personId')
				}).then(function(res){
					self.records=res.result
				})
			},
			choose(e) {
				var target = e.target
				if(!target.classList.contains("selectbox")){
					return
				}
				//多选规则开始
				var current=e.currentTarget
				if(current.dataset['type']!='paymentMethod'){//有冲突规则的情况
					if(target.parentNode.classList.contains("default")){
						var length=current.children.length
						if(target.classList.contains("on")){
							target.classList.remove('on')
						}else{
							for(var i=0;i<length;i++){
							current.children[i].firstChild.classList.remove('on')
						}
							target.classList.add('on')
						}
					}else{
						if(current.getElementsByClassName('default')[0].firstChild.classList.contains("on")){
							
							current.getElementsByClassName('default')[0].firstChild.classList.remove('on')
						}
								var classlist = target.classList
								if(classlist.contains("selectbox")) {
									if(classlist.contains("on")) {
										classlist.remove('on')
									} else {
										classlist.add('on')
									}
								}
					}
				}else{//如果是支付方式
					var classlist = target.classList
				if(classlist.contains("selectbox")) {
					if(classlist.contains("on")) {
						classlist.remove('on')
					} else {
						classlist.add('on')
					}
				}
				}
				//多选规则结束
			},
			layout(type,str){
				if(!str){
//					var defaultdom=document.querySelector('.'+type).getElementsByClassName('default')[0]
//			        defaultdom.getElementsByClassName('selectbox')[0].classList.add('on')
					return
				}
				var arr=str;
				var dom=document.querySelector('.'+type).getElementsByClassName('item')
			    for(var i=0;i<dom.length;i++){
			    	if(arr.includes(dom[i].innerText)){
			    		dom[i].getElementsByClassName('selectbox')[0].classList.add('on')
			    	}
			    }
			},
			update(){
				var info={}
				Object.assign(info,this._data)    
				info.paymentMethod=this.gather('paymentMethod')
				info.drugAllergyHistory=this.gather('drugAllergyHistory')
				info.exposureHistory=this.gather('exposureHistory')
				info.disability=this.gather('disability')
				info.birthday=''
				this.updaterecord({personalRecord:info,personId:sessionStorage.getItem('personId')})
			},
			gather(type){
				var dom=document.querySelector('.'+type).getElementsByClassName('item')
				var arr=[]
				for(var i=0;i<dom.length;i++){
			    	if(dom[i].getElementsByClassName('selectbox')[0].classList.contains('on')){
			    	   arr.push(dom[i].innerText)
			    	}
			    }
				if(arr.length){
					return arr
				}else{
					return []
				}
				
			},
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
	* {
		box-sizing: border-box;
	}
	
	.archives {
		width: 100%;
		padding: 0.4rem;
		font-size: 0.3rem;
		height: calc(100% - 0.95rem);
		overflow: scroll;
		&>.title {
			width: 1.7rem;
			line-height: 0.5rem;
			background: rgba(60, 155, 255, 0.10);
			border-radius: 0.33rem;
			color: #3C9BFF;
			text-align: center;
		}
		.content {
			.basic {
				display: flex;
				flex-wrap: wrap;
				&>.item {
					display: inline-flex;
					width: 50%;
					justify-content: flex-end;
					margin-bottom: 0.2rem;
					&>div {
						width: 9vw;
						text-align: right;
						margin-right: 0.2rem;
						line-height: 0.6rem;
					}
					input,
					select {
						border: 1px solid #666666;
						border-radius: 0.12rem;
						padding-left: 0.1rem;
						flex-shrink: 0;
						font-size: 0.3rem;
						background: #fff;
					}
				}
			}
			.more {
				.detail {
					display: flex;
					.title {
						width: 2.6rem;
						text-align: right;
						padding-right: 0.2rem;
					}
				}
				.payselect {
					width: calc(100% - 2.6rem);
					&>.item {
						display: inline-flex;
						margin-bottom: 0.2rem;
					}
					.item1 {
						width: 45%;
					}
					.item2 {
						width: 28%;
					}
					.item3 {
						width: 19%;
					}
					.item4 {
						width: 23%;
					}
					.selectbox {
						margin-right: 0.1rem;
					}
				}
			}
		}
	}
	.disable{
		input,select{
			border-color: #eee!important;
		}
		.item{
			color: #999;
		}
		
	}
</style>