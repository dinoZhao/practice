<template>
	<div class="healthservice">
		<div class="left" @click="transfer">
			<div class="item on">个人档案</div>
			<div class="item">健康体检表</div>
			<div class="item" v-if='bloodfloop'>高血压随访</div>
			<div class="item">门诊记录</div>
			<div class="item">转诊记录</div>
		</div>
		<div class="right">
			<div class="nav">
				<div class="tab" @click='tab'>
					<div class="tabitem" data-index='0' :class="{on:tabvalue==0}">个人档案</div>
					<div class="tabitem" data-index='1' :class="{on:tabvalue==1}">既往史</div>
					<div class="tabitem" data-index='2' :class="{on:tabvalue==2}">家族史</div>
					<div class="tabitem" data-index='3' :class="{on:tabvalue==3}">生活环境</div>
				</div>
				<div class="command">
					<div class="citem" v-if="renderarr[tabvalue]=='componentlist'"  @click="submit"><img src="~assets/save-btn.png" />保存</div>
					<div class="citem" v-if="renderarr[tabvalue]=='componentlist'"  @click="cancel"><img src="~assets/cancel-btn.png" />取消</div>
					<div class="citem"  v-if="renderarr[tabvalue]=='showlist'"  @click="edit"><img src="~assets/compile-btn.png" />编辑</div>
					<div class="citem" v-if="renderarr[tabvalue]=='showlist'"  @click="floop" ><img src="~assets/file-btn.png"/>归档</div>
					<div class="citem" v-if="renderarr[tabvalue]=='showlist'"  @click="wait"><img src="~assets/print-btn.png" />打印</div>
				</div>
			</div>
			<keep-alive>
				<component :records='records' ref="child" :is='mould'></component>
			</keep-alive>
			
		</div>
	</div>
</template>
<script>
	import {queryPersonalRecord,updatePersonalRecord,queryFollowHolders,addFollowHolder} from 'API/requst'
	import { getURLParameter, dateFormat } from 'utils/util'
	import archivesedit from './archivesedit'
	import archivesshow from './archivesshow'
	import hisedit from './hisedit'
	import hisshow from './hisshow'
	import mededit from './mededit'
	import medshow from './medshow'
	import environdedit from './environedit'
	import environshow from './environshow.vue'
	export default {

		name: 'index',
		components: {},
		provide: function() {
			return {
				updaterecord: this.updaterecord,
				queryrecord:this.queryrecord
			}
		},
		data() {
			return {
				tabvalue: 0,
				componentlist:['archivesedit','hisedit','mededit','environdedit'],
				showlist:['archivesshow','hisshow','medshow','environshow'],
				records:{},
				personUniqueId:'',
				bloodfloop:false,
				renderarr:['showlist','showlist','showlist','showlist']
			}
		},
		methods: {
			tab(e){
				this.tabvalue=e.target.dataset.index
			},
			transfer(e){
				var self=this;
				switch (e.target.innerText){
					case "健康体检表":
					location.href='./healthList.html'
						break;
							case "高血压随访":
					location.href='./hypertension.html'
					break;
						case "个人档案":
					break;
					default:
					self.construction()
						break;
				}
				console.log(e.target.innerText)
			},
			queryrecord(){
				var self=this;
				queryPersonalRecord({
					personId:sessionStorage.getItem('personId')
				}).then(function(res){
					self.records=res.result
				})
			},
			updaterecord(para){
				var self=this;
				updatePersonalRecord(para).then(function(){
					self.$set(self.renderarr,self.tabvalue,'showlist')
					self.alertDefault({
			        text: '保存成功',
			        rowButton: true
			      });
				})
			},
			submit(){
				this.$refs.child.update()
			},
			edit(){
				this.$set(this.renderarr,this.tabvalue,'componentlist')
			},
			cancel(){
				this.$refs.child.queryrecord()
				this.$set(this.renderarr,this.tabvalue,'showlist')
			},
			confirmcb(){
				var self=this;
				addFollowHolder({
					personId:sessionStorage.getItem('personId'),
					holdType:"highBP"
				}).then(function(){
					self.bloodfloop=true
				})
			},
			floop(){
				if(this.bloodfloop){
					this.showtoast('已经全部归档')
					return
				}
				this.globechoose({
				arr:['高血压随访'],
				confirmcb:this.confirmcb
			});
			},
			wait(){
				this.construction()
			}
		},
		components: {
			archivesedit,
			archivesshow,
			hisedit,
			hisshow,
			mededit,
			medshow,
			environdedit,
			environshow
			
		},
		created() {
			var self=this
			var personId = getURLParameter('personId');
		if(personId){
			sessionStorage.setItem('personId',personId)
		}
		this.queryrecord()
		queryFollowHolders({
			personId:sessionStorage.getItem('personId')
		}).then(function(res){
			if(res.holders.includes('highBP')){
				self.bloodfloop=true
			}
		})
		},
		computed:{
			mould:function(){
				
				return this[this.renderarr[this.tabvalue]][this.tabvalue]
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
	.healthservice {
		
	}
	
	.left {
		border-right: 1px solid #D9D9D9;
		height: 100%;
		flex-shrink: 0;
		.item {
			text-align: center;
		}
		.on {
			color: #fff;
			background: #3C9BFF;
		}
	}
	
	.right {
		width: 83%;
		.nav {
			height: 0.9rem;
			line-height: 0.9rem;
			display: flex;
			font-size: 0.32rem;
			justify-content: space-between;
			border-bottom: 1px solid #D9D9D9;
			&>div {
				display: inline-flex;
			}
			.command {
				img {
					width: 0.5rem;
					height: 0.5rem;
					vertical-align: middle;
					margin-right: 0.1rem;
				}
				.citem {
					width: 1.5rem;
					color: #3C9BFF;
				}
				margin-right:0.4rem;
			}
			.tab {
				margin-left: 0.4rem;
				.tabitem {
					width: 1.8rem;
					text-align: center;
				}
				.on {
					color: #3C9BFF;
					border-bottom: 0.04rem solid #3C9BFF;
				}
			}
		}
	}
</style>
<style type="text/css">
	
/*公卫服务公共样式开始*/

.healthservice {
	font-size: 0.28rem;
	width:calc(100% - 200px);
	margin-left: 200px;
	height: 100%;
	display: flex;
}


/*左侧蓝色线*/

.healthservice .lineleft {
	width: 0.04rem;
	height: 0.3rem;
	background: #3C9BFF;
}


/*通用input*/

.healthservice input ,.healthservice select{
	width: 19vw;
	height: 0.6rem;
	border: 1px solid #999;
	border-radius: 0.12rem;
	padding-left: 0.1rem;
}
/*左边导航*/
.healthservice .left{
	width: 16.8%;
}
/*导航具体项目*/
.healthservice .left .item{
	height: 0.9rem;
	line-height: 0.9rem;
	width: 100%;
}
/*大input*/

.healthservice input.big {
	width: 35vw
}


/*小input*/

.healthservice input.small {
	width: 15vw
}


/*选择按钮*/

.healthservice .select {
	display: inline-block;
	width: 2.3rem;
	line-height: 0.55rem;
	font-size: 0.23rem;
	border-radius: 7px;
	color: #fff;
	background: rgba(60, 155, 255, 1);
	text-align: center;
}


/*检测按钮*/

.healthservice .detect {
	display: inline-block;
	line-height: 0.6rem;
	border: 1px solid #3C9BFF;
	padding: 0 0.35rem;
	font-size: 0.26rem;
	border-radius: 0.1rem;
	color: #3C9BFF;
}
/*选择框未选中*/
.healthservice .selectbox{
	width:0.5rem;
	height:0.5rem;
	border: 1px solid #999999;
	background: #FFFFFF;
	border-radius: 0.3rem;
}
/*选择框选中*/
.healthservice .selectbox.on{
	background: url(../../../assets/already.png);
	background-size: 100%;
	border: 1px solid #3C9BFF;
}
/*公卫服务公共样式结束*/
</style>