<template>
    <div>
        <div class="bg">
        
        </div>
        <div class="login">
            <div class="img"><img src="static/img/login_bg_pc.png" alt=""></div>
            <div class="left">
                <div class="h2">广州航海学院学生考勤系统</div>
                <div class="form">
                    <form action="" @submit.prevent="get_form" >
                         <div class="radius_item">
                                <el-radio v-model="shenfen_num" :label="1">学生</el-radio>
                                <el-radio v-model="shenfen_num" :label="2">老师</el-radio>
                                <el-radio v-model="shenfen_num" :label="3">管理员</el-radio>
                          </div>
                       <!--  <div class="radius_item">
                            <div class="radius" :class="shenfen_num == (index+1)?'radius_on':''"
                                @click="qiehuan(index)"
                                 v-for="(item,index) in shenfen">{{item}}</div>
                        </div> -->
                        <div class="item">
                            <img src="static/img/user.png">
                            <input 
                                type="text" 
                                v-model="user" 
                                name="user" 
                                placeholder="请输入账号">
                        </div>
                        <div class="item">
                            <img src="static/img/password.png">
                            <input 
                                type="password" 
                                v-model="password" 
                                name="password"
                                placeholder="请输入密码">
                        </div>
                        <div class="button" type="submit"><button>登录</button></div>
                    </form>
                    
                </div>
            </div>
        </div> 
    </div>
    
</template>

<script>
 import store from '@/store/store'
 const CESHI='?zy_test=1'
export default {
  name: 'Login',
  data () {
    return {
        shenfen:['学生','老师','管理员'],
        shenfen_num:1,
        password:'',
        user:''

    }
    
  },
  methods:{
        qiehuan(index){
            this.shenfen_num = index+1;
           
        },
        get_form(){
            var that = this;
            this.$axios.get('http://gzhh.gzziyu.com/index.php/home/login_api/login'+CESHI,{
                 params: {
                account:that.user ,
                password:that.password ,
                type:that.shenfen_num
            }
            })
            .then(function (res) {
                console.log(res);
                if(res.data.code == 1){
                    var Info = {};
                    Info.username = res.data.data.name,
                    Info.usertype= that.shenfen_num,
                    Info.id = res.data.data.id;

                    localStorage.setItem('userInfo',JSON.stringify(Info));
                     store.commit('userInfo',Info)

                    that.$router.push('/index');
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.bg{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:url('../../static/img/login_bg.jpg') no-repeat;
    background-size:100% 100%;
    background-position:left top;
}
.login{
    position:fixed;
    top:50%;
    left:50%;
    width:990px;
    height:440px;
    margin:-280px 0 0 -495px;
    background: #fff;
    border:1px solid #1b82c4;
    border-radius: 5px;
    box-shadow:-5px 0px 5px #dfebf3,   /*左边阴影*/ 
               0px -5px 5px #dfebf3,  /*上边阴影*/ 
               5px 0px 5px #dfebf3,  /*右边阴影*/ 
               0px 5px 5px #dfebf3; /*下边阴影*/ 
    .img{
        width: 645px;
        height: 100%;
        float: left;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .left{
        width: 345px;
        height: 100%;
        float: left;
        .h2{
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #0a0a0a;
            line-height: 57px;
            border-bottom: 1px solid #333;
            margin-bottom: 40px;
        }
        .form{
            width:100%;
            margin:0 auto;
            .radius_item{
                width:300px;
                margin-bottom:40px;
                text-align:center;
                font-size: 0;
                .radius{
                    width:80px;
                    cursor:pointer;
                    display:inline-block;
                    font-size:16px;
                    color:#666666;
                    padding-left:25px;
                    box-sizing:border-box;
                    background:url('../../static/img/radius.png') no-repeat;
                    background-position:left center;
                    background-size:18px 18px;
                }
                .radius_on{
                    background:url('../../static/img/radius_check.png') no-repeat;
                    background-position:left center;
                    background-size:18px 18px;
                    color:#2d9adf;
                    font-weight:bold;
                }
            }
            .item{
                width:300px;
                height:40px;
                border-radius:5px;
                margin:0 auto 22px;
                border:1px solid #ededed;
                img{
                    width:20px;
                    float:left;
                    margin:10px;

                }
                input{
                    width:210px;
                    height:100%;
                    line-height:40px;
                    border:none;
                    float:left;
                    padding:0 10px;
                    background:none;
                    font-size:16px;
                }

            }
            .button{
                width:100%;
                margin:0 auto;
                margin-top:80px;
                text-align: center;
                button{
                    width:300px;
                    height:50px;
                    background:#2d9adf;
                    color:#fff;
                    font-size:18px;
                    border-radius:10px;
                    border:none;
                    display: inline-block;


                }
            }
        }
    }
}
</style>
