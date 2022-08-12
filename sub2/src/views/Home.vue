<template>
  <div class="home">
    <HelloWorld msg="Home 路由"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomePage',
  components: {
    HelloWorld
  }
}
</script>
