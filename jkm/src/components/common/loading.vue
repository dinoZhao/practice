<template>
	<div id="win-loading" v-show="isloading" @click="closeloading">
		<div class="loading-content">
			<img v-bind:src="loading" />
		</div>
	</div>
</template>

<script>
	import loading from '../../assets/loading~.gif'
	export default {
		data() {
			return {
				isloading: true,
				loading: loading
			}
		},
		methods: {
			closeloading: function() {
				var vm = this;
				vm.isloading = false;
			},
			show() {
				var vm = this;
				vm.isloading = true;
				if(!(vm.loading.indexOf('../') > -1)) {
					vm.loading = '../' + vm.loading;
				}
			},
			hide() {
				var vm = this;
				vm.isloading = false;
			}
		}

	}
</script>

<style scoped>
	#win-loading {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 20;
		display: flex;
		justify-content: center;
	}
	
	.loading-content {
		text-align: center;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		margin-top: 0 !important;
		padding: 13px;
		background: #fff;
		border-radius: 10px;
	}
	
	.loading-content img {
		width: auto;
		height: 1.7rem;
	}
</style>