import Vue from 'vue'
import Router from 'vue-router'
import Article from './components/Article.vue'
import PostList from './components/PostList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      component: PostList
    },
    {
      name: 'postContent',
      path:  '/topic/:id',
      // components: {
      //   main: Article
      // }
      component: Article
    }
  ]
})
