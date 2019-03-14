<template>
	<div id="content-right">
        <div class="right-title">
            广州航海学院学生考勤系统--申请请假
            <!-- <a href="###">返回</a> -->
        </div>
        <div class="right-content">
            <div class="form2">
                <form @submit.prevent="submit_leave">
                    <div class="item">
                        <div class="label">请假开始时间：</div>
                        <div class="input">
                             <div class="time">
                                 <el-date-picker
                                  v-model="leave_info.leave_start_datetime"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="选择日期时间">
                                </el-date-picker>
                             </div>
                        </div>
                    </div>
                    
                    <div class="item">
                        <div class="label">请假结束时间：</div>
                        <div class="input">
                            <div class="time">
                                 <el-date-picker
                                  v-model="leave_info.leave_end_datetime"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="选择日期时间">
                                </el-date-picker>
                             </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">请假时长：</div>
                        <div class="input">
                            <input type="text" class="input_day" v-model="leave_info.leave_total_day" placeholder="请输入时长" name="">天
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">请假类型：</div>
                        <div class="input">
                           
                            <select v-model="leave_info.leave_type_id">
                                <option :value="item.leave_type_id" v-for="(item,index) in leave_list" :key="index">{{item.leave_type_name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">请假原因：</div>
                        <div class="input">
                            <textarea v-model="leave_info.leave_reason" placeholder="请输入请假原因......"></textarea>
                        </div>
                    </div>
                    
                    <div class="btn-s">
                        <button type="submit">申请</button>
                        <button type="button" @click="reset">重置</button>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</template>
<script >
    import store from '@/store/store'
    const CESHI='?zy_test=1'
	export default {
		name:'add_leave',
		data(){
			return {
               
                leave_info:{
                    leave_start_datetime:'',
                    leave_end_datetime:'',
                    leave_total_day:'',
                    leave_type_id:'',
                    leave_reason:''
                },
                pickerOptions1: {
                  shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                      picker.$emit('pick', new Date());
                    }
                  }, {
                    text: '昨天',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      picker.$emit('pick', date);
                    }
                  }, {
                    text: '一周前',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', date);
                    }
                  }]
                },
                value1: '',
                value2: '',
                value3: '',
                imageUrl: ''
               
			}
		},
      
        computed:{
            
             leave_list(){
              return this.$store.state.leave_list
            }
        },
        methods:{
           reset(){
                this.leave_info.leave_start_datetime='';
                this.leave_info.leave_end_datetime='';
                this.leave_info.leave_total_day='';
                this.leave_info.leave_type_id='';
                this.leave_info.leave_reason='' ;          
            },
            submit_leave(){
                var that = this;
                console.log(that.leave_info)
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_api/add'+CESHI,{
                    params:that.leave_info
                })
                .then(function (res) {
                    console.log(res)
                    if(res.data.code == 1){
                        alert(res.data.msg)
                        that.$router.push('s-leave-list')
                        that.$refs.upload.submit();
                    }else{
                        alert(res.data.msg)
                    }
                })
            },

            
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
        .right-content{
            width:100%;
            background:#fff;
            overflow:hidden;
            .form2{
                width:700px;
                margin:40px auto;
                overflow:hidden;
                .item{
                    width:100%;
                    margin-bottom:14px;
                    overflow:hidden;
                    min-height:48px;
                    .label{
                        width:120px;
                        float:left;
                        color:#000000;
                        text-align:right;
                        line-height:30px;
                        margin-right:10px;
                    }
                    .input{
                        width:570px;
                        float:left;
                        font-size:12px;
                        line-height:3px;
                        div.time{
                            width:210px;
                            height:30px;
                            
                            font-size:12px;
                            padding:0 8px;
                            box-sizing:border-box;
                            input{
                                width:100%; 
                            }
                        }

                        input.input_day{
                            width:75px;
                            height:30px;
                            border:1px solid #cccccc;
                            border-radius:5px;
                            font-size:12px;
                            padding:0 8px;
                            box-sizing:border-box;
                            margin-right:8px;
                        }
                        select{
                            width:370px;
                            height:30px;
                            border:1px solid #cccccc;
                            border-radius:5px;
                            font-size:12px;
                            padding:0 8px;
                            box-sizing:border-box;
                            color:#666;
                        }
                        textarea{
                            width:100%;
                            height:140px;
                            border:1px solid #cccccc;
                            border-radius:5px;
                            font-size:12px;
                            padding:5px 8px;
                            box-sizing:border-box;
                            resize:none;
                            color:#666;
                        }
                        .radius{
                            width:55px;
                            height:30px;
                            line-height:30px;
                            padding-left:20px;
                            color:#000000;
                            font-size:12px;
                            float:left;
                            background:url(../../static/img/radius.png) no-repeat;
                            background-position:left center;
                        }
                        .radius_on{
                            background:url(../../static/img/radius_check.png) no-repeat;
                            background-position:left center;
                        }
                    }
                }
                .btn-s{
                    width:100%;
                    text-align:center;
                    margin:25px 0 0 0;
                    button{
                        width:80px;
                        height:25px;
                        background:#3a8dcc;
                        color:#fff;
                        border:none;
                        border-radius:5px;
                        margin-right:20px;
                        display:inline-block;
                    }
                }
            }
        }
       
    }
</style>