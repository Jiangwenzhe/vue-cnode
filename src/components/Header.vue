<template>
  <div class="header">
    <div class="header-container clearfix">
      <a href="/" class="brand">
        <img src="../assets/cnodejs_light.svg" alt="">
      </a>
      <ul>
        <li><a href="https://github.com/Jiangwenzhe/vue-cnode">关于</a></li>
        <li><a href="https://cnodejs.org/api">所用API</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }
  .header {
    margin-bottom: 0;
    z-index: 9;
    width: 100%;
    position: relative;
    background: #444;
    font-size: 13px;
    padding: 4px;
    .header-container {
      width: 90%;
      max-width: 1400px;
      margin: 0 auto;
      .brand {
        width: 120px;
        padding: 5px 20px;
        height: 34px;
        line-height: 34px;
        float: left;
        margin-left: -20px;
        font-size: 20px;
        img {
          vertical-align: initial;
        }
      }
      ul {
        list-style: none;
        float: right;
        margin-right: 0;
        li {
          float: left;
          a {
            text-decoration: none;
            color: #ccc;
            padding: 10px 15px;
          }
          a:hover {
            color: white;
          }
        }
      }
    }
  }
</style>
