<template>
  <div class="followUp healthservice"> 
  	<div class="followUp-content table-content">
  		<div class="followUp-content-head table-content-head">
  			<div class="content-head-left">
  				<span>随访信息</span><span>编号 {{id}}</span>
  			</div><div class="content-head-right">
  				<P v-if="!iscompile" @click.stop="changecompile"><img src="../../../assets/save-btn.png"/><span>保存</span></P><P v-if="iscompile" @click.stop="compilebtn"><img src="../../../assets/compile-btn.png"/><span>编辑</span></P><P @click.stop="getfollowUp('取消')"><img src="../../../assets/cancel-btn.png"/><span>取消</span></P>
  			</div>
  		</div>
  		<div class="followUp-content-bottom table-content-bottom">
  			<div class="followUp-content-left table-content-left">
	  			<div :class='["followUp-conten-item table-content-item", tabindex=="one" ? "on" : ""]' @click.stop="changetab('one')"><span>症状<br/>体征</span></div>
	  			<div :class='["followUp-conten-item table-content-item", tabindex=="two" ? "on" : ""]' @click.stop="changetab('two')"><span>生活<br/>方式</span></div>
	  			<div :class='["followUp-conten-item table-content-item", tabindex=="three" ? "on" : ""]' @click.stop="changetab('three')"><span>检查<br/>用药</span></div>
	  			<div :class='["followUp-conten-item table-content-item", tabindex=="four" ? "on" : ""]' @click.stop="changetab('four')"><span>转诊<br/>建议</span></div>
	  			<div :class='["followUp-conten-item table-content-item", tabindex=="five" ? "on" : ""]' @click.stop="changetab('five')"><span>随访<br/>记录</span></div>
	  		</div><div class="followUp-content-right table-content-right">
	  				<!--症状体征start-->
	  				<div class="followUp-one" v-if="tabindex=='one'">
	  					<template v-if="!iscompile">
	  						<div class="followUp-headline"><span>症状</span></div>
			  				<div class="followUp-item">
			  					<template v-for="(item,index) in choselist">
			  						<p v-bind:data-code="item.code" @click.stop="chosefirstbtn(item.code)" v-if="item.code=='1'"><img v-bind:src="item.isselect?already:notyet"/><span>{{item.name}}</span></p>
			  						<p v-bind:data-code="item.code" @click.stop="choselistbtn(item.code)" v-if="item.code!='1'"><img v-bind:src="item.isselect?already:notyet"/><span>{{item.name}}</span></p>
			  					</template>
			  					<div class="other"><span>其他</span><input type="text" placeholder="请输入" class="commoninput" v-model="subdata.symOther" @input="symOtherinput"/></div>
			  				</div>
			  				<div class="followUp-headline"><span>体征</span></div>
			  				<div class="followUp-item">
			  					<div class="input-list"><span>血压</span><p class="input-p"><input type="tel" placeholder="收缩压/舒张压" class="blood commoninput" v-model="blood" v-if="blood" @blur="checkinput"/><input type="tel" placeholder="收缩压/舒张压" class="blood commoninput" v-model="blood" v-if="!blood"/><span class="one-unit">mmHg</span></P><span class="detect">检测</span></div>
			  					<div class="input-list list-two">
			  						<div class="input-item" style="width:55%">
			  							<span>BMI </span><p class="input-p"><input type="tel" placeholder="请输入" class="BMI commoninput" v-model="subdata.bmi"/></p><span class="detect">检测</span>
			  						</div><div class="input-item" style="width:45%">
			  							<span>体重</span><p class="input-p"><input type="tel" placeholder="请输入" class="weight commoninput" v-model="subdata.weight"/><span class="two-unit">kg</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-two">
			  						<div class="input-item" style="width:55%">
			  							<span>心率</span><p class="input-p"><input type="tel" placeholder="请输入" class="heartRate commoninput" v-model="subdata.pulse"/><span class="two-unit">次/分钟</span></p>
			  						</div><div class="input-item" style="width:45%">
			  							<span>其他</span><p class="input-p"><input type="text" placeholder="请输入" class="otherinput commoninput" v-model="subdata.other"/></p>
			  						</div>
			  					</div>
			  				</div>
	  					</template>
	  					<template v-if="iscompile">
	  						<div class="followUp-headline"><span>症状</span></div>
			  				<div class="followUp-item">
			  					<template v-for="(item,index) in choselist">
			  						<p v-bind:data-code="item.code" v-if="item.code=='1'&&item.isselect"><img v-bind:src="item.isselect?already:notyet"/><span>{{item.name}}</span></p>
			  						<p v-bind:data-code="item.code" v-if="item.code!='1'&&item.isselect"><img v-bind:src="item.isselect?already:notyet"/><span>{{item.name}}</span></p>
			  					</template>
			  					<div class="other"><span>其他</span><input type="text" class="commoninput disabled" v-model="subdata.symOther" @input="symOtherinput" disabled="disabled"/></div>
			  				</div>
			  				<div class="followUp-headline"><span>体征</span></div>
			  				<div class="followUp-item">
			  					<div class="input-list"><span>血压</span><p class="input-p"><input type="tel" class="blood commoninput disabled" v-model="blood" v-if="blood" @blur="checkinput" disabled="disabled"/><input type="tel" class="blood commoninput disabled" v-model="blood" v-if="!blood" disabled="disabled"/><span class="one-unit unitdisabled" v-if="blood">mmHg</span></P><span class="detect" v-if="!iscompile">检测</span></div>
			  					<div class="input-list list-two">
			  						<div class="input-item" style="width:55%">
			  							<span>BMI </span><p class="input-p"><input type="tel" class="BMI commoninput disabled" v-model="subdata.bmi" disabled="disabled"/></p><span class="detect" v-if="!iscompile">检测</span>
			  						</div><div class="input-item" style="width:45%">
			  							<span>体重</span><p class="input-p"><input type="tel" class="weight commoninput disabled" v-model="subdata.weight" disabled="disabled"/><span class="two-unit unitdisabled" v-if="subdata.weight">kg</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-two">
			  						<div class="input-item" style="width:55%">
			  							<span>心率</span><p class="input-p"><input type="tel" class="heartRate commoninput disabled" v-model="subdata.pulse"disabled="disabled"/><span class="two-unit unitdisabled" v-if="subdata.pulse">次/分钟</span></p>
			  						</div><div class="input-item" style="width:45%">
			  							<span>其他</span><p class="input-p"><input type="text" class="otherinput commoninput disabled" v-model="subdata.other"disabled="disabled"/></p>
			  						</div>
			  					</div>
			  				</div>
	  					</template>
	  				</div>
	  				<!--症状体征end-->
	  				<!--生活方式start-->
	  				<div class="followUp-two" v-else-if="tabindex=='two'">
	  					<template v-if="!iscompile">
	  						<div class="followUp-headline"><span>生活方式指导</span></div>
		  					<div class="followUp-item">
		  						<div class="input-list list-two">
			  						<div class="input-item">
			  							<span>日吸烟量</span><p class="input-p"><input type="tel" placeholder="请输入" class="smoke commoninput" v-model="subdata.dailyCigarette"/><span class="two-unit">支</span></p>
			  						</div><div class="input-item">
			  							<span>运动频率</span><p class="input-p"><input type="tel" placeholder="请输入" class="sportnum commoninput" v-model="subdata.exerciseFrequency"/><span class="two-unit">次/周</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-two">
			  						<div class="input-item">
			  							<span>日饮酒量</span><p class="input-p"><input type="tel" placeholder="请输入" class="drink commoninput" v-model="subdata.dailyDrink"/><span class="two-unit">两</span></p>
			  						</div><div class="input-item">
			  							<span>运动时间</span><p class="input-p"><input type="tel" placeholder="请输入" class="sportime commoninput" v-model="subdata.exerciseDuration"/><span class="two-unit">分钟/次</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-two">
			  						<div class="input-item">
			  							<span>摄盐情况</span><p class="input-p">
			  								<select @change="changeselect($event.target,'摄盐')" :class='["salt","commoninput",subdata.saltSituation?"substantial":""]'>
			  									<template v-for="item in saltlist">
			  										<option :value="item.code" v-if="item.code=='0'" style="color: #666;" :selected="item.code==subdata.saltSituation?true:false">{{item.name}}</option>
			  										<option :value="item.code" v-else :selected="item.code==subdata.saltSituation?true:false">{{item.name}}</option>
			  									</template>
				  							</select>
				  							</p>
			  						</div><div class="input-item">
			  							<span>遵医行为</span><p class="input-p">
			  								<select :class='["salt","commoninput",subdata.medicalBehavior?"substantial":""]' @change="changeselect($event.target,'遵医')">
			  									<template v-for="item in medicallist">
			  										<option :value="item.code" v-if="item.code=='0'" style="color: #666;" :selected="item.code==subdata.medicalBehavior?true:false">{{item.name}}</option>
			  										<option :value="item.code" v-else :selected="item.code==subdata.medicalBehavior?true:false">{{item.name}}</option>
			  									</template>
				  							</select>
			  							</p>
			  						</div>
			  					</div>
			  					<div class="input-list list-two">
			  						<div class="input-item">
			  							<span>心理调整</span><p class="input-p">
			  								<select :class='["salt","commoninput",subdata.psychologicalAdjustment?"substantial":""]' @change="changeselect($event.target,'心理')">
			  									<template v-for="item in mentalitylist">
			  										<option :value="item.code" v-if="item.code=='0'" style="color: #666;" :selected="item.code==subdata.psychologicalAdjustment?true:false">{{item.name}}</option>
			  										<option :value="item.code" v-else :selected="item.code==subdata.psychologicalAdjustment?true:false">{{item.name}}</option>
			  									</template>
				  							</select>
			  							</p>
			  						</div>
			  					</div>
		  					</div>
	  					</template>
	  					<template v-if="iscompile">
	  						<div class="followUp-headline"><span>生活方式指导</span></div>
		  					<div class="followUp-item">
		  						<div class="input-list list-two">
			  						<div class="input-item">
			  							<span>日吸烟量</span><p class="input-p"><input type="tel" class="smoke commoninput disabled" v-model="subdata.dailyCigarette" disabled="disabled"/><span class="two-unit unitdisabled" v-if="subdata.dailyCigarette">支</span></p>
			  						</div><div class="input-item">
			  							<span>运动频率</span><p class="input-p"><input type="tel" class="sportnum commoninput disabled" v-model="subdata.exerciseFrequency" disabled="disabled"/><span class="two-unit unitdisabled" v-if="subdata.exerciseFrequency">次/周</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-two">
			  						<div class="input-item">
			  							<span>日饮酒量</span><p class="input-p"><input type="tel" class="drink commoninput disabled" v-model="subdata.dailyDrink" disabled="disabled"/><span class="two-unit unitdisabled" v-if="subdata.dailyDrink">两</span></p>
			  						</div><div class="input-item">
			  							<span>运动时间</span><p class="input-p"><input type="tel" class="sportime commoninput disabled" v-model="subdata.exerciseDuration" disabled="disabled"/><span class="two-unit unitdisabled" v-if="subdata.exerciseDuration">分钟/次</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-two">
			  						<div class="input-item">
			  							<span>摄盐情况</span><p class="input-p">
			  								<select @change="changeselect($event.target,'摄盐')" :class='["salt","commoninput","disabled",subdata.saltSituation?"substantial":""]' disabled="disabled" v-if="subdata.saltSituation">
			  									<template v-for="item in saltlist">
			  										<option :value="item.code" v-if="item.code=='0'" style="color: #666;" :selected="item.code==subdata.saltSituation?true:false">{{item.name}}</option>
			  										<option :value="item.code" v-else :selected="item.code==subdata.saltSituation?true:false">{{item.name}}</option>
			  									</template>
				  							</select>
				  							</p>
			  						</div><div class="input-item">
			  							<span>遵医行为</span><p class="input-p">
			  								<select :class='["salt","commoninput","disabled",subdata.medicalBehavior?"substantial":""]' @change="changeselect($event.target,'遵医')" disabled="disabled" v-if="subdata.medicalBehavior">
			  									<template v-for="item in medicallist">
			  										<option :value="item.code" v-if="item.code=='0'" style="color: #666;" :selected="item.code==subdata.medicalBehavior?true:false">{{item.name}}</option>
			  										<option :value="item.code" v-else :selected="item.code==subdata.medicalBehavior?true:false">{{item.name}}</option>
			  									</template>
				  							</select>
			  							</p>
			  						</div>
			  					</div>
			  					<div class="input-list list-two">
			  						<div class="input-item">
			  							<span>心理调整</span><p class="input-p">
			  								<select :class='["salt","commoninput","disabled",subdata.psychologicalAdjustment?"substantial":""]' @change="changeselect($event.target,'心理')" disabled="disabled" v-if="subdata.psychologicalAdjustment">
			  									<template v-for="item in mentalitylist">
			  										<option :value="item.code" v-if="item.code=='0'" style="color: #666;" :selected="item.code==subdata.psychologicalAdjustment?true:false">{{item.name}}</option>
			  										<option :value="item.code" v-else :selected="item.code==subdata.psychologicalAdjustment?true:false">{{item.name}}</option>
			  									</template>
				  							</select>
			  							</p>
			  						</div>
			  					</div>
		  					</div>
	  					</template>
	  				</div>
	  				<!--生活方式end-->
	  				<!--检查用药start-->
	  				<div class="followUp-three" v-else-if="tabindex=='three'">
	  					<template v-if="!iscompile">
	  						<div class="followUp-headline"><span>辅助检查</span></div>
		  					<div class="followUp-item">
		  						<div class="input-list"><span>辅助检查*</span><p class="input-p"><input type="text" placeholder="请输入" class="accessory biginput" v-model="subdata.checkingMedication.auxiliaryExamination"/></P></div>
		  					</div>
		  					<div class="followUp-headline"><span>服药依从性</span></div>
		  					<div class="followUp-item">
		  						<div class="input-list">
			  						<span>服药依从性</span><p v-for="item in druglist" v-bind:data-code="item.code" :class="['chosebtn',item.isselect?'on':'']" @click="druglistbtn(item.code)">{{item.name}}</p>
			  					</div>
		  					</div>
		  					<div class="followUp-headline"><span>药物不良反应</span></div>
		  					<div class="followUp-item">
		  						<div class="input-list">
			  						<span>药物不良反应</span><p v-for="item in reactionlist" v-bind:data-code="item.code" :class="['chosebtn',item.isselect?'on':'']" @click="reactionlistbtn(item.code)">{{item.name}}</p>
			  					</div>
			  					<div class="input-list">
			  						<span>不良反应内容</span><p class="input-p"><input type="text" placeholder="请输入" class="reaction biginput" v-model="subdata.checkingMedication.adverseReactionContent"/></P>
			  					</div>
		  					</div>
		  					<div class="followUp-headline"><span>用药情况</span></div>
		  					<div class="followUp-item">
			  					<div class="input-list list-three medicine1">
			  						<div class="input-item">
			  							<span>药物名称1</span><p class="input-p"><input type="text" placeholder="请输入" class="smoke smallinput" style="width: 17vw !important;" v-model="drugStatus.drug1.drugName"/></p>
			  						</div><div class="input-item">
			  							<span>用法</span><p class="input-p"><input type="tel" placeholder="请输入" class="sportnum smallinput" v-model="drugStatus.drug1.usage"/><span class="two-unit">次/日</span></p>
			  						</div><div class="input-item">
			  							<span>用量</span><p class="input-p"><input type="tel" placeholder="请输入" class="sportnum smallinput" v-model="drugStatus.drug1.consumption"/><span class="two-unit">mg/次</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-three medicine2">
			  						<div class="input-item">
			  							<span>药物名称2</span><p class="input-p"><input type="text" placeholder="请输入" class="smoke smallinput" style="width: 17vw !important;" v-model="drugStatus.drug2.drugName"/></p>
			  						</div><div class="input-item">
			  							<span>用法</span><p class="input-p"><input type="tel" placeholder="请输入" class="sportnum smallinput" v-model="drugStatus.drug2.usage"/><span class="two-unit">次/日</span></p>
			  						</div><div class="input-item">
			  							<span>用量</span><p class="input-p"><input type="tel" placeholder="请输入" class="sportnum smallinput" v-model="drugStatus.drug2.consumption"/><span class="two-unit">mg/次</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-three medicine3">
			  						<div class="input-item">
			  							<span>药物名称3</span><p class="input-p"><input type="text" placeholder="请输入" class="smoke smallinput" style="width: 17vw !important;" v-model="drugStatus.drug3.drugName"/></p>
			  						</div><div class="input-item">
			  							<span>用法</span><p class="input-p"><input type="tel" placeholder="请输入" class="sportnum smallinput" v-model="drugStatus.drug3.usage"/><span class="two-unit">次/日</span></p>
			  						</div><div class="input-item">
			  							<span>用量</span><p class="input-p"><input type="tel" placeholder="请输入" class="sportnum smallinput" v-model="drugStatus.drug3.consumption"/><span class="two-unit">mg/次</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-three medicine4">
			  						<div class="input-item">
			  							<span><b style="opacity: 0;">1</b>其他药物</span><p class="input-p"><input type="text" placeholder="请输入" class="smoke smallinput" style="width: 17vw !important;" v-model="drugStatus.other.drugName"/></p>
			  						</div><div class="input-item">
			  							<span>用法</span><p class="input-p"><input type="tel" placeholder="请输入" class="sportnum smallinput" v-model="drugStatus.other.usage"/><span class="two-unit">次/日</span></p>
			  						</div><div class="input-item">
			  							<span>用量</span><p class="input-p"><input type="tel" placeholder="请输入" class="sportnum smallinput" v-model="drugStatus.other.consumption"/><span class="two-unit">mg/次</span></p>
			  						</div>
			  					</div>
		  					</div>
	  					</template>
	  					<template v-if="iscompile">
	  						<div class="followUp-headline"><span>辅助检查</span></div>
		  					<div class="followUp-item">
		  						<div class="input-list"><span>辅助检查*</span><p class="input-p"><input type="text" placeholder="请输入" class="accessory biginput disabled" v-model="subdata.checkingMedication.auxiliaryExamination" disabled="disabled"/></P></div>
		  					</div>
		  					<div class="followUp-headline"><span>服药依从性</span></div>
		  					<div class="followUp-item">
		  						<div class="input-list">
			  						<span>服药依从性</span><p v-for="item in druglist" v-bind:data-code="item.code" :class="['chosebtn',item.isselect?'on':'']" v-if="item.isselect">{{item.name}}</p>
			  					</div>
		  					</div>
		  					<div class="followUp-headline"><span>药物不良反应</span></div>
		  					<div class="followUp-item">
		  						<div class="input-list">
			  						<span>药物不良反应</span><p v-for="item in reactionlist" v-bind:data-code="item.code" :class="['chosebtn',item.isselect?'on':'']" v-if="item.isselect">{{item.name}}</p>
			  					</div>
			  					<div class="input-list">
			  						<span>不良反应内容</span><p class="input-p"><input type="text" placeholder="请输入" class="reaction biginput disabled" v-model="subdata.checkingMedication.adverseReactionContent" disabled="disabled"/></P>
			  					</div>
		  					</div>
		  					<div class="followUp-headline"><span>用药情况</span></div>
		  					<div class="followUp-item">
			  					<div class="input-list list-three medicine1">
			  						<div class="input-item">
			  							<span>药物名称1</span><p class="input-p"><input type="text" class="smoke smallinput disabled" style="width: 17vw !important;" v-model="drugStatus.drug1.drugName" disabled="disabled"/></p>
			  						</div><div class="input-item">
			  							<span>用法</span><p class="input-p"><input type="text" class="sportnum smallinput disabled" v-model="drugStatus.drug1.usage" disabled="disabled"/><span class="two-unit">次/日</span></p>
			  						</div><div class="input-item">
			  							<span>用量</span><p class="input-p"><input type="text" class="sportnum smallinput disabled" v-model="drugStatus.drug1.consumption" disabled="disabled"/><span class="two-unit">mg/次</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-three medicine2">
			  						<div class="input-item">
			  							<span>药物名称2</span><p class="input-p"><input type="text" class="smoke smallinput disabled" style="width: 17vw !important;" v-model="drugStatus.drug2.drugName" disabled/></p>
			  						</div><div class="input-item">
			  							<span>用法</span><p class="input-p"><input type="text" class="sportnum smallinput disabled" v-model="drugStatus.drug2.usage" disabled/><span class="two-unit">次/日</span></p>
			  						</div><div class="input-item">
			  							<span>用量</span><p class="input-p"><input type="text" class="sportnum smallinput disabled" v-model="drugStatus.drug2.consumption" disabled/><span class="two-unit">mg/次</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-three medicine3">
			  						<div class="input-item">
			  							<span>药物名称3</span><p class="input-p"><input type="text" class="smoke smallinput disabled" style="width: 17vw !important;" v-model="drugStatus.drug3.drugName" disabled/></p>
			  						</div><div class="input-item">
			  							<span>用法</span><p class="input-p"><input type="text" class="sportnum smallinput disabled" v-model="drugStatus.drug3.usage" disabled/><span class="two-unit">次/日</span></p>
			  						</div><div class="input-item">
			  							<span>用量</span><p class="input-p"><input type="text" class="sportnum smallinput disabled" v-model="drugStatus.drug3.consumption" disabled/><span class="two-unit">mg/次</span></p>
			  						</div>
			  					</div>
			  					<div class="input-list list-three medicine4">
			  						<div class="input-item">
			  							<span><b style="opacity: 0;">1</b>其他药物</span><p class="input-p"><input type="text"  class="smoke smallinput disabled" style="width: 17vw !important;" v-model="drugStatus.other.drugName" disabled/></p>
			  						</div><div class="input-item">
			  							<span>用法</span><p class="input-p"><input type="text"  class="sportnum smallinput disabled" v-model="drugStatus.other.usage" disabled/><span class="two-unit">次/日</span></p>
			  						</div><div class="input-item">
			  							<span>用量</span><p class="input-p"><input type="text"class="sportnum smallinput disabled" v-model="drugStatus.other.consumption" disabled/><span class="two-unit">mg/次</span></p>
			  						</div>
			  					</div>
		  					</div>
	  					</template>
  					</div>
  					<!--检查用药end-->
  					<!--转诊建议start-->
  					<div class="followUp-four" v-else-if="tabindex=='four'">
  						<template v-if="!iscompile">
	  						<div class="followUp-headline"><span>转诊建议</span></div>
	  						<div class="followUp-item">
	  							<div class="input-list deskilling">
			  						<span><b style="opacity: 0;">机构及</b>转诊</span><p v-for="item in deskillinglist" v-bind:data-code="item.code" :class="['chosebtn',item.isselect?'on':'']" @click="deskillinglistbtn(item.code)">{{item.name}}</p>
			  					</div>
			  					<div class="input-list cause">
			  						<span><b style="opacity: 0;">机构及</b>原因</span><p class="input-p"><textarea type="text" placeholder="请输入转诊原因" class="causetext bigselect" v-model="subdata.referralSuggestion.referralReason"></textarea></p>
			  					</div>
			  					<div class="input-list organization">
			  						<span>机构及科室</span><p class="input-p"><input type="text" placeholder="请输入转诊机构及科室" class="organizationtext biginput" v-model="subdata.referralSuggestion.referralAgency"/></p>
			  					</div>
			  				</div>
		  				</template>
		  				<template v-if="iscompile">
	  						<div class="followUp-headline"><span>转诊建议</span></div>
	  						<div class="followUp-item">
	  							<div class="input-list deskilling">
			  						<span><b style="opacity: 0;">机构及</b>转诊</span><p v-for="item in deskillinglist" v-bind:data-code="item.code" :class="['chosebtn',item.isselect?'on':'']" v-if="item.isselect">{{item.name}}</p>
			  					</div>
			  					<div class="input-list cause">
			  						<span><b style="opacity: 0;">机构及</b>原因</span><p class="input-p"><textarea type="text" placeholder="请输入转诊原因" class="causetext bigselect disabled" v-model="subdata.referralSuggestion.referralReason" disabled></textarea></p>
			  					</div>
			  					<div class="input-list organization">
			  						<span>机构及科室</span><p class="input-p"><input type="text" placeholder="请输入转诊机构及科室" class="organizationtext biginput disabled" v-model="subdata.referralSuggestion.referralAgency" disabled/></p>
			  					</div>
			  				</div>
		  				</template>
  					</div>
  					<!--转诊建议end-->
  					<!--随访记录start-->
  					<div class="followUp-five" v-else-if="tabindex=='five'">
  						<template v-if="!iscompile">
	  						<div class="followUp-head">随访日期 {{visittimer}}</div>
	  						<div class="followUp-head"><span class='lineleft'></span>随访方式</div>
	  						<div class="followUp-item">
	  							<div class="input-list visittablist">
	  								<p v-for="item in visittablist" :class='["visittab",item.isselect?"select":""]' :data-code="item.code" @click.stop="chosevisit(item.code)">{{item.name}}</p>
	  							</div>
			  				</div>
			  				<div class="followUp-headline"><span>随访分类</span></div>
			  				<div class="followUp-item">
			  					<div class="input-list visitclass">
			  						<span>此次随访分类</span><p v-for="item in visitclass" v-bind:data-code="item.code" :class="['chosebtn',item.isselect?'on':'']" @click="changevisitclass(item.code)">{{item.name}}</p>
			  					</div>
			  				</div>
			  				<div class="followUp-headline"><span>下次随访时间</span></div>
			  				<div class="followUp-item">
			  					<div class="input-list visitTime">
			  						<div class="input-list"><span>下次随访时间</span><p class="input-p"><date-picker :date="startTime" :option="option" :limit="limit"></date-picker></P></div>
		  							<div class="input-list"><span>责任医生</span><p class="input-p" style="margin-left: 15px;">李明栋</p></div>
			  					</div>
			  				</div>
		  				</template>
		  				<template v-if="iscompile">
	  						<div class="followUp-head">随访日期 {{visittimer}}</div>
	  						<div class="followUp-head"><span class='lineleft'></span>随访方式</div>
	  						<div class="followUp-item">
	  							<div class="input-list visittablist">
	  								<p v-for="item in visittablist" :class='["visittab",item.isselect?"select":""]' :data-code="item.code">{{item.name}}</p>
	  							</div>
			  				</div>
			  				<div class="followUp-headline"><span>随访分类</span></div>
			  				<div class="followUp-item">
			  					<div class="input-list visitclass">
			  						<span>此次随访分类</span><p v-for="item in visitclass" v-bind:data-code="item.code" :class="['chosebtn',item.isselect?'on':'']">{{item.name}}</p>
			  					</div>
			  				</div>
			  				<div class="followUp-headline"><span>下次随访时间</span></div>
			  				<div class="followUp-item">
			  					<div class="input-list visitTime">
			  						<div class="input-list"><span>下次随访时间</span><p class="input-p"><date-picker :date="startTime" :option="option" :limit="limit"></date-picker></P></div>
		  							<div class="input-list"><span>责任医生</span><p class="input-p" style="margin-left: 15px;">李明栋</p></div>
			  					</div>
			  				</div>
		  				</template>
  					</div>
  					<!--随访记录end-->
  				</div>
	  		</div>
  		</div>
  	</div>
  </div>
</template>
<script>
import {querySingleHBPFollowUp,postHBPFollowUp} from 'API/requst'
import { getURLParameter,dateFormat,empty } from 'utils/util'
import notyet from '../../../assets/notyet.png'
import already from '../../../assets/already.png'
import $ from 'jquery'
import myDatepicker from 'vue-datepicker'
export default {

  name: 'hypertension',
  components: {
  },
  data () {
    return {
     tabindex:'one',
     id:"",
     iscompile:false,
     notyet:notyet,
     already:already,
     choselist:[{code:'1',name:'无症状',isselect:true},{code:'2',name:'头疼头晕',isselect:false},{code:'3',name:'恶心呕吐',isselect:false},{code:'4',name:'眼花耳鸣',isselect:false},{code:'5',name:'呼吸困难',isselect:false},{code:'6',name:'心悸胸闷',isselect:false},{code:'7',name:'鼻衄出血不止',isselect:false},{code:'8',name:'四肢发麻',isselect:false},{code:'9',name:'下肢水肿',isselect:false}],
     druglist:[{code:'1',name:'规律',isselect:true},{code:'2',name:'间断',isselect:false},{code:'3',name:'不服药',isselect:false}],
     reactionlist:[{code:'1',name:'无',isselect:true},{code:'2',name:'有',isselect:false}],
     deskillinglist:[{code:'1',name:'无',isselect:true},{code:'2',name:'有',isselect:false}],
     visittablist:[{code:'1',name:'门诊',isselect:true},{code:'2',name:'家庭',isselect:false},{code:'3',name:'电话',isselect:false}],
     visitclass:[{code:'1',name:'控制满意',isselect:true},{code:'2',name:'控制不满意',isselect:false},{code:'3',name:'不良反应',isselect:false},{code:'4',name:'并发症',isselect:false}],
     saltlist:[{code:'0',name:'请选择',isselect:true},{code:'1',name:'轻',isselect:false},{code:'2',name:'中',isselect:false},{code:'3',name:'重',isselect:false}],
     medicallist:[{code:'0',name:'请选择',isselect:true},{code:'1',name:'良好',isselect:false},{code:'2',name:'一般',isselect:false},{code:'3',name:'差',isselect:false}],
     mentalitylist:[{code:'0',name:'请选择',isselect:true},{code:'1',name:'良好',isselect:false},{code:'2',name:'一般',isselect:false},{code:'3',name:'差',isselect:false}],
     result:{},
     endtime:'',
     starttime:'',
     visittimer:'',
     startTime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['一', '二', '三', '四', '五', '六','日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format: 'YYYY-MM-DD',
        placeholder: '请选择',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '1px solid #eee',
          'box-shadow': '0',
          'border-radius': '2px',
          'color': '#5F5F5F',
          'width': '90px'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['一', '二', '三', '四', '五', '六','日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['一', '二', '三', '四', '五', '六','日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format:"YYYY-MM-DD HH:mm"
      },
      limit: [{
        type: 'weekday',
        available: [0,1, 2, 3, 4, 5,6]
      },
      {
        type: 'fromto',
        from: '2000-01-01',
        to: '2030-02-20'
      }],
      drugStatus:{
					"drug1": {
						"drugName": "",
						"usage": "",
						"consumption": ""
					},
					"drug2": {
						"drugName": "",
						"usage": "",
						"consumption": ""
					},
					"drug3": {
						"drugName": "",
						"usage": "",
						"consumption": ""
					},
					"other": {
						"drugName": "",
						"usage": "",
						"consumption": ""
					}
			},
      subdata:{
      	"recordTime": '',
				"symptom": "",
				"pulse": "",
				"dia": "",
				"sys": "",
				"weight": "",
				"height": "",
				"bmi": "",
				"other": "",
				"pulseUnit": "",
				"diaUnit": "",
				"sysUnit": "",
				"weightUnit": "",
				"heightUnit": "",
				"bmiUnit": "",
				"dailyCigarette":"",
				"dailyDrink":"",
				"exerciseFrequency":"",
				"saltSituation":"",
				"psychologicalAdjustment":"",
				"medicalBehavior":"",
				"exerciseDuration":"",
				"symOther":"",
				"checkingMedication":{
					"auxiliaryExamination": "",
					"drugCompliance": [
					],
					"adverseDrugReaction": [
					],
					"adverseReactionContent": "",
					"drugStatus": {
						"drug1": {
							"drugName": "",
							"usage": "",
							"consumption": ""
						},
						"drug2": {
							"drugName": "",
							"usage": "",
							"consumption": ""
						},
						"drug3": {
							"drugName": "",
							"usage": "",
							"consumption": ""
						},
						"other": {
							"drugName": "",
							"usage": "",
							"consumption": ""
						}
					}
				},
				"referralSuggestion":{
					"referral":[],
					"referralReason":"",
					"referralAgency":""
				},
				"followUpRecord":{
					"followUpWay": [
						
					],
					"followUpClass": [
					
					],
					"nextTime": '',
					"doctorId": "",
					"doctorName": ""
				}
      },
      "blood":"",
      symptomlist:['1']
    }
  },
  watch:{
  	'startTime.time':function(val){
  		var vm = this;
  		vm.subdata.followUpRecord.nextTime=val;
  	}
  },
  methods:{
  	initialize:function(){
  		var vm = this;
  		setTimeout(function(){
	    	var _height = document.body.clientHeight-$('.table-content-head').outerHeight()-30;
				$('.followUp-content-right').css('max-height',_height+'px');
				$('.followUp-content-right').css('overflow','auto');
	    },500)
  	},
  	changetab:function(tex){
  		var vm = this;
			if(tex=='five'){
				vm.construction();
			}else{
	  			vm.tabindex = tex;
	  	}
  	},
  	changecompile:function(){
  		var vm = this;
  		vm.postfollowUp();
  		vm.iscompile = true;
  	},
  	compilebtn:function(){
  		var vm = this;
  		vm.iscompile = false;
  	},
  	choselistbtn:function(code){
  		var vm = this;
  		var choselist = vm.choselist;
  		var arr = vm.symptomlist;
  		choselist.forEach(function(item,inde){
  			if(item.code==code){
  				item.isselect = !item.isselect;
  				if(item.isselect&&item.code!='1'){
  					arr.push(code)
  				}else{
  					arr.forEach(function(str,index,ar){
	  					if(str==code){
	  						console.log(index)
	  						arr.splice(index,1);
	  					}
  					})
  				}
  			}
  		})
  		arr.forEach(function(str,index,ar){
				if(str=='1'){
  				arr.splice(index,1);
				}
				
			})
  		choselist[0].isselect = false;
  		vm.subdata.symptom = arr.join(',');
  		console.log(vm.symptomlist)
  	},
  	chosefirstbtn:function(){
  		var vm = this;
  		var choselist = vm.choselist;
  		choselist.forEach(function(item){
  			item.isselect = false;
  		})
  		choselist[0].isselect = true;
  		vm.symptomlist = ['1'];
  		vm.subdata.symptom = '1';
  		vm.subdata.symOther = '';
  	},
  	symOtherinput:function(){
  		var vm = this;
  		var choselist = vm.choselist;
  		var arr = vm.symptomlist;
  		arr.forEach(function(str,index,ar){
				if(str=='1'){
  				arr.splice(index,1);
				}
				
			})
  		choselist[0].isselect = false;
  		vm.subdata.symptom = arr.join(',');
  		console.log(vm.subdata.symptom);
  	},
  	druglistbtn:function(code,tex){
  		var vm = this;
  		var druglist = vm.druglist;
  		druglist.forEach(function(item){
  			if(item.code==code){
  				if(tex=='show'){
  					item.isselect = true;
  				}else{
  					item.isselect = !item.isselect;
  				}
  			}else{
  				item.isselect = false;
  			}
  		})
  		vm.subdata.checkingMedication.drugCompliance = [code];
  	},
  	reactionlistbtn:function(code,tex){
  		var vm = this;
  		var reactionlist = vm.reactionlist;
  		reactionlist.forEach(function(item){
  			if(item.code==code){
  				if(tex=='show'){
  					item.isselect = true;
  				}else{
  					item.isselect = !item.isselect;
  				}
  			}else{
  				item.isselect = false;
  			}
  		})
  		vm.subdata.checkingMedication.adverseDrugReaction = [code];
  	},
  	deskillinglistbtn:function(code,tex){
  		var vm = this;
  		var deskillinglist = vm.deskillinglist;
  		deskillinglist.forEach(function(item){
  			if(item.code==code){
  				if(tex=='show'){
  					item.isselect = true;
  				}else{
  					item.isselect = !item.isselect;
  				}
  			}else{
  				item.isselect = false;
  			}
  		})
  		vm.subdata.referralSuggestion.referral = [code];
  	},
  	chosevisit:function(code,tex){
  		var vm = this;
  		var visittablist = vm.visittablist;
  		visittablist.forEach(function(item){
  			if(item.code==code){
  				if(tex=='show'){
  					item.isselect = true;
  				}else{
  					item.isselect = !item.isselect;
  				}
  			}else{
  				item.isselect = false;
  			}
  		})
  		vm.subdata.followUpRecord.followUpWay = [code];
  	},
  	changevisitclass:function(code,tex){
  		var vm = this;
  		var visitclass = vm.visitclass;
  		visitclass.forEach(function(item){
  			if(item.code==code){
  				if(tex=='show'){
  					item.isselect = true;
  				}else{
  					item.isselect = !item.isselect;
  				}
  			}else{
  				item.isselect = false;
  			}
  		})
  		vm.subdata.followUpRecord.followUpClass = [code];
  	},
  	checkinput:function(){
  		var vm = this;
  		if(!empty(vm.blood)){
  			var chblood = vm.blood.split('/');
  			if(empty(chblood[0])||empty(chblood[1])){
  				vm.showtoast('请输入正确的格式');
  			}
  		}
  	},
  	changeselect:function(elem,tex){
  		var vm = this;
  		if($(elem).val()=='0'){
  			$(elem).css('color','#666');
  		}else{
  			$(elem).css('color','#333');
  		}
  		switch(tex){
  			case '摄盐':
  			vm.subdata.saltSituation = $(elem).val();
  			break;
  			case '遵医':
  			vm.subdata.medicalBehavior = $(elem).val();
  			break;
  			case '心理':
  			vm.subdata.psychologicalAdjustment = $(elem).val();
  			break;
  		}
  	},
  	getfollowUp:function(tex){
  		var vm = this;
  		if(tex=='取消'){
				window.location.href = 'hypertension.html';
		  	return;
	  	}
  		var obj = {
  			"personId":getURLParameter('personId')||sessionStorage.getItem('personId'),
  			"id":getURLParameter('id')
  		}
		  querySingleHBPFollowUp(obj).then(data=>{
	      var result = data.result;
	      vm.result = data.result;
	      if(!empty(data.result.id)){
	      	var _id = data.result.id+"";
		      vm.id = _id.substring(0,3)+'-'+_id.substring(3,8);
	      }
	      var subdata = vm.subdata;
	      var symptom = data.result.symptom;
	      if(empty(data.result.sys)&&empty(data.result.dia)){
	      	vm.blood = '';
	      }else{
	      	vm.blood = data.result.sys+'/'+data.result.dia;
	      }
	      Object.keys(result).forEach(function(keystr){
			    Object.keys(subdata).forEach(function(key){
			    	if(keystr==key){
			    		subdata[key]=result[keystr];
			    	}
					});
				});
				if(!empty(result.checkingMedication.drugCompliance)){
					vm.druglistbtn(result.checkingMedication.drugCompliance[0],'show');
				}
				if(!empty(result.checkingMedication.adverseDrugReaction)){
					vm.reactionlistbtn(result.checkingMedication.adverseDrugReaction[0],'show');
				}
				if(!empty(result.checkingMedication.drugStatus)){
					vm.drugStatus = result.checkingMedication.drugStatus;
				}
				if(!empty(result.referralSuggestion.referral)){
					vm.deskillinglistbtn(result.referralSuggestion.referral[0],'show');
				}
				if(!empty(result.followUpRecord.followUpWay)){
					vm.chosevisit(result.followUpRecord.followUpWay[0],'show');
				}
				if(!empty(result.followUpRecord.followUpClass)){
					vm.changevisitclass(result.followUpRecord.followUpClass[0],'show');
				}
				if(!empty(result.followUpRecord.nextTime)){
					vm.startTime.time=result.followUpRecord.nextTime;
				}
				if(!empty(symptom)){
					var _symptom = symptom.split(',');
					var _choselist = vm.choselist;
					vm.symptomlist = _symptom;
					_choselist.forEach(function(item,index,arr){
						if(_symptom.includes(item.code)){
							item.isselect = true;
						}else{
							item.isselect = false;
						}
					})
				}
				vm.subdata = subdata;
	    })
  	},
  	postfollowUp:function(){
  		var vm = this;
  		var drugStatus = vm.drugStatus;
  		vm.subdata.checkingMedication.drugStatus = drugStatus;
  		var obj = vm.subdata;
  		var timer = new Date().getTime();
  		if(!empty(vm.blood)){
  			var _blood = vm.blood.split('/');
  			vm.subdata.sys = _blood[0];
  			vm.subdata.dia = _blood[1];
  		}
  		vm.subdata.recordTime = timer;
  		vm.subdata.personId = sessionStorage.getItem('personId');
  		vm.subdata.id = getURLParameter('id')||'';
  		postHBPFollowUp(obj).then(data=>{
  			vm.showtoast('保存成功');
  			vm.getfollowUp();
//			setTimeout(function(){
//				window.location.href = 'hypertension.html';
//			},1000)
	    }).catch(err=>{
    			vm.alertDefault({
		    		text:err.data.resultMessage,
						rowButton:false,
						leftButtonText:'取消',
						rightButtonText: '确定'
		    	})
    	})
  	}
  },
  components:{
  	'date-picker': myDatepicker
  },
  created () {
  	var vm = this;
  	vm.initialize();
  	var id = getURLParameter('id');
  	var myDate = new Date();
  	var visittimer = dateFormat(myDate.getTime(),'Y-m-d');
  	vm.visittimer=visittimer;
  	if(!empty(id)){
  		vm.getfollowUp();
  		vm.iscompile=true;
  	}else{
  		vm.iscompile=false;
  	}
  },
  mounted(){
//		window.onresize = () => {
//				return(() => {
//					if(document.activeElement.tagName === 'INPUT'){
//				        document.activeElement.scrollIntoView({behavior: "smooth"})
//				    }
//				})()
//			}
  }
}
</script>
<style>
	.followUp{
		font-size: 0.3rem;
    height: calc(100% - 70px);
	}
	.followUp-content{
		height: 100%;
	}
	.followUp-content-bottom{
		height:calc(100% - 100px);
	}
	.followUp-content-right{
		min-height: 70%;
	}
	/*通用样式*/
	input{
		outline: none;
		border: 1px solid #eee;
	}
	.followUp .detect{
		margin-left: 15px;
	}
	.chosebtn{
		display: inline-block;
    margin-left: 15px;
    border: 1px solid #3C9BFF;
    line-height: .6rem;
    padding: 0 0.4rem;
    border-radius: 8px;
    color: #3C9BFF;
	}
	.chosebtn.on{
		display: inline-block;
    margin-left: 15px;
    background:#3C9BFF;
    border: 1px solid #3C9BFF;
    line-height: .6rem;
    padding: 0 0.4rem;
    border-radius: 8px;
    color: #fff;
	}
	.input-p{
		display: inline-block;
		position: relative;
	}
	.commoninput{
		height: 0.6rem;
		width: 21vw !important;
		font-size: .28rem;
		padding-left: 15px;
		border-radius: 6px;
		margin-left: 15px;
	}
	select.commoninput{
		width: calc(21vw + 15px) !important;
    border-color: #eee;
    color: #666;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: #fff;
	}
	select.commoninput.substantial{
		color: #333;
	}
	.biginput{
		height: 60px;
		width: 57vw !important;
		font-size: .28rem;
		padding-left: 15px;
		border-radius: 6px;
		margin-left: 15px;
	}
	.smallinput{
		height: 60px;
		width: 15vw !important;
		font-size: .28rem;
		padding-left: 15px;
		border-radius: 6px;
		margin-left: 15px;
	}
	.bigselect{
		height: 100px;
		width: 58vw !important;
		font-size: .28rem;
		padding-left: 15px;
		border-radius: 6px;
		margin-left: 15px;
    vertical-align: top;
    padding-top: 5px;
	}
	.input-list{
		margin-bottom: 15px;
		position: relative;
	}
	.one-unit,.two-unit{
		position: absolute;
    display: inline-block;
    top: 50%;
    transform: translateY(-50%);
    right: 3%;
    color: #666666;
	}
	input.disabled,select.disabled,textarea.disabled{
		background: #fff;
		border: 0;
	}
	.two-unit{
		right: 3%;
	}
	.unitdisabled{
		left: 35%;
	}
	.input-list div{
		position: relative;
	}
	.list-two>div{
		display: inline-block;
		width: 50%;
	}
	.list-three>div{
		display: inline-block;
		width: 30%;
	}
	.list-three>div:nth-child(1){
		width: 40%;
	}
	.followUp-content-head{
		padding: 15px 30px;
		border-bottom: 1px solid #eee;
	}
	.followUp-content-head>div{
		display: inline-block;
		width: 50%;
	}
	.content-head-left>span:nth-child(2){
		color: #999;
		margin-left: 10px;
	}
	.content-head-right>p{
		display: inline-block;
		vertical-align: middle;
	}
	.content-head-right>p:nth-child(1){
		margin-right: 10px;
	}
	.content-head-right{
		text-align: right;
		color: #3C9BFF;
	}
	.content-head-right img{
		width: .5rem;
		height: .5rem;
		vertical-align: middle;
		margin-right: 10px;
	}
	.content-head-right span{
		vertical-align: middle;
	}
	.followUp-content-bottom{
		padding: 15px 30px;
	}
	.followUp-content-bottom>div{
		display: inline-block;
		vertical-align: text-top;
	}
	.followUp-content-left{
		width: 9%;
	}
	.followUp-content-left>div{
		margin-bottom: 10px;
		text-align: right;
	}
	.followUp-content-left>div span{
		display: inline-block;
    background: #F2F2F2;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    border-radius: 15% 0 0 15%;
    color: #999;
	}
	.followUp-content-left>div.on span{
		background:rgba(60,155,255,0.1) !important;
		color: #3C9BFF;
	}
	.followUp-content-right{
		width: 91%;
		border: 1px solid #eee;
		box-sizing: border-box;
	}
	/*通用结束*/
	.followUp-headline span{
		display: inline-block;
		min-width: 1.6rem;
		line-height: 50px;
		font-size: 0.3rem;
		border-radius: 30px;
		color: #3C9BFf;
		background: rgba(60,155,255,0.1);
		text-align: center;
		padding: 0 0.4rem;
	}
	.followUp-headline{
		padding: 15px 15px;
	}
	.followUp-item{
		padding: 15px 15px;
	}
	.followUp-item>p{
		display: inline-block;
		width: 20%;
		margin-bottom: 15px;
	}
	.followUp-item>p img{
		width: .5rem;
		height: .5rem;
		vertical-align: middle;
		margin-right: 10px;
	}
	.followUp-item>p span{
		vertical-align: middle;
	}
	.other{
		line-height: 60px;
	}
	.followUp-head{
		padding: 15px 15px;
	}
	.followUp-head span{
		vertical-align: middle;
	}
	.followUp-head .lineleft{
		margin-right: 10px;
	}
	.visittab{
		display: inline-block;
		width: 2.3rem;
		line-height: 0.55rem;
		font-size: 0.23rem;
		border-radius: 7px;
		color: #fff;
		border: 1px solid #3C9BFF;
		text-align: center;
		color:#3C9BFF ;
		margin-right: 15px;
	}
	.followUp .cov-vue-date input{
		height: 60px;
		width: 21vw !important;
		font-size: .28rem;
		padding-left: 15px;
		border-radius: 6px;
		margin-left: 15px;
	}
</style>
