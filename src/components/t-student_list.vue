<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--学生列表
		</div>
		<div class="edit-myself-info" v-show="student_Info != ''">
			<h1>个人信息： <span @click="edit(student_Info.student_id)"><img src="static/img/edit.png">编辑</span>	</h1>
			<ul>
				<li>学号：{{student_Info.student_id}}</li>
				<li>学院：{{student_Info.college_name}}</li>
				<li>班级：{{student_Info.class_name}}</li>
				<li>姓名：{{student_Info.user_name}}</li>
				<li>性别：{{student_Info.gender_name}}</li>
				<li>专业：{{student_Info.major_name}}</li>
				<li>联系电话：{{student_Info.phone}}</li>
				<li>监护人姓名：{{student_Info.guardian_name}}</li>
				<li>监护人联系电话：{{student_Info.guardian_phone}}</li>
				<li>请假状态：{{student_Info.leave_status_name}}</li>
				<li>累计请假时长：{{student_Info.leave_total_day}}</li>
				<li>辅导员：{{student_Info.counselor_name}}</li>
			</ul>
		</div>
		<div class="form">
			<form @submit.prevent="submit_seach">
				<!-- <div class="item">
					<label>学院：</label>
					<div class="input">
						<select v-model="seach_form.college_id">
                            <option value="">全部</option>
							<option :value="item.college_id" v-for="item in college_list" :key="item.college_id">{{item.college_name}}</option>
						</select>
							
					</div>
				</div> -->
				<div class="item">
					<label>学号：</label>
					<div class="input">
						<input class="time" v-model="seach_form.student_id" type="text" name="">
					</div>
				</div>
				<!-- <div class="item">
					<label>请假类型：</label>
					<div class="input">
						<select v-model="seach_form.leave_type_id">
                            <option value="">全部</option>
                            <option :value="item.leave_type_id" v-for="item in leave_list" >{{item.leave_type_name}}</option>
                        </select>
					</div>
				</div> -->
				<div class="item">
					<label>请假时长：</label>
					<div class="input">
						<input type="text" class="num" name="">天
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
						<td><div @click="all_check" :class="checked?'on':''">学号</div></td>
						<td><div>姓名</div></td>
						<td><div>性别</div></td>
						<td><div>班级</div></td>
						<td><div>学院</div></td>
						<td><div>请假状态</div></td>
						<td><div>累计请假时长</div></td>
						<td><div>操作</div></td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in lists" :key="index">
						<td><div  @click="delect_check(item.student_id,index)" :class="item.radio?'on':''">{{item.student_id}}</div></td>
						<td><div>{{item.user_name}}</div></td>
						<td><div>{{item.gender_name}}</div></td>
						<td><div>{{item.class_name}}</div></td>
						<td><div>{{item.college_name}}</div></td>
						<td><div>{{item.leave_status_name}}</div></td>
						<td><div>{{item.leave_total_day}}</div></td>
						<td><div>
							<span @click="look_info(item.student_id)"><img src="static/img/caozuo.png">查看</span>
						</div></td>
					</tr>
					
				</tbody>
			</table>

			<div class="table-bottom">
				<!-- <a href="###" class="delect">删除记录</a>
				<a href="###" class="delect">批量导入</a> -->
                <a href="javascript:void(0)" class="delect" @click="dele">删除记录</a>
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
<script type="text/javascript">
     const jsonp=require('jsonp');
     const CESHI='?zy_test=1'
	export default {
		name:'student_list',
		data(){
			return {
                leave_status:[
                    {'id':0,name:'审批中'},
                    {'id':1,name:'通过'},
                    {'id':2,name:'不通过'},
                    {'id':3,name:'已取消'},

                ],
				student_Info:"",
				lists:[],
                seach_form:{
                    college_id:'',
                    student_id:'',
                    leave_type_id:'',
                    leave_status:'',
                    page:1,
                    limit:10
                },
                data_info:{},
                checked:false
			}
		},
		created(){
			this.get_student_list(1,10)
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
		methods:{
            dele(){
                let that = this;
                let arr = [];
                console.log()
                this.lists.map(function(item){
                    if(item.radio){
                        arr.push(item.student_id)
                    }
                })
                console.log(arr.length)
                if(arr.length>0){
                     let bool =confirm('确认删除选中的学生吗？');
                    if(bool){
                        this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_gm_api/del'+CESHI,{
                            params: {
                               student_id:arr.join(',')
                            }
                        })
                        .then(function (res) {
                            console.log(res)
                            alert(res.data.msg)
                            that.get_student_list(1,10)
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    }
                }else{
                    alert('请选择学生')
                }
               
            },
            all_check(){
                let that = this;
                console.log(this.checked)
                if(!this.checked){
                    console.log('gouxuan')
                   this.lists.map(function(item){
                        item.radio = true
                        
                    }) 
                   this.checked= true
                }else{
                    this.lists.map(function(item){
                        item.radio = false
                        
                    }) 
                   this.checked= false
                }
                
            },
            delect_check(id,index){
                console.log(id,index)
                console.log(this.lists[index].radio)
                if(!this.lists[index].radio){
                    console.log('gou')
                    this.lists[index].radio = true
                     

                }else{
                     console.log('qugou')
                    this.lists[index].radio = false
                }
            },
			submit_seach(){
                var that = this;
                console.log(this.seach_form)
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_gm_api/show_list'+CESHI,{
                    params:that.seach_form
                })
                .then(function (res) {
                    console.log(res)
                    that.lists = res.data.data
                    that.data_info = res.data.data_info
                })
                .catch(function (err) {
                    console.log(err);
                })

            },
			get_student_list(page,limit){
				let that = this;
               
                this.seach_form.page = page;
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_gm_api/show_list'+CESHI,{
                    params: this.seach_form
                })
				.then(function (res) {
					console.log(res.data.data)
                     var lists = res.data.data;
                        lists.map(function(item){
                            item.radio = false
                        })
                        that.lists = lists
                     that.data_info = res.data.data_info
				})
				.catch(function (err) {
	                alert(err)
	            });
					
			},
			look_info(id){
				var that = this;
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/info'+CESHI,{
					params: {
		               student_id:id
	            	}
				})
				.then(function (res) {
					console.log(res)
				 	that.student_Info = res.data.data
				})
				.catch(function (err) {
	                console.log(err);
	            });
				
			},
			edit(id){
				this.$router.push({ name: 'student_form', params: { type: "edit",id:id }})
				
			},
			add_student(){
				this.$router.push({ name: 'student_add', params: { type: "add"}})
                // console.log(this.$router)
			},
            delect(index){
                var con;
                con=confirm("确认删除吗"); 
                if(con==true){
                    this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/del'+CESHI,{
                        params: {
                           student_id:index
                        }
                    })
                    .then(function (res) {
                        console.log(res)
                        alert(res.data.msg)
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                }else {

                }
               
            },
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
             handleCurrentChange(val) {
                var that = this;
                console.log(`当前页: ${val}`);
                this.get_student_list(val,10)
                
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
                             padding-left:10px;
                             box-sizing:border-box;
                        }
                         td:nth-child(1){
                            width:10%;
                             div{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                background:url("../../static/img/all_check.png") no-repeat;
                                background-position:left center;
                            }
                            div.on{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                background:url("../../static/img/all_check_on.png") no-repeat;
                                background-position:left center;
                            }
                        }
                        td:nth-child(2){
                            width:10%;
                        }
                        td:nth-child(3){
                            width:10%;
                        }
                        td:nth-child(4){
                            width:10%;
                        }
                        td:nth-child(5){
                            width:10%;
                        }
                        td:nth-child(6){
                            width:10%;
                        }
                         td:nth-child(7){
                            width:10%;
                        }
                        td:last-child{
                            width:20%;
                            div{
                                span{
                                    color:#3a8dcc;

                                    img{
                                        margin-right:2px;
                                    }
                                }
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
                            color:#333333;
                            height:36px;
                            line-height:36px;
                            font-size:14px;
                            text-align:center;
                             border-bottom:1px solid #d6e6f4;
                        }
                         td:nth-child(1){
                            width:10%;
                             padding-left:10px;
                             box-sizing:border-box;
                            div{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                background:url('../../static/img/check.png') no-repeat;
                                background-position:left center;
                            }
                             div.on{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                background:url('../../static/img/check_on.png') no-repeat;
                                background-position:left center;
                            }
                        }
                        td:nth-child(2){
                            width:10%;
                        }
                        td:nth-child(3){
                            width:10%;
                        }
                        td:nth-child(4){
                            width:10%;
                        }
                        td:nth-child(5){
                            width:10%;
                        }
                        td:nth-child(6){
                            width:10%;
                        }
                         td:nth-child(7){
                            width:10%;
                        }
                         td:nth-child(8){
                            width:20%;
                            div{
                                span{
                                    color:#3a8dcc;
                                    margin-right:5px;
                                    cursor:pointer;
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
    #content #content-right .table1 table thead tr td,#content #content-right .table1 table tbody tr td{
        width: auto;
        white-space: nowrap;
    }
</style>