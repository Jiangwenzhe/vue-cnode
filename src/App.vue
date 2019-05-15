<template>
  <div>
    <Header></Header>
    <PostList></PostList>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
export default {
  components: {
    Header,
    PostList
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
