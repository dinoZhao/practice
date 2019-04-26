<template>
  <div class="excellentPlan">
    <headline/>
    <div class="tag">
      <ul>
        <li
          :class="['tag_item',{active:activeTagIndex==index}]"
          v-for="(item,index) in tagList"
          :key="index"
          @click="chooseTag(index)"
        >{{item.typeName}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="videos" v-for="(item,index) in videoList" :key="index">
        <img :src="item.imgUrl" alt>
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import headline from "../../../components/headline/headline.vue";
import { getTagOfTalent, getTalentContent } from "API/requst";

export default {
  name: "excellentPlan",
  data() {
    return {
      tagList: [],
      activeTagIndex: 0,
      videoList: []
    };
  },
  components: { headline },
  methods: {
    chooseTag(index) {
      this.activeTagIndex = index;
      this.getContent(this.tagList[index].typeName);
    },
    getContent(Type) {
      var vm = this;
      getTalentContent({ category: "JKJCYTJ", kType: Type }).then(res => {
        // console.log(res)
        vm.videoList = res.resultList;
      });
    }
  },
  beforeMount() {
    var vm = this;
    getTagOfTalent({ types: "JKJCYTJ" })
      .then(res => {
        // console.log(res)
        vm.tagList = res.resultList;
        vm.getContent(res.resultList[0].typeName);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.excellentPlan {
  width: 100%;
  display: flex;
  height: 100%;
}
.tag {
  width: 4rem;
  height: 100%;
  border-right: 1px solid #eee;
  box-sizing: border-box;
  background-color: #eee;
  ul{
    padding-top: 80px;
    background-color: #fff;
  }
  .tag_item {
    width: 100%;
    height: 1.1rem;
    line-height: 1.1rem;
    color: #333;
    font-family: PingFangSC-Medium;
    font-size: 0.32rem;
    letter-spacing: 0;
    text-align: center;
  }
  .active {
    background-color: #3c9bff;
    color: #fff;
  }
}
.content {
  border-top: 1px solid #eee;
  box-sizing: border-box;
  height: 100%;
  width: calc(100% - 4.01rem);
  padding-top: 80px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  .videos {
    width: 39.54%;
    margin-bottom: 0.6rem;
    &:nth-of-type(2n + 1) {
      margin-right: 0.6rem;
    }
    img {
      width: 100%;
      height: 2.5rem;
    }
    p {
      font-family: PingFangSC-Medium;
      font-size: 0.36rem;
      color: #333333;
      letter-spacing: 0;
      line-height: 0.5rem;
    }
  }
}
</style>


