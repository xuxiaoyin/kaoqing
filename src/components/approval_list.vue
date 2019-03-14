<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--审批列表
		</div>
		<div class="form">
			<form @submit.prevent="submit_seach">
				<div class="item">
					<label>班级：</label>
					<div class="input">
						<select v-model="seach_form.class_id">
                            <option value="">全部</option>
                            <option :value="item.class_id" v-for="(item,index) in class_list" :key="index">{{item.class_name}}</option>
                        </select>
					</div>
				</div>
				<div class="item">
					<label>学号：</label>
					<div class="input">
						<input class="time" v-model="seach_form.student_id" type="text" name="">
					</div>
				</div>
                <div class="item">
                    <label>姓名：</label>
                    <div class="input">
                        <input class="time" v-model="seach_form.user_name" type="text" name="">
                    </div>
                </div>
				
				<div class="item">
					<label>请假时长：</label>
					<div class="input">
						<input type="text" v-model="seach_form.leave_total_day" class="num" name="">天
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
						<td><div>请假开始时间</div></td>
						<td><div>请假结束时间</div></td>
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
						<td><div>{{item.leave_total_day}}</div></td>
						<td><div>{{item.leave_status_name}}</div></td>
						<td><div>
							<span @click="adopt(item.leave_id,1)" class="adopt"><img src="static/img/adopt.png">通过</span>
							<span  @click="adopt(item.leave_id,2)" class="no_adopt"><img src="static/img/no_adopt.png">不通过</span>
							<span @click="go_details(item.leave_id)"><img src="static/img/edit.png">查看</span>
						</div></td>
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

<script>
    const CESHI='?zy_test=1'
	export default {
		name:'approval_list',
		data(){
			return{
                lists:[],
                seach_form:{
                    class_id:'',
                    student_id:'',
                    user_name:'',
                    leave_total_day:'',
                    page:1,
                    limit:10

                },
                data_info:{}
			}
		},
        computed:{
            class_list(){
              return this.$store.state.class_list
            },
            major_list(){
              return this.$store.state.major_list
            },
            college_list(){
              return this.$store.state.college_list
            },
            leave_list(){
              return this.$store.state.leave_list
            }
        },
        created(){
            this.get_approval_list(1,1)
        },
        methods:{
            // 通过
            // 待审批详情
            go_details(id){
                console.log(id)
                 this.$router.push({name:'t_approval_detail', params: {id:id }});
            },
            adopt(id,num){
                let that = this;
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_tea_api/audit_leave'+CESHI,{
                    params:{
                        leave_id:id,
                        is_pass:num
                    }
                })
                .then(function(res){
                    console.log(res)
                    if(res.data.code == 1){
                        alert(res.data.msg)
                        that.get_approval_list(1,10)
                    }else{
                        alert(res.data.msg)
                    }
                })
            },
            submit_seach(){
                var that = this;
                console.log(that.seach_form)
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_tea_api/show_list'+CESHI,{
                    params:that.seach_form
                })
                .then(function (res) {
                    console.log(res);
                    if(res.data.code == 1){
                      console.log(res.data.data)
                      that.lists = res.data.data
                    }

                })
                .catch(function (err) {
                    console.log(err);
                });
            },
            get_approval_list(page,limit){
                let that = this;
                that.seach_form.page = page;
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_tea_api/show_list'+CESHI,{
                    params:that.seach_form
                })
                .then(function (res) {
                    console.log(res.data.data)
                    if(res.data.code == 1){
                         that.lists = res.data.data
                         that.data_info = res.data.data_info
                    }
                   
                })
                .catch(function (err) {
                    alert(err)
                });
                    
            },
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
             handleCurrentChange(val) {
                var that = this;
                console.log(`当前页: ${val}`);
                this.get_approval_list(val,10)
                
            }
        }
	}
</script>

<style lang="scss">
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
                            width:10% !important;
                            color:#fff;
                            height:36px;
                            line-height:36px;
                            font-size:14px;
                            text-align:center;
                            font-weight:bold;
                        }
                        td:last-child{
                            width:20% !important;
                         
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
                            width:10% !important;
                            color:#333333;
                            height:36px;
                            line-height:36px;
                            font-size:14px;
                            text-align:center;
                             border-bottom:1px solid #d6e6f4;
                        }
                       
                        td:last-child{
                             width:20% !important;
                            div{
                                span{
                                    color:#3a8dcc;
                                    margin-right:5px;
                                    img{
                                        margin-right:2px;
                                    }
                                    &.adopt{
                                        color:#2da92d;
                                    }
                                    &.no_adopt{
                                        color:#e3ce8f;
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