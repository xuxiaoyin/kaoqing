<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--学生列表
			<a href="javas:viod(0)" @click="add_student()">+新增学生</a>
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
				<div class="item">
					<label>学院：</label>
					<div class="input">
						<select v-model="seach_form.college_id">
                            <option value="">全部</option>
							<option :value="item.college_id" v-for="(item,index) in college_list" :key="index" >{{item.college_name}}</option>
						</select>
							
					</div>

				</div>
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
				<!-- <div class="item">
					<label>请假类型：</label>
					<div class="input">
						<select v-model="seach_form.leave_type_id">
                            <option :value="item.leave_type_id" v-for="item in leave_list" >{{item.leave_type_name}}</option>
                        </select>
					</div>
				</div> -->
				<div class="item">
					<label>姓名：</label>
					<div class="input">
						<input type="text" class="time" v-model="seach_form.user_name" name="">
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
                    <tr style="display:none;">
                        <td><div class="on">id</div></td>
                    </tr>
					<tr v-for="(item,index) in lists" :key="index">
						<td><div @click="delect_check(item.student_id,index)" :class="item.radio?'on':''">{{item.student_id}}</div></td>
						<td><div>{{item.user_name}}</div></td>
						<td><div>{{item.gender_name}}</div></td>
						<td><div>{{item.class_name}}</div></td>
						<td><div>{{item.college_name}}</div></td>
						<td><div>{{item.leave_status_name}}</div></td>
						<td><div>{{item.leave_total_day}}</div></td>
						<td><div>
							<span @click="look_info(item.student_id)"><img src="static/img/caozuo.png">查看</span>
							<span @click="edit(item.student_id)"><img src="static/img/edit.png" >编辑</span>
							<span @click="delect(item.student_id)"><img src="static/img/delect.png">删除</span>
						</div></td>
					</tr>
					
				</tbody>
			</table>

			<div class="table-bottom">
				<a href="javascript:void(0)" class="delect" @click="dele">删除记录</a>
                 <a href="javascript:void(0)" class="" style="float: left;"> 
                            <el-upload
                              name="import_xls"
                              class="avatar-uploader"
                              action="http://gzhh.gzziyu.com/index.php/home/import_api/student"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              
                              :before-upload="beforeAvatarUpload"
                              >
                              <el-button size="small" class="button_my">批量导入</el-button>
                            </el-upload>


                          
                                                    </a>
				
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
                data_info:{},
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
                    class_id:'',
                    student_id:'',
                    user_name:'',
                    leave_status:'',
                    page:1,
                    limit:10

                },
                checked:false,
                fileList:[]

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
              beforeAvatarUpload(file){
                console.log(file)
                
                
            },
            handleAvatarSuccess(res){
                console.log(res)
                if(res.code == 1){
                    if(res.data.upload_fail.length>0){
                        let lie = res.data.upload_fail.join(',');
                         this.$notify({
                          title: '导入通知',
                          message: '导入成功，部分导入失败：'+lie
                        });
                         this.submit_seach()
                    }
                    
                    // this.$message('导入成功');
                }
            },
            // getFile(event) {
            //     this.file = event.target.files[0];
            //     console.log(this.file);

            //     let formData = new FormData();

            //     formData.append('file', this.file);
            //     let config = {

            //       headers: {

            //         'Content-Type': 'multipart/form-data'

            //       }

            //     }
            //     var that = this;
            //     this.$axios.get('http://kq.openlong.com/home/import_api/student', formData, config).then(function (res) {

            //          console.log(res)
            //          if(res.data.success == 1){
            //              // that.file_url.push(res.data.pic)
            //              // that.submit_form.p_pic = that.file_url.join(',')
            //          }

            //     })

            // },
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
                        this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/del'+CESHI,{
                            params: {
                               student_id:arr.join(',')
                            }
                        })
                        .then(function (res) {
                            console.log(res)
                            alert(res.data.msg)
                            that.get_student_list(1,3)
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
                this.seach_form.page = 1;
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/show_list'+CESHI,{
                    params:that.seach_form
                })
                .then(function (res) {
                    console.log(res)
                   if(res.data.code == 1){
                        var lists = res.data.data;
                        lists.map(function(item){
                            item.radio = false
                        })
                        that.lists = lists
                        that.data_info = res.data.data_info
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
            },
			get_student_list(page,limit){
				let that = this;
                   this.seach_form.page = page
                   this.checked = false;
                    this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/show_list'+CESHI,{
                        params:that.seach_form
                    })
                    .then(function (res) {
                        console.log(res.data)
                        if(res.data.code == 1){
                            
                            var lists = res.data.data;
                            lists.map(function(item){
                                item.radio = false
                            })
                            that.lists = lists
                             that.data_info = res.data.data_info
                           }
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
                    that.get_student_list(1,3)
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
                        that.get_student_list(1,10)
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
                that.get_student_list(val,10)
            }
		}
	}
</script>
<style lang="scss" scoped>
@import './student_list';
.el-upload__tip{
    float:right;
}
.button_my{
    display: block;
    float: left;
    text-align: center;
    width: 80px;
    height: 27px;
    background: #3a8dcc;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-top: 11px;
    margin-left: 5px;
}
.delect{
    display:block;
    float:left;
    text-align:center;
    width:80px;
    height:25px;
    line-height: 25px;
    background:#3a8dcc;
    color:#fff;
    padding: 1px 0;
    border:none;
    border-radius:5px;
    margin-top:11px;
    margin-left:5px;
    position:relative;
    font-size: 12px;
}
#content #content-right .table1 table tbody tr td{
    width: auto;
}
#content #content-right .table1 table thead tr td:nth-child(1){
    width: 5%;
}
#content #content-right .table1 table thead tr td:nth-child(2){
    width: 8%;
}
#content #content-right .table1 table thead tr td:nth-child(3){
    width: 5%;
}
#content #content-right .table1 table thead tr td:nth-child(4){
    width: 20%;
}
#content #content-right .table1 table thead tr td:nth-child(6){
    width: 8%;
}
#content #content-right .table1 table thead tr td:nth-child(7){
    width: 10%;
}
#content #content-right .table1 table thead tr td:nth-child(8){
    width: 15%;
}
</style>