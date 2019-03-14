<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--新增教师
			<router-link to="/index/teacher_list">教师列表</router-link >
		</div>
		<div class="right-content">
			<div class="form1">
				<form @submit.prevent="submit">
					<div class="item">
						<div class="label">教师编号：</div>
						<div class="input">
							<input type="text" v-model="submit_form.teacher_id" placeholder="请输入教师编号" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">教师姓名：</div>
						<div class="input">
							<input type="text" v-model="submit_form.user_name" placeholder="请输入教师姓名" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">性别：</div>
						<div class="input">
							<div class="radius" 
								@click="change_gender(index)"
								v-for="(item,index) in genderList"
								:key="index"
								:class="(submit_form.gender == (index+1))?'radius_on':''">{{item}}</div>
						</div>
					</div>
					<div class="item">
						<div class="label">身份证号码：</div>
						<div class="input">
							<input type="text" v-model="submit_form.id_card" placeholder="请输入身份证号码" name="">
						</div>
					</div>
					<div class="item">
						<div class="label">所属学院：</div>
						<div class="input">
							<select v-model="submit_form.college_id">
	                            <option :value="item.college_id" v-for="item in college_list" :key="item.college_id">{{item.college_name}}</option>
	                        </select>
						</div>
					</div>
					<div class="item">
						<div class="label">职位：</div>
						<div class="input">
							<select v-model= "submit_form.teacher_position_id">
                                <option>不选择</option>
                                <option :value="item.id" v-for="item in teacher_position_id" :key="item.id">{{item.name}}</option>
                               
                            </select>
						</div>
					</div>

					
					<div class="btn">
						<button type="submit">确定</button>
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
		name:'teacher_add',
		data(){
			return {
				 teacher_position_id:[
                    {name:'学工部',id:1},
                    {name:'大队长',id:2},
                    {name:'辅导员',id:3},
                    {name:'学校领导',id:4}
                ],
				genderList:['男','女'],
				submit_form:{
					user_name:'',
					college_id:'',
					teacher_id:'',
					teacher_position_id:'',
					gender:1,
					id_card:''
					
				},
				type:true
			}
		},
		
		computed:{
		    class_list(){
		      return this.$store.state.class_list
		    },
		    college_list(){
		      return this.$store.state.college_list
		    }
		   

		},
		mounted(){
			if(this.$route.params.type == "edit"){
				this.type = false;
				console.log(this.type)
				var that = this;
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_api/info'+CESHI,{
					 	params:{
					 		teacher_id:that.$route.params.id
					 	}
					 })
					.then(function (res) {
						console.log(res)
						if(res.data.code == 1){
							that.submit_form.college_id = res.data.data.college_id
							that.submit_form.teacher_id = res.data.data.teacher_id
							that.submit_form.teacher_position_id = res.data.data.teacher_position_id
							that.submit_form.gender = res.data.data.gender
							that.submit_form.user_name = res.data.data.user_name
							that.submit_form.id_card = res.data.data.id_card
						}
					})
					.catch(function (err) {
		                console.log(err);
		            });
			}
		},
		methods:{
			change_gender(index){
				this.submit_form.gender = (index+1)

			},
			submit(){
				var that = this;
				console.log(this.submit_form)
				if(this.type){
					that.$axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_api/add'+CESHI,{
					 	params:that.submit_form})
					.then(function (res) {
						console.log(res)
						if(res.data.code == 1){
							alert('添加成功')
							that.$router.push( 'teacher_list')
						}else{
							alert(res.data.msg)
						}
					})
					.catch(function (err) {
		                console.log(err);
		            });
				}else{
					var form = that.submit_form;
					that.$axios.get('http://gzhh.gzziyu.com/index.php/home/teacher_api/edit'+CESHI,{
					 	params:form})
					.then(function (res) {
						console.log(res)
						if(res.data.code == 1){
							alert('编辑成功')
							that.$router.push( 'teacher_list')
						}
					})
					.catch(function (err) {
		                console.log(err);
		            });
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