<template>
  <div id="coat">
    <headTop/>
    <div class="fornative">
    	<temp headtxt="个人信息"></temp>
      <namesearch @sendPersonId="changePerson" :AllPatients="AllPatients" :regularAllPatients="regularAllPatients" style="visibility: hidden;"/>
      <div style="display:inline-block;vertical-align:top;">
        <div class="main">
          <div class="content">
            <div class="item">
              <div class="label">姓名</div>
              <input v-model="patientName" type="text" placeholder="必填，请输入姓名">
            </div>
            <div class="item">
              <div class="label">身份证号</div>
              <input v-model="patientIdNumber" maxlength="18" type="text" placeholder="必填，请输入身份证号">
            </div>
            <div class="item">
              <div class="label">出生日期</div>
              <input v-model="birthday" maxlength="18" readonly type="text" placeholder="根据身份证号进行识别">
            </div>
            <div class="item">
              <div class="label">年龄</div>
              <input v-model="age" maxlength="18" readonly type="text" placeholder="根据身份证号进行识别">
            </div>
            <div class="item">
              <div class="label">联系方式</div>
              <input v-model="patientPhone" type="text" placeholder="选填，请输入电话号码">
            </div>
            <div class="item" style="height: 1.1rem;">
              <div class="label">住址</div>
              <textarea v-model="patientAddress" id="textarea" rows="4" cols placeholder="选填，请输入住址" @focus="getFocus"></textarea>
            </div>
          </div>
        </div>
        <btn class="next cliect" @click.native="gonext" fragment="下一步"></btn>
      </div>
    </div>
  </div>
</template>
<script>
import temp from "components/headline/headline.vue";
import btn from "components/stuff/btn.vue";
import headTop from "components/common/headTop.vue";
import namesearch from "components/namesearch/namesearch.vue";
import { isType,getURLParameter,empty} from "utils/util";
import { getResidentList,queryPersonalRecord } from "API/requst";
import '../../../static/css/init.css'
export default {
  name: "info",
  components: {
    temp,
    btn,
    headTop,
    namesearch
  },
  data() {
    return {
      patientName: "",
      patientIdNumber: "",
      patientPhone: "",
      patientAddress: "",
			patientSex: "1",
      screenHeightNoChange: true,
      AllPatients: [], //查询到的所有患者信息
      regularAllPatients: [],
      age:'',
      birthday:'',
      type:'',
      scid:'',
      did:''
    };
  },
  methods: {
    gonext() {
    	var vm = this;
      //				if(!isType(this.patientName, 'cnName')) {
      //                      this.alert("姓名不能为空且只能为中文")
      //				}else
      if (!this.IdentityCodeValid(this.patientIdNumber)) {
        this.alert("身份证号码有误");
      } else if (false) {
        this.alert("联系方式错误");
      } else {
        var FileEstablishment = {
          serialNo: Math.floor(Math.random() * 1000),
          patientName: this.patientName,
          patientIdNumber: this.patientIdNumber,
          patientPhone: this.patientPhone,
          patientAddress: this.patientAddress,
           padDeviceCode:sessionStorage.getItem('padcode')
//        patientSex: this.patientSex
        };
        sessionStorage.setItem(
          "FileEstablishment",
          JSON.stringify(FileEstablishment)
        );
        window.location.href = './medhis.html?did='+vm.did+'&scid='+vm.scid+'&type='+vm.type;
      }
    },
    changePerson(personId) {
    	var vm = this;
    	var type = vm.type;
    	if(type=='switch'){
    		window.location.href = '../remoteclinic/affirmexpert.html?personId=' + personId+'&did='+vm.did+'&scid='+vm.scid+'&type=info';
    	}else{
    		window.android?window.android.getPersonInfo(personId):""
			//window.location.href = '../remoteclinic/reservation.html?personId=' + personId+'&index=3';
    	}
    },
    toggle(e) {
      switch (e.target.innerText) {
        case "男":
          this.patientSex = "1";
          break;
        case "女":
          this.patientSex = "0";
          break;
        default:
          break;
      }
    },
    alert(msg) {
      this.alertDefault({
        text: msg,
        rowButton: false,
        leftButtonText: "取消",
        rightButtonText: "确定"
      });
		},
		getFocus(){
			setTimeout(function(){
				document.body.scrollTop = document.body.scrollHeight;
			},300);
		}
  },
  watch:{
  	patientIdNumber(cur){
  		if(cur.length<14){
  			this.birthday=''
  			this.age=''
  			return
  		}
  		this.birthday=cur.slice(6,10)+'-'+cur.slice(10,12)+'-'+cur.slice(12,14)
  		var d=new Date()
  		var birthdays=new Date(cur.slice(6,10)+'-'+cur.slice(10,12)+'-'+cur.slice(12,14))
  		this.age=d.getFullYear()-birthdays.getFullYear() -(d.getMonth() < birthdays.getMonth() ||(d.getMonth() == birthdays.getMonth() &&d.getDate() < birthdays.getDate())? 1: 0);
  	}
  },
  created() {
  	var vm = this;
  	var type = getURLParameter('type');
  	var scid = getURLParameter('scid');
  	var did = getURLParameter('did');
  	vm.type = type;vm.scid = scid;vm.did = did;
  	var personId = sessionStorage.getItem('personId');
  	if(!empty(personId)){
  		var obj = {
			"personId": personId
	  	}
	  	queryPersonalRecord(obj).then(res => {
	    	vm.patientName = res.result.name;
	    	vm.patientIdNumber = res.result.idNumber;
	    	vm.phoneNumber = res.result.phoneNumber;
	    	vm.patientAddress = res.result.address;
			});
  	}
  },
  mounted() {
    var vm = this;
    let params = {
      padDeviceCode: vm.padcode || sessionStorage.getItem("padcode"),
      serialNo: "00000"
    };
    let AllPatients = [];
    let transfer = [];
    getResidentList(params).then(data => {
      AllPatients = data.result || "";
      vm.regularAllPatients = Object.assign({}, AllPatients);
      AllPatients.map(function(item) {
        Object.keys(item).forEach(function(key) {
          item[key].map(function(SubItem) {
            SubItem.group = key;
            transfer.push(SubItem);
          });
        });
      });
      vm.AllPatients = transfer;
    });
	}
};
</script>
<style scoped="scoped" lang="scss">
#coat {
	// overflow: hidden;
	height: 100%;
}
#coat /deep/ .head {
  /*top: .6rem !important;*/
  left: 20%;
  position: absolute;
}
.fornative{
	// height: 41vw;
  overflow: hidden;
  /deep/ #ns{
    display: inline-block;
  }
  /deep/ .ns-ul-container{
    height: 86%;
  }
}
.main {
  padding-top: 1.2rem;
	// height: 32vw;
	box-sizing: border-box;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: center;
  // align-content: flex-start;
	position: relative;
  .histitle {
    font-size: 0.36rem;
    text-align: center;
    margin-bottom: 0.2rem;
    width: 100%;
    height: 1em;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 0.32rem;
    .item {
      display: flex;
      flex-direction: row;
      height: 0.7rem;
      line-height: 0.7rem;
      margin-top: 0.2rem;
      .label {
        width: 10vw;
        text-align: right;
        margin-right: 0.3rem;
      }
      input {
        background: #ffffff;
        border: 1px solid #666666;
        border-radius: 12px;
        width: 26vw;
        padding-left: 0.1rem;
        font-size: 0.32rem;
      }
      textarea {
        width: 36vw;
        border: 1px solid #666666;
        border-radius: 12px;
        font-size: 0.32rem;
        padding: 0.2rem 0.1rem;
        outline: none;
      }
    }
    .sex {
      .option {
        width: 10vw;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #3c9bff;
        border-radius: 12px;
        border: 0.02rem solid #3c9bff;
        text-align: center;
        box-sizing: border-box;
        margin-right: 0.2rem;
        background: #fff;
      }
      .on {
        background: #3c9bff;
        border-radius: 12px;
        color: #fff;
        border-radius: 12px;
      }
    }
  }
}

.next {
  margin-left: 37%;
  /*position: absolute;
		bottom: 0.6rem;*/
  margin-top: 0.6rem;
}

.manu {
  width: 2.28rem;
  height: 0.8rem;
  font-size: 0.32rem;
  border: 3px solid #fc9452;
  border-radius: 6px;
  text-align: center;
  line-height: 0.8rem;
  color: #fc9452;
  position: absolute;
  right: 0.8rem;
  bottom: 0.6rem;
}
</style>