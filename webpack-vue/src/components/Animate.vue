<template>
	<div>
		<button @click="show=!show">点击过渡</button>
		  <transition name="fade">
		<div v-show="show">
			lalala
		</div>
		</transition>
		<br /><br />
		<button @click="ani=!ani">点击动画</button>
		  <transition name="bounce">
		<div v-show="ani">
			lalala
		</div>
		</transition>
		
		<br /><br />
		<button @click="status=!status">点击动画</button>
		  <transition name="status"  mode="in-out">
		<div v-bind:key="status">
			{{status}}
		</div>
		
		</transition>
	</div>
</template>


<script>
	export default{
	data() {
    return { show: true,
    ani:true,
    status:true
    }
 },
	created(){
//		console.log(this.show)
	}
}
</script>

<style>
	.fade-enter-active,.fade-leave-active{
		transition: all 0.5s;
		opacity: 1;
	}
	.fade-enter,.fade-leave-to{
		 opacity: 0;
		   transform: translateX(10px);
	}
	.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.status-enter-active,.status-leave-active{
		transition: all 0.5s;
		opacity: 1;
	}
	.status-enter,.status-leave-to{
		 opacity: 0;
		   transform: translateX(10px);
	}
</style>