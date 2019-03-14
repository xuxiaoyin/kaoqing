<template>
	<div id="content-right">
        <div class="right-title">
            通信学院请假系统--请假信息
            <router-link to="/index/s-leave-list">请假列表</router-link>
        </div>

        <div class="myself-info">
            <h1>请假人信息：  </h1>
            <ul>
                <li>学号：{{info.student_id}}</li>
                <li>学院：{{info.college_name}}</li>
                <li>班级：{{info.class_name}}</li>
                <li>姓名：{{info.user_name}}</li>
                <li>性别：{{info.gender_name}}</li>
                <li>专业：{{info.major_name}}</li>
            </ul>
        </div>

        <div class="myself-info">
            <h1>请假详情：   </h1>
            <ul>
                <li>请假开始时间：{{info.leave_start_datetime}}</li>
                <li>请假结束时间：{{info.leave_end_datetime}}</li>
                <li>请假时长：{{info.leave_total_day}}天</li>
                <li>请假类型：{{info.leave_type_name}}</li>
                <li>申请时间：{{info.leave_submit_date}}</li>
            </ul>
            <div class="infi">
                请假原因：{{info.leave_reason}}
            </div>
            <div class="infi">
                审批状态：
                <div class="img">
                    <!-- <img src="static/img/1.jpg"> -->
                    <!-- <img :src="'static/img/'+(parseInt(info.step.approve_type)+1)+'.jpg'"> -->
                   <ul>
                        <li>
                            <img src="static/img/step1.jpg">
                            <p class="time">{{info.leave_submit_time}}</p>
                        </li>
                        <li v-if="info.step.approve_type&&1<=parseInt(info.step.approve_type)">
                            <img src="static/img/step2.jpg"  v-if="info.step.step_1 == 0">
                            <img src="static/img/step2_on.jpg" v-if="info.step.step_1 == 1">
                            
                        </li>
                        <li v-if="info.step.approve_type&&2<=parseInt(info.step.approve_type)">
                            
                            <img src="static/img/step3.jpg"  v-if="info.step.step_2 == 0">
                            <img src="static/img/step3_on.jpg" v-if="info.step.step_2 == 1">
                            
                        </li>
                        <li v-if="info.step.approve_type&&3<=parseInt(info.step.approve_type)">
                            <img src="static/img/step4.jpg"  v-if="info.step.step_3 == 0">
                            <img src="static/img/step4_on.jpg" v-if="info.step.step_3 == 1">
                            
                        </li>
                        <li v-if="info.step.approve_type&&4<=parseInt(info.step.approve_type)">
                            <img src="static/img/step5.jpg"  v-if="info.step.step_4 == 0">
                            <img src="static/img/step5_on.jpg" v-if="info.step.step_4 == 1">
                            
                        </li>
                        <li>
                            <img src="static/img/step6.jpg"  v-if="info.step.step_pass == 0">
                            <img src="static/img/step6_on.jpg" v-if="info.step.step_pass == 1">
                            
                        </li>
                    </ul>
                </div>
            </div>
            <div class="infi">
                请假凭证：
                <div class="img_ping">
                    <img v-if="info.leave_img" :src="'http://gzhh.gzziyu.com/index.php'+info.leave_img+CESHI1">
                    <el-upload
                      name="leave_img"
                      class="avatar-uploader"
                      :action="'http://gzhh.gzziyu.com/index.php/home/leave_api/upload_img?leave_id='+info.leave_id+CESHI1"
                      :show-file-list="false"
                      :data="upload_data"
                      :on-success="handleAvatarSuccess"
                      
                      :before-upload="beforeAvatarUpload"
                      v-if="!info.leave_img"
                      >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  <!--   <form :action="'http://gzhh.gzziyu.com/index.php/home/leave_api/upload_img?leave_id='+info.leave_id" target="myIframe"  enctype="multipart/form-data"method="post">
                        <input type="file" name="leave_img" />
                        <input type="submit" value="提交" >
                    </form>

                   <iframe name="myIframe" ></iframe> -->
                </div>
            </div>
            <div class="delect">
                <button v-if="info.leave_status == 0" @click="canel(info.leave_id)" class="">取消申请</button>
                <button v-if="info.leave_status == 1" class="">已通过</button>
                <button v-if="info.leave_status == 2" class="">不通过</button>
                <button v-if="info.leave_status == 3" class="">已取消</button>
            </div>
        </div>
        
        
    </div>
</template>
<script >
    import store from '@/store/store'
    const CESHI='?zy_test=1'
    const CESHI1='&zy_test=1'
	export default {
		name:'leave_info',
		data(){
			return {
                upload_data:{},
                info:{},
                 fileList: [],
                 imageUrl:'',
                 CESHI1:CESHI1
			}
		},
        created(){
            var that = this;
            console.log(this.$route.params)
            this.get_info()
        },
        methods:{
             
            get_info(){
                var that = this;
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_api/info'+CESHI,{
                    params:{
                        leave_id:that.$route.params.id
                    }
                })
                .then(function (res) {
                    console.log(res.data.data)
                    that.upload_data.leave_id = that.$route.params.id
                    if(res.data.code == 1){
                        that.info = res.data.data
                    }
                })
            },
            canel(id){
                var that = this;
                 this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_api/cancel'+CESHI,{
                    params:{
                        leave_id:that.$route.params.id
                    }
                })
                .then(function (res) {
                    console.log(res.data.data)
                    if(res.data.code == 1){
                        alert(res.data.msg)
                        that.$router.push('s-leave-list');
                    }
                })
            },

            beforeAvatarUpload(file){
                console.log(file)
                
                
            },
            handleAvatarSuccess(res){
                console.log(res)
                if(res.code == 1){
                    alert(res.msg)
                    this.get_info()
                    this.imageUrl = 'http://gzhh.gzziyu.com/index.php'+res.data.leave_img
                }
            }
            
        }
	}
</script>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
   #content-right{
        .myself-info{
            width:100%;
            background:#fff;
            overflow:hidden;
            padding:0 0 40px 20px;
            box-sizing:border-box;
            margin-bottom:20px;
            h1{
                font-size:14px;
                color:#333333;
                height:30px;
                margin-top:20px;
                span{
                    color:#3a8dcc;
                }
            }
            ul{
                width:100%;
                overflow:hidden;
                li{
                    width:33.33%;
                    float:left;
                    line-height:30px;
                    font-size:12px;
                    color:#333333;
                }
            }
        }
        .infi{
           line-height:30px;
            font-size:12px;
            color:#333333; 
            .img{
                width:790px;
                img{
                    width:656px;
                    display:block;
                    margin:0 auto;
                }
                ul{
                    width:100%;
                    li{
                        width:16.6666%;
                        float:left;
                        p{
                            color:#000000;
                            font-size:12px;
                            text-align:center;
                            height:20px;
                            line-height:20px;
                        }
                        img{
                            width:100%
                        }
                        p.time{
                            font-size:10px;
                            color:#adadad;
                            line-height:15px;
                        }
                    }
                }
            }
        }
        .delect{
            height:70px;
            border-top:2px solid #e6eff7;
            text-align:center;
            button{
                width:140px;
                height:40px;
                background:#3a8dcc;
                color:#fff;
                border:none;
                display:inline-block;
                margin-top:30px;
                border-radius:5px;
                margin-right:20px;
                &.refuse{
                    background:#fff;
                    border:1px solid #3a8dcc;
                    color:#3a8dcc;
                }
            }
        }
       
    }
</style>