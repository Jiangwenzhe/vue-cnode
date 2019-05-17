<template>
  <div class="sidebar">
    <div class="panel">
      <div class="header">
        作者
      </div>
      <div class="content user-info">
        <div class="img-name">
          <img :src="userinfo.avatar_url">
          <router-link :to="{
            name:'userInfo',
            params:{
              name: userinfo.loginname
            }}">
            <span>{{ userinfo.loginname }}</span>
          </router-link>
        </div>
        <div><span class="iconfont icon-jifen"></span>{{userinfo.score}}分</div>
        <div><span class="iconfont icon-githublogo"></span><a :href="`https://github.com/${userinfo.githubUsername}`">@{{ userinfo.githubUsername }}</a></div>
        <div><span class="iconfont icon-rili"></span>{{userinfo.create_at | formatDate}}</div>
      </div>
    </div>
    <div class="panel">
      <div class="header">
        最近讨论的话题
      </div>
      <div class="content list-title" v-for="(item, index) in userinfo.recent_topics" :key="index">
        <router-link :to="{
            name: 'postContent',
            params: {
              id: item.id,
              name: item.author.loginname
            }
          }">
          <div>{{item.title}}</div>
        </router-link>
      </div>
    </div>
    <div class="panel">
      <div class="header">
        最近回复的话题
      </div>
      <div class="content list-title" v-for="(item, index) in userinfo.recent_replies" :key="index">
        <router-link :to="{
            name: 'postContent',
            params: {
              id: item.id,
              name: item.author.loginname
            }
          }">
          <div>{{item.title}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      userinfo: {},
      loginname: ''
    }
  },
  methods:{
    getSideBarData() {
      this.$axios.get(`https://cnodejs.org/api/v1/user/${this.loginname}`)
        .then(res => {
          this.userinfo = res.data.data
          console.log('sidebar_data---', res)
        })
        .catch(err => console.log(err))
    },
    getLoginname() {
      if(!this.$route.params.name) return
      this.loginname = this.$route.params.name;
    }
  },
  mounted() {
    this.getLoginname()
    this.getSideBarData()
  },
  watch: {
    '$route'() {
      this.getLoginname()
      this.getSideBarData()
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar {
    width: 290px;
    font-size: 14px;
    float: right;
    margin-bottom: 20px;
    a {
      text-decoration: none;
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
    .panel {
      font-size: 13px;
      margin-bottom: 13px;
      .header {
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
      }
      .content {
        padding: 10px;
        border-radius: 0 0 3px 3px;
        background: #fff;
      }

      // ‘作者’区块的scss
      .user-info{
        .iconfont {
          font-weight: bold;
          color: #999;
          margin-right: 7px;
        }
        div {
          padding: 4px;
        }
        .img-name {
          display: flex;
          align-items: center;
          margin-bottom: 3px;
          img {
            width: 47px;
            height: 47px;
            border-radius: 5px;
            box-shadow: 0 4px 2px 0 rgba(0,0,0,.1);
          }
          span {
            font-size: 16px;
            margin-left: 15px;
            font-weight: bold;
            color: #778087;
          }
        }
      }

      // 文章的标题区块的scss
      .list-title {
        div {
          color: #778087;
          &:hover {
              color: #000;
            }
        }
      }
    }
  }
</style>
