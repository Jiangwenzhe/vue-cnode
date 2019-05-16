import Vue from 'vue'
import Router from 'vue-router'
import Article from './components/Article.vue'
import PostList from './components/PostList.vue'
import UserInfo from './components/UserInfo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'root',
      path: '/',
      component: PostList
    },
    {
      name: 'postContent',
      path:  '/topic/:id',
      component: Article
    },
    {
      name: 'userInfo',
      path: '/user/:name',
      component: UserInfo
    }
  ]
})
