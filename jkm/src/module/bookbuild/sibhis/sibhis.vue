<template>

	<div id="coat">
		<temp headtxt="个人信息"></temp>
		<div class="main">
			<div class="histitle">家族史</div>
			<div class="detail">
			<div class="item">
				<div> </div>
				<div>父亲</div>
				<div>母亲</div>
				<div>兄弟姐妹</div>
				<div>子女</div>
			</div>	
			<div class="item"  v-for="(item,index) in troublelist">
				<div>{{item.name}}</div>
				<div v-for="(coreitem,coreindex) in item.value">
					<img v-on:click="confirm($event)" :data-relation=coreindex :data-line=index v-if="!item.value[coreindex]" src="../../../assets/notyet.png"/>
					<img v-on:click="cancel($event)"  v-if="item.value[coreindex]"  :data-relation=coreindex :data-line=index  src="../../../assets/already.png"/>
					
				</div>
				
				
			</div>
			</div>
		</div>
		<btn class='next' @click.native="save" fragment="保存"></btn>
		<div class="manu" @click="next">
			跳过
		</div>

	</div>

</template>
<script>
	import temp from "components/headline/headline.vue"
	import btn from "components/stuff/btn.vue"
	import vue from 'Vue'
	import {saveFileEstablishment} from "API/requst"
	export default {

		name: 'sibhis',
		components: {
			temp,
			btn,
		},
		data() {
			return {
				troublelist:['高血压','糖尿病','冠心病','慢阻肺','恶性肿瘤','脑卒中'],
				status: true,
				relations:["父亲",'母亲','兄弟姐妹',"子女"]
			}
		},
		methods: {
			confirm(e) {
				var relation=e.target.dataset["relation"]
				var line=e.target.dataset['line']
			    vue.set(this.troublelist[line].value,relation,true)
			},
			cancel(e) {
				console.log(e)
			},
			save(){
				var self=this
			var familyHistory=[]	
                familyHistory=JSON.parse(JSON.stringify(this.troublelist))
				Object.freeze(this.troublelist)
				for(var i=0;i<6;i++){
					for(var k=0;k<4;k++){
					familyHistory[i].value.splice(k,1,{"status":familyHistory[i].value[k].toString(),"name":this.relations[k]})	
					} 
				}
				var medicalHistory=JSON.parse(sessionStorage.getItem('medicalHistory'))
				var FileEstablishment=JSON.parse(sessionStorage.getItem('FileEstablishment'))
				Object.assign(FileEstablishment,{"medicalHistory":medicalHistory},{"familyHistory":familyHistory})
			 console.log(FileEstablishment)
			 saveFileEstablishment(FileEstablishment).then(function(res){
				 	sessionStorage.removeItem('medicalHistory')
				 	sessionStorage.removeItem('FileEstablishment')
			 	 	window.location.href='../home/index.html?personId='+res.personId+"&patientIdNumber="+FileEstablishment.patientIdNumber
			 })
			},
			next(){
				var medicalHistory=JSON.parse(sessionStorage.getItem('medicalHistory'))
				var FileEstablishment=JSON.parse(sessionStorage.getItem('FileEstablishment'))
				Object.assign(FileEstablishment,{"medicalHistory":medicalHistory})
			 console.log(FileEstablishment)
			
			 saveFileEstablishment(FileEstablishment).then(function(res){
			 	sessionStorage.removeItem('medicalHistory')
			 	sessionStorage.removeItem('FileEstablishment')
			 	window.location.href='../home/index.html?personId='+res.personId+"&patientIdNumber="+FileEstablishment.patientIdNumber
			 })	
			}
		},
		created() {
			var arr=[];
			for(var i=0;i<this.troublelist.length;i++){
				arr.push({
					name:this.troublelist[i],
					value:[false,false,false,false]
				})
			}
			this.troublelist.splice(0,6,...arr)
		},
		mounted() {

		}
	}
</script>
<style scoped="scoped" lang="scss">
	#coat {
		overflow: hidden;
	}
	
	.main {
		display: flex;
		margin-top:0.7rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: flex-start;
		font-size: 0.32rem;
		.histitle {
			font-size: 0.36rem;
			text-align: center;
			margin-bottom: 0.5rem;
			width: 100%;
		}
		.detail{
			.item{
				display: flex;
				line-height: 0.9rem;
				border-bottom: 1px solid #eee;
				&>div{
					width: 15vw;
					text-align: center;
				}
				img{
					width: 0.6rem;
					height: 0.6rem;
					vertical-align: middle;
				}
			}
		}
		
	}
	
	.next {
		margin-left: 37%;
		position: absolute;
		bottom: 0.6rem;
	}
	
	.manu {
		width: 2.28rem;
		height: 0.8rem;
		font-size: 0.32rem;
		border: 0.02rem solid #FC9452;
		border-radius: 6px;
		text-align: center;
		line-height: 0.8rem;
		color: #FC9452;
		position: absolute;
		right: 0.8rem;
		bottom: 0.6rem;
	}
</style>