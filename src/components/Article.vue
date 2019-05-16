<template>
  <div class="main">
    <div class="article">
      <!-- loading条 -->
      <div v-if="isLoading" class="loading">
        <span class="iconfont icon-loading"></span>
      </div>
      <div v-else>
        <div class="topic-header">
          <div class="topic-title">{{ post.title }}</div>
          <ul>
            <li>• 发布于 {{ post.create_at | formatDate }}</li>
            <li>• 作者：{{ post.author.loginname }}</li>
            <li>• {{ post.visit_count }}次浏览</li>
            <li>• 来自 {{ post | tabFormatter }}</li>
          </ul>
          <div class="content" v-html="post.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data() {
    return {
      isLoading: false,
      post: {}
    }
  },
  methods: {
    getArticleData() {
      this.isLoading = true
      this.$axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.isLoading = false
          this.post = res.data.data
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getArticleData()
  }
}
</script>

<style lang="scss">
  @import url('../assets/github-markdown.css');
  .main {
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 15px auto;
    min-height: 400px;
    .article {
    // &:not(:first-child) {
      margin-right: 305px;
      margin-top: 15px;
      padding: 0;
    // }
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
    .topic-header {
      border-radius: 4px;
      padding: 10px;
      background-color: #fff;
      .topic-title {
        font-size: 20px;
        font-weight: bold;
        padding-top: 8px;
      }
      ul {
          list-style: none;
          padding: 0px 0px;
          margin: 6px 0px;
          li {
            display: inline-block;
            font-size: 12px;
            color: #838383;
          }
        }
      .content {
        border-top: 1px solid #e5e5e5;
        padding: 0 10px;
      //       .markdown-text img {
      //   width: 92% !important;
      // }
      }
    }

  }
  }
</style>
