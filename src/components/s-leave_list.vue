<template>
	<div id="content-right">
        <div class="right-title">
            广州航海学院学生考勤系统--请假记录
        </div>
        <div class="form">
            <form @submit.prevent="submit_seach">
                <div class="item">
                    <label>申请时间：</label>
                    <div class="input">
                        <el-date-picker
                          v-model="submit_form.leave_submit_date"
                          align="right"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
               <!--  <div class="item">
                    <label>开始时间：</label>
                    <div class="input">
                        <el-date-picker
                          v-model="submit_form.leave_submit_date"
                          align="right"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div> -->
                <div class="item">
                    <label>请假类型：</label>
                    <div class="input">
                         <select v-model="submit_form.leave_type_id">
                             <option value="">全部</option>
                            <option :value="item.leave_type_id" v-for="(item,index) in leave_lists" :key="index" >{{item.leave_type_name}}</option>
                        </select>
                    </div>
                </div>
                <div class="item">
                    <label>请假时长：</label>
                    <div class="input">
                        <input type="text" v-model="submit_form.leave_total_day" class="num" name="">天
                    </div>
                </div>
                <div class="item">
                    <label>请假状态：</label>
                    <div class="input">
                       <select v-model="submit_form.leave_status">
                            <option value="">全部</option>
                            <option v-for="(item,index) in leave_status" :key="index" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                </div>

                <div class="item">
                    <div class="input">
                        <button type="submit" class="submit">搜索</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="table1">
            <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                    <tr>
                        <td><div>申请时间</div></td>
                        <td><div>学号</div></td>
                        <td><div>姓名</div></td>
                        <td><div>请假结束时间</div></td>
                        <td><div>请假开始时间</div></td>
                        <td><div>请假类型</div></td>
                        <td><div>请假时长</div></td>
                        <td><div>审批状态</div></td>
                        <td><div>操作</div></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in leave_list" :key="index">
                        <td><div>{{item.leave_submit_date}}</div></td>
                        <td><div>{{item.student_id}}</div></td>
                        <td><div>{{item.user_name}}</div></td>
                        <td><div>{{item.leave_start_datetime}}</div></td>
                        <td><div>{{item.leave_end_datetime}}</div></td>
                        <td><div>{{item.leave_type_name}}</div></td>
                        <td><div>{{item.leave_total_day}}天</div></td>
                        <td><div>{{item.leave_status_name}}</div></td>
                        <td><div><span @click="look(item.leave_id)"><img src="static/img/edit.png">查看</span></div></td>
                    </tr>
                   
                </tbody>
            </table>

            <div class="table-bottom">
                <div class="table-right">
                    <div class="page">
                       <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="parseInt(data_info.current_page)"
                          :page-sizes="[10, 20, 30, 40]"
                          :page-size="parseInt(data_info.page_limit)"
                          :page-count="parseInt(data_info.page_total)"
                          layout="total, prev, pager, next, jumper"
                          :total="parseInt(data_info.count)">
                        </el-pagination> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script >
    import store from '@/store/store'
    const CESHI='?zy_test=1'
	export default {
		name:'leave_list',
		data(){
			return {
                leave_status:[
                    {'id':0,name:'审批中'},
                    {'id':1,name:'通过'},
                    {'id':2,name:'不通过'},
                    {'id':3,name:'已取消'},

                ],
                leave_list:[],
                submit_form:{
                    leave_submit_date:'',
                    leave_type_id:'',
                    leave_total_day:'',
                    leave_status:'',
                    page:1,
                    limit:10
                },
                pickerOptions1: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  },
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
                data_info:{}
			}
		},
         computed:{
            leave_lists(){
              return this.$store.state.leave_list
            }
        },
        created(){
            var that = this;
            this.get_leave(1,1)
        },
        methods:{
            submit_seach(){
                var that =this;
                console.log(this.submit_form)
                 this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_api/my_list'+CESHI,{
                    params:that.submit_form
                 })
                .then(function (res) {
                    console.log(res.data);
                    if(res.data.code == 1){
                      that.leave_list = res.data.data
                    }else{
                       alert(res.data.msg)
                    }

                })
            },
            get_leave(page,limit){
                var that =   this;
                this.submit_seach.page = page;
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_api/my_list'+CESHI,{
                    params: this.submit_seach
                })
                .then(function (res) {
                    console.log(res.data.data);
                    if(res.data.code == 1){
                      that.leave_list = res.data.data
                      that.data_info = res.data.data_info
                    }else{
                       alert(res.data.msg)
                    }

                })
                .catch(function (err) {
                    console.log(err);
                });
            },
            look(id){
                this.$router.push({name:'s-leave-info', params: {id:id }});
            },
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
             handleCurrentChange(val) {
                var that = this;
                console.log(`当前页: ${val}`);
                this.get_leave(val,10)
                
            }
        }
	}
</script>
<style lang="scss" scoped>
   #content-right{
        .edit-myself-info{
            width:100%;
            height:215px;
            background:#fff;
            overflow:hidden;
            padding-left:20px;
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
                li{
                    width:33.33%;
                    float:left;
                    line-height:30px;
                    font-size:12px;
                    color:#333333;
                }
            }
        }
        .title{
            width:100%;
            text-align:center;
            font-weight:bold;
            line-height:30px;
        }
        .form{
            width:100%;
            height:48px;
            background:#fff;
            padding: 0 0 0 20px;
            box-sizing:border-box;
            margin-bottom:15px;

            .item{
                margin-right:10px;
                overflow:hidden;
                float:left;
                label{
                    width:auto;
                    line-height:48px;
                    float:left;
                    font-size:12px;
                }
                .input{
                    width:auto;
                    height:100%;
                    float:left;
                    font-size:12px;
                    color:#333333;
                    select{
                        width:120px;
                        height:20px;
                        border:1px solid #cccccc;
                        border-radius:5px;
                        margin-top:14px;
                    }
                    input.time{
                         width:120px;
                        height:20px;
                        border:1px solid #cccccc;
                        border-radius:5px;
                        margin-top:12px;
                    }
                    input.num{
                         width:30px;
                        height:20px;
                        border:1px solid #cccccc;
                        border-radius:5px;
                        margin-top:12px;
                        margin-right:5px;
                    }
                    button.submit{
                        width:80px;
                        height:25px;
                        background:#3a8dcc;
                        color:#fff;
                        border:none;
                        border-radius:5px;
                        margin-top:11px;
                        margin-left:5px;
                    }
                }
            }
        }
        .table1{
            width:100%;
             border-top-left-radius:5px;
            border-top-right-radius:5px;
            overflow:hidden;
            table{
                width:100%;
                thead{
                    width:100%;
                    background:#3a8dcc;
                    height:36px;
                    tr{
                        width:100%;
                        height:36px;
                        td{
                            width:11.11%;
                            color:#fff;
                            height:36px;
                            line-height:36px;
                            font-size:14px;
                            text-align:center;
                            font-weight:bold;
                        }
                         
                    }
                }
                tbody{
                    width:100%;
                    background:#fff;
                    height:36px;
                    tr{
                        width:100%;
                        height:36px;
                       
                        overflow:hidden;
                        td{
                            width:11.11%;
                            color:#333333;
                            height:36px;
                            line-height:36px;
                            font-size:14px;
                            text-align:center;
                             border-bottom:1px solid #d6e6f4;
                        }
                       
                        td:last-child{
                            div{
                                span{
                                    color:#3a8dcc;
                                    margin-right:5px;
                                    img{
                                        margin-right:2px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .table-bottom{
                width:100%;
                background:#fff;
                overflow:hidden;
                height:55px;
                .delect{
                    display:block;
                    float:left;
                    text-align:center;
                    width:80px;
                    height:25px;
                    background:#3a8dcc;
                    color:#fff;
                    border:none;
                    border-radius:5px;
                    margin-top:11px;
                    margin-left:5px;
                }
                .page{
                    float:right;
                    color:#959595;
                     margin-top:11px;

                    margin-right:5px;
                   
                    button{
                        width:54px;
                        height:28px;
                        border:1px solid #cfddea;
                        background:#fff;
                        line-height:28px;
                        font-size:12px;
                        display:inline-block;

                    }

                }
            }
        }
    }
</style>