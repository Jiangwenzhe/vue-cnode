<template>
  <div class="postList">
    <!-- 帖子列表 -->
    <div class="posts">
      <ul>
        <li class="toolbar">
          <span :class="{'current-tab':tab===''}" @click="changeTab('')">全部</span>
          <span :class="{'current-tab':tab==='good'}" @click="changeTab('good')">精华</span>
          <span :class="{'current-tab':tab==='share'}" @click="changeTab('share')">分享</span>
          <span :class="{'current-tab':tab==='ask'}" @click="changeTab('ask')">问答</span>
          <span :class="{'current-tab':tab==='job'}" @click="changeTab('job')">招聘</span>
        </li>
          <div v-if="isLoading" class="loading">
            <span class="iconfont icon-loading"></span>
          </div>
        <div v-else>
            <li v-for="(post,index) in posts" :key="index">
            <img class="avatar" :src="post.author.avatar_url" :alt="post.author.login_name">
            <!-- 回复/浏览量 -->
            <span class="all-count">
              <span class="reply-count">{{ post.reply_count }}</span>
              / {{ post.visit_count}}
            </span>
            <!--帖子的分类-->
            <span :class="[{put_good:(post.good  == true),put_top:(post.top  == true),
            'topiclist-tab':(post.good  != true && post.top  != true)}]">
              <span>
                {{post | tabFormatter}}
              </span>
            </span>
            <!-- 文章标题 -->
            <span> {{ post.title }}</span>
            <!-- 最终回复时间 -->
            <span class="last-reply">{{ post.last_reply_at | formatDate }}</span>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  data() {
    return {
      isLoading: false,
      tab: '',
      posts: []
    }
  },
  methods: {
    getPostData() {
      this.isLoading = true
      this.$axios.get('https://cnodejs.org/api/v1/topics',{
        params: {
          tab: this.tab,
          page: 1,
          limit: 20
        }
      }).then(res => {
        this.isLoading = false
        this.posts = res.data.data
        console.log(res)
      }).catch(err => console.log(err))
    },
    changeTab(tabName) {
      this.tab = tabName
      this.getPostData()
    }
  },
  mounted() {
    this.getPostData()
  }
}
</script>

<style lang="scss" scoped>
  .postList {
    width: 80%;
    margin: 0 auto;
    .posts {
      margin-top: 10px;
      ul {
        list-style: none;
        max-width: 1344px;
        margin: 0 auto;
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
        li {
          padding: 10px;
          font-size: 15px;
          font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
          font-weight: 400;
          background-color: #fff;
          color: #333;
          border-top: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          &.toolbar {
            background-color: #f6f6f6;
            padding: 10px;
            border-radius: 3px 3px 0 0;
          span {
            font-size: 14px;
            color: #80bd01;
            margin: 0 10px;
            cursor: pointer;
            &.current-tab {
              background-color: #80bd01;
              color: #fff;
              padding: 1px 4px;
              border-radius: 3px;
            }
            &:hover {
              color: #08c;
            }
          }
        }
          &:not(:first-child):hover {
            background: #f5f5f5;;
          }
          &:last-child:hover {
            background: white;
          }
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 4px;
            box-shadow: 0 4px 12px 0 rgba(0,0,0,.1);
          }
          .all-count {
            width: 70px;
            display: inline-block;
            text-align: center;
            font-size: 12px;
            margin-right: 5px;
            .reply-count {
              color: #9e78c0;
              font-size: 14px;
            }
          }
          .put_good, .put_top {
            background: #80bd01;
            padding: 0 4px;
            border-radius: 3px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            -o-border-radius: 3px;
            color: #fff;
            font-size: 12px;
            margin-right: 10px;
          }
          .topiclist-tab {
            background-color: #e5e5e5;
            color: #999;
            padding: 0 4px;
            border-radius: 3px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            -o-border-radius: 3px;
            font-size: 12px;
            margin-right: 10px;
          }
          .last-reply {
            flex: 1;
            text-align: right;
            min-width: 50px;
            white-space: nowrap;
            color: #778087;
            font-size: 12px;
          }

        }
      }
    }
  }
</style>
