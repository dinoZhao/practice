<template>
	<div class="hisshow">
		<div class="title">家族史</div>
		<div class="illtype">
			<div class="item" v-for='(item,index) in relations'>
				<span class="relation">{{relations[index]}}</span>
				<div>
					<div v-if="item"  v-for="item in detaillist[index]">
					<img src="../../../assets/already.png" />
				<div class="illname">{{item}}</div>
				</div>
				</div>
			</div>
		</div>
		<div class="title">遗传病史</div>
		<div class="content">
			<div class="item">
				<div style="margin-right: 0.33rem;">遗传病</div>
				<div>{{geneticHistoryExist}}</div>
			</div>
			<div>{{geneticHistory}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				relations: ["父亲", '母亲', '兄弟姐妹', "子女"],
				diseaseList: [],
				geneticHistoryExist: '无',
				geneticHistory: '',
				detaillist:[]
			}
		},
		components: {},
		props: ["records"],
		inject: ['updaterecord', 'queryrecord'],
		activated() {
			this.queryrecord()
           
		},
		watch: {
			records: {
				handler(cur, pre) {
				this.familyHistory=	 cur.medicalAdditionalInfo && cur.medicalAdditionalInfo.familyHistory
//					this.familyHistory = JSON.parse(sessionStorage.getItem('temp')).medicalAdditionalInfo.familyHistory
						if(this.familyHistory){
						this.geneticHistoryExist=this.familyHistory.geneticHistoryExist==='1'?'有':'无'
					    this.geneticHistory=this.familyHistory.geneticHistory&&this.familyHistory.geneticHistory[0]
					    var arr = [[],[],[],[]];
					    var list=this.familyHistory.list
					    list.forEach(function(item,index){
					    	item.value.forEach(function(item1,index1){
					    		if(item1.status==='true'){
					    			console.log(arr,index)
					    			arr[index1].push(item.name)
					    		}
					    	})
					    })
					  this.detaillist=arr
					}else{
					}
				},
				deep: true
			}
		},
	}
</script>

<style scoped="scoped" lang="scss">
	* {
		box-sizing: border-box;
	}
	
	.hisshow {
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
		.illtype {
			margin-top: 0.28rem;
			margin-bottom: 0.28rem;
			.item {
				display: flex;
				align-items: center;
				margin-right: 0rem;
				line-height: 0.9rem;
				border-bottom: 1px solid #eee;
				&>div{
					display: flex;
					flex-wrap: wrap;
					&>div{
						display: flex;
						flex-wrap: nowrap;
						align-items: center;
					}
				}
				img {
					width: 0.5rem;
					height: 0.5rem;
					margin-right: 0.1rem;
				}
				.time {
					font-size: 0.3rem;
					width: 1.7rem;
				}
				.illname {
					width: 1.5rem;
					margin-right: 0.2rem;
				}
				.relation{
					 width: 5em;
					text-align: center;
					    flex-shrink: 0;
				}
			}
		}
		.content {
			margin: 0.28rem 0;
			.item {
				display: flex;
				margin-bottom: 0.2rem;
				line-height: 0.6rem;
				.apart {
					display: flex;
					margin-right: 0.1rem;
					&>div:first-child {
						margin-right: 0.33rem;
					}
					&>div:last-child {
						width:3rem;
					}
				}
			}
		}
	}
</style>