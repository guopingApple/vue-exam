<template>
    <div style="margin-top:15px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline-message='blone'>
            <el-form-item label="菜单名称" prop="name">
                <el-input v-model="ruleForm.name" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="URL" prop="url">
                <el-input v-model="ruleForm.url" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="菜单顺序" prop="priority">
                <el-input type="age" v-model="ruleForm.priority" class="textInput"></el-input>
            </el-form-item>
            <!-- <el-form-item label="父级名称" prop="parentName">
                <el-input v-model="ruleForm.parentName" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="父级ID" prop="parentId">
                <el-input v-model="ruleForm.parentId" class="textInput"></el-input>
            </el-form-item> -->
            <el-form-item label="状态" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择">
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="启用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="ruleForm.remark" class="textInput"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
  import qs from 'qs'
  import axios from 'axios'
  export default {
    data() {
      var checkUrl = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入url'));
        } else {
            let reg=/^[a-zA-Z0-9#$%]+$/;
              if(!reg.test(value)){
                  callback(new Error('请输入正确的url'));
              }
            callback();
        }
      };
      var checkName = (rule, value, callback) => {
          let reg=/^[\w\u3E00-\u9FA5]+$/;
            if(!reg.test(value)){
                callback(new Error('请输入正确的角色名'));
            }
          callback();
      }
      var checkPrio = (rule, value, callback) => {
          // let reg=/^[\w\u3E00-\u9FA5]+$/;
            if(isNaN(Number(value))){
                callback(new Error('顺序必须为数字值'));
            }
          callback();
      }
      return {
        blone:true,
        ruleForm: {
          parentId: '',
          parentName:'',
          name:'',
          url:'',
          priority:'',
          remark:'',
          status:''
        },
        rules: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { min: 1, max: 50, message: '请输入1-50个由英文、数字、下划线或输入25汉字', trigger: 'blur' },
            { validator: checkName, trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'blur' }
          ],
          url:[//validator: checkCode,
            { required: true,  message: '请输入url', trigger: 'blur' },
            { min: 1, max: 50, message: '请输入格式1-50个由英文、数字、字符', trigger: 'blur' },
            { validator: checkUrl, trigger: 'blur' }
          ],
          priority:[
            { required: true, message: '请输入顺序', trigger: 'blur' },
            { min: 1, max: 2, message: '请输入格式为1-2位数字', trigger: 'blur' },
            { validator: checkPrio, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let that = this
            this.ruleForm.parentName=this.$route.query.parentName
            this.ruleForm.parentId=this.$route.query.parentId
            this.ruleForm.level=parseInt(this.$route.query.level)+1
            let param = qs.stringify(this.ruleForm)
            this.axios.post(this.biz.serverUrl+'resource/save',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
              console.log(res)
              if(res.data.code==200){             
                that.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                that.$router.push({path: '/menuManage'});
              }else{
                that.$message({
                    type: 'error',
                    message: '添加失败!'
                });
              }
              // _this.tableData = res.data.datas
              // _this.form = res.data.fsp
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
      }
    }
  }
</script>