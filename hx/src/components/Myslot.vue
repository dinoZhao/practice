<script>
import Sloter from "./Sloter"
export default {
  components:{
      Sloter
  }
}
</script>
<template>
 <div>
     <Sloter>
  <!-- 作用域插槽也可以是具名的 -->
  <li
    slot="item"
    slot-scope="props"
    class="my-fancy-item">
    {{ props.text }}
  </li>
  
     </Sloter>
 </div>
</template>
