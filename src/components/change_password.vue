<template>
	<div id="content-right">
        <div class="right-title">
            广州航海学院学生考勤系统--修改密码
            <!-- <a href="javascript:void(0)" @click="go_back">返回</a> -->
        </div>
        <div class="right-content"> 
            <div class="form1">
                <form>
                    <div class="item">
                        <div class="label">账号：</div>
                        <div class="input">
                            <input type="text" v-model="account" placeholder="请输入账号" name="" readonly="readonly">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">旧密码：</div>
                        <div class="input">
                            <input type="password" v-model="old_password"  placeholder="请输入旧密码" name="">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">新密码：</div>
                        <div class="input">
                            <input type="password" v-model="new_password1"  placeholder="请输入新密码" name="">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">确认密码：</div>
                        <div class="input">
                            <input type="password" v-model="new_password2" placeholder="请输入确认密码" name="">
                        </div>
                    </div>
                    <div class="btn">
                        <button type="button" @click="change_pass">确定</button>
                        <button type="button" @click="reset">重置</button>
                    </div>
                </form>
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
                account:'',
                old_password:'',
                new_password1:'',
				new_password2:''
			}
		},
		created(){
			 let userInfo = JSON.parse(localStorage.getItem('userInfo'));
             this.account = userInfo.id
		},
		methods:{
            reset(){
                this.account = ''
                this.old_password = ''
                this.new_password1 = ''
                this.new_password2 = ''
            },
            go_back(){
                this. $router.back(-1)
            },
			change_pass(){
				var that = this;
                console.log( that.account)
                console.log( that.old_password)
                console.log( that.new_password1)
                console.log( that.new_password2)
				this.$axios.get('http://gzhh.gzziyu.com/index.php/home/password_api/change'+CESHI,{params: {
                        account: that.account,
                        old_password:that.old_password,
                       new_password1:that.new_password1,
                       new_password2:that.new_password2
                    }
                })
				.then(function (res) {
	                console.log(res);
	                if(res.data.code == 1){
	                  alert(res.data.msg+'，请重新登录')
                      this.reset()
                      localStorage.removeItem('userInfo');
                        this.$router.replace('/');
	                 
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
                            background:url(../../static/img/radius.png) no-repeat;
                            background-position:left center;
                        }
                        .radius_on{
                            background:url(../../static/img/radius_check.png) no-repeat;
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