// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {TimePicker,DatePicker,TimeSelect,Upload, Loading, MessageBox,Message,Pagination,Button,Radio,Notification} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'
 
axios.defaults.timeout = 5000;// 在超时前，所有请求都会等待 5 秒
axios.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://*******';// 配置接口地址
// axios.defaults.withCredentials = false;
 
Vue.prototype.$axios = axios// 将axios配置成vue的原型
// Vue.prototype.$router = router

Vue.config.productionTip = false

Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(Upload)
Vue.use(Pagination)
Vue.use(Button);
Vue.use(Loading.directive);
Vue.use(Radio);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
  	//console.log("###")
    next()
  } else {
    if (!localStorage.getItem('userInfo')) {
    	//console.log(store.state.userInfo)

      next({ path: '/' })
    } else {
      next()
    }
  }
})

const CESHI='?zy_test=1'
Vue.prototype.changeData = function (){
  //console.log('zhixing...')
  var class_list =   axios.get('http://gzhh.gzziyu.com/index.php/home/class_api/show_list'+CESHI); 
  var major_list =   axios.get('http://gzhh.gzziyu.com/index.php/home/major_api/show_list_all'+CESHI); 
  var college_list =   axios.get('http://gzhh.gzziyu.com/index.php/home/college_api/show_list_all'+CESHI); 
  var leave_list =   axios.get('http://gzhh.gzziyu.com/index.php/home/leave_type_api/show_list'+CESHI); 
  var chief_list =   axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_position_api/get_chief'+CESHI); 
  var ministry_list =   axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_position_api/get_ministry'+CESHI); 
  var leader_list =   axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_position_api/get_leader'+CESHI); 
  var counselor_list =   axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_position_api/get_counselor'+CESHI); 
  var major_type_list =   axios.get('http://gzhh.gzziyu.com/index.php/home/major_type_api/show_list'+CESHI); 
  var year_list =   axios.get('http://gzhh.gzziyu.com/index.php/home/year_api/show_list'+CESHI); 

      

  axios.all([class_list,major_list,college_list,leave_list,chief_list,ministry_list,leader_list,counselor_list,major_type_list,year_list])
  .then( axios.spread(function(class_lists, major_lists,college_lists,leave_lists,chief_lists,ministry_lists,leader_lists,counselor_lists,major_type_lists,year_lists) {
      //两个请求现已完成
      //console.log(college_lists)
      store.commit('class_list',class_lists.data.data)
      
      store.commit('major_list',major_lists.data.data)

      store.commit('college_list',college_lists.data.data)


      store.commit('leave_list',leave_lists.data.data)

      // 大队长列表
      store.commit('chief_list',chief_lists.data.data)


      // 学工部列表
      store.commit('ministry_list',ministry_lists.data.data)

       // 学校领导列表
      store.commit('leader_list',leader_lists.data.data)

      store.commit('counselor_list',counselor_lists.data.data)


      store.commit('major_type_list',major_type_lists.data.data)


      store.commit('year_list',year_lists.data.data)

  }));
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
