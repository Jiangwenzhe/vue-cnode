<template>
  <Loading v-if="isLoading"></Loading>
  <div v-else class="user-info">
    <div  class="user-content">
      <div class="img-name">
        <img :src="userinfo.avatar_url">
        <span>{{ userinfo.loginname }}</span>
      </div>
      <div><span class="iconfont icon-jifen"></span>{{userinfo.score}}分</div>
      <div><span class="iconfont icon-githublogo"></span><a :href="`https://github.com/${userinfo.githubUsername}`">@{{ userinfo.githubUsername }}</a></div>
      <div><span class="iconfont icon-rili"></span>{{userinfo.create_at | formatDate}}</div>
    </div>
    <div class="replies">
      <ul>
        <li class="toolbar">最近回复的话题：</li>
        <li v-for="(reply,index) in userinfo.recent_replies" :key="index">
          <router-link :to="{
            name:'userInfo',
            params:{
              name:reply.author.loginname
            }}">
            <img class="avatar" :src="reply.author.avatar_url">
          </router-link>
            <router-link :to="{
            name: 'postContent',
            params: {
              id: reply.id,
              name: reply.author.loginname
            }
          }">
            <span>{{ reply.title }}</span>
          </router-link>
          <!-- 最终回复时间 -->
          <span class="last-reply">{{ reply.last_reply_at | formatDate }}</span>
        </li>
      </ul>
    </div>
    <div class="topics">
      <ul>
        <li class="toolbar">最近创建的话题：</li>
        <li v-for="(topic,index) in userinfo.recent_topics" :key="index">
          <img class="avatar" :src="topic.author.avatar_url">
          <router-link :to="{
          name:'postContent',
          params:{
            id:topic.id
          }
          }">
            <span>{{topic.title}}</span>
          </router-link>
          <span class="last-reply">{{ topic.last_reply_at | formatDate }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loading from './Loading'
export default {
  name: 'UserInfo',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      userinfo:{}
    }
  },
  methods: {
    getUserInfoData() {
      this.isLoading = true
      this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.isLoading = false
          this.userinfo = res.data.data
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    // 针对同一个路由下的不同用户named的跳转
    '$route'() {
      this.getUserInfoData()
    }
  },
  mounted() {
    this.getUserInfoData()
  }
}
</script>

<style lang="scss" scoped>
  .user-info {
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    max-width: 1000px;
    a {
      text-decoration: none;
      color: black;
      &:hover {
        text-decoration: underline;
      }
    }
    .user-content {
      padding: 20px;
      background: #fff;
      border-radius: 8px;
      font-size: 14px;
      div {
        padding: 4px;
      }
      .iconfont {
        font-weight: bold;
        color: #999;
        margin-right: 7px;
      }
      .img-name {
        display: flex;
        align-items: center;
        padding: 5px;
        margin-bottom: 3px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 5px;
          box-shadow: 0 4px 2px 0 rgba(0,0,0,.1);
        }
        span {
          font-size: 16px;
          margin-left: 30px;
          font-weight: bold;
          color: #000;
        }
      }
    }
    ul {
      list-style: none;
      margin: 0 auto;
      padding: 0;
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
          display: flex;
          align-items: center;
          span {
            margin-left: 10px;
            font-size: 14px;
          }
           &.toolbar {
            background-color: #f6f6f6;
            padding: 10px;

            color: #000;
            font-weight: bold;
           }
            &:not(:first-child):hover {
            background: #f5f5f5;;
          }
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 4px;
            box-shadow: 0 4px 12px 0 rgba(0,0,0,.1);
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
    .replies {
      margin-top: 20px;
      box-shadow: 0 4px 2px 0 rgba(0,0,0,.1);
    }
    .topics {
      margin-top: 20px;
      box-shadow: 0 4px 2px 0 rgba(0,0,0,.1);
      margin-bottom: 40px;
    }
  }
</style>
