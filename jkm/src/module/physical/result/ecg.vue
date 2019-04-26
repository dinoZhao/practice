<template>
	<div class="ecgfur">
		<div class="line">
			<div class="item">
				<div>HR(bpm)：</div><span>{{localdetact.HeartRateBPM}}</span></div>
			<div class="item">
				<div>PR(ms)：</div><span>{{localdetact.PRDurationMS}}</span></div>
			<div class="item">
				<div>QRS(ms)：</div><span>{{localdetact.QRSTimeLimitMS}}</span></div>
			<div class="item">
				<div>QT/QTc(ms)：</div><span>{{localdetact.QTDurationMS}}/{{localdetact.QTcDurationMS}}</span></div>
		</div>
		<div class="line">
			<div class="item">
				<div>P/QRS/T轴(° )：</div><span>{{localdetact.PElectricAxis}}/{{localdetact.QRSElectricAxis}}/{{localdetact.TElectricAxis}}</span></div>
			<div class="item">
				<div>RV5/SV1(mV)：</div><span>{{localdetact.RV5ValueMV}}/{{localdetact.SV1ValueMV}}</span></div>
			<div class="item">
				<div>RV5+SV1(mV)：</div><span>{{localdetact.RV5SV1}}</span></div>
			<div class="item">
				<div>PWidth(ms)：</div><span>{{localdetact.PWidth}}</span></div>
		</div>
		<div class="line">
			<div class="item">
				<div>工频滤波(Hz)：</div><span>94</span></div>
			<div class="item">
				<div>基线漂移滤波(Hz)：</div><span>94</span></div>
			<div class="item">
				<div>肌电滤波(Hz)：</div><span>40Hz</span></div>
			<div class="item">
				<div>波形速率(mm/s)：</div><span>94</span></div>
			<div class="item">
				<div>灵敏度(mm/mV)：</div><span>94</span></div>
		</div>
		<img :src="localdetact.ReportUrl" />
	</div>
</template>

<script>
	var interval;
	export default {
		props: ['detact'],
		inject: ['getresult'],
		data() {
			return {
				localdetact: false,
			}
		},
		activated(){
        	var self=this
        	self.getresult()
        	self.localdetact=self.detact["ecg"]||{}
			interval = setInterval(function() {
				self.getresult()
				self.localdetact=self.detact["ecg"]||{}
			}, 2000)
				
        },
	  deactivated(){
		clearInterval(interval)
	}

	}
</script>

<style scoped="scoped" lang="scss">
	.ecgfur {
		padding: 0 0.6rem 0.6rem;
		box-sizing: border-box;
		.line {
			line-height: 0.73rem;
			border-bottom: 1px solid #eee;
			display: flex;
			font-size: 0.24rem;
			.item {
				display: inline-flex;
				width: 24%;
				div {
					color: #666;
				}
			}
			&>div:first-child {
				flex-grow: 2;
			}
			&>div:nth-child(2) {
				flex-grow: 2;
			}
		}
		&>img {
			width: 100%;
			/*height: 35vw;*/
		}
	}
</style>