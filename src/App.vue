<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  components: {
    Header,
  }
}
</script>

<style lang="scss">
  html,body {
    padding: 0;
    margin: 0;
    background-color: #e1e1e1;
  }

</style>
