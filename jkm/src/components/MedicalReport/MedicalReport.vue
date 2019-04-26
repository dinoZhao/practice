<template>
    <div class="MedicalReport">
        <historylist :time='item.treatmentTime' :title='item.disease' :examReportType="examReportType" :tips="item.setType" v-for='(item,index) in examReport' :key='index' @click.native='sendRecordId(item.medicalRecordId)'></historylist>
    </div>
</template>
<script>
import historylist from 'components//historyList/historyList.vue'
export default {
	props: ['examReport','examReportType'],
    data(){
        return {
            arr:[
                {
                    time:'2019-02-20',
                    title:'尿常规检测异常，血糖偏高，疑似糖尿病',
                    tips:['基础体检']
                },
                {
                    time:'2019-02-28',
                    title:'尿常规检测异常，血糖偏高，疑似糖尿病',
                    tips:['至尊体检']
                }
            ]
        }
    },
    methods:{
        sendRecordId(recordId){
            var vm = this;
            vm.$emit('sendRecordId',recordId)
        },
    },
    components:{
        historylist,
    },

    created(){

    }
}
</script>
<style scoped>
.MedicalReport{
	height: 30vw;
	overflow-y: scroll;
}
</style>


