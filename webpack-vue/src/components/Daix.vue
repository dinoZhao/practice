<template>
	<div>
		66666<br /> {{count}}
		<br /> {{doneTodos}}
		<br />
		<button @click="increment"> 点击增加</button>
		<button @click="decrement"> 点击减小</button>
		<button @click="mutl"> 点击乘2</button>
		
		
	</div>
</template>

<script>
	import { mapState, mapGetters, mapMutations,mapActions } from 'vuex'
	export default {
		created() {
			console.log(this.$store.state.count)

		},
		computed: {
			...mapState([
				"count"
			]),
			...mapGetters([
				'doneTodosCount',
				"doneTodos",
			]),

		},
		methods: {
			...mapMutations([
				'increment'
			]),
			...mapActions([
				"decrement"
			]),
			mutl(){
				this.$store.dispatch("mutlmsg",{
					"msg":2
				})
			}
		}

	}
</script>

<style>

</style>