<template>
	<div class="screeninghome">
		<div class="screening-sidebar" @click="toggle">
			<headline headtxt="家庭医生/随访" none=""></headline>
			<div class="item" :class="{active:togglelist[0]}">
				<span>体检套餐</span>
			</div>
			<div class="item"  :class="{active:togglelist[1]}">
				<span id="">
  				预约记录
  			</span>
			</div>
			<div class="item"  :class="{active:togglelist[2]}">
				<span id="">
  				签约管理
  			</span>
			</div>
		</div>
       <div class="content">
       	<keep-alive>
       	<component :is="mode"></component>
       	</keep-alive>
       </div>
	</div>
</template>

<script>
	import { getKnowledgeTag, cancelAttention } from 'API/requst'
	import headline from 'components/headline/headline.vue';
	import patientPanel from 'components/patientPanel/patientPanel.vue';
	import manger from './manger'
	export default {
		name: 'familyDoctorHome',
		components: {
			manger,headline,patientPanel
		},
		data() {
			return {
				togglelist:[true,false,false],
				mode:"manger"

			}
		},
		methods: {
			toggle(e){
				var item=e.target.innerText.replace(/\s+/,'')
				console.log(item)
				switch (item){
					case "体检套餐":
					this.togglelist=[true,false,false]
						break;
					case "预约记录":
					this.togglelist=[false,true,false]
						break;
					case "签约管理":
					this.togglelist=[false,false,true]
						break;
					default:
						break;
				}
			}
		},
		
		created() {
			var vm = this;
		},
		watch:{
			
			togglelist(val){
				var componentslist=["manger","manger","manger"]
				this.mode=componentslist[val.indexOf(true)]
			}
		},
		mounted() {

		}
	}
</script>
<style lang="scss" scoped type="text/css">
	$blueColor :#3C9BFF;
	$greyColor: #ECECEC;
	.screeninghome{height: 100%;display: flex;}
	.screening-sidebar {
		width: 7.3%;
		border-right: solid 1px $greyColor;
		border-bottom: solid 1px $greyColor;
		display: flex;
		position: relative;
		padding-top: 80px;
       flex-direction: column;
      height: 100%;
      box-sizing: border-box;
		div.item {
			width: 100%;
			height: 18.3vw;
			font-size: 0.36rem;
			position: relative;
			span {
				display: block;
				width: 29px;
				text-align: center;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
		.active {
			background-color: $blueColor;
			color: white;
		}
	}
	.content{
       	width: 100%;
	}
</style>