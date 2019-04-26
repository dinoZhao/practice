<template>
    <div class="MedicalRecords">
        <historylist :time='item.achiveTime' :title='item.conclusionDesc' :tips="item.tips" v-for='(item,index) in medicalRecord' :key='index'></historylist>
    </div>
</template>
<script>
import historylist from 'components//historyList/historyList.vue'
export default {
	props: ['medicalRecord','medicalRecordType'],
    data(){
        return {
            arr:[
                {
                    time:'2019-01-20',
                    title:'尿常规检测异常，血糖偏高，疑似糖尿病',
                    tips:['血糖','BMI','尿常规']
                },
                {
                    time:'2019-02-28',
                    title:'尿常规检测异常，血糖偏高，疑似糖尿病',
                    tips:['血糖']
                },
                {
                    time:'2018-12-20',
                    title:'尿常规检测异常，血糖偏高，疑似糖尿病',
                    tips:['血糖']
                }
            ]
        }
    },
    methods:{
        
    },
    components:{
        historylist,
    },

    created(){

    }
}
</script>
<style scoped>
.MedicalRecords{
	height: 30vw;
	overflow-y: scroll;
}
</style>


