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
                            <option :value="item.class_id" v-for="(item,index) in class_lists" :key="index">{{item.class_name}}</option>
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
                        <input class="time" v-model="seach_form.user_name" type="text" placeholder="请输入学号" name="">
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
						<td><div  @click="all_check" :class="checked?'on':''">申请时间</div></td>
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
						<td><div @click="delect_check(item.leave_id,index)" :class="item.radio?'on':''">{{item.leave_submit_date}}</div></td>
						<td><div>{{item.student_id}}</div></td>
						<td><div>{{item.user_name}}</div></td>
						<td><div>{{item.leave_start_datetime}}</div></td>
						<td><div>{{item.leave_end_datetime}}</div></td>
						<td><div>{{item.leave_type_name}}</div></td>
						<td><div>{{item.leave_total_day}}天</div></td>
						<td><div>{{item.leave_status_name}}</div></td>
						<td><div><span @click="look(item.leave_id)"><img src="static/img/edit.png">查看</span><span  @click="delect(item.leave_id)"><img src="static/img/delect.png">删除</span></div></td>
					</tr>
				</tbody>
			</table>

			<div class="table-bottom">
				<a href="javascript:void(0)" class="delect" @click="dele">删除记录</a>
                <!-- <a href="###" class="delect">批量导入</a> -->
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
                 data_info:{},
                 checked:false
			}
		},
        created(){
            this.get_leave(1,10)
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
              dele(){
                let that = this;
                let arr = [];
                console.log()
                this.lists.map(function(item){
                    if(item.radio){
                        arr.push(item.leave_id)
                    }
                })
                console.log(arr.length)
                if(arr.length>0){
                     let bool =confirm('确认删除选中的请假记录吗？');
                    if(bool){
                        this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_gm_api/del'+CESHI,{
                            params: {
                               leave_id:arr.join(',')
                            }
                        })
                        .then(function (res) {
                            console.log(res)
                            alert(res.data.msg)
                            that.get_leave(1,3)
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    }
                }else{
                    alert('请选择请假记录')
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
                console.log(that.seach_form)
                that.seach_form.page = 1;
                 this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_gm_api/show_list'+CESHI,{
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
               that.seach_form.page = page;
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_gm_api/show_list'+CESHI,{
                    params:that.seach_form
                })
                .then(function (res) {
                    console.log(res)
                      var lists = res.data.data;
                    lists.map(function(item){
                        item.radio = false
                    })
                    that.lists = lists
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
            delect(index){
                let con = confirm('确定要删除这条请假信息吗？');
                let that = this;
                if(con){
                    this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_gm_api/del'+CESHI,{
                        params: {
                           leave_id:index
                        }
                    })
                    .then(function (res) {
                        console.log(res)
                        alert(res.data.msg)
                        that.submit_seach()
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                }
               
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
                             div.on{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                background:url(../../static/img/all_check_on.png) no-repeat;
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
                            div.on{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                background:url(../../static/img/check_on.png) no-repeat;
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