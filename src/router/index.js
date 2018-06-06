import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../components/Login.vue';
import ChangePassword from '../components/ChangePassword.vue';
import Common from '../components/Common.vue';
import Admin from '../components/admin/Admin.vue';
import AnthonyMall from '../components/admin/goods/mall/AnthonyMall.vue';
import OrderIntention from '../components/OrderIntention.vue';
import OrderTracking from '../components/OrderTracking.vue';
import BootPage from '../components/BootPage.vue';



Vue.use(Router)





const goods = [
  { name: 'anthonymall', path: 'goods/mall', component: AnthonyMall },
  {},
  {}
]


export default new Router({
  routes: [
    { name: 'HelloWorld', path: '/', component: HelloWorld },
    { name: 'login', path: '/login', component: Login },
    { name:'changepassword', path: '/changepassword', component: ChangePassword },
    { name: 'common', path: '/common', component: Common },
    { name: 'orderintention', path:'/orderintention', component: OrderIntention },
    { name: 'ordertracking', path: '/ordertracking', component: OrderTracking },
    { name: 'bootpage', path: '/bootpage', component: BootPage },
    // { name: 'admin', path: '/admin', component: Admin,children:[...goods] },
  ]
})