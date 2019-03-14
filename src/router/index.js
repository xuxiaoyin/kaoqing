import Vue from 'vue'
import Router from 'vue-router'
 import store from '@/store/store'
import Login from '@/components/login'
import Index from '@/components/index'

// 管理员部分
// 学生 列表 添加 编辑
import studentList from '@/components/student_list'
import studentForm from '@/components/student_edit_add'
import studentAdd from '@/components/student_add'
// 班级 列表 添加 编辑
import classList from '@/components/class_list'
import classForm from '@/components/class_edit'
import classAdd from '@/components/class_add'

// 专业 列表 添加 编辑
import majorList from '@/components/major_list'
import majorAdd from '@/components/major_add'


import collegeList from '@/components/college_list'
import collegeAdd from '@/components/college_add'

import teacherList from '@/components/teacher_list'

import teacherAdd from '@/components/teacher_add'

import tStudentList from '@/components/t-student_list'
import t_approval_detail from "@/components/t-approval_detail"

import leaveList from '@/components/leave_list'
import leaveInfo from '@/components/leave_info'

import tLeaveList from '@/components/t-leave_list'

import approvalList from '@/components/approval_list'


import myself_Info from '@/components/myself_Info'

import addLeave from '@/components/add_leave'

import sLeaveList from '@/components/s-leave_list'

import sLeaveInfo from '@/components/s-leave_info'
import changePassword from '@/components/change_password'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [  //这里就是二级路由的配置
        // 学生管理
        {
          path: '/index/student_list',
          name: 'student_list',
          component: studentList
        },
         {
          path: '/index/student_form',
          name: 'student_form',
          component: studentForm
        },
        {
          path: '/index/student_add',
          name: 'student_add',
          component: studentAdd
        },

          // 班级管理
         {
          path: '/index/class_list',
          name: 'class_list',
          component: classList
        },
         {
          path: '/index/class_form',
          name: 'class_form',
          component: classForm
        },
        {
          path: '/index/class_add',
          name: 'class_add',
          component: classAdd
        },

        // 专业管理
        {
          path: '/index/major_list',
          name: 'major_list',
          component: majorList
        },
         {
          path: '/index/major_add',
          name: 'major_add',
          component: majorAdd
        },

        // 请假管理
        {
          path: '/index/leave_list',
          name: 'leave_list',
          component: leaveList
        },
        {
           path: '/index/leave_info',
          name: 'leave_info',
          component: leaveInfo
        },
         {
          path: '/index/t-leave_list',
          name: 't-leave_list',
          component: tLeaveList
        },


        // 审批列表
        {
          path:'/index/approval_list',
          name:'approval_list',
          component: approvalList
        },
        //学院管理
        {
          path: '/index/college_list',
          name: 'college_list',
          component: collegeList
        },
         {
          path: '/index/college_add',
          name: 'college_add',
          component: collegeAdd
        },
        // 教师管理
        {
          path: '/index/teacher_list',
          name: 'teacher_list',
          component: teacherList
        },

        {
          path: '/index/teacher_add',
          name: 'teacher_add',
          component: teacherAdd
        },
        {
          path: '/index/t-student_list',
          name: 't-student_list',
          component: tStudentList
        },
       
        {
          path: '/index/t_approval_detail',
          name: 't_approval_detail',
          component: t_approval_detail
        },
        // 修改密码
        {
          path: '/index/change_password',
          name: 'change_passwoed',
          component: changePassword
        },
        // 个人信息
        {
          path: '/index/myself_Info',
          name: 'myself_Info',
          component: myself_Info
        },
        // 提交请假
        {
          path: '/index/add_leave',
          name: 'add_leave',
          component: addLeave
        },
        {
          path:'/index/s-leave-list',
          name:'s-leave-list',
          component:sLeaveList
        },
         {
          path:'/index/s-leave-info',
          name:'s-leave-info',
          component:sLeaveInfo
        },
        // 路由重定向
        {
          path:'/index',
          redirect:function (to) {
           var type =  store.state.userInfo.usertype;
            if(type == 1){
              return '/index/myself_Info'
            }else if(type == 2){
              return '/index/t-student_list'
            }else{
              return '/index/student_list'
            }
          }
        }
      ]
    }
  ]
})
