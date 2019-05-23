<template>
	<div id="win-toast" v-show="istoast">
		<div class="toast-content">
			{{text}}
		</div>
	</div>
</template>

<script>
export default {
	data () {
	    return {
	      istoast:true,
	      text:''
	    }
	},
	methods:{
		closetoast:function(){
			var vm = this;
			vm.istoast = false;
		},
		show(params){
			var vm = this;
			 //若传入的是一个字符串，则为默认样式
            if (typeof params === 'string') {
				this.text = params
			} else if (typeof params === 'object') {
                this.text = params.text || ''
            }
			this.istoast = true;
			setTimeout(function(){
				vm.istoast = false;
			},2500)
		},
		hide(){
			var vm = this;
			vm.toast = false;
		}
	}
	
}
</script>

<style scoped>
	#win-toast{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left:0;
		z-index: 20;
	}
	.toast-content{
		text-align: center;
	    background: rgba(0,0,0,0.7);
	    width: 20%;
	    padding:30px 20px;
	    color: #fff;
	    border-radius: 20px;
	    position: absolute;
	    top: 50%;
	    left: 40%;
	    -webkit-transform: translateY(-50%);
    	transform: translateY(-50%);
    	font-size: 30px;
	}
	
</style>