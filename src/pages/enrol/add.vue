<template>
    <div style="margin-top:15px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" :inline-message='blone'>
            <el-form-item label="主题名称" prop="name">
                <el-input v-model="ruleForm.name" class="textInput"></el-input>
            </el-form-item>   
            <el-form-item label="报名时间" required>
                <el-col :span="6">
                <el-form-item prop="enrolStartDate" style="margin-bottom:0;">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.enrolStartDate" style="width: 100%;" format='yyyy-MM-dd HH:mm:ss' value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="6">
                <el-form-item prop="enrolEndDate" style="margin-bottom:0;">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.enrolEndDate" style="width: 100%;" format='yyyy-MM-dd HH:mm:ss' value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>    
            <el-form-item label="培训时间" required>
                <el-col :span="6">
                <el-form-item prop="trainStartDate" style="margin-bottom:0;">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.trainStartDate" style="width: 100%;" format='yyyy-MM-dd HH:mm:ss' value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="6">
                <el-form-item prop="trainEndDate" style="margin-bottom:0;">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.trainEndDate" style="width: 100%;" format='yyyy-MM-dd HH:mm:ss' value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>           
            <el-form-item label="培训地址" prop="enrolAddress">
                <el-input v-model="ruleForm.enrolAddress" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="封面" required prop="coverPicUrl">
                <template>
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-error='errors'
                        :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.coverPicUrl" :src="ruleForm.coverPicUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </template>
            </el-form-item>
            <!-- <el-form-item label="状态" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择">
                    <el-option label="未发布" value="0"></el-option>
                    <el-option label="已发布" value="1"></el-option>
                    <el-option label="已关闭" value="2"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="联系人" prop="contactMan">
                <el-input v-model="ruleForm.contactMan" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="contactPhone">
                <el-input v-model="ruleForm.contactPhone" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="报名条件" prop="enrolRequirement">
                <el-input type="textarea" v-model="ruleForm.enrolRequirement" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="courseDesc">
                <el-input type="textarea" v-model="ruleForm.courseDesc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="goback()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
    .el-form-item{ margin-bottom:10px;}
    .line{
        width: auto;
    }
    .el-input,.el-textarea{
        width:50%;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .grant{
        width:100%;
        padding:0 0 10px 25px;
        border-bottom:1px solid #ddd;
        font-size:16px;
    }
</style>
<script>
  import $ from 'jquery' 
  import qs from 'qs' 
  import axios from 'axios' 
  export default {
    data() {
      var checkName=(rule, value, callback) => {
          if (value === '') {
              callback(new Error('请输入主题名称'));
          }else{        
            let reg=/^[\w\u3E00-\u9FA5]+$/;
            if(!reg.test(value)){
              callback(new Error('请输入正确的主题名称'));
            }
            callback();
          }
      }
      var checkPhone= (rule, value, callback) => {
        if (value === '') {
            callback();
        }else{        
          let reg=/^1(3|4|5|7|8)\d{9}$/;
            if(!reg.test(value)){
                callback(new Error('请填写正确的电话号码'));
            }
          callback();
        }
      };
      return {
        blone:true,
        ruleForm: {
          name: '',
          status: 0,
          trainStartDate: '',
          trainEndDate: '',
          enrolStartDate:'',
          enrolEndDate:'',
          contactMan:'',
          contactPhone:'',
          enrolRequirement:'',
          courseDesc: '',
          coverPicUrl:'',
          enrolAddress:''
        },
        action:this.biz.serverUrl+'enrol/upload',
        imageUrl: '',
        rules: {
          name: [
            { required: true, validator: checkName, trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
          ],
        //   status: [
        //     { required: true, message: '请选择状态', trigger: 'blur' }
        //   ],
          trainStartDate: [
            { required: true, message: '请选择培训开始时间', trigger: 'blur' }
          ],
          trainEndDate: [
            { required: true, message: '请选择培训结束时间', trigger: 'blur' }
          ],
          enrolStartDate: [
            { required: true, message: '请选择报名开始时间', trigger: 'blur' }
          ],
          enrolEndDate: [
            { required: true, message: '请选择报名结束时间', trigger: 'blur' }
          ],
          contactMan: [
            { required: true, message: '请填写联系人', trigger: 'blur' },
            { min: 0, max: 40, message: '长度在 40 个字符之内', trigger: 'blur' }
          ],
          enrolAddress: [
            { required: true, message: '请填写培训地址', trigger: 'blur' },
            { min: 0, max: 40, message: '长度在 40 个字符之内', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, validator: checkPhone, trigger: 'blur' }
          ],
          enrolRequirement: [
            { required: true, message: '填写报名条件', trigger: 'blur' },
            { min: 0, max: 200, message: '长度在 200 个字符之内', trigger: 'blur' }
          ],
          courseDesc: [
            // { required: true, message: '请填写课程简介', trigger: 'blur' },
            { min: 0, max: 200, message: '长度在 200 个字符之内', trigger: 'blur' }
          ],
          coverPicUrl:[
              { required: true, message: '请上传封面'},
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.ruleForm.coverPicUrl=this.imageUrl
            let param = qs.stringify(this.ruleForm)
            this.axios.post(this.biz.serverUrl+'enrol/add',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
              console.log(res)
              if(res.data.code==200){             
                that.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                that.$router.push({path: '/enrolList'});
              }else{
                that.$message({
                    type: 'error',
                    message: '添加失败!'
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
      handleAvatarSuccess(res, file) {
        this.ruleForm.coverPicUrl = res.element.coverPicUrl
        console.log(res,file)
      },
      errors(err,file){
        console.log(err,file)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      }
    }
  }
</script>