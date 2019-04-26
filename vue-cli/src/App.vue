<template>
	<div id="app">
        <img src="./assets/logo.png"/>
        <!--<img src="./assets/huge.png"/>-->
        <child  inline-template><div>5555</div></child>
		<div>
			<router-link to='/foo'>foo</router-link>
			<router-link to='/bar'>bar</router-link>

		</div>
		<router-view></router-view>
	</div>

</template>

<script>
	import child from './components/child.vue'
	export default {
components:{
	child
}

	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>