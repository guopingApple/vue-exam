<template>
    <div style="margin-top:15px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline-message='blone'>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" class="textInput"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="classify">
                <el-select v-model="ruleForm.classify" placeholder="请选择">
                    <el-option label="总部" value="0"></el-option>
                    <el-option label="移动公司" value="1"></el-option>
                    <el-option label="联通公司" value="2"></el-option>
                </el-select>
            </el-form-item>                   
            <el-form-item label="状态" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择">
                    <el-option label="禁用" value='0'></el-option>
                    <el-option label="启用" value='1'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="ruleForm.remark" class="textInput"></el-input>
            </el-form-item>    
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
      var checkName = (rule, value, callback) => {
          let reg=/^[\w\u3E00-\u9FA5]+$/;
            if(!reg.test(value)){
                callback(new Error('请输入正确的角色名'));
            }
          callback();
      }  
      return {
        blone:true,
        ruleForm: {
          name: '',
          classify:'',
          status:'',
          remark:''
        },
        rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 50, message: '由字母、数字、下划线组成1-50位字符或25个汉字', trigger: 'blur' },
            { validator: checkName, trigger: 'blur' }
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
            this.axios.post(this.biz.serverUrl+'role/update',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
              console.log(res)
              if(res.data.code==200){             
                that.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                that.$router.push({path: '/roleManage'});
              }else{
                that.$message({
                    type: 'error',
                    message: '修改失败!'
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
      },
      detail(){
        let id=this.$route.query.id
        let param = qs.stringify({'id':id})
        let that=this
        this.axios.get(this.biz.serverUrl+'role/detail/'+id,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
          console.log(res)
          if(res.data.code==0){
            that.ruleForm.name=res.data.role.name;
            that.ruleForm.status=res.data.role.status+'';
            that.ruleForm.classify=res.data.role.classify+'';
            that.ruleForm.remark=res.data.role.remark;
          }
        }).catch(function (res) {
          console.log(res)
        })
      }
    }
  }
</script>