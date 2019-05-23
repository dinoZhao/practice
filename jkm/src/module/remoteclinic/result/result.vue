<template>
	<div class="fornative result">
		<div class="tip">
		<img src="~assets/orderresult.png"/>
		<div>
			<div style="font-weight: 600;">预约成功！</div>
      <div class="appointmentTime"><span>预约时间</span><span>{{date}}（{{day}}）  {{range}}</span></div>
			<div class="detail">请务必提前30分钟到达基层医生处准备远程就诊，如不能按时就诊，请提前一天与基层医生联系。</div>
		</div>
		</div>
		<div class="content">
			<div class="doctor item">
			<div class="same"><span class="part1">预约医生</span><span>{{orderdata.doctorName}}</span></div>
			<div class="same"><span class="part1">所属医院</span><span>{{orderdata.organization}}</span></div>
			</div>
			<div class="depart  item"><span class="part1">所属科室</span><span>{{orderdata.department}}</span></div>
      <div class="doctor item">
			<div class="patient same"><span class="part1">就诊患者</span><span>{{orderdata.patientName}}</span></div>
        <div class="same"><span class="part1">预约号码</span>
          <span>{{orderdata.clinicAppointmentId}}</span>
        </div>
      </div>
		</div>
		<div class="btn" @click.stop="printed" :class="{actived:active}" v-if="text!=='完成'">{{text}}</div>
    <div class="btn bg" @click.stop="transfer" v-if="text==='完成'">完成</div>
	</div>
</template>
<script>
	import { getURLParameter, dateFormat, empty,getDateMsg } from "utils/util";
	import { getRemoteClinic, getAddress, getHospital ,printingReport,getStatusPrint} from '../../../api/requst'
  var timer=null
	export default {
		data(){
		  return{
		  	orderdata:{},
		  	day:'', //日
		  	date:'', //预约时间
		  	range:'', //时间,
        recordId:'',
        text:'打印凭条',
        personId:sessionStorage.getItem('personId'),
        active:false,
        printId:''
		  }
		},
		methods:{
      transfer(){
        window.location.href = 'reservation.html?index=3'
      },
      async printed (){
        var vm=this
        vm.text='打印中...'
        vm.active=true
        var printId=vm.printId
        let params={
          "recordId":vm.orderdata.clinicAppointmentId,
          "padDeviceCode": sessionStorage.getItem('padCode'),
          "personId": sessionStorage.getItem('personId') ,
          "type": "ClinicAppointmentReceipt"
        }
        let result=await printingReport(params)
        console.log(result.printId);
        let parames={
          'printId':result.printId
        }
        if(!timer){
          timer=setInterval(function () {
            getStatusPrint(parames).then(data=>{
              if(data.status==='InActive'){
                clearInterval(timer)
                vm.text="完成"
                return false
              }
            })
          },1000)
        }
      },
      printingReport :function () {
      },
			addzero(para){
				para=para.toString()
				if(para.length<2){
					return "0"+para
				}else{
					return para
				}
			}
		},
		created(){
			this.orderdata=JSON.parse(sessionStorage.getItem('orderdata'))
			var startTime=this.orderdata.startTime
			var endTime=this.orderdata.endTime
			this.day=getDateMsg(startTime,'day','周')
			this.date=dateFormat(startTime)
			var addzero=this.addzero
			this.range=addzero(new Date(startTime).getHours())+':'+addzero(new Date(startTime).getMinutes())+'-'+addzero(new Date(endTime).getHours())+':'+addzero(new Date(endTime).getMinutes())
		}
	};
</script>
<style lang="scss" scoped="scoped">
	.result{
	   width: calc(100% - 200px);
	   display: flex;
	   flex-direction: column;
	   align-items: center;
	   .tip{
	   	margin-top:1rem;
	   	display:flex;
	   	img{
	   		width: 1.4rem;
	   		height: 1.4rem;
	   		flex-shrink: 0;
	   		margin-right: 0.2rem;
	   	}
	   	&>div{
        width: 9rem;
	   		font-size: 0.4rem;
	   		color: #333;
	   		.detail{
	   			font-size: 0.3rem;
	   			color: #999;
	   			margin-top: 0.1rem;
          width: 9rem;
	   		}
        .appointmentTime{
          margin: .2rem 0;
          width: 10rem;
          span{
            &:nth-child(1){
              color: #999;
              vertical-align: bottom;
              margin-right: .4rem;
              font-size: 0.3rem;
            }
            &:nth-child(2){
              color: #FC9452;
              vertical-align: bottom;
              font-size: 0.5rem;
            }
          }
        }
	   	}
	   }
	   .content{
	   	width: 64%;
	   	border: 1px solid #DDDDDD;
	   	font-size: 0.3rem;
	   	padding: 0.3rem 1rem 0.3rem 0.6rem;
	   	margin-top: 0.6rem;
       .same{
         width: 50%;
       }
	   	.item{
	   		margin-top: 0.3rem;
        &:nth-child(1){
          margin-top: 0;
        }
	   		.part1{
	   			color: #999;
	   			margin-right: 0.3rem;
	   		}
	   	}
	   	.time{
	   		margin-bottom: 0;
	   	}
	   	.doctor{
	   		display: flex;
        justify-content: space-between;
	   	}
	   }
	   .btn{
	   	border: 0.02rem solid #3C9BFF;
        border-radius: 0.12rem;
        width: 5rem;
        line-height: 1.2rem;
        font-size: 0.48rem;
        color: #3C9BFF;
        text-align: center;
        margin-top: 1rem;
	   }
    .bg{
      background-color: #3C9BFF;
      color:white;
    }
    .actived{
      background-color: #ebf5ff;
      border: none;
    }
	}
</style>
