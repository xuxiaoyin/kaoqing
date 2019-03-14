<template>
	<div id="content-right">
                <div class="right-title">
                    广州航海学院学生考勤系统--教师列表
                    <a href="javascript:void(0)" @click="add">+新增教师</a>
                </div>
                <div class="form">
                    <form @submit.prevent="submit_seach">
                        <div class="item">
                            <label>学院：</label>
                            <div class="input">
                                <select v-model="seach_form.college_id">
                                    <option value="">全部</option>
                                    <option :value="item.college_id" v-for="item in college_list"  :key="item.college_id">{{item.college_name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="item">
                            <label>教师编号：</label>
                            <div class="input">
                                <input class="time" v-model="seach_form.teacher_id" type="text" name="">
                            </div>
                        </div>
                         <div class="item">
                            <label>姓名：</label>
                            <div class="input">
                                <input class="time" v-model="seach_form.user_name" type="text" name="">
                            </div>
                        </div>
                        <div class="item">
                            <label>职位：</label>
                            <div class="input">
                                <select v-model= "seach_form.teacher_position_id">
                                    <option value="">全部</option>
                                    <option :value="item.id" v-for="item in teacher_position_id" :key="item.id">{{item.name}}</option>
                                   
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
                                <td><div :class="checked?'on':''" @click="all_check">教师编号</div></td>
                                <td><div>教师姓名</div></td>
                                <td><div>性别</div></td>
                                <td><div>学院</div></td>
                                <td><div>职位</div></td>
                                <td><div>操作</div></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in teacher_list" :key="index">
                                <td><div :class="item.radio?'on':''" @click="delect_check(item.teacher_id,index)">{{item.teacher_id}}</div></td>
                                <td><div>{{item.user_name}}</div></td>
                                <td><div>{{item.gender_name}}</div></td>
                                <td><div>{{item.college_name}}</div></td>
                                <td><div>{{item.teacher_position_name}}</div></td>
                                <td><div>
                                    <span @click="edit(item.teacher_id)"><img src="static/img/edit.png">编辑</span><span @click="del(item.teacher_id)"><img src="static/img/delect.png">删除</span></div></td>
                            </tr>
                           
                        </tbody>
                    </table>

                    <div class="table-bottom">
                        <a href="javascript:void(0)" class="delect" @click="dele">删除记录</a>
                        <a href="javascript:void(0)" class="" style="float: left;"> 
                            <el-upload
                              name="import_xls"
                              class="avatar-uploader"
                              action="http://gzhh.gzziyu.com/index.php/home/import_api/teacher"
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
<script >
    const CESHI='?zy_test=1'
	export default {
		name:"teacher_list",
		data(){
			return {
                teacher_position_id:[
                    {name:'学工部',id:1},
                    {name:'大队长',id:2},
                    {name:'辅导员',id:3},
                    {name:'学校领导',id:4}
                ],
				teacher_list:[],
                seach_form:{
                    college_id:'',
                    teacher_id:'',
                    user_name:'',
                    teacher_position_id:'',
                     limit:10,
                     page:1
                },
                data_info:{},
                checked:false

			}
		},
		created(){
			this.get_teacher_list(1,3)
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
             dele(){
                let that = this;
                let arr = [];
                console.log()
                this.teacher_list.map(function(item){
                    if(item.radio){
                        arr.push(item.teacher_id)
                    }
                })
                console.log(arr.length)
                if(arr.length>0){
                     let bool =confirm('确认删除选中的教师吗？');
                    if(bool){
                        this.$axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_api/del'+CESHI,{
                            params: {
                               teacher_id:arr.join(',')
                            }
                        })
                        .then(function (res) {
                            console.log(res)
                            alert(res.data.msg)
                            that.get_teacher_list(1,3)
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    }
                }else{
                    alert('请选择教师')
                }
               
            },
            all_check(){
                let that = this;
                console.log(this.checked)
                if(!this.checked){
                    console.log('gouxuan')
                   this.teacher_list.map(function(item){
                        item.radio = true
                        
                    }) 
                   this.checked= true
                }else{
                    this.teacher_list.map(function(item){
                        item.radio = false
                        
                    }) 
                   this.checked= false
                }
                
            },
            delect_check(id,index){
                console.log(id,index)
                console.log(this.teacher_list[index].radio)
                if(!this.teacher_list[index].radio){
                    console.log('gou')
                    this.teacher_list[index].radio = true
                     

                }else{
                     console.log('qugou')
                    this.teacher_list[index].radio = false
                }
            },
            // 搜索
            submit_seach(){
               
                var that =this;
                 console.log(that.seach_form)
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_api/show_list'+CESHI,{
                    params:that.seach_form
                })
                .then(function (res) {
                    console.log(res);
                    if(res.data.code == 1){
                      console.log(res.data.data)
                      that.teacher_list = res.data.data
                    }

                })
                .catch(function (err) {
                    console.log(err);
                });
            },
            edit(id){
                this.$router.push({ name: 'teacher_add', params: { type: "edit",id:id }})
                
            },
            add(){
                this.$router.push({ name: 'teacher_add'})
                // console.log(this.$router)
            },
            del(id){
               var con = confirm("确认删除该教师吗？")
               var that = this;
               if(con){
                    this.$axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_api/del'+CESHI,{
                        params:{
                            teacher_id:id
                        }
                    })
                    .then(function (res) {
                        console.log(res);
                        if(res.data.code == 1){
                          alert(res.data.msg)
                          console.log('删除成功')
                         that.get_teacher_list(1,1)
                        }else{
                            alert(res.data.msg)
                        }

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                }
            },
			get_teacher_list(page,limit){
				var that = this;
               
                this.seach_form.page = page
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_api/show_list'+CESHI,{
                    params:this.seach_form
                })
				.then(function (res) {
	                console.log(res);
	                if(res.data.code == 1){
	                  console.log(res.data.data)
                       var lists = res.data.data;
                        lists.map(function(item){
                            item.radio = false
                        })
                        that.teacher_list = lists
                       that.data_info = res.data.data_info
	                }

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
                this.get_teacher_list(val,3)
                
            }
		}
	}
</script>
<style lang="scss">
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
    margin-top: 10px;
    margin-left: 5px;
}
.button_my:hover{
    background: #3a8dcc;
    color:#fff;
}
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
                    input{
                        width:100%;
                        height:100%;
                        opacity:0;
                        position:absolute;
                        left:0;
                        top:0;
                    }
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