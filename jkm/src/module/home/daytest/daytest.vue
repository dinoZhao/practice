<template>
  <div class="daytest"> 
  	<div class="doctor-content">
  		<div class="doctor-content-head">
  			<div class="doctor-name-item on">钱伟<span class="doctor-circle Visiting"></span><span class="doctor-line"></span>
  			</div><div class="doctor-name-item">钱伟<span class="doctor-circle"></span><span class="doctor-line"></span>
  			</div><div class="doctor-name-item">钱伟<span class="doctor-circle"></span><span class="doctor-line"></span></div>
  		</div>
  		<div class="doctor-content-bottom">
  			<div class="doctor-bottom-left">
  				<div class="doctor-bottom-status">做诊中</div>
  				<div class="doctor-bottom-headurl"><img src="../../../assets/headUrl.png"/></div>
  				<div class="doctor-bottom-name"><span>钱伟</span>主任医师</div>
  				<div class="doctor-bottom-hsp">上海市第十人民医院</div>
  				<div class="doctor-bottom-number"><span>8</span>/20</div>
  			</div><div class="doctor-bottom-right">
  				<ul class="doctor-bottom-list">
  					<li class="doctor-list-item">
  						<div class="doctor-item-box">
  							<span>19022101</span>
  						</div><div class="doctor-item-box doctor-box-sex">
  							<span>钱伟</span><span>男</span><span>35岁</span>
  						</div><div class="doctor-item-box doctor-box-status">
  							状态<span>已就诊</span>
  						</div><div class="doctor-item-box doctor-box-operation">
  							<span class="anew">重新候诊</span>
  						</div><div class="doctor-item-box case-history">
  							<span>病历</span><img src="../../../assets/check-right.png" />
  						</div>
  					</li>
  				</ul>
  			</div>
  		</div>
  	</div>
  </div>
</template>
<script>
import $ from 'jquery'
import {getKnowledgeTag,cancelAttention} from 'API/requst'
import headline from 'components/headline/headline.vue';
import { getURLParameter,dateFormat } from 'utils/util'
export default {
  name: 'daytest',
  components: {
  },
  data () {
    return {
      playing:true,
      bennLike:false,
    }
  },
  methods:{
  },
  components:{
    headline
  },
  created () {
  	var vm = this;
  },
  mounted(){
  }
}
</script>
<style>
	.daytest{
		font-size: .32rem;
	}
	.doctor-content{
		padding-left: 220px;
	}
	.doctor-content-head{
		padding-top: 10px;
    border-bottom: 1px solid #eee;
	}
	.doctor-content-head>div {
    display: inline-block;
    vertical-align: middle;
    width: 10%;
    text-align: center;
    line-height: 50px;
    position: relative;
	}
	.doctor-circle{
		display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 13%;
	}
	.doctor-circle.Visiting{
		background: #68FF00;
	}
	.doctor-circle.Left{
		background: #FF4000 ;
	}
	.doctor-circle.Suspended{
		background: #FF4000;
	}
	.doctor-line{
		display: none;
	}
	.doctor-name-item.on{
		color:#3C9BFF;
	}
	.doctor-name-item.on .doctor-line{
		display: inline-block;
    width: 30px;
    height: 1px;
    background: #3C9BFF;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
	}
	.doctor-content-bottom{
		padding: 20px 20px 0 20px;
	}
	.doctor-content-bottom>div {
    display: inline-block;
    vertical-align: top;
	}
	.doctor-bottom-left{
		width: 20%;
    text-align: center;
    margin-right: 2%;
    border: 1px solid #eee;
    box-sizing: border-box;
    padding-bottom: 30px;
    color: #666;
	}
	.doctor-bottom-status{
    background: #efffe5;
    color: #1FAD00;
	}
	.doctor-bottom-headurl img{
		width: auto;
    height: 1.2rem;
    margin: 20px 0 20px 0;
	}
	.doctor-bottom-name>span{
		color: #333;
    margin-right: 10px;
	}
	.doctor-bottom-hsp{
		margin: 10px 0;
	}
	.doctor-bottom-hsp span{
		font-size: 0.8rem;
    color: #3C9BFF;
	}
	.doctor-bottom-number>span{
		font-size: 1rem;
		color: #3C9BFF;
	}
	.doctor-bottom-right{
		width: 78%;
	}
	.doctor-list-item>div {
    display: inline-block;
    width: 21%;
    line-height: .7rem;
	}
	.doctor-box-sex>span{
		color: #666;
	}
	.doctor-box-sex>span:nth-child(1){
		color: #333;
	}
	.doctor-box-sex>span:nth-child(1),.doctor-box-sex>span:nth-child(2){
		margin-right: 5px;
	}
	.doctor-box-status{
		color: #666;
	}
	.doctor-box-status span{
		color: #333;
		margin-left: 5px;
	}
	.doctor-list-item .case-history{
		width: 16%;
	}
	.case-history span{
		vertical-align: middle;
		color: #3C9BFF;
	}
	.case-history img{
		margin-left: 10px;
		vertical-align: middle;
	}
	.doctor-list-item{
		border-bottom: 1px solid #eee;
    padding: 10px 0;
	}
	.doctor-box-operation span{
		display: inline-block;
    width: 85%;
    text-align: center;
    border-radius: 5px;
	}
	.doctor-box-operation span.anew{
		background: #3C9BFF;
		color: #fff;
	}
	.doctor-box-operation span.waiting{
		color: #FC9452;
	}
	.doctor-box-operation span.pending{
		color:#3C9BFF;
	}
</style>
