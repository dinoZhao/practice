<template>
	<div>
		<date-picker class='picker' @click='$emit(calendar,stardate)' :date="stardate" :option="option" :limit="limit"></date-picker>
	</div>

</template>

<script>
	import myDatepicker from 'vue-datepicker'
	export default {
		components: {
			'date-picker': myDatepicker
		},
		data() {
			return {
				stardate: {
					time: ""
				},
				option: {
					type: 'day',
					week: ['一', '二', '三', '四', '五', '六', '日'],
					month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					format: 'YYYY-MM-DD',
					placeholder: '请选择',
					inputStyle: {
						'display': 'inline-block',
						'padding': '6px',
						'line-height': '100%',
						'font-size': '16px',
						'border': '1px solid #eee',
						'box-shadow': '0',
						'border-radius': '2px',
						'color': '#5F5F5F',
						'width': '100%',
						
					},
					color: {
						header: '#ccc',
						headerText: '#f00'
					},
					buttons: {
						ok: '确定',
						cancel: '取消'
					},
					overlayOpacity: 0.5, // 0.5 as default
					dismissible: true // as true as default
				},
				timeoption: {
					type: 'min',
					week: ['一', '二', '三', '四', '五', '六', '日'],
					month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					format: 'YYYY-MM-DD HH:mm'
				},
				multiOption: {
					type: 'multi-day',
					week: ['一', '二', '三', '四', '五', '六', '日'],
					month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					format: "YYYY-MM-DD HH:mm"
				},
				limit: [{
						type: 'weekday',
						available: [0, 1, 2, 3, 4, 5, 6]
					},
					{
						type: 'fromto',
						from: '1949-01-01',
						to: '2019-05-05'
					}
				]
			}

		},
		watch: {
			stardate: {
				handler(val, oldVal) {
                  this.$emit("calendar",val.time)
				},
				deep: true
			}
		}

	}
</script>

<style>

</style>