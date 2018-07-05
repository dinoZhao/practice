<template>
	<div>
		other
		<mix></mix>
	</div>
</template>

<script>
	var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
export default {
	created() {
		console.log(88)
	},
mixins: [myMixin],
  myOption: 'hello!',
	
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