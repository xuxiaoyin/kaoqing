<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--教师列表
			<router-link to="/index/student_list">学生列表</router-link>
		</div>
		<div class="right-content">
			<div class="form1">
				<form>
					<div class="item" >
						<div class="label">学号：</div>
						<div class="input">
							<input type="text" v-model="student_Info.student_id" placeholder="请输入学号" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">姓名：</div>
						<div class="input">
							<input type="text" v-model="student_Info.user_name" placeholder="请输入姓名" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">性别：</div>
						<div class="input">
							<div class="radius" 
								@click="change_gender(index)"
								v-for="(item,index) in gender"
								:key="index"
								:class="(student_Info.gender == (index+1))?'radius_on':''">{{item}}</div>
						</div>
					</div>
					<div class="item">
						<div class="label">学院：</div>
						<div class="input">
							<select v-model="student_Info.college_id">
								<option :value="item.college_id" v-for="(item,index) in college_list" :key="index">{{item.college_name}}</option>
							</select>
						</div>
					</div>

					<div class="item">
						<div class="label">专业：</div>
						<div class="input">
							<select v-model="student_Info.major_id">
								<option :value="item.major_id" v-for="(item,index) in major_list" :key="index">{{item.major_name}}</option>
							</select>
						</div>
					</div>
					<div class="item">
						<div class="label">班级：</div>
						<div class="input">
							<select v-model="student_Info.class_id">
								<option :value="item.class_id" v-for="(item,index) in class_list" :key="index">{{item.class_name}}</option>
							</select>
						</div>
					</div>
					<div class="item">
						<div class="label">联系电话：</div>
						<div class="input">
							<input type="text" v-model="student_Info.phone" placeholder="请输入联系电话" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">监护人姓名：</div>
						<div class="input">
							<input type="text" v-model="student_Info.guardian_name"  placeholder="请输入监护人姓名" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">监护人电话：</div>
						<div class="input">
							<input type="text"  v-model="student_Info.guardian_phone" placeholder="请输入监护人电话" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">身份证号码：</div>
						<div class="input">
							<input type="text"  v-model="student_Info.id_card" placeholder="请输入身份证号码" name="">
						</div>
					</div>
					<!-- <div class="item">
						<div class="label">专业：</div>
						<div class="input">
							<select v-model="student_Info.major_id">
								<option :value="item.teacher_id" v-for="item in counselor_list">{{item.counselor_name}}</option>
							</select>
						</div>
					</div> -->
					<div class="btn">
						<button type="button" @click="edit_student">确定</button>
						<button type="reset">重置</button>
					</div>
				</form>
			</div>
		</div>
		
	</div>

</template>

<script>
	import store from '@/store/store'
	const CESHI='?zy_test=1'
	export default {
		name:'student_edit_add',
		data(){
			return {
				gender:['男','女'],
				student_Info:{
					"student_id":"",
					"user_name":"",
					"phone":"",
					"guardian_name":"",
					"guardian_phone":"",
					"gender_name":"",
					"class_name":"",
					"college_name":"",
					"major_name":"",
					"counselor_name":"",
					"id_card":""
				},
				type:""
			}
		},
		created(){
			console.log(this.$route.params)
			var that = this;
			this.type = this.$route.params.type;
			console.log(that)
			this.getinfo()
			
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
		    counselor_list(){
		      return this.$store.state.counselor_list
		    }
		},
		methods:{
			change_gender(index){
				this.student_Info.gender = (index+1)
			},
			edit_student(){
				var that = this;
				if(that.type == "edit"){
					that.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/edit'+CESHI,{
						 params: {
			                college_id:that.student_Info.college_id,
	                        major_id:that.student_Info.major_id,
	                        class_id:that.student_Info.class_id,
	                        user_name:that.student_Info.user_name,
	                        gender:that.student_Info.gender,
	                        phone:that.student_Info.phone,
	                        guardian_name:that.student_Info.guardian_name,
	                        guardian_phone:that.student_Info.guardian_phone,
	                        student_id:that.student_Info.student_id,
	                        id_card:that.student_Info.id_card
			            }
					})
					.then(function (res) {
						console.log(res)
						if(res.data.code == 1){
							alert('编辑成功')
							that.getinfo()
							that.$router.push('/index/student_list');
						}
					 	
					})
					.catch(function (err) {
		                console.log(err);
		            });
				}
			},
			getinfo(){
				var that = this;
				
				if(this.type == "edit"){
				console.log(this.type)
					this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/info'+CESHI,{
						 params: {
			                student_id: that.$route.params.id
			            }
					})
					.then(function (res) {
						console.log(res.data.data)
					 	that.student_Info = res.data.data
					})
					.catch(function (err) {
		                console.log(err);
		            });
					
				}else{

				}
			}

		}
	}
</script>
<style lang="scss">
	 #content-right{
    	.right-content{
    		width:100%;
    		background:#fff;
    		overflow:hidden;
    		.form1{
		       	width:460px;
		       	margin:40px auto;
		       	overflow:hidden;
		       	.item{
		       		width:100%;
		       		margin-bottom:14px;
		       		overflow:hidden;
		       		.label{
		       			width:25%;
		       			float:left;
		       			color:#000000;
		       			text-align:right;
		       			line-height:30px;
		       			margin-right:2%;
		       		}
		       		.input{
		       			width:73%;
		       			float:left;
		       			input{
		       				width:100%;
		       				height:30px;
		       				border:1px solid #cccccc;
		       				border-radius:5px;
		       				font-size:12px;
		       				padding:0 8px;
		       				box-sizing:border-box;

		       			}
		       			select{
		       				width:100%;
		       				height:30px;
		       				border:1px solid #cccccc;
		       				border-radius:5px;
		       				font-size:12px;
		       				padding:0 8px;
		       				box-sizing:border-box;
		       				color:#666;
		       			}
		       			textarea{
		       				width:100%;
		       				height:140px;
		       				border:1px solid #cccccc;
		       				border-radius:5px;
		       				font-size:12px;
		       				padding:5px 8px;
		       				box-sizing:border-box;
		       				resize:none;
		       				color:#666;
		       			}
		       			.radius{
		       				width:55px;
		       				height:30px;
		       				line-height:30px;
		       				padding-left:20px;
		       				color:#000000;
		       				font-size:12px;
		       				float:left;
		       				background:url("../../static/img/radius.png") no-repeat;
		       				background-position:left center;
		       			}
		       			.radius_on{
		       				background:url('../../static/img/radius_check.png') no-repeat;
		       				background-position:left center;
		       			}
		       		}
		       	}
		       	.btn{
		       		width:100%;
		       		text-align:center;
		       		margin:25px 0 0 0;
		       		button{
		       			width:80px;
		       			height:25px;
		       			background:#3a8dcc;
		       			color:#fff;
		       			border:none;
		       			border-radius:5px;
		       			margin-right:20px;
		       			display:inline-block;
		       		}
		       	}
	       }
    	}
       
    }
</style>