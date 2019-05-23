<template>
  <div class="signHome">
    <div class="signHome_top">
      <ul>
        <li class="active">家庭医生</li>
        <li>随访计划</li>
        <li>签约管理</li>
        <li>到期提醒</li>
      </ul>
    </div>
    <div class="signHome_bottom">
      <div class="bottom_content" v-for="item of list">
        <div class="content_top"><img src="../../../assets/head-pic.png" alt=""><b>{{item.name}}</b>
          <p><span>{{item.sex}}</span><span>{{item.age}}岁</span></p>
        </div>
        <div class="content_middle"><span>{{item.young}}</span><span>{{item.illness}}</span></div>
        <div class="content_bottom"><span>服务有效期</span><span>{{item.time}}</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import {} from 'API/requst'
import headline from 'components/headline/headline.vue';
import { getURLParameter,dateFormat } from 'utils/util'
export default {
  name: 'signHome',
  components: {
  },
  data () {
    return {
      list:[
        {
          name:'李明栋',
          sex:'男',
          age:34,
          young:'中年人',
          illness:'高血压',
          time:'2019-12-30'
        },
        {
          name:'李明栋',
          sex:'男',
          age:34,
          young:'中年人',
          illness:'高血压',
          time:'2019-12-30'
        },
        {
          name:'李明栋',
          sex:'男',
          age:34,
          young:'中年人',
          illness:'高血压',
          time:'2019-12-30'
        },
        {
          name:'李明栋',
          sex:'男',
          age:34,
          young:'中年人',
          illness:'高血压',
          time:'2019-12-30'
        },
        {
          name:'李明栋',
          sex:'男',
          age:34,
          young:'中年人',
          illness:'高血压',
          time:'2019-12-30'
        },
        {
          name:'李明栋',
          sex:'男',
          age:34,
          young:'中年人',
          illness:'高血压',
          time:'2019-12-30'
        }
      ]
    }
  },
  methods:{
  },
  components:{
    headline
  },
  created () {
  	var vm = this;
  },
  mounted(){
  }
}
</script>
<style lang="less">
	.signHome{
    margin-left: 200px;
    width: calc(100% - 200px);
    .signHome_top{
      width: 100%;
      padding-left: .15rem;
      box-sizing: border-box;
      border-bottom: 1px solid #DEDEDE;
      height: .8rem;
      ul{
        li{
          width: 1.92rem;
          float: left;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.28rem;
          text-align: center;
          color: #333;
          &.active{
            border-bottom: 2px solid #3c9bff;
            color: #3c9bff;
          }
        }
      }
    }
    .signHome_bottom{
      width: 100%;
      padding: 0.15rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .bottom_content{
        margin-top: .3rem;
        background-color: #ffffff;
        width: 30.5%;
        padding: .3rem 0 .15rem .2rem;
        overflow: hidden;
        border: 1px solid #f0f6fe;
        box-shadow: 0 0 12px #f3f7fd;
        .content_top{
          height: 90px;
          width: 100%;
          position: relative;
          b{
            position: absolute;
            left: 1.6rem;
            top: .2rem;
            font-size: 0.28rem;
          }
          p{
            position: absolute;
            left: 1.6rem;
            bottom: .2rem;
            font-size: 0.24rem;
            color: #9c9c9c;
            span{
              vertical-align: middle;
            }
            span:nth-child(2){
              margin-left: .2rem;
            }
          }
        }
        .content_middle{
          margin-top: .3rem;
          span{
            display: inline-block;
            padding: .03rem .2rem;
            border-radius: 12px;
            color: #3c9bff;
            background-color: #ebf5ff;
            font-size: 0.20rem;
            font-weight: 700;
            margin-right: .15rem;
            &:nth-child(2){
              background-color: #f6d8d6;
              color: #d43d34;
            }
          }
        }
        .content_bottom{
          margin-top: .2rem;
          span{
            font-size: 0.20rem;
            color: #9F9F9F;
            padding-left: .05rem;
            &:nth-child(2){
              padding-left: .1rem;
            }
          }
        }
      }
    }
  }
</style>
