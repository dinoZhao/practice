<template>
	<div class="ecgfur">
		<div class="requestmsg">
			<div class="comment" v-show="!assistDiagnosisStatus">
				<div class="result"><span style="margin-right: 0.2rem;">诊断结果</span><span style="color: #000;">{{diagnosis}}</span></div>
			</div>
			<div class="wait" v-show="assistDiagnosisStatus==='Unread'">远程协诊请求<span v-show="intense">({{intense?'加急':'不加急'}})</span>已发送，请耐心等待结果...</div>
			<div class="comment" v-show="assistDiagnosisStatus==='Read'">
				<div class="result"><span style="margin-right: 0.2rem;">诊断结果</span><span style="color: #000;">{{diagnosis}}</span></div>
				<div class="sign"><span style="margin-right: 0.2rem;">诊断医生</span><span style="margin-right: 0.8rem;">{{diagnosisDoctor}}</span><span style="margin-right: 0.2rem;">诊断时间</span><span>{{diagnosisTime}}</span></div>
			</div>
        </div>
		
		<div class="line lines">
			<div class="item">
				<div>HR(bpm)：</div><span>{{localdetact.HeartRateBPM}}</span></div>
			<div class="item">
				<div>PR(ms)：</div><span>{{localdetact.PRDurationMS}}</span></div>
			<div class="item">
				<div>QRS(ms)：</div><span>{{localdetact.QRSTimeLimitMS}}</span></div>
			<div class="item">
				<div>QT/QTc(ms)：</div><span>{{localdetact.QTDurationMS}}/{{localdetact.QTcDurationMS}}</span></div>
		</div>
		<div class="line lines">
			<div class="item">
				<div>P/QRS/T轴(° )：</div><span>{{localdetact.PElectricAxis}}/{{localdetact.QRSElectricAxis}}/{{localdetact.TElectricAxis}}</span></div>
			<div class="item">
				<div>RV5/SV1(mV)：</div><span>{{localdetact.RV5ValueMV}}/{{localdetact.SV1ValueMV}}</span></div>
			<div class="item">
				<div>RV5+SV1(mV)：</div><span v-if='localdetact.RV5ValueMV'>{{(Number(localdetact.RV5ValueMV)+Number(localdetact.SV1ValueMV)).toFixed(3)}}</span></div>
			<!--<div class="item">
				<div>PWidth(ms)：</div><span>{{localdetact.PWidth}}</span></div>-->
		</div>
		<div style="display: none;" class="btn btn2" @click="print">
			<img src="../../../assets/printing.png" />
			<div>{{printtext}}</div>
		</div>
		<div class="line linesingle">
			<div class="item">
				<div>工频滤波(Hz)：</div><span>100</span></div>
			<!--<div class="item">
				<div>基线漂移滤波(Hz)：</div><span>94</span></div>
			<div class="item">
				<div>肌电滤波(Hz)：</div><span>40Hz</span></div>-->
			<div class="item">
				<div>波形速率(mm/s)：</div><span>25</span></div>
			<div class="item">
				<div>灵敏度(mm/mV)：</div><span>10</span></div>
		</div>
		<viewer class='view'>
		<img :src="localdetact.ReportUrl" />
		<!--<img src="../../../assets/ecgsample.png" />-->
		</viewer>
		<div class="intense" :class="{un:requeststatus}"><img @click="intensify" :src="intense?sign1:sign2"/>加急处理</div>
		<div class="request" :class="{un:requeststatus}" @click="requestclinic">
			请求远程协助
		</div>
		<div class="save"   @click="next">
			确认
		</div>
		<queryhis class='querybtn'></queryhis>
	</div>
</template>

<script>
	var interval;
	import Viewer from 'v-viewer'
	import queryhis from './queryHis'
	import { printingReport, savePhysicalExamData,getStatusPrint,requestAssistClinic } from "API/requst"
	import sign1 from '../../../assets/already.png'
    import sign2 from '../../../assets/notyet.png'
	export default {
		props: ['detact','personId', 'recordId'],
		inject: ['getresult'],
		components:{
			queryhis
		},
		data() {
			return {
				localdetact: false,
				Options:{//预览插件配置
				"inline": true, "button": true, "navbar": false, "title": false, "toolbar": false, "tooltip": false,
				"movable": false, "zoomable": true, "rotatable": false, "scalable": false, "transition": true, 
				"fullscreen": true, "keyboard": false, "url": "data-source"
  		       },
  		       printtext:'打印',
  		       sign2,
  		       sign1,
  		       intense:0,
  		       requeststatus:false,
  		       assistDiagnosisStatus:'',
  		       diagnosis:'',
  		       diagnosisDoctor:'',
  		       diagnosisTime:''
  		       
			}
		},
		activated() {
			var self = this
			self.getresult()
			self.localdetact = self.detact["ecg"] || {}
			interval = setInterval(function() {
				self.getresult()
				self.localdetact = self.detact["ecg"] || {}
			}, 2000)
         
		},
		watch:{
			localdetact:{
				handler(cur){
					var vm=this
					this.assistDiagnosisStatus=cur.assistDiagnosisStatus
					vm.diagnosis=cur.diagnosis||cur.conclusion
				vm.diagnosisDoctor=cur.diagnosisDoctor
				var diagnosisTime=cur.diagnosisTime
				vm.diagnosisTime=diagnosisTime?new Date(diagnosisTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(diagnosisTime).toTimeString().substr(0, 5):''
				}
			}
		},
		created(){
			var vm=this
		Viewer.setDefaults({
			Options:vm.Options
		});
		},
		deactivated() {
			clearInterval(interval)
		},
		methods:{
			next(){
				this.showtoast('保存成功')
				this.$emit('nexttab','血压',true)
			},
			print() {
				this.printtext='打印中…'
				var vm = this;
				printingReport({
					recordId: vm.recordId,
					padDeviceCode: sessionStorage.getItem('padcode'),
					personId: vm.personId,
					type: 'ECG'
				}).then(res => {
					var interval=setInterval(function(){
					getStatusPrint({
                  	printId:res.printId
                    }).then(function(res){
                    	if(res.status=='InActive'){
                    		clearInterval(interval)
                    		vm.printtext='打印完成'
                    	}
                    })
					},1000)
                  
				})
			},
			intensify(){
				if(this.requeststatus===true){
					return
				}
				this.intense=this.intense==1?0:1
			},
			requestclinic(){
				var vm=this;
				if(this.requeststatus===true){
					return
				}
				requestAssistClinic({
					type:'exam',
					patientId:vm.personId,
					medicalRecordId:vm.recordId,
					doctorId: JSON.parse(sessionStorage.getItem('doctorMsg')).doctorId,
					urgent:vm.intense,
					subjectType:"Cardiology",
					hospital:'FuCongKJXZ',
					ProcedureType:'AssistClinic',
					symptom:''
				}).then(function(res){
					if(res.resultCode=='success'){
						vm.showtoast('提交成功')
						vm.requeststatus=true
					}else{
						vm.alertDefault({
						text: res.resultMessage,
						rowButton: true,
					})
					}
				}).catch(function(err){
					vm.alertDefault({
						text: err,
						rowButton: true,
					})
				})
			}
		}

	}
</script>

<style scoped="scoped" lang="scss">
     
	.ecgfur {
		padding: 0 0.6rem 0 0.6rem;
		box-sizing: border-box;
		position: relative;
		height: 100%;
		overflow: hidden;
		.unused{
			pointer-events: none;
		}
		.requestmsg{
			.wait{
				line-height: 0.73rem;
			text-align: center;
			color: #FC9452;
			font-size: 0.3rem;
			}
			.comment {
				width: 100%;
				color: #333;
				margin: 0.3rem 0;
				box-shadow: rgba(0, 0, 0, .2) 0 5px 10px;
				padding: 0 21px;
				box-sizing: border-box;
				.result {
					font-size: 20px;
					border-bottom: 1px solid #eee;
					padding: 0.25rem 0;
				}
				.sign {
					font-size: 18px;
					line-height: 0.8rem;
					text-align: right;
					padding-right: 0.2rem;
				}
			}
		}
		.btn {
			width: 1.5rem;
			height: 1.5rem;
			margin-bottom: 0.3rem;
			border: 0.02rem solid #3C9BFF;
			border-radius: 0.2rem;
			justify-content: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 0.28rem;
			color: #3C9BFF;
			position: absolute;
			top: 0.3rem;
			right: 0.6rem;
			img {
				width: 0.8rem;
				margin-bottom: 0.05rem;
			}
		}
		.line {
			line-height: 0.73rem;
			border-bottom: 1px solid #eee;
			display: flex;
			font-size: 0.24rem;
			.item {
				display: inline-flex;
				width: 24%;
				div {
					color: #666;
				}
			}
			&>div:first-child {
				flex-grow: 2;
			}
			&>div:nth-child(2) {
				flex-grow: 2;
			}
		}
		.lines {
			/*width: calc(100% - 2rem);*/
		}
		.linesingle {
			margin-top: 0.3rem;
		}
		&>.view {
			&>img{
					width: 100%;
					height: 100%;
			}
			width: 100%;
			height: calc(100% - 2.49rem);
			margin-bottom: 0.6rem;
		}
		.save {
			background: #3C9BFF;
			border-radius: 5px;
			width: 2.3rem;
			line-height: 0.9rem;
			text-align: center;
			font-size: 0.3rem;
			float: right;
			/*margin-top: 0.6rem;*/
			margin-right: 0.6rem;
			color: #fff;
			margin-bottom: 0.6rem;
			position: fixed;
			bottom: 0;
			right: 0;
		}
		.request{
			background: #FC9452;
			border-radius: 5px;
			width: 2.3rem;
			line-height: 0.9rem;
			text-align: center;
			font-size: 0.3rem;
			float: right;
			/*margin-top: 0.6rem;*/
			margin-right: 0.6rem;
			color: #fff;
			margin-bottom: 0.6rem;
			position: fixed;
			bottom: 0;
			left: calc(200px + (100% - 200px)* 0.168 + 3.2rem);
			
		}
		.request.un{
			background: #ccc;
		}
		.intense{
			border-radius: 5px;
			width: 2.3rem;
			line-height: 0.9rem;
			text-align: left;
			height: 0.9rem;
			font-size: 0.3rem;
			/*margin-top: 0.6rem;*/
			color: #333;
			margin-bottom: 0.6rem;
			position: fixed;
			bottom: 0;
			left: calc(200px + (100% - 200px)* 0.168 + 1rem);
			display: flex;
            align-items: center;
			img{
				width: 0.5rem;
				height: 0.5rem;
				margin-right: 0.1rem;
			}
		}
		.intense.un{
			color: #999;
		} 
		 .querybtn{
			line-height: 0.9rem;
			font-size: 0.3rem;
			float: right;
			margin-right: 0.6rem;
			margin-bottom: 0.6rem;
			position: fixed;
			bottom: 0;
			right: 3rem;
      }
	}
</style>