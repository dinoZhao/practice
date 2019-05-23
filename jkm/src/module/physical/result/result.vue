<template>

	<div id="coat">
		<temp v-bind:headtxt=title></temp>
		<div class="fornative">
		<div class="content">
			<div class="left" v-on:click='tab($event)'>
				<div class="info">
					<img :src="personinfo.headUrl?personinfo.headUrl:require('../../../assets/headUrl.png')" />
					<div class="detail">
						<div class="" style="color: #333;font-size: 0.32rem;">
							{{personinfo.patientName}}
						</div>
						<div class="" style="color: #999;font-size: 0.26rem;">
							{{personinfo.patientSex}} {{personinfo.patientAge}}岁
						</div>
					</div>
				</div>
				<div class="inquire" v-if='rapidchannel' @click="inquire"><img src="../../../assets/all-record.png"/>全部记录</div>
				<div class="item" v-for="(item, index) in itemlist" v-bind:class="{ on:tablist[index]}">
					{{item}}
					<img v-if="tablist[index]&&status[index]" :src='sign2' />
					<img v-else-if="status[index]&&!tablist[index]" :src='sign1' />
					<img v-else-if="!status[index]&&ignorelist[index]&&!tablist[index]" :src='sign3' />

				</div>
               <div class="item" v-if='rapidchannel' v-for="(item, index) in rapidbackuplist" style="color: #bbb;">
					{{item}}
				</div>
				<div class="item" v-if='!rapidchannel&&planType=="preference"' v-for="(item, index) in backuplist" style="color: #bbb;">
					{{item}}
				</div>
				<div class="create" v-if="tabtoggle&&!rapidchannel||rapidchannel&&rapidtoggle">
					<div @click="report" >
					查看报告
				</div>
				</div>
				
			</div>
			<div class="right">
				<keep-alive>
					<component @liberate='tabtoggle=true' :tabtoggle='tabtoggle' v-on:promote='next' :recordId='recordId' :personId='personId' v-on:nexttab="tab" :detact='detactresult' v-bind:is="mould" :icon="icon" :showFooter='hidshow'></component>
				</keep-alive>
			</div>
		</div>
				
		</div>
	</div>

</template>
<script>
	//自定义方法
	import { getSingleDetectionResult as getresult, readPatientMsg, updatePhysicalExamTime } from "API/requst"
	import { getURLParameter } from "utils/util"
	import { mixin } from './leadin.js'
	export default {
		mixins: [mixin],
		data() {
			return {
				docmHeight: document.documentElement.clientHeight, //默认屏幕高度
				showHeight: document.documentElement.clientHeight, //实时屏幕高度
				hidshow: true, //显示或者隐藏footer
				padcode:'',
				rapidtoggle:false,//快速检测下，是否展示查看报告
			}
		},
		created() {
			var vm = this;
			//  页面传参
			var recordId = getURLParameter('recordId')
			var personId = getURLParameter('personId')
			sessionStorage.setItem('personId',personId)
			this.recordId = recordId
			this.personId = personId
			//初始化数据，获得测量结果以及获得个人信息
			this.getresult()
			this.getinfo()
			try {
				var padcode = window.android.getPadCode();
		  		vm.padcode = padcode;
		  		sessionStorage.setItem('padcode',padcode);
			} catch(err) {
				console.log(err);
			}
		},
		//依赖注入，不建议，但是代码清晰度高
		provide: function() {
			return {
				getresult: this.getresult,
				tab: this.tab,
				next: this.next
			}
		},
		methods: {
			//获取检测结果
			getresult() {
				var self = this;
				return getresult({
					"recordId": self.recordId
				}).then(function(res) {
					self.detactresult = res.result
					return res
				})
			},
			//切换项目tab,
			//e:将要切换目的dom内的文本，betray:是否为非tab点击触发
			tab(e, betray) {
				if(betray !== undefined) {
					var content = e
					// console.log(typeof(betray))
					// console.log(Number.isFinite(betray))
					if(Number.isFinite(betray)) { //如果是跳过
						this.$set(this.ignorelist, betray, true)
						if(betray == this.itemlist.length-1) {//如果是最后一个，即bmi，点了不做跳转
							return
						}
					} else { //如果是保存
						this.$set(this.ignorelist, betray, false)
					}
				} else {
					if(!this.tabtoggle && !this.rapidchannel) {//如果不是快速检测且没有测一遍，就不能点
						return
					}
					var content = e.target.innerText.replace(/\s+/g, "")
				}
				var index = this.itemlist.indexOf(content)
//				var index = this.itemlist.findIndex(function(item) {
//					return item == content
//				})
				//如果点到不可用项目
					if(this.rapidbackuplist.indexOf(content)>-1) {
					if(this.rapidchannel){
						//弹窗
						this.construction();
					}else{
						return
					}
				}
//				if(this.rapidbackuplist.findIndex(function(item) {
//					return item == content
//				})>-1) {
//					if(this.rapidchannel){
//						//弹窗
//						this.construction();
//					}else{
//						return
//					}
//				}
				//如果没点到tab有效的地方
				if(index < 0) {
					return
				}
				
				this.title = content;
				this.tablist=[false,false,false,false,false,false,false,false]
//				this.tablist.fill(false, 0, this.itemlist.length)
				this.$set(this.tablist, index, true)

			},
			//更改检测状态或方法
			next(para1, para2) {
				// console.log(para1, para2)
				this.$set(this.status, para1, para2)
			},
			//生成报告
			report() {
				var self = this
				updatePhysicalExamTime({
					"recordId": this.recordId,
					"personId":this.personId
				}).then(function(res) {
					var tablist=self.tablist;
				    var index=tablist.indexOf(true)
				var status=self.status.join('');
					window.location.href = './report.html?recordId=' + self.recordId + '&personId=' + self.personId+'&rapidindex='+index+'&status='+status
				})

			},
			//个人信息
			getinfo() {
				var self = this
				readPatientMsg({
					"padDeviceCode": sessionStorage.getItem('padcode'),
					"personId": self.personId
				}).then(function(res) {
					self.personinfo = res
				})
			},
			inquire(){
				window.location.href='../screening/allrecord.html?type=ksjc'
			}
		},
		watch: {
			showHeight: function() {
				if(this.docmHeight > this.showHeight) {
					this.hidshow = false
				} else {
					this.hidshow = true
				}
			},
			status:function(res){
				if(res.some(function(item){
					return item===1
				})){
					this.rapidtoggle=true
				}
			}
		},
		computed: {
			mould: function() {
				console.log(this.tablist)
				var tabindex = this.tablist.indexOf(true)
				var stepindex = this.status[tabindex]
				return this.statuslist[tabindex][stepindex]

			}
		},
		mounted() {
			if(getURLParameter("channel") == 'rapid') {
				this.rapidchannel = true
				if(!this.personId){
					this.alertDefault({
						text: '患者未登记，请先进行“身份证读取”',
						rowButton: true,
					})
				}
			}
			// window.onresize监听页面高度的变化
			window.onresize = () => {
				return(() => {
					if(document.activeElement.tagName === 'INPUT'){
				        document.activeElement.scrollIntoView({behavior: "smooth"})
				    }
					this.showHeight = document.body.clientHeight;
				})()
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
	@import "./leadin.scss";
	.fornative{
		height: 100%;
	}
</style>
<style type="text/css">

</style>