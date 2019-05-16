<template>
  <div class="loading">
      <span class="iconfont icon-loading"></span>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss">
  .loading {
      text-align: center;
      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .iconfont {
        font-size: 30px;
        color: rgba(0,0,0,.3);
        display: inline-block;
        animation: 1s rotate linear infinite;
      }
    }
</style>
