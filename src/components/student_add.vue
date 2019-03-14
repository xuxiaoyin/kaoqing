<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--学生列表
			<router-link to="/index/student_list">学生列表</router-link>
		</div>
		<div class="right-content">
			<div class="form1">
				<form>
					<div class="item">
						<div class="label">学号：</div>
						<div class="input">
							<input type="text" v-model="student_id" placeholder="请输入学号" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">姓名：</div>
						<div class="input">
							<input type="text" v-model="user_name" placeholder="请输入姓名" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">性别：</div>
						<div class="input">
							<div class="radius" 
								@click="change_gender(index)"
								v-for="(item,index) in genderList"
								:key="index"
								:class="(gender == (index+1))?'radius_on':''">{{item}}</div>
						</div>
					</div>
					<div class="item">
						<div class="label">学院：</div>
						<div class="input">
							<select v-model="college_id" @change="change_coll()">
								<option :value="item.college_id" v-for="(item,index) in college_list" :key="index">{{item.college_name}}</option>
							</select>
						</div>
					</div>

					<div class="item">
						<div class="label">专业：</div>
						<div class="input">
							<select v-model="major_id" @change="change_major()">
								<option :value="item.major_id" v-for="(item,index) in major_list" :key="index">{{item.major_name}}</option>
							</select>
						</div>
					</div>
					<div class="item">
						<div class="label">班级：</div>
						<div class="input">
							<select v-model="class_id">
								<option :value="item.class_id" v-for="(item,index) in class_list" :key="index">{{item.class_name}}</option>
							</select>
						</div>
					</div>
					<div class="item">
						<div class="label">联系电话：</div>
						<div class="input">
							<input type="text" v-model="phone" placeholder="请输入联系电话" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">监护人姓名：</div>
						<div class="input">
							<input type="text" v-model="guardian_name"  placeholder="请输入监护人姓名" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">监护人电话：</div>
						<div class="input">
							<input type="text"  v-model="guardian_phone" placeholder="请输入监护人电话" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">身份证号码：</div>
						<div class="input">
							<input type="text"  v-model="id_card" placeholder="请输入身份证号码" name="">
						</div>
					</div>
					<div class="btn">
						<button type="button" @click="add_student">确定</button>
						<button type="reset">重置</button>
					</div>
				</form>
			</div>
		</div>
		
	</div>

</template>
<script >
	const CESHI='&zy_test=1'
	const CESHI1='?zy_test=1'
	export default {
		name:'student_add',
		data(){
			return {
				genderList:['男','女'],
				student_id:'',
				user_name:"",
				gender:1,
				college_id:"",	
				major_id:"",
				class_id:"",
				phone:"",
				guardian_name:"",
				guardian_phone:"",
				id_card:'',
				class_list:[],
				 major_list:[]

				
			}
		},
		computed:{
		    
		    college_list(){
		      return this.$store.state.college_list
		    }
		},
		methods:{
			change_coll(){
				console.log(this.college_id)
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/major_api/show_list?college_id='+this.college_id+CESHI)
				.then((res)=>{
					console.log(res)
					this.major_list = res.data.data
				})
			},
			change_major(){
				console.log(this.college_id)
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/class_api/show_list?major_id='+this.major_id+CESHI)
				.then((res)=>{
					console.log(res)
					this.class_list = res.data.data
				})
			},
			change_gender(index){
				this.gender = (index+1)
			},
			add_student(){
				var that = this;
				console.log(that.user_name)
				console.log(that.gender)
				console.log(that.college_id)
				console.log(that.major_id)
				console.log(that.class_id)
				console.log(that.phone)
				console.log(that.guardian_name)
				console.log(that.guardian_phone)
				that.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/add'+CESHI1,{
					 params: {
		                student_id:that.student_id,
		                user_name:that.user_name,
						gender:that.gender,
						college_id:that.college_id,	
						major_id:that.major_id,
						class_id:that.class_id,
						phone:that.phone,
						guardian_name:that.guardian_name,
						guardian_phone:that.guardian_phone,
						id_card:that.id_card
		            }
				})
				.then(function (res) {
					console.log(res)
					if(res.data.code == 1){
						alert('添加成功')
						that.student_Info = {
							"student_id":"",
							"user_name":"",
							"phone":"",
							"guardian_name":"",
							"guardian_phone":"",
							"gender_name":"",
							"class_name":"",
							"college_name":"",
							"major_name":"",
							"counselor_name":""
						};

						that.$router.push('/index/student_list');
					}else{
						alert(res.data.msg)
					}
				 	
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