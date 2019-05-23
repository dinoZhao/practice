<template>
	<div class="coat">
		<div class="right">
			<div class="nav">
				<div class="tab" @click='tab'>
					<div class="tabitem" data-index='0' :class="{on:tabvalue==0}">今日检查</div>
					<div class="tabitem" data-index='1' :class="{on:tabvalue==1}">协诊<span v-if="assiststatus" class="dot"></span></div>
					<div class="tabitem" data-index='2' :class="{on:tabvalue==2}">转诊</div>
					<div class="tabitem" data-index='3' :class="{on:tabvalue==3}">康复</div>
				</div>
				<div class="logo cliect" @click="gohome"><img src="../../../assets/chestlogo.png"/><div>行走的胸痛中心</div></div>
			</div>
			<keep-alive>
				<component ref="child" :is='mould'></component>
			</keep-alive>
			
		</div>
	</div>
</template>
<script>
	import {} from 'API/requst'
	import { getURLParameter, dateFormat } from 'utils/util'
	import today from './today.vue'
	import help from './help.vue'
	import transfer from './transfer'
	import recure from './recure'
	import { getCoDiagnosisList} from "API/requst";
	export default {

		name: 'index',
		components: {},
		provide: function() {
			return {
				getassiststatus:this.getassiststatus
			}
		},
		data() {
			return {
				tabvalue: 0,
				records:{},
				modulelist:['today','help','transfer','recure'],
				assiststatus:false
				
			}
		},
		methods: {
			tab(e){
				sessionStorage.setItem('tabvalue',e.target.dataset.index)
				this.tabvalue=e.target.dataset.index
			},
			
			
			
			wait(){
				this.construction()
			},
			gohome(){
           		window.location.href='./home.html'
				
			},
			getassiststatus(){
				var padDeviceCode = this.padDeviceCode = sessionStorage.getItem('padcode')
			var thirdUniqueId = this.thirdUniqueId = JSON.parse(sessionStorage.getItem('doctorMsg')).doctorId
			getCoDiagnosisList({
				padDeviceCode,
				thirdUniqueId
			}).then((res) => {
				var arr=[]
				for(var i=0;i<res.result.length;i++){
					arr=arr.concat(res.result[i].list)
				}
				this.assiststatus =arr.some(function(item){
					return item.readStatus==0
				})
			})
			}
		},
		components: {
			today,
			help,
			transfer,
			recure
		},
		created() {
			var self = this;
			this.getassiststatus()
			if(sessionStorage.getItem('tabstatus')==='init'){
				this.tabvalue=0
				sessionStorage.setItem('tabvalue',0)
  	    	sessionStorage.setItem('tabstatus','')
			}else{
				this.tabvalue=sessionStorage.getItem('tabvalue')
				
			}
		},
		computed:{
			mould:function(){
				return this.modulelist[this.tabvalue]
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
	
	*{
		box-sizing: border-box;
		
	}
	.coat{
		font-size: 0.28rem;
    width: calc(100% - 200px);
    margin-left: 200px;
    height: 100%;
	}
	
	.right {
		width: 100%;
		height: 100%;
		overflow: hidden;
		.nav {
			height: 0.9rem;
			line-height: 0.9rem;
			display: flex;
			font-size: 0.32rem;
			justify-content: space-between;
			border-bottom: 1px solid #D9D9D9;
			align-items: center;
			padding: 0 0.4rem;
			position: fixed;
           background: #fff;
            width: calc(100% - 200px);
			&>div {
				display: inline-flex;
			}
			.tab {
				margin-left: 0.4rem;
				.tabitem {
					width: 1.8rem;
					text-align: center;
					.dot{
						width: 0.1rem;
						height: 0.1rem;
						border-radius: 0.1rem;
						background: #d43c33;
						display: inline-block;
						vertical-align: text-top;
						margin-left: 0.1rem;
					}
				}
				.on {
					color: #3C9BFF;
					border-bottom: 0.04rem solid #3C9BFF;
				}
			}
			.logo{
				display: inline-flex;
				align-items: center;
				color: #3C9BFF;
				padding: 0 0.2rem;
				img{
					width: 0.32rem;
					height: 0.32rem;
					margin-right: 0.1rem;
				}
			}
		}
	}
</style>
