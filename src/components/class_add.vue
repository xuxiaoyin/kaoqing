<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--新增班级
			<router-link to="/index/class_list">班级列表</router-link>
		</div>
		<div class="right-content">
			<div class="form1">
				<form @submit.prevent="add_class">
					<div class="item">
						<div class="label">班级名称：</div>
						<div class="input">
							<input type="text" v-model="class_Info.class_name" placeholder="请输入班级名称" name="">
						</div>
					</div>
					
					
					<div class="item">
						<div class="label">学院：</div>
						<div class="input">
							<select v-model="class_Info.college_id" @change="selcetCollege(class_Info.college_id)">
								<option :value="item.college_id" v-for="(item,index) in college_list" :key="index">{{item.college_name}}</option>
							</select>
						</div>
					</div>

					<div class="item">
						<div class="label">专业：</div>
						<div class="input">
							<select v-model="class_Info.major_id">
								<option :value="item.major_id" v-for="(item,index) in major_list" :key="index">{{item.major_name}}</option>
							</select>
						</div>
					</div>
					<!-- <div class="item">
						<div class="label">入学年份：</div>
						<div class="input">
							<select v-model="class_Info.enter_year">
								<option :value="item" v-for="(item,index) in year_list" :key="index">{{item}}</option>
							</select>
						</div>
					</div> -->
					<div class="item">
						<div class="label">辅导员：</div>
						<div class="input">
							<select v-model="class_Info.counselor_id">
								<option :value="item.teacher_id" v-for="(item,index) in counselor_list" :key="index">{{item.user_name}}</option>
							</select>
							
						</div>
					</div>
					<div class="btn">
						<button type="submit">确定</button>
						<button type="button" @click="reset">重置</button>
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
		name:'class_edit_add',
		data(){
			return {
				gender:['男','女'],
				class_Info:{
					"college_id":"",
					"major_id":"",
					"class_name":"",
					"enter_year":"",
					"counselor_id":""
				},
				type:"",
				major_list:[],
				counselor_list:[]
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
		    // major_list(){
		    //   return this.$store.state.major_list
		    // },
		    college_list(){
		      return this.$store.state.college_list
		    },
		    // counselor_list(){
		    // 	return this.$store.state.counselor_list
		    // },
		     year_list(){
		    	return this.$store.state.year_list
		    }
		},
		methods:{
			reset(){
				this.class_Info = {
					"college_id":"",
					"major_id":"",
					"class_name":"",
					"enter_year":"",
					"counselor_id":""
				}
			},
			selcetCollege(id){
				console.log('学院'+id)
				var that = this;
					that.$axios.get('http://gzhh.gzziyu.com/index.php/home/major_api/show_list_all'+CESHI,{
						 params: {
							 college_id:id
						 }
					})
					.then(function (res) {
						//console.info(res)
						if(res.data.code == 1){
							that.major_list=res.data.data
						}else{
							alert(res.data.msg)
						}
					 	
					})
					.catch(function (err) {
		                console.log(err);
								});
							
				
				that.$axios.get('http://gzhh.gzziyu.com//index.php/home/teacher_api/show_list_all'+CESHI,{
						 params: {
							 college_id:id
						 }
					})
					.then(function (res) {
						//console.info(res)
						if(res.data.code == 1){
							that.counselor_list=res.data.data
						}else{
							alert(res.data.msg)
						}
					 	
					})
					.catch(function (err) {
		                console.log(err);
								});
				
				
				

			},
			change_gender(index){
				this.student_Info.gender = (index+1)
			},
			add_class(){
				console.log(this.class_Info)
				var that = this;
					that.$axios.get('http://gzhh.gzziyu.com/index.php/home/class_api/add'+CESHI,{
						 params: that.class_Info
					})
					.then(function (res) {
						console.log(res)
						if(res.data.code == 1){
							alert('添加成功')
							that.$router.push('class_list')
							that.getinfo()
							that.changeData()
						}else{
							alert(res.data.msg)
						}
					 	
					})
					.catch(function (err) {
		                console.log(err);
		            });
			},
			getinfo(){
				var that = this;
				
				if(this.type == "edit"){
				console.log(this.type)
					this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/info'+CESHI,{
						 params: {
			                class_id: that.$route.params.id
			            }
					})
					.then(function (res) {
						console.log(res.data.data)
					 	that.class_Info = res.data.data
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