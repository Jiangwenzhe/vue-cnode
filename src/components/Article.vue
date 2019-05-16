<template>
  <Loading v-if="isLoading"></Loading>
  <div  v-else class="main">
    <div class="article">
      <!-- loading条 -->
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
      <div class="reply">
        <div class="top-bar">{{post.reply_count}} 回复</div>
          <div class="reply-section" v-for="(reply, index) in post.replies" :id="reply.id" :key="index">
            <div class="reply-up">
                <img :src="reply.author.avatar_url">
              <router-link :to="{
              name:'userInfo',
              params:{
                name:reply.author.loginname
              }}">
                <span class="user-name">  {{ reply.author.loginname}}</span>
              </router-link>&nbsp;
              <a class="reply-index" :href="`#${reply.id}`">{{ index+1 }}楼•{{ post.create_at | formatDate}}</a>
              <span class="thumbs-up" v-if="reply.ups.length>0" @click="handleLikeBtn">
                <span class="iconfont icon-like"></span>
                {{reply.ups.length}}
              </span>
              <span v-else></span>
            </div>
            <div class="reply-content" v-html="reply.content"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from './Loading'
export default {
  name: 'Article',
  components: {
    Loading
  },
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
    },
    handleLikeBtn() {
      alert('官方没有提供相关的点赞api哈～～～');
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
    .reply {
      background-color: #fff;
      a,span {
        font-size: 13px;
        color: #666;
        text-decoration: none;
      }
      .top-bar {
        padding: 10px;
        background-color: #f6f6f6;
        height: 16px;
        font-size: 12px;
        margin-top: 10px;
      }
      .reply-section {
        border-bottom:1px solid #e5e5e5;
        padding: 10px;
        .reply-up {
          display: flex;
          align-items: center;
          img {
            width: 30px;
            height: 30px;
            border-radius: 4px;
            box-shadow: 0 4px 12px 0 rgba(0,0,0,.1);
          }
          span {
            display: inline-block;
          }
          .user-name {
            margin-left: 10px;
            font-weight: bold;
            color: #666;
            font-size: 12px;
          }
          .reply-index {
            margin-left: 8px;
            font-size: 12px;
            color: #08c;
            &:hover {
              color: #005580;
              text-decoration: underline;
              cursor: pointer;
            }
          }
          .thumbs-up {
            flex: 1;
            text-align: right;
            font-weight: 500;
            cursor: pointer;
          }
          a:nth-of-type(2) {
            margin-left: 0px;
            display: inline-block;
          }
        }
        .reply-content {
          margin-left: 40px;
        }
      }
    }
  }
  }
</style>
