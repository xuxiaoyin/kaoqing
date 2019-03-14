<template>
	<div id="content-right">
		<div class="right-title">
			广州航海学院学生考勤系统--个人信息
		</div>
		  <div class="edit-myself-info">
            <h1>个人信息： </h1>
            <ul>
                <li>学号：{{info.student_id}}</li>
                <li>学院：{{info.college_name}}</li>
                <li>班级：{{info.class_name}}</li>
                <li>姓名：{{info.user_name}}</li>
                <li>性别：{{info.gender_name}}</li>
                <li>专业：{{info.major_name}}</li>
                <li>联系电话：{{info.phone}}</li>
                <li>监护人姓名：{{info.guardian_name}}</li>
                <li>监护人联系电话：{{info.guardian_phone}}</li>
                <li>请假状态：{{info.leave_status_name}}</li>
                <li>累计请假时长：{{info.leave_total_day}}天</li>
                <li>辅导员：{{info.counselor_name}}</li>
            </ul>
        </div>
	</div>
</template>
<script >
    import store from '@/store/store'
    const CESHI='?zy_test=1'
	export default {
		name:'myself_Info',
		data(){
			return {
                info:{}
			}
		},
        created(){
            var that = this;
             this.$axios.get('http://gzhh.gzziyu.com/index.php/home/student_api/myinfo'+CESHI )
            .then(function (res) {
                console.log(res);
                if(res.data.code == 1){
                 that.info = res.data.data
                }else{
                   alert(res.data.msg)
                }

            })
            .catch(function (err) {
                console.log(err);
            });
        },
        methods:{

        }
	}
</script>
<style lang="scss">

</style>