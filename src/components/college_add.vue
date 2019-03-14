<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--新增学院
			<router-link to="/index/college_list">学院列表</router-link>
		</div>
		<div class="right-content">
			<div class="form1">
				<form @submit.prevent="submit">
					<div class="item">
						<div class="label">学院名称：</div>
						<div class="input">
							<input type="text" v-model="submit_form.college_name" placeholder="请输入学院名称" name="">
						</div>
					</div>
					
					
					<div class="item">
						<div class="label">备注：</div>
						<div class="input">
							
							<textarea v-model="submit_form.remark" placeholder="请输入备注"></textarea>
						</div>
					</div>


					
					<div class="btn">
						<button type="submit">确定</button>
						<button>重置</button>
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
				submit_form:{
					college_name:'',
					remark:'',
					
					
				},
				type:true
			}
		},
		
		computed:{
		    class_list(){
		      return this.$store.state.class_list
		    },
		    chief_list(){

		      return this.$store.state.chief_list
		    },
		    college_list(){
		      return this.$store.state.college_list
		    },
		    ministry_list(){
		    	return this.$store.state.college_list
		    },

		},
		mounted(){
			if(this.$route.params.type == "edit"){
				this.type = false;
				console.log(this.type)
				var that = this;
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/college_api/info'+CESHI,{
					 	params:{
							 college_id:that.$route.params.id,
					 	}
					 })
					.then(function (res) {
						console.log(res)
						if(res.data.code == 1){
							that.submit_form.college_name = res.data.data.college_name
							that.submit_form.remark = res.data.data.remark
							
						}
					})
					.catch(function (err) {
		                console.log(err);
		            });
			}
		},
		methods:{
			submit(){
				var that = this;
				console.log(this.submit_form)
				if(this.type){
					that.$axios.get('http://gzhh.gzziyu.com/index.php/home/college_api/add'+CESHI,{
					 	params:that.submit_form})
					.then(function (res) {
						console.log(res)
						if(res.data.code == 1){
							alert('添加成功')
							that.$router.push( 'college_list')
						}
					})
					.catch(function (err) {
		                console.log(err);
		            });
				}else{
					var form = that.submit_form;
					form.college_id = this.$route.params.id;
					that.$axios.get('http://gzhh.gzziyu.com/index.php/home/college_api/edit'+CESHI,{
					 	params:form})
					.then(function (res) {
						console.log(res)
						if(res.data.code == 1){
							alert('编辑成功')
							that.$router.push( 'college_list')
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