<template>
  <div id="ns">
    <div class="ns-searchbox">
      <input type="text" placeholder="搜索" @input="search">
    </div>
    <div class="ns-ul-container" @click="recover" id="scroll_body" ref="scroll_body">
      <!--<ul class="ns-list-ul">
      	<li class="ns-list-anchor">M</li>
        <li class="ns-list-li" :class="{active:index===personCurrentIndex}" v-for="(item,index) in currentPatients" :key="index" :data-personId="item.personId" @click.stop="personCurrentIndex = index,searchSinglePatient($event)">
          <img :src="item.headUrl||'http://ww1.sinaimg.cn/large/005SvFg2ly1g0tb4guu90j302i02ijr6.jpg'" alt="picture unloaded" class="ns-list-pic">
          <div class="ns-list-right">
            <div class="ns-list-right-top">{{item.name}}</div>
            <div class="ns-list-right-bottom">
              <div class="ns-information">{{item.sex==='0'?'女':'男'}}</div>
              <div class="ns-information">{{item.age}}岁</div>
            </div>
          </div>
        </li>
      </ul>-->
      <ul class="ns-letter-ul">
        <li
          class="ns-letter-li"
          v-for="(item,index) in letterArr"
          :key="index"
          :data-word="item"
          @click.stop="initialSearch"
        >{{item}}</li>
      </ul>
      <!--新版锚点滑动通讯录--head-->
      <div v-show="!IsSearch">
        <ul v-for="(item,index) in regularAllPatients">
          <li v-for="(value,key) in item" v-if="value.length > 0">
            <div class="first-name-sign" :ref="'anchor-'+key">{{key}}</div>
            <ul class="ns-list-ul">
              <li
                class="ns-list-li"
                :class="{active:indexItem+key===personCurrentIndex}"
                v-for="(valueItem,indexItem) in value"
                :key="indexItem"
                :data-personId="valueItem.personId"
                @click.stop="personCurrentIndex = indexItem+key,searchSinglePatient($event)"
              >
                <img
                  :src="valueItem.headUrl||'https://www.fc18.com.cn/aiaf/sgw/content/fileResource/5443334476'"
                  alt="picture unloaded"
                  class="ns-list-pic"
                >
                <div class="ns-list-right">
                  <div class="ns-list-right-top">{{valueItem.name}}</div>
                  <div class="ns-list-right-bottom">
                    <div class="ns-information">{{valueItem.sex}}</div>
                    <div class="ns-information">{{valueItem.age}}岁</div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--新版锚点滑动通讯录--end-->
      
      <!--可搜索通讯录列表--head-->
        <ul class="ns-list-ul" v-show="IsSearch">
        <li class="ns-list-li" :class="{active:index===personCurrentIndex}" v-for="(item,index) in SearchPatients" :key="index" :data-personId="item.personId" @click.stop="personCurrentIndex = index,searchSinglePatient($event)">
          <img :src="item.headUrl||'https://www.fc18.com.cn/aiaf/sgw/content/fileResource/5443334476'" alt="picture unloaded" class="ns-list-pic">
          <div class="ns-list-right">
            <div class="ns-list-right-top">{{item.name}}</div>
            <div class="ns-list-right-bottom">
              <div class="ns-information">{{item.sex==='0'?'女':'男'}}</div>
              <div class="ns-information">{{item.age}}岁</div>
            </div>
          </div>
        </li>
      </ul>
      <!--可搜索通讯录列表--end-->
    </div>
  </div>
</template>

<script>
export default {
  props: ["AllPatients", "regularAllPatients"],
  //computed:{
  //	searchPatient:function(){
  //	let vm = this;
  //  vm.cachePatients = vm.cachePatients.concat([],vm.AllPatients);
  //		return this.AllPatients
  //	}
  //},
  watch: {
    AllPatients: function() {
      let vm = this;
      //		console.log(vm.AllPatients);
      if (vm.numCount == 0) {
        vm.cachePatients = vm.cachePatients.concat([], vm.AllPatients);
      } else {
      }
      vm.currentPatients = vm.AllPatients;
      this.numCount = this.numCount + 1;
      return this.AllPatients;
    },
    currentPatients() {
      let vm = this;
      this.personCurrentIndex = null;
      //		console.log('currentPatients');
      Object.keys(vm.currentPatients).forEach(function(key) {
        if (vm.currentPatients[key].personId === vm.currentPersonId) {
          vm.personCurrentIndex = key;
        }
      });
    },
    regularAllPatients() {
      let vm = this;
      console.log(vm.regularAllPatients);
    }
  },
  data() {
    return {
      cachePatients: [],
      currentPatients: [],
      SearchPatients: [],
      numCount: 0,
      personCurrentIndex: 0, //当前的患者显示
      currentPersonId: "",
      IsSearch:false,//是否启用搜索框
      letterArr: "ABCDEFGHIJKLMNOPQRSTUVWYZ".split("")
    };
  },
  methods: {
    search(event) {
      let vm = this;
      //		console.log(event.target.value);
      let SearchPatients = [];
      if (event.target.value) {
      	vm.IsSearch = true;
        vm.AllPatients.map(function(item) {
          if (item.name.indexOf(event.target.value) > -1) {
            //				console.log(event.target.value+'---'+item.name)
            SearchPatients.push(item);
          }
        });
        vm.SearchPatients = SearchPatients;
      } else {
      	vm.IsSearch = false;
        vm.SearchPatients = vm.cachePatients;
      }
    },
    searchSinglePatient(event) {
      let vm = this;
      //		console.log(event.currentTarget.dataset.personid);
      vm.$emit("sendPersonId", event.currentTarget.dataset.personid);
      vm.currentPatients = vm.cachePatients;
      vm.currentPersonId = event.currentTarget.dataset.personid;
    },
    initialSearch(event) {
      let transfer = [];
      let vm = this;
      //		  console.log(vm.$refs);
      document.querySelector("#scroll_body").scrollTop = vm.$refs[
        "anchor-" + event.currentTarget.dataset.word
      ]
        ? vm.$refs["anchor-" + event.currentTarget.dataset.word][0].offsetTop
        : "";
      vm.currentPatients = transfer;
    },
    recover() {
      let vm = this;
      vm.currentPatients = vm.cachePatients;
    }
  },
  beforeCreate() {},
  created() {
    let vm = this;
    //  vm.cachePatients = vm.cachePatients.concat([],vm.AllPatients);
    //  console.log(vm.cachePatients);
  }
};
</script>

<style scoped>
input:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
}

input {
  outline-color: invert;
  outline-style: none;
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
}
#ns {
  width: 3.2rem;
  height: calc(100vh - .01rem);
  border: 1px solid #eee;
  box-sizing: border-box;
  position: relative;
}
.ns-searchbox > input {
  position: absolute;
  width: 2.8rem;
  height: 0.6rem;
  left: 0.2rem;
  top: 0.1rem;
  background-color: #fff;
  font-size: 0.18rem;
  padding-left: 0.2rem;
  box-sizing: border-box;
  border-radius: 0.05rem;
}
.ns-searchbox {
  height: 0.8rem;
  background-color: #ddd;
}
.ns-list-li {
  height: 1.2rem;
  /*padding-left: 0.6rem;*/
}

.ns-list-pic {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin-top: 0.16rem;
  margin-left: 0.16rem;
  float: left;
}
.ns-list-right {
  margin-left: 1rem;
  height: 100%;
}
.ns-list-right-top {
  font-size: 0.24rem;
  font-weight: bold;
  color: #333;
  height: 0.7rem;
  line-height: 0.5rem;
  padding: 0.15rem 0 0 0.15rem;
  box-sizing: border-box;
}
.ns-list-right-bottom {
  font-size: 0.18rem;
  color: #999;
  height: 0.4rem;
  padding-left: 0.15rem;
  overflow: hidden;
}
.ns-information {
  float: left;
}
.ns-information:nth-child(2) {
  margin-left: 0.15rem;
}

.ns-ul-container {
  height: calc(100% - 0.8rem);
  overflow: auto;
  /* position: relative; */
}

.ns-letter-ul {
  position: absolute;
  top: 1.3rem;
  left: 2.6rem;
  width: 0.4rem;
  text-align: center;
  color: #999;
}
.ns-letter-li {
  height: 3.3vh;
  line-height: 3.3vh;
}
.ns-letter-li:hover {
  background-color: gray;
  color: #fff;
}
.ns-list-anchor {
  color: #999999;
  border-bottom: solid 1px #eeeeee;
}
.active {
  background-color: #ebf5ff;
}
.first-name-sign {
  padding-left: 0.16rem;
  color: gray;
}
</style>
