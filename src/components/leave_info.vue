<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--请假信息
			<router-link to="/index/leave_list">请假列表</router-link>
		</div>

		<div class="myself-info">
			<h1>请假人信息： 	</h1>
			<ul>
				<li>学号：{{leave_Info.student_id}}</li>
				<li>学院：{{leave_Info.college_name}}</li>
				<li>班级：{{leave_Info.class_name}}</li>
				<li>姓名：{{leave_Info.user_name}}</li>
				<li>性别：{{leave_Info.gender_name}}</li>
				<li>专业：{{leave_Info.major_name}}</li>
			</ul>
		</div>

		<div class="myself-info">
			<h1>请假详情： 	</h1>
			<ul>
				<li>请假开始时间：{{leave_Info.leave_start_datetime}}</li>
				<li>请假结束时间：{{leave_Info.leave_end_datetime}}</li>
				<li>请假时长：{{leave_Info.leave_total_day}}天</li>
				<li>请假类型：{{leave_Info.leave_type_name}}</li>
				<li>申请时间：{{leave_Info.leave_submit_time}}</li>
			</ul>
			<div class="infi">
				请假原因：身体不适
			</div>
			<div class="infi">
				审批状态：
				<div class="img">
					<!-- <img :src="'static/img/'+(parseInt(leave_Info.step.approve_type)+1)+'.jpg'"> -->
					<ul>
						<li>
							<img src="static/img/step1.jpg">
							<p class="time">{{leave_Info.leave_submit_time}}</p>
						</li>
						<li v-if="1<=parseInt(leave_Info.step.approve_type)">
							<img src="static/img/step2.jpg"  v-if="leave_Info.step.step_1 == 0">
							<img src="static/img/step2_on.jpg" v-if="leave_Info.step.step_1 == 1">
							
						</li>
						<li v-if="2<=parseInt(leave_Info.step.approve_type)">
							
							<img src="static/img/step3.jpg"  v-if="leave_Info.step.step_2 == 0">
							<img src="static/img/step3_on.jpg" v-if="leave_Info.step.step_2 == 1">
							
						</li>
						<li v-if="3<=parseInt(leave_Info.step.approve_type)">
							<img src="static/img/step4.jpg"  v-if="leave_Info.step.step_3 == 0">
							<img src="static/img/step4_on.jpg" v-if="leave_Info.step.step_3 == 1">
							
						</li>
						<li v-if="4<=parseInt(leave_Info.step.approve_type)">
							<img src="static/img/step5.jpg"  v-if="leave_Info.step.step_4 == 0">
							<img src="static/img/step5_on.jpg" v-if="leave_Info.step.step_4 == 1">
							
						</li>
						<li>
							<img src="static/img/step6.jpg"  v-if="leave_Info.step.step_pass == 0">
							<img src="static/img/step6_on.jpg" v-if="leave_Info.step.step_pass == 1">
							
						</li>
					</ul>
				</div>
			</div>
			<div class="infi">
				请假凭证：
				<div class="img_ping">
					<img :src="leave_Info.leave_img" v-if='leave_Info.leave_img'>
				</div>
			</div>
			<!-- <div class="delect">
				<button>删除</button>
				<button>通过</button>
				<button class="refuse">不通过</button>
			</div> -->
		</div>
		
		
	</div>
</template>

<script>
	import store from '@/store/store'
	const CESHI='?zy_test=1'
	export default {
		name:'class_edit_add',
		data(){
			return {
				gender:['男','女'],
				leave_Info:{
				},
			}
		},
		created(){
			console.log(this.$route.params)
			var that = this;
			this.type = this.$route.params.type;
			console.log(that)
			this.getinfo()
			
		},
		methods:{
			getinfo(){
				var that = this;
				
				console.log(this.type)
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/leave_gm_api/info'+CESHI,{
					 params: {
		                leave_id: that.$route.params.id
		            }
				})
				.then(function (res) {
					console.log(res.data.data)
					console.log(res.data.data.step)
				 	that.leave_Info = res.data.data
				})
				.catch(function (err) {
	                console.log(err);
	            });
					
			}
		}
	}
</script>

<style lang="scss">
	  #content-right{
        .myself-info{
        	width:100%;
        	background:#fff;
        	overflow:hidden;
        	padding:0 0 40px 20px;
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
                overflow:hidden;
        		li{
        			width:33.33%;
        			float:left;
        			line-height:30px;
        			font-size:12px;
        			color:#333333;

        		}
        	}
        }
        .infi{
           line-height:30px;
            font-size:12px;
            color:#333333; 
            .img{
                width:790px;
                img{
                    width:656px;
                    display:block;
                    margin:0 auto;
                }
                ul{
                    width:100%;
                    li{
                        width:16.6666%;
                        float:left;
                        img{
	        				width:100%;
	        			}
                        p{
                            color:#000000;
                            font-size:12px;
                            text-align:center;
                            height:20px;
                            line-height:20px;
                        }
                        p.time{
                            font-size:10px;
                            color:#adadad;
                            line-height:15px;
                        }
                    }
                }
            }
        }
        .delect{
            height:70px;
            border-top:2px solid #e6eff7;
            text-align:center;
            button{
                width:140px;
                height:40px;
                background:#3a8dcc;
                color:#fff;
                border:none;
                display:inline-block;
                margin-top:30px;
                border-radius:5px;
                margin-right:20px;
                &.refuse{
                    background:#fff;
                    border:1px solid #3a8dcc;
                    color:#3a8dcc;
                }
            }
        }
       
    }
</style>