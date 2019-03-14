<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--请假列表
		</div>
		<div class="form">
			<form @submit.prevent="submit_seach">
				<div class="item">
					<label>班级：</label>
					<div class="input">
                        <select v-model="seach_form.class_id">
                            <option value="">全部</option>
                            <option :value="item.class_id" v-for="item in class_lists" :key="item.class_id" >{{item.class_name}}</option>
                        </select>
					</div>
				</div>
				<div class="item">
					<label>学号：</label>
					<div class="input">
						<input class="time" v-model="seach_form.student_id" type="text" placeholder="请输入学号" name="">
					</div>
				</div>
                <div class="item">
                    <label>姓名：</label>
                    <div class="input">
                        <input class="time" v-model="seach_form.user_name" type="text" placeholder="请输入姓名" name="">
                    </div>
                </div>
				
				<div class="item">
					<label>请假时长：</label>
					<div class="input">
						<input type="text" class="num" v-model="seach_form.leave_total_day" name="">天
					</div>
				</div>
				<div class="item">
					<label>请假状态：</label>
					<div class="input">
						<select v-model="seach_form.leave_status">
                            <option value="">全部</option>
                            <option v-for="item in leave_status" :value="item.id" :key="item.id">{{item.name}}</option>
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
					<tr v-for="(item,index) in lists" :key="index">
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
				<!-- <a href="###" class="delect">删除记录</a> -->
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
                lists:[],
                 leave_status:[
                    {'id':0,name:'审批中'},
                    {'id':1,name:'通过'},
                    {'id':2,name:'不通过'},
                    {'id':3,name:'已取消'},

                ],
                seach_form:{
                    class_id:'',
                    student_id:'',
                    user_name:'',
                    leave_total_day:'',
                    leave_status:'',
                    page:1,
                    limit:10
                },
                data_info:{}
			}
		},
        created(){
            this.get_leave(1,1)
        },
        computed:{
            class_lists(){
              return this.$store.state.class_list
            },
            leave_list(){
              return this.$store.state.leave_list
            },
            college_list(){
              return this.$store.state.college_list
            }
        },
        methods:{
            submit_seach(){
                var that = this;
                that.seach_form.page = 1
                console.log(that.seach_form)
                 this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_tea_api/show_list'+CESHI,{
                    params:that.seach_form
                 })
                .then(function (res) {
                    console.log(res)
                    if(res.data.code == 1){
                        that.lists = res.data.data
                        that.data_info = res.data.data_info
                    }

                })
                .catch(function (err) {
                    console.log(err);
                });
            },
            get_leave(page,limit){
                let that = this;
                that.seach_form.page = page
               
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_tea_api/show_list'+CESHI,{
                    params:that.seach_form
                })
                .then(function (res) {
                    console.log(res)
                    that.lists = res.data.data
                    that.data_info = res.data.data_info

                })
                .catch(function (err) {
                    console.log(err);
                });
            },
            look(id){
                console.log(123)
                this.$router.push({ name: 'leave_info', params: {id:id }})
                
            },
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
             handleCurrentChange(val) {
                var that = this;
                console.log(`当前页: ${val}`);
                this.get_leave(val,1)
                
            }
            
        }
	}
</script>
<style lang="scss">
	  #content-right{
       
     
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
                         td:nth-child(1){
                            padding-left:10px;
                            box-sizing:border-box;
                             div{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                background:url(../../static/img/all_check.png) no-repeat;
                                background-position:left center;
                            }
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
                        td:nth-child(1){
                             padding-left:10px;
                             box-sizing:border-box;
                            div{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                background:url(../../static/img/check.png) no-repeat;
                                background-position:left center;
                            }
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
                    input{
                        width:28px;
                        height:18px;
                        text-align:center;
                    }
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