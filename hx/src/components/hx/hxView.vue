<template>
	<div class="main">
		<iframe src="https://me.bdp.cn/api/su/GJY2T07N" width="" height=""></iframe>
	</div>
</template>

<script>
	import API from '../../api/api'
	export default {
		name: 'Index',
		data() {
			return {

			}
		},
		created: function() {
         API.getProfile().then(data=>{
         	console.log(data)
         })
		},
		components: {
			
		},
		methods: {}

	}
</script>

<style  lang="scss" scoped="scoped">
.main{
	/*width: 1100px;*/
	margin: 0 auto;
	height: calc(100% - 174px);
	iframe{
		height: 100%;
		width: 100%;
	}
}
</style>