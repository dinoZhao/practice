<template>
  <div>
      <input type="text" ref="input" :value="value" @input="updateValue($event.target.value)">
  </div>
</template>




<script>
export default {
  methods:{
      updateValue(value){
      var formattedValue = value
        // 删除两侧的空格符
        .trim()
        // 保留 2 位小数
        .slice(
          0,
          value.indexOf('.') === -1
            ? value.length
            : value.indexOf('.') + 3
        )
      // 如果值尚不合规，则手动覆盖为合规的值
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过 input 事件带出数值
      this.$emit('input', Number(formattedValue))
      }
  },
  props: ['value'],
}
</script>
