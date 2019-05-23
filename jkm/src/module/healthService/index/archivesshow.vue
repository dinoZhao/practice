<template>
	<div class="archives">
		<div class="title">基本信息</div>
		<div class="content">
			<div class="item">
				<div>姓名</div>
				<div>{{name}}</div>
			</div>
			<div class="item">
				<div>性别</div>
				<div>{{gender}}</div>
			</div>
			<div class="item">
				<div>出生日期</div>
				<div>{{birthday}}</div>
			</div>
			<div class="item">
				<div>身份证号</div>
				<div>{{idNumber}}</div>
			</div>
			<div class="item">
				<div>民族</div>
				<div>{{nationality|setdefault}}</div>
			</div>
			<div class="item">
				<div>常住类型</div>
				<div>{{residentType|setdefault}}</div>
			</div>
			<div class="item">
				<div>血型</div>
				<div>{{bloodType|setdefault}}</div>
			</div>
			<div class="item">
				<div>RH阴性</div>
				<div>{{RH|setdefault}}</div>
			</div>
			<div class="item">
				<div>本人电话</div>
				<div>{{phoneNumber|setdefault}}</div>
			</div>
			<div class="item">
				<div>文化程度</div>
				<div>{{educationalLevel===''?'未填写':edulist[educationalLevel]}}</div>
			</div>
			<div class="item">
				<div>职业</div>
				<div>{{career===''?'未填写':employlist[career]}}</div>
			</div>
			<div class="item">
				<div>工作单位</div>
				<div>{{workUnits|setdefault}}</div>
			</div>
			<div class="item">
				<div>联系人姓名</div>
				<div>{{contactName|setdefault}}</div>
			</div>
			<div class="item">
				<div>联系电话</div>
				<div>{{contactNumber|setdefault}}</div>
			</div>
			<div class="item">
				<div>婚姻状况</div>
				<div>{{maritalStatus|setdefault}}</div>
			</div>
			<div class="longitem">
				<div>医疗费用支付方式</div>
				<div><span v-if="paymentMethod!=null" v-for="item in paymentMethod">{{item}}</span><span v-if="paymentMethod==null">未填写</span></div>
			</div>
			<div class="longitem">
				<div>药物过敏史</div>
				<div><span v-if="drugAllergyHistory!=null" v-for="item in drugAllergyHistory">{{item}}</span><span v-if="drugAllergyHistory==null">未填写</span></div>
			</div>
			<div class="longitem">
				<div>暴露史</div>
				<div><span v-if="exposureHistory!=null" v-for="item in exposureHistory">{{item}}</span><span v-if="exposureHistory==null">未填写</span></div>
			</div>
			<div class="longitem">
				<div>残疾情况</div>
				<div><span v-if="disability!=null" v-for="item in disability">{{item}}</span><span v-if="disability==null">未填写</span></div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				personUniqueId: '', //患者MCS唯一标识
				personDocumentId: '', //个人档案Id；调更新服务时,为空是创建，不为空是更新
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
				edulist: ['未填写	', "研究生", "大学本科", "大学专科和专科学校 ", "中等专业学校", "技工学校", "高中", "初中", "小学", "文盲或半文盲", "不详"],
				employlist: ["国家机关、党群组织、企业、事业单位负责人", "专业技术人员", "办事人员和有关人员", "商业、服务业人员", "农、林、牧、渔、水利业生产人员", "生产、运输设备操作人员及有关人员", "军人", "不便分类的其他从业人员", "无职业"]
			}
		},
		props: ["records"],
		inject: ['queryrecord'],
		activated() {
			this.queryrecord()
		},
		watch: {
			records(cur, pre) {

				Object.assign(this, cur)
				this.gender = this.gender === "1" ? '男' : this.gender === "0" ? '女' : '未填写'
				this.birthday = this.idNumber.slice(6, 10) + '-' + this.idNumber.slice(10, 12) + '-' + this.idNumber.slice(12, 14)
			},

		},
		filters: {
			setdefault(val) {
				if(val) {
					return val
				} else {
					return '未填写'
				}
			}
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
			display: flex;
			flex-wrap: wrap;
			margin-top: 0.12rem;
			.item {
				width: 26vw;
				display: inline-flex;
				line-height: 0.6rem;
				font-size: 0.3rem;
				&>div {
					width: 12.5vw;
				}
				&>div:first-child {
					text-align: right;
					margin-right: 1vw;
					color: #000;
				}
				&>div:last-child {
					text-align: left;
					color: #666;
				}
			}
			.longitem {
				display: inline-flex;
				line-height: 0.6rem;
				font-size: 0.3rem;
				width: 50vw;
				&>div:first-child {
					text-align: right;
					margin-right: 1vw;
					width: 12.5vw;
					color: #000;
				}
				&>div:last-child {
					text-align: left;
					width: 30vw;
					color: #666;
				}
				span{
					margin-right: 0.1rem;
				}
			}
		}
	}
</style>