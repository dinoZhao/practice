<template>
  <div id="toggle" @click='chose'>
      <div :class="addcls[index]" v-for='(item,index) in togglearr' :key="index" >
          <span :data-index='index'>{{item}}</span>
      </div>
      <span class="line" :style="{left}"></span>
  </div>
</template>

<script>
export default {
  props: ['togglearr'],

  data() {
    return {
      addcls:[],
      left:0

    };
  },

  methods: {
      chose(e){
          let index=e.target.dataset.index;
          let len=this.togglearr.length;
          let arr=new Array(len);
          if(index!==undefined){
            this.$emit('toggling',+index);
            this.left=2*index+'rem';
            for(let i=0;i<len;i++){
                if(i===+index){
                    arr[i]='chosed';
                }else{
                    arr[i]='notchosed';
                }
            }
            this.addcls=arr;
          }
      }
  },

  created() {
    let arr=[];
    for(let i=0;i<this.togglearr.length;i++){
        if(i==0){
            arr[i]='chosed';
        }else{
            arr[i]='notchosed';
        }
    }
    this.addcls=arr;
  }
};
</script>

<style scoped>
    #toggle{
        height: 0.7rem;
        border-bottom: 1px solid #eee;
        position: relative;
    }
    #toggle>div{
        height: 100%;
        width:2rem;
        text-align: center;
        line-height: 0.7rem;
        float: left;
        cursor: pointer;
        font-size: 0.32rem;
    }
    #toggle>div>span{
        display: block;
        height: 0.65rem;
    }
    .line{
        height: 0.05rem;
        background-color: #3C9BFF;
        position: absolute;
        left:0;
        bottom: 0;
        width:2rem;
        height:0.05rem;
        transition: left 0.2s;
    }
    .chosed{
        color:#3C9BFF;
        /* font-weight: bold; */
    }
    .notchosed{
        color: #333;
    }
</style>
