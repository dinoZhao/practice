<script>
export default {
  data:function(){
      return {
          items:[1,2,3]
      }
  }
}
</script>
<template>
<ul>
  <slot name="item"
    v-for="item in items"
    :text="item">
    <!-- 这里写入备用内容 -->
  </slot>
</ul>
</template>
