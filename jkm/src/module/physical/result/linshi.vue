<template>

	<div class="wrap">
		<overview><component v-bind:is="temperature"></component></overview>
	</div>

</template>
<script>
	import overview from './overview.vue'
	import temperature from "./temperature.vue"
	import ecg from "./ecg.vue"
	
	
	export default {

		name: 'result',
		components: {
			overview,
			temperature,
			ecg
		},
		data() {
			return {
             temperature:'temperature'
			}
		},
		methods: {

		},
		created() {
			var vm = this;
		},
		mounted() {

		}
	}
</script>
<style scoped="scoped" lang="scss">
	.wrap{
		height: 100%;
	}
</style>