<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--班级列表
			<router-link to="/index/class_add">+新增班级</router-link>
		</div>
        <div class="edit-myself-info" v-show="class_Info != ''">
            <h1>个人信息： <span @click="edit(class_Info.class_id)"><img src="static/img/edit.png">编辑</span> </h1>
            <ul>
                <li>学号：{{class_Info.class_id}}</li>
                <li>学院：{{class_Info.college_name}}</li>
                <li>班级：{{class_Info.class_name}}</li>
                <li>姓名：{{class_Info.user_name}}</li>
                <li>性别：{{class_Info.gender_name}}</li>
                <li>专业：{{class_Info.major_name}}</li>
                <li>联系电话：{{class_Info.phone}}</li>
                <li>监护人姓名：{{class_Info.guardian_name}}</li>
                <li>监护人联系电话：{{class_Info.guardian_phone}}</li>
                <li>请假状态：请假中</li>
                <li>累计请假时长：5天</li>
                <li>辅导员：{{class_Info.counselor_name}}</li>
            </ul>
        </div>
		<div class="form">
			<form  @submit.prevent="submit_seach">
				<div class="item">
					<label>学院：</label>
					<div class="input">
						<select v-model="seach_form.college_id">
                            <option value="">全部</option>
                            <option :value="item.college_id" v-for="(item,index) in college_list" :key="index">{{item.college_name}}</option>
                        </select>
					</div>
				</div>
                <div class="item">
                    <label>专业：</label>
                    <div class="input">
                        <select v-model="seach_form.major_id">
                            <option value="">全部</option>
                            <option :value="item.major_id" v-for="(item,index) in major_list" :key="index">{{item.major_name}}</option>
                        </select>
                    </div>
                </div>
                <div class="item">
                    <label>班级：</label>
                    <div class="input">
                        <select v-model="seach_form.class_id">
                            <option value="">全部</option>
                            <option :value="item.class_id" v-for="(item,index) in class_lists" :key="index">{{item.class_name}}</option>
                        </select>
                    </div>
                </div>
				<!-- <div class="item">
					<label>入学年份：</label>
					<div class="input">
						<input class="time" v-model="seach_form.enter_year" type="text" placeholder="请输入入学年份" name="">
					</div>
				</div> -->
                <div class="item">
                    <label>辅导员姓名：</label>
                    <div class="input">
                        <input class="time" v-model="seach_form.counselor_name" type="text" placeholder="请输入辅导员姓名" name="">
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
						<td><div @click="all_check" :class="checked?'on':''">班级</div></td>
						<td><div>专业</div></td>
						<td><div>学院</div></td>
						<!-- <td><div>入学年份</div></td> -->
						<td><div>辅导员</div></td>
						<td><div>操作</div></td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in class_list" :key="index">
						<td><div @click="delect_check(item.class_id,index)" :class="item.radio?'on':''">{{item.class_name}}</div></td>
						<td><div>{{item.major_name}}</div></td>
						<td><div>{{item.college_name}}</div></td>
						<!-- <td><div>{{item.enter_year}}</div></td> -->
						<td><div>{{item.counselor_name}}</div></td>
						<td><div>
							<span @click="edit(item.class_id)"><img src="static/img/edit.png">编辑</span><span @click="delect(item.class_id)"><img src="static/img/delect.png">删除</span></div></td>
					</tr>
				</tbody>
			</table>

			<div class="table-bottom">
				<a href="javascript:void(0)" @click="dele" class="delect">删除记录</a>
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
    const CESHI='?zy_test=1'
	export default {
		name:"class_list",
		data(){
			return {
				class_list:[],
                class_Info:"",
                seach_form:{
                    college_id:'',
                    major_id:'',
                    class_id:'',
                    enter_year:'',
                    counselor_name:'',
                    page:1,
                    limit:10
                },
                data_info:{},
                checked:false
			}
		},
		created(){
			this.get_class_List(1,10)
		},
        computed:{
            class_lists(){
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
                this.class_list.map(function(item){
                    if(item.radio){
                        arr.push(item.class_id)
                    }
                })
                console.log(arr.length)
                if(arr.length>0){
                     let bool =confirm('确认删除选中的班级吗？');
                    if(bool){
                        this.$axios.get('http://gzhh.gzziyu.com/index.php/home/class_api/del'+CESHI,{
                            params: {
                               class_id:arr.join(',')
                            }
                        })
                        .then(function (res) {
                            console.log(res)
                            alert(res.data.msg)
                            that.get_class_List(1,10)
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    }
                }else{
                    alert('请选择班级')
                }
               
            },
            all_check(){
                let that = this;
                console.log(this.checked)
                if(!this.checked){
                    console.log('gouxuan')
                   this.class_list.map(function(item){
                        item.radio = true
                        
                    }) 
                   this.checked= true
                }else{
                    this.class_list.map(function(item){
                        item.radio = false
                        
                    }) 
                   this.checked= false
                }
                
            },
            delect_check(id,index){
                console.log(id,index)
                console.log(this.class_list[index].radio)
                if(!this.class_list[index].radio){
                    console.log('gou')
                    this.class_list[index].radio = true

                }else{
                     console.log('qugou')
                    this.class_list[index].radio = false
                }
            },
            submit_seach(){
                var that = this;
                console.log(this.seach_form)
                this.seach_form.page = 1;
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/class_api/show_list'+CESHI,{
                    params:that.seach_form
                })
                .then(function (res) {
                    console.log(res)
                    that.class_list = res.data.data
                    that.data_info = res.data.data_info
                })
                .catch(function (err) {
                    console.log(err);
                });
            },
            look_info(id){
                var that = this;
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/info'+CESHI,{
                    params: {
                       class_id:id
                    }
                })
                .then(function (res) {
                    console.log(res)
                    that.class_Info = res.data.data
                })
                .catch(function (err) {
                    console.log(err);
                });
                
            },
			get_class_List(page,limit){
				var that = this;
               this.seach_form.page = page
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/class_api/show_list'+CESHI,{
                    params:that.seach_form
                })
				.then(function (res) {
	                console.log(res);
	                if(res.data.code == 1){
	                  console.log(res.data.data)
                      var lists = res.data.data;
                        lists.map(function(item){
                            item.radio = false
                        })
                        that.class_list = lists
                       that.data_info = res.data.data_info
	                }
	            })

	            .catch(function (err) {
	                console.log(err);
	            });
			},
            edit(id){
                console.log(123)
                this.$router.push({ name: 'class_form', params: { type: "edit",id:id }})
                
            },
            add(){
                this.$router.push({ name: 'class_add', params: { type: "add"}})
                // console.log(this.$router)
            },
            delect(index){

                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/class_api/del'+CESHI,{
                    params: {
                       class_id:index
                    }
                })
                .then(function (res) {
                    console.log(res)
                    alert(res.data.msg)
                })
                .catch(function (err) {
                    console.log(err);
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                var that = this;
                console.log(`当前页: ${val}`);
                this.get_class_List(val,10)
                
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
                            width:16.6666%;
                             div{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                background:url("../../static/img/all_check.png") no-repeat;
                                background-position:left center;
                                white-space: nowrap;
                            }
                            div.on{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                background:url("../../static/img/all_check_on.png") no-repeat;
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
                             width:16.666%;
                            color:#333333;
                            height:36px;
                            line-height:36px;
                            font-size:14px;
                            text-align:center;
                             border-bottom:1px solid #d6e6f4;
                        }
                         td:nth-child(1){
                            width:16.666%;
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
                        // td:nth-child(2){
                        //     width:10%;
                        // }
                        // td:nth-child(3){
                        //     width:10%;
                        // }
                        // td:nth-child(4){
                        //     width:10%;
                        // }
                        // td:nth-child(5){
                        //     width:10%;
                        // }
                        // td:nth-child(6){
                        //     width:10%;
                        // }
                        //  td:nth-child(7){
                        //     width:10%;
                        // }
                         td:nth-child(6){
                            width:20%;
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