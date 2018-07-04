<template>
	<div>
		other
	</div>
</template>

<script>
export default {
	created() {},
	watch: {
		'$route' (to, from) {

			console.log(to)
		}
	},
		  beforeRouteUpdate (to, from, next) {
		  	console.log(from)
             next()
},
}
</script>

<style>
</style>