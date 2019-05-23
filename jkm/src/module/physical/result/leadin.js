//组件和模块
	import temp from "components/common/headTop.vue"
	import btn from "components/stuff/btn.vue"
	import temperature from './temperature.vue'
	import tempdemo from './tempdemo.vue'
	import pressure from './pressure.vue'
	import pressuredemo from './pressuredemo.vue'
	import oxygendemo from './oxygendemo.vue'
	import oxygen from './oxygen.vue'
	import sugar from './sugar.vue'
	import sugardemo from './sugardemo.vue'
	import ecg from './ecg.vue'
	import ecging from './ecging.vue'
	import ecgdemo from './ecgdemo.vue'
	import sugarmanu from './glu.vue'
	import bmi from '../bmi.vue'
	import tempmanu from '../temperature.vue'
	import oxymanu from './spo2.vue'
	import pressmanu from './bloodPressure.vue'
	import bloodlipiddemo from './bloodlipiddemo.vue'
	import bloodlips from './bloodLipids.vue'
	import lipids from './lipids.vue'
	
	import urinedemo from './urinedemo.vue'
	import urineRoutine from './urineRoutine.vue'
	import urine from './route.vue'
    import sign1 from '../../../assets/complete_ed.png'
    import sign2 from '../../../assets/complete_un.png'
    import sign3 from '../../../assets/complete_ig.png'
    import lowerimg from 'assets/lower.png'
    import upperimg from 'assets/upper.png'
    import { getURLParameter } from "utils/util"
  var mixin = {
  components: {
			temp,
			btn,
			temperature,
			ecg,
			ecging,
			pressure,
			oxygen,
			sugar,
			ecgdemo,
			pressuredemo,
			oxygendemo,
			sugardemo,
			tempdemo,
			bmi,
			sugarmanu,
			tempmanu,
			oxymanu,
			pressmanu,
			bloodlipiddemo,
			urinedemo,
			urineRoutine,
			urine,
			bloodlips,
			lipids
		},
		data(){
			return{
				//tab栏状态标志图
				sign1,//已选择
				sign2,//正在选择
				sign3,//跳过
				//tab栏切换标准。哪一项为true，则位于哪一项
				tablist: [true,false,false,false,false,false,false,false],
				title: '心电',
				statuslist: [
					['ecgdemo', "ecg"],
					['pressuredemo', "pressure",'pressmanu'],
					['oxygendemo', 'oxygen','oxymanu'],
					["sugardemo", 'sugar',"sugarmanu"],
					['tempdemo', 'temperature','tempmanu'],
					['bmi','bmi'],
					['urinedemo','urine','urineRoutine'],
					['bloodlipiddemo','lipids','bloodlips']
				],
				//右侧模块切换，0代表没选择，1检测结果，2代表手动输入
				status: [0, 0, 0, 0, 0, 0,0,0],
				ignorelist:[false,false,false,false,false,false,false,false],
				detactresult: {},
				recordId: '',
				personId: '',
				personinfo: '',
				itemlist:["心电", "血压", "血氧", "血糖", "体温", 'BMI','尿常规','血脂'],
				tabtoggle:false,
				rapidchannel:false,
	            icon:[lowerimg,upperimg],
	            backuplist:[],
	            rapidbackuplist:['B超'],
	            planType:'',//检测计划，比如优选计划
			}
		},
		created(){
			if(getURLParameter("channel") == 'rapid') {
				this.rapidchannel = true
				 this.bus.$emit('sendrapid', true)
			}
			if(getURLParameter("planType") == 'preference'){
				this.planType='preference'
			}
			if(getURLParameter("rapidindex")){
				var index=getURLParameter("rapidindex")
				var status=getURLParameter("status")
				this.tablist=[false,false,false,false,false,false,false,false]
//				this.tablist.fill(false, 0, this.itemlist.length)
				this.$set(this.tablist, index, true)
				this.status=status.split('').map(function(item){
					return Number(item)
				})
			}
		}
}
  export{
  	mixin
  }
