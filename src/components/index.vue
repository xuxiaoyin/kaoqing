<template>
	<div>
		<div id="header">
			<div class="container">
				<div class="logo"><img src="static/img/logo.png"></div>
				<!-- <div class="notice"><img src="static/img/notice.png">中秋节放假通知</div> -->
				<div class="logins">
					<span>欢迎你,{{Infos.username}}</span>
					<button @click="sign_out">退出登录</button>
					<div class="time">当前时间：{{nowTime}}</div>
				</div>		
			</div>
		</div>
		<div id="content">
			<div class="container">
				<div id="content-left">
					<ul>
						<li class="big_li" 
							:class="item.id == link_num?'on':''"
							v-for="(item,index) in href" 
                            :key="index"
							>
							<div class="li_link" @click="changeli(item.id)"><router-link :to="item.url">{{item.name}}</router-link></div>
							<ol v-if=" item.children">
								<li 
									:class="items.id == link_num?'on':''"
									v-for="(items,indexs) in item.children" 
                                    :key="indexs"
									@click="changeli(items.id)"><router-link :to="items.url">{{items.name}}</router-link> <span>></span></li>
							</ol>
						</li>
						

					</ul>
				</div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
 import store from '@/store/store'
	export default {
		name:'index',
		data(){
			return {
				link_num:1,
				nowTime:'',
				href:[
					
				],
				href1:[
					{'name':'学生列表','url':'/index/student_list','id':1},
					{'name':'班级管理', 'url':"",'id':2,
					  'children':[
					  	{'name':'班级列表','url':'/index/class_list','id':21},
					  	{'name':'专业列表','url':'/index/major_list','id':22},
					  	{'name':'学院列表','url':'/index/college_list','id':23},
					  ]

					},
					{'name':'请假列表','url':'/index/leave_list','id':3},
					{'name':'教师列表','url':'/index/teacher_list','id':4},
					{'name':'修改密码','url':'/index/change_password','id':5}
				],
				href2:[
					{'name':'学生列表','url':'/index/t-student_list','id':1},
					{'name':'请假列表','url':'/index/t-leave_list','id':3},
					{'name':'待审批','url':'/index/approval_list','id':4},
					{'name':'修改密码','url':'/index/change_password','id':5}
				],
				href3:[
					{'name':'个人信息','url':'/index/myself_Info','id':1},
					{'name':'申请请假','url':'/index/add_leave','id':3},
					{'name':'请假记录','url':'/index/s-leave-list','id':4},
					{'name':'修改密码','url':'/index/change_password','id':5}
				],
			}
		},
		created(){
			var that = this;
			this.nowTimes()

			// 判断账号权限
			switch(JSON.parse(localStorage.getItem('userInfo')).usertype)
			{
			case 1:
			 that.href = that.href3
             this.$router.push({ name: 'myself_Info', params: { type: "add"}})
			  break;
			case 2:
			  that.href = that.href2

			  break;
			default:
			 that.href = that.href1
             
			}
            this.changeData()

		},
		computed:{
		    Infos(){
		      return this.$store.state.userInfo.username?this.$store.state.userInfo: JSON.parse(localStorage.getItem('userInfo'))
		    }
		},
		methods:{
			// 退出登录
			sign_out(){
				localStorage.removeItem('userInfo');
				 this.$router.push('/');
			},
			changeli(index){
				this.link_num = index;
				console.log(index)
			},
			getTime(){
				setInterval(this.nowTimes,30*1000);
			},

			// 获取当前时间函数
			timeFormate(timeStamp) {
			    let year = new Date(timeStamp).getFullYear();
			    let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
			    let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
			    let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
			    let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
			      // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
			      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
			      this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
			      // console.log(this.nowTime);
			    },
				// 定时器函数
				nowTimes(){
				    this.timeFormate(new Date());
				    setInterval(this.nowTimes,30*1000);
				}
		}
	}
</script>
<style lang="scss">

	#content{
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
                         td:nth-child(1){
                            padding-left:10px;
                            box-sizing:border-box;
                             div{
                                text-align:left;
                                padding-left:15px;
                                box-sizing:border-box;
                                // background:url('../../static/img/all_check.png') no-repeat;
                                // background-position:left center;
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
                                // text-align:left;
                                // padding-left:15px;
                                // box-sizing:border-box;
                                // background:url('../../static/img/check.png') no-repeat;
                                // background-position:left center;
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
}
</style>