<template>
	<div id="content-right">
                <div class="right-title">
                    广州航海学院学生考勤系统--专业列表
                    <router-link to="/index/major_add">+新增专业</router-link>
                </div>
                <div class="form">
                    <form @submit.prevent="submit_seach">
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
                                <td><div :class="checked?'on':''" @click="all_check">专业</div></td>
                                <!-- <td><div>专业类型</div></td> -->
                                <td><div>学院</div></td>
                                <td><div>操作</div></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in major_lists" :key="index">
                                <td><div @click="delect_check(item.major_id,index)" :class="item.radio?'on':''">{{item.major_name}}</div></td>
                                <!-- <td><div>{{item.major_type_name}}</div></td> -->
                                <td><div>{{item.college_name}}</div></td>
                                <td><div>
                                    <span @click="edit(item.major_id)"><img src="static/img/edit.png">编辑</span><span @click="dele(item.major_id)"><img src="static/img/delect.png">删除</span></div></td>
                            </tr>
                            
                        </tbody>
                    </table>

                    <div class="table-bottom">
                       <a href="javascript:void(0)" class="delect" @click="delect_ch">删除记录</a>
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
		name:"major_list",
		data(){
			return {
				major_lists:[],
                seach_form:{
                    college_id:'',
                    major_id:'',
                    page:1,
                    limit:10
                },
                 data_info:{},
                 checked:false
			}
		},
		created(){
			this.get_major_list(1,10)
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
            }
        },
		methods:{
              delect_ch(){
                let that = this;
                let arr = [];
                console.log()
                this.major_lists.map(function(item){
                    if(item.radio){
                        arr.push(item.major_id)
                    }
                })
                console.log(arr.length)
                if(arr.length>0){
                     let bool =confirm('确认删除选中的专业吗？');
                    if(bool){
                        this.$axios.get('http://gzhh.gzziyu.com/index.php/home/major_api/del'+CESHI,{
                            params: {
                               major_id:arr.join(',')
                            }
                        })
                        .then(function (res) {
                            console.log(res)
                            alert(res.data.msg)
                            that.get_major_list(1,10)
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    }
                }else{
                    alert('请选择专业')
                }
               
            },
            all_check(){
                let that = this;
                console.log(this.checked)
                if(!this.checked){
                    console.log('gouxuan')
                   this.major_lists.map(function(item){
                        item.radio = true
                        
                    }) 
                   this.checked= true
                }else{
                    this.major_lists.map(function(item){
                        item.radio = false
                        
                    }) 
                   this.checked= false
                }
                
            },
            delect_check(id,index){
                console.log(id,index)
                console.log(this.major_lists[index].radio)
                if(!this.major_lists[index].radio){
                    console.log('gou')
                    this.major_lists[index].radio = true
                     

                }else{
                     console.log('qugou')
                    this.major_lists[index].radio = false
                }
            },
            edit(id){
                this.$router.push({ name: 'major_add', params: { type: "edit",id:id }})
            },
            dele(id){
                var that =this;
                console.log(id)
                let con = confirm('确定要删除该专业吗？')
                if(con){
                    this.$axios.get('http://gzhh.gzziyu.com/index.php/home/major_api/del'+CESHI,{
                       params:{
                         major_id:id
                       }
                    })
                    .then(function (res) {
                        console.log(res.data)
                        if(res.data.code == 1){
                            alert(res.data.msg)
                            that.get_major_list(1,10)

                        }else{
                            alert(res.data.msg)
                        }
                        
                    })
                    .catch(function (err) {
                         
                    });
                }
               
            },
            // 提交搜索
            submit_seach(){
                var that = this;
                console.log(this.seach_form)
                
                this.$axios.get('http://gzhh.gzziyu.com/index.php/home/major_api/show_list'+CESHI,{
                    params:that.seach_form
                })
                .then(function (res) {
                    console.log(res)
                    that.major_lists = res.data.data
                    that.data_info = res.data.data_info
                })
                .catch(function (err) {
                    console.log(err);
                });
            },
			get_major_list(page,limit){
				var that = this;
                this.seach_form.page = page; 
                console.log(this.seach_form)
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/major_api/show_list'+CESHI,{
                    params:this.seach_form
                })
				.then(function (res) {
	                console.log(res);
	                if(res.data.code == 1){
                        var lists = res.data.data;
                            lists.map(function(item){
                                item.radio = false
                            })
                            that.major_lists = lists
	                  console.log(res.data.data)
	                  // that.major_lists = res.data.data
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
                this.get_major_list(val,3)
                
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
                            width:25%;
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
                            width:25%;
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