import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      username:'',
      usertype:'',
      id:''
    },
    class_list:[],//班级列表
    major_list:[],//专业列表
    college_list:[],//学院列表
    leave_list:[],//请假类型列表
    chief_list:[],//大队长列表
    ministry_list:[],//学工部列表
    leader_list:[],//学校领导列表
    counselor_list:[],//辅导员列表
    major_type_list:[],//专业类型列表,
    year_list:[]
  },
  mutations: {
    //所有mutations中的方法的第一个参数一定是state变量，用来进行对state中的状态的操作
    //第二个参数是可选参数，用于调用该 mutations 方法的时候传参
    userInfo (state, Info) {
      state.userInfo = Info
    },
    class_list (state, class_list) {
      state.class_list = class_list
    },
    major_list (state, major_list) {
      state.major_list = major_list
    },
    college_list (state, college_list) {
      state.college_list = college_list
    },
    leave_list(state,leave_list){
      state.leave_list = leave_list
    },
    chief_list(state,chief_list){
      state.chief_list = chief_list
    },
    ministry_list(state,ministry_list){
       state.ministry_list = ministry_list
    },
    leader_list(state,leader_list){
      state.leader_list = leader_list
    },
    counselor_list(state,counselor_list){
      state.counselor_list = counselor_list
    },
    major_type_list(state,major_type_list){
        state.major_type_list = major_type_list
    },
    year_list(state,year_list){
      state.year_list = year_list
    }
   
  }
})

export default store