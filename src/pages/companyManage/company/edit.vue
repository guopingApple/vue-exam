<template>
    <div style="margin-top:15px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline-message='blone'>
            <el-form-item label="公司名称" prop="name">
                <el-input v-model="ruleForm.name" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="公司编码" prop="code">
                <el-input v-model="ruleForm.code" class="textInput"></el-input>
            </el-form-item>
            <!-- <el-form-item label="公司类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                    <el-option label="禁用" value="1"></el-option>
                    <el-option label="启用" value="2"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="联系人" prop="contactMan">
                <el-input v-model="ruleForm.contactMan" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话" prop="contactPhone">
                <el-input v-model="ruleForm.contactPhone" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="联系人邮箱" prop="email">
                <el-input v-model="ruleForm.email" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择">
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="启用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
                <el-input v-model="ruleForm.comment" class="textInput"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="goback()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
    .el-form-item{ margin-bottom:10px;}
    .el-input{
        width:50%;
    }
</style>
<script>
  import $ from 'jquery' 
  var qs = require('qs')
  var axios = require('axios')
  export default {
    data() {
      var checkCode = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入公司编码'));
        } else {
            let reg=/^[A-Za-z0-9]+$/;
              if(!reg.test(value)){
                  callback(new Error('请输入正确的公司编码'));
              }
            callback();
        }
      };
      var checkName = (rule, value, callback) => {
          let reg=/^[\w\u3E00-\u9FA5]+$/;
            if(!reg.test(value)){
                callback(new Error('请输入正确的公司名称'));
            }
          callback();
      }
      var checkContanct = (rule, value, callback) => {
          let reg=/^[\w\u3E00-\u9FA5]+$/;
            if(!reg.test(value)){
                callback(new Error('请输入正确的联系人'));
            }
          callback();
      }
      var checkPhone= (rule, value, callback) => {
        if (value === '') {
            callback();
        }else{        
          let reg=/^1(3|4|5|7|8)\d{9}$/;
            if(!reg.test(value)){
                callback(new Error('请输入正确的电话号码'));
            }
          callback();
        }
      };
      return {
        blone:true,
        ruleForm: {
          name: '',
          code:'',
          contactPhone:'',
          contactMan:'',
          email:'',
          // type:'',
          status:'',
          comment:''
        },
        rules: {
          name: [
            { required: true, message: '请填写公司名称', trigger: 'blur' },
            { min: 1, max: 40, message: '由字母、数字、下划线组成1-40位字符或20个汉字', trigger: 'blur' },
            { validator: checkName, trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请填写公司编码', trigger: 'blur' },
            { min: 4, max: 20, message: '由字母、数字、汉字组成1~20位字符', trigger: 'blur' }
          ],
          contactMan: [
            { required: true, message: '请填写联系人', trigger: 'blur' },
            { min: 1, max: 40, message: '由字母、数字、下划线组成1-40位字符或20个汉字', trigger: 'blur' },
            { validator: checkContanct, trigger: 'blur' }
          ],
          // type: [
          //   { required: true, message: '请选择公司类型', trigger: 'blur' }
          // ],
          contactPhone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请填写邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请填写正确的邮箱地址', trigger: 'blur'},
            { min: 1, max: 50, message: '1-50位字符组成', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ]
        }
      };
    },
    mounted(){
      this.detail()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let that = this
            this.ruleForm.id=this.$route.query.id
            let param = qs.stringify(this.ruleForm)
            console.log(param)
            this.axios.post(this.biz.serverUrl+'company/update',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
              console.log(res)
              if(res.data.code==200){             
                that.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                that.$router.push({path: '/companyManage'});
              }else{
                that.$message({
                    type: 'error',
                    message: '修改失败!'
                });
              }
            }).catch(function (res) {
              console.log(res)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goback(){
        history.go(-1)
      },
      detail(){
        let id=this.$route.query.id
        let param = qs.stringify({'id':id})
        let that=this
        this.axios.get(this.biz.serverUrl+'company/getCompanyById?id='+id,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
          console.log(res)
          if(res.data.code==200){
            that.ruleForm.name=res.data.element.name;
            that.ruleForm.code=res.data.element.code;
            that.ruleForm.contactPhone=res.data.element.contactPhone;
            that.ruleForm.contactMan=res.data.element.contactMan;
            that.ruleForm.email=res.data.element.email;
            // that.ruleForm.type=res.data.element.type;
            that.ruleForm.status=res.data.element.status+'';
            that.ruleForm.comment=res.data.element.comment;
          }
        }).catch(function (res) {
          console.log(res)
        })
      }
    }
  }
</script>