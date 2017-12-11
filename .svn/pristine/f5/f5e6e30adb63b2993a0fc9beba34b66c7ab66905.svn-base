<template>
  <div id="login">
      <div class="box">
        <img src="../assets/login-title.png" class="login-title" alt="">
        <el-form :model="userForm" :rules="userRules" ref="userForm">
          <div class="center chinaMobile"><img src="../assets/chinaMobile.png" alt=""></div>
          <el-form-item label="" prop="userName">
            <el-input v-model="userForm.userName" placeholder="请输入登录名" @keyup.enter.native="submitForm('userForm')">
              <!-- <template slot="append">@zhiruyi.com</template> -->
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password" style="margin-bottom:30px;">
            <el-input type="password" v-model="userForm.password" placeholder="请输入密码" @keyup.enter.native="submitForm('userForm')">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <el-button type="primary" class="fr" @click="submitForm('userForm')">登录</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<style scoped>
#login{height: 100%; background: url(../assets/login.jpg) no-repeat;background-size: 100% 100%;}
#login .box{width: 720px;height: 470px;position: fixed;top: 50%;left: 50%;margin: -235px 0 0 -360px;}
.login-title{margin: 0 auto 26px;display:block;}
.chinaMobile{padding: 40px 0;}
.chinaMobile img{vertical-align: middle;}
  #login .el-form{
    width:400px;
    height: 360px;
    padding:0 100px; 
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -ms-border-radius: 10px;
    -moz-border-radius: 10px;
  }
  @media screen and (max-width:1366px) and (max-device-width:1366px){
    #login .box{
      -webkit-transform: scale(.75);
      -moz-transform: scale(.75);
      -ms-transform: scale(.75);
      transform: scale(.75);
    }
    .login-title{ width:80% }
  }
</style>
<script>
  var qs = require('qs')
  var axios = require('axios')
  export default {
    name: 'login',
    data: function () {
      return {
        checked: true,
        userForm: {
          userName: localStorage.userName,
          password: localStorage.password
        },
        userRules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    }, 
    mounted: function () {
      // console.log(sessionStorage.password)
      this.bodyListener = (e) => {
        if (e.keyCode === 13 && e.target === document.body){
          this.submitForm('userForm')
        }
      }
      document.body.addEventListener('keyup', this.bodyListener, false)
    },
    beforeDestroy() {
      document.body.removeEventListener('keyup', this.bodyListener)
    },
    methods: {
      submitForm(formName) {
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let that = this
            let param = qs.stringify(this.userForm)

            // console.log(that.userForm.userName)
            // console.log(that.userForm.password)
          
            this.axios.post(this.biz.serverUrl + 'rest/login', param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(function(res){
              // console.log(res);
              if (res.data.code == '200') {
                  that.userForm.userName = res.data.element.userName
                  
                  sessionStorage.setItem("userId",res.data.element.id) //  用户id
                  sessionStorage.setItem('user', res.data.element)
                  if (that.checked) {
                    that.$emit('userSignIn', that.userForm.userName,that.userForm.password)
                  }else{
                    that.$emit('userSignIn', that.userForm.userName,'')
                  }
                  that.$router.push({path: '/examList'})
              }else{
                that.$message.error('登录失败')
                return
              }
              // if (res.data.status === -1) {
              //   that.$message.error(res.data.msg)
              //   return
              // } else {
              //   that.userForm.userName = res.data.element.userName
              //   if (that.checked) {
              //     that.$emit('userSignIn', that.userForm.userName,that.userForm.password)
              //   }else{
              //     that.$emit('userSignIn', that.userForm.userName,'')
              //   }
              //   that.$router.push({path: '/examList'})
              // }
            }).catch(function (res) {
              alert(res)
              console.log(res)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        });
      },
      reset: function (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
