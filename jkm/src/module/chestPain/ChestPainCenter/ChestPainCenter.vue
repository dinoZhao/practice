<template>
  <div class="ChestPainCenter">
  	<headline />
    <div class="title"><span>转诊申请</span></div>
    <div class="inner">
      <div class="information">
        <div class="information_inner">
        <span class="Patient">患者信息</span>
        <b>李明栋</b>
        <span class="sex">男</span>
        <span class="age">34岁</span>
        </div>
      </div>
      <div class="information hospital">
        <div class="information_inner">
          <div class="hospital_left">
          <span class="Patient">转诊医院</span>
          <b>昆明市第一人民医院</b>
          </div>
          <div class="hospital_right">
          <span class="type">来院方式</span>
          <span :class="{active:bCheck}" @click="check">自行来院</span>
            <span :class="{active:!bCheck}" @click="check">呼叫(120或其他出租车)</span>
          </div>
        </div>
      </div>
      <div class="ProblemDescription">
        <div class="ProblemDescription_inner">
        <div class="ProblemDescription_left">
        <span>问题描述</span>
        <textarea placeholder="请尽可能完整描述症状、检查结果，不少于10个字!"></textarea>
        </div>
        <div class="ProblemDescription_right">
          <div class="microphone">
            <img src="../../../assets/Combined Shape.png" alt="">
          </div>
          <p>按住说话</p>
        </div>
        </div>
      </div>
      <div class="report">
        <div class="report_inner">
          <div class="report_top">
            <div class="report_text"><span>报告</span></div>
            <ul>
              <li><img src="../../../assets/ecgicon.png" alt="">
                <span>心电报告</span>
              </li>
              <li><img src="../../../assets/ctnlicon.png" alt="">
                <span>cTnl报告</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="report_bottom">
        <button type="submit" @click="transfer">提交转诊</button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import {getKnowledgeTag,cancelAttention} from 'API/requst'
import headline from 'components/headline/headline.vue';
import { getURLParameter,dateFormat } from 'utils/util'
export default {
  data () {
    return {
     bCheck:true
    }
  },
  methods:{
    transfer (){
    	var vm = this;
    	vm.showtoast('提交成功');
    	setTimeout(function(){
  		sessionStorage.setItem('tabstatus','init')
    		 window.location.href = 'assist.html';
    	},2500)
    },
    check (){
      this.bCheck=!this.bCheck
    }
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
	.ChestPainCenter{
    width: calc(100% - 200px);
    height: 100%;
    margin-left: 200px;
    overflow: hidden;
    .title{
      position: fixed;
      top: 5%;
      left: 52%;
      span{
        color: #3C9BFF;
        font-size: 0.3rem;
        font-family: PingFangSC-Medium;
        font-weight: 700;
      }
    }
    .inner{
      width: 100%;
      margin: 0 auto;
      height: 100%;
      span{
        vertical-align: middle;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular;
      }
      .information {
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: .35rem 0;
        margin-top: 1rem;
        overflow: hidden;
        .information_inner {
          margin-left: 30px;
          span {
            color: #999999;
            &.Patient {
              margin-right: .5rem;
              color: #333333;
            }
            &.sex {
              margin-right: .12rem;
            }
          }
          b {
            margin-right: .3rem;
            font-size: 0.3rem;
            font-family: PingFangSC-Medium;
            vertical-align: middle;
          }
        }
      }
      .hospital{
        margin-top: 0;
        .hospital_left{
          float: left;
        }
        .hospital_right{
         float: left;
          margin-left: .8rem;
          span{
            &.type{
              color: #333333;
              margin-right: .2rem;
              padding: 0;
              border: none;
            }
            &.active{
              color: white;
              background-color: #3C9BFF;
            }
            padding: .13rem;
            color: #3C9BFF;
            border: 1px solid #3C9BFF;
            margin-left: .1rem;
            border-radius: 2px;
          }
        }
      }
      .ProblemDescription{
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: .2rem 0;
        overflow: hidden;
        .ProblemDescription_inner{
          margin-left: 30px;
          .ProblemDescription_left{
            float: left;
            width: 60%;
            span{
              color: #333333;
              margin-right: .5rem;
              vertical-align: top;
            }
            textarea{
              font-size: 0.28rem;
              font-family: PingFangSC-Regular;
              color: #999999;
              outline: none;
              border: none;
              width: 80%;
              vertical-align: top;
              position: relative;
              top: -.1rem;
            }
          }
          .ProblemDescription_right{
            float: left;
            margin-left: 2.5rem;
            width: 2rem;
            .microphone{
              width: 2rem;
              height: 1.2rem;
              background: url("../../../assets/rectangle.png") no-repeat;
              background-size: contain;
              display: flex;
              align-items: center;
              justify-content: center;
              img{
                width: 0.44rem;
                height: 0.74rem;
              }
            }
            p{
              font-size: 0.28rem;
              font-family: PingFangSC-Regular;
              color: #3C9BFF;
              margin-top: .1rem;
              text-align: center;
            }
          }
        }
      }
      .report{
        width: 100%;
        padding: .4rem 0;
        overflow: hidden;
        .report_inner{
          margin-left: 30px;
          .report_top{
            height: 1.4rem;
            .report_text{
              float: left;
              span{
                color: #333333;
                display: inline-block;
                width: 0.75rem;
                text-align: left;
              }
            }
            ul{
              float: left;
              margin-left: .9rem;
              li{
                width: 1.4rem;
                height: 1.4rem;
                float: left;
                margin-right: .2rem;
                border: 1px solid #3C9BFF;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                img{
                  width: 0.53rem;
                  height: 0.6rem;
                }
                span{
                  color: #3C9BFF;
                }
              }
            }
          }
        }
      }
      .report_bottom{
        width: 100%;
        text-align: center;
        button{
          outline: none;
          width: 5rem;
          height: 1.2rem;
          background-color: #3C9BFF;
          color: white;
          font-family: PingFangSC-Medium;
          font-size: 0.48rem;
          text-align: center;
          line-height: 1.2rem;
          border-radius: 10px;
          border: none;
        }
      }
    }
	}
</style>
