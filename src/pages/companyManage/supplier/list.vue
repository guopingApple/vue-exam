<template>
    <div>
        <el-form ref="form" :model="form" :rules='rules' inline class="pt15 pl20" label-width="120px">
            <el-form-item label="供应商名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="供应商编码" prop="code">
                <el-input v-model="form.code"></el-input>
            </el-form-item>           
            <el-form-item label="所属公司" prop="companyId">
                <el-select v-model="form.companyId" placeholder="请选择">
                    <el-option v-for="v in companys" :label="v.name" :value="v.id"></el-option>
                    <!-- <el-option label="山西以偶定" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>     
            <el-form-item label="状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="启用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">查询</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="pr10">
            <el-col :span="24" align="right">
                <el-button type="primary" size="medium" @click="addInfo()">添加+</el-button>
                <!-- <el-button type="primary" size="medium">批量导出Excel</el-button> -->
            </el-col>
        </el-row>
        <div class="p10">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="30">
                </el-table-column>
                <el-table-column
                    type="index"
                    width="50"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="供应商名称"
                    width="150"
                    >
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="供应商编码"
                    width="120"
                    >
                </el-table-column>
                <el-table-column
                    prop="companyName"
                    label="所属公司"
                    width="100"
                    >
                </el-table-column>
                <el-table-column
                    prop="status1"
                    label="状态"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="createUser"
                    label="录入人"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="录入时间"
                    width="170">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" size="mini">查看</el-button>
                        <el-button type="primary" size="mini" @click="setopen(scope.row,1)" v-if="scope.row.status==0">启用</el-button>
                        <el-button type="primary" size="mini" @click="setopen(scope.row,0)" v-if="scope.row.status==1">禁用</el-button>
                        <el-button type="primary" size="mini" @click="editInfo(scope.row.id)">修改</el-button>
                        <el-button type="danger" size="mini"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                :page-sizes="[10, 15]"
                layout="total, sizes, prev, pager, next, jumper"
                :pageCount="pageCount" style="margin:15px auto;text-align: center">
            </el-pagination>
        </div>
        <div class="popUp" ref="popUp">
            <div class="popUpcontent border-box">
                <el-button class='close' @click="close()">×</el-button>
                <div class="contentbox">
                    <h2>基本信息</h2>
                    <ul class="content">
                        <li>
                            <label>供应商名称:</label><span>{{detail.name}}</span>
                        </li>
                        <li>
                            <label>供应商编码:</label><span>{{detail.code}}</span>
                        </li>
                        <li>
                            <label>所属公司:</label><span>{{detail.companyName}}</span>
                        </li>
                        <li>
                            <label>联系人:</label><span>{{detail.contactMan}}</span>
                        </li>
                        <li>
                            <label>联系人电话:</label><span>{{detail.contactPhone}}</span>
                        </li>
                        <li>
                            <label>联系人邮箱:</label><span>{{detail.email}}</span>
                        </li>
                        <li>
                            <label>录入人:</label><span>{{detail.createUser}}</span>
                        </li>
                        <li>
                            <label>录入时间:</label><span>{{detail.createTime}}</span>
                        </li>
                        <li>
                            <label>最后修改人:</label><span>{{detail.updateUser}}</span>
                        </li>
                        <li>
                            <label>最后修改时间:</label><span>{{detail.updateTime}}</span>
                        </li>
                        <li>
                            <label>状态:</label><span>{{detail.status1}}</span>
                        </li>
                        <li>
                            <label>备注:</label><span>{{detail.comment}}</span>
                        </li>
                    </ul>
                    <div style="text-align:center;margin-top:10px;">
                        <el-button type="primary" @click="close()">关闭</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>    
<style scoped>
    .signinPeople{
        width:100%;
        display:inline-block;
        border: none;
        background: none;
    }
    .el-input{
        width:200px;
    }
    /* .el-form--inline .el-form-item{ margin-bottom:10px;} */
    .popUp,.deck{
        width:100%;
        height: 100%;
        background: rgba(0,0, 0, 0.5);
        position: fixed;
        left: 0;
        top:0;
        z-index: 2;
        display: none;
        overflow-y: auto;
    }
    
    .popUpcontent{
        width:700px;
        padding-bottom: 20px;
        background: #fff;
        height: auto;
        position: absolute;
        top: 100px; 
        left: 0;
        right: 0;
        margin: 0 auto;
        padding:15px;
        border-radius: 5px;
    }
    .contentbox{
        width:100%;
    }
    .contentbox h2{
        font-size: 16px;
        border-bottom: 1px solid #ececec;
        padding-bottom: 8px;
    }
    .content{
        overflow: hidden;
    }
    .content li{
        width: 100%;
        box-sizing: border-box;
        line-height: 40px;
    }
    .content li:after{
        display: table;
        content: "";
        clear: both;
    }
    .content label{
        width: 15%;
        float: left;
        text-align: right;
    }
    .content span{
        width: 85%;
        float: left;
        text-align: left;
        display:inline-block;
        padding:0 10px;
        box-sizing: border-box;
    }
    .close{
        border: none;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 24px;
        background: none;
        z-index: 999;
    }
</style>
<script>
 import $ from 'jquery' 
 import qs from 'qs'
 import axios from 'axios'
 export default {
    data() {
      return {
        form: {
          name: '',
          code:'',
          status: '',
          companyId:''
        },
        rules: {
          name: [
            { min: 1, max: 50, message: '由字母、数字、下划线组成1-50位字符', trigger: 'blur' }
          ],
          code: [
            { min: 1, max: 50, message: '由字母、数字、下划线组成1-50位字符', trigger: 'blur' }
          ],
          companyId: [
            { min: 1, max: 50, message: '由字母、数字、下划线组成1-50位字符', trigger: 'blur' }
          ]
        },
        currentPage: 1,
        pageSize: 10,
        pageCount:0,
        multipleSelection:[],
        tableData:[],
        detail:{},
        companys:[]
      }
    },
    mounted(){
        this.list()
        this.companyList()
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let that = this
            this.form.page=this.currentPage;
            this.form.rows=this.pageSize;
            let param = qs.stringify(this.form)
            console.log(param)
            this.axios.post(this.biz.serverUrl+'supplier/list',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
              console.log(res)
              if(res.data.code==200){         
                  that.tableData=res.data.datas
                //   that.pageSize=res.data.fsp.pageSize
                  that.pageCount=res.data.fsp.pageCount
                  that.currentPage=res.data.fsp.page
                  that.tableData.forEach(function(v,i){                   
                    let time=new Date(that.tableData[i].createTime)
                    // let time1=new Date(that.tableData[i].updateTime)
                    // console.log(that.getTimer(time))
                    that.tableData[i].createTime=that.getTimer(time)
                    // that.tableData[i].updateTime=that.getTimer(time1)
                    if(that.detail.updateTime){
                        let time1=new Date(that.detail.updateTime)
                        that.detail.updateTime=that.getTimer(time1)
                    }
                    if(v.status==1){
                        v.status1='启用'
                    }else if(v.status==0){
                        v.status1='禁用'
                    }
                })
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
        this.list()
      },
      handleSizeChange: function (size) {
        this.pageSize = size
        this.list()
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
        this.list()
      },
      handleClick:function(data){
            $(".popUp").show();
            let that=this
            this.axios.get(this.biz.serverUrl+'supplier/getSupplierById?id='+data.id,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
            console.log(res)
            if(res.data.code==200){
                that.detail=res.data.element
                if(that.detail.status==0){
                    that.detail.status1='禁用'
                }else if(that.detail.status==1){
                    that.detail.status1='启用'
                }
                let time=new Date(that.detail.createTime)
                // let time1=new Date(that.detail.updateTime)
                that.detail.createTime=that.getTimer(time)
                // that.detail.updateTime=that.getTimer(time1)
                if(that.detail.updateTime){
                    let time1=new Date(that.detail.updateTime)
                    that.detail.updateTime=that.getTimer(time1)
                }
            }
            }).catch(function (res) {
            console.log(res)
            })
      },
      addInfo:function(){
          this.$router.push({path: '/supplierAdd'});		
      },
      handleDelete:function(index,data){
        let that=this;
        this.$confirm('', '您确定要删除吗?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(() => {
            let param=qs.stringify({'id':data.id})           
            this.axios.post(this.biz.serverUrl+'supplier/delete',param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
                if(res.data.code==200){                    
                    that.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    that.list()
                }else{
                    that.$message({
                        type: 'error',
                        message: '删除失败!'
                    });
                }                
            }).catch(function (res) {
                console.log(res)
            })       
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
      },
      editInfo:function(id){
          this.$router.push({path: '/supplierEdit',query:{id:id}});	
      },
      setopen:function(data,state) {
        //   console.log(hot)
          let arr={};
          let that=this
        //   arr.type=data.type;
        //   arr.code=data.code;
        //   arr.name=data.name;
        //   arr.companyId=data.companyId;
          arr.id=data.id;
          if(state==0){
            this.$confirm('', '是否禁用?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                arr.status=0;
                let param=qs.stringify(arr)
                console.log(param)
                this.axios.post(this.biz.serverUrl+'supplier/update',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
                    console.log(res)
                    if(res.data.code==200){             
                        that.$message({
                            type: 'success',
                            message: '设置成功!'
                        });
                        that.list()
                    }else{
                        that.$message({
                            type: 'error',
                            message: '设置失败!'
                        });
                    }
                }).catch(function (res) {
                    console.log(res)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消设置'
                });
            });
          }else if(state==1){
              this.$confirm('', '是否启用?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                arr.status=1;
                let param=qs.stringify(arr)
                console.log(param)
                this.axios.post(this.biz.serverUrl+'supplier/update',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
                    console.log(res)
                    if(res.data.code==200){             
                        that.$message({
                            type: 'success',
                            message: '设置成功!'
                        });
                        that.list()
                    }else{
                        that.$message({
                            type: 'error',
                            message: '设置失败!'
                        });
                    }
                }).catch(function (res) {
                    console.log(res)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消设置'
                });
            });
          }
      },
      close:function(){
          $(".popUp").hide();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      companyList(){
        let that = this
        let pages=qs.stringify({'page':'1','rows':'1000'})
        this.axios.post(this.biz.serverUrl+'company/list', pages,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
          console.log(res)
          if(res.data.code == 200){
            //   that.companys=res.data.datas              
              res.data.datas.forEach(function(v,i){
                if(v.status==1){
                  that.companys.push(v)
                }
              }) 
          }
        }).catch(function (res) {
          console.log(res)
        })
      },
      list(){
          let that=this
          let pages=qs.stringify({'page':this.currentPage,'rows':this.pageSize})
            this.axios.post(this.biz.serverUrl+'supplier/list', pages,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
            console.log(res)
            if(res.data.code == 200){
                that.tableData=res.data.datas
                console.log(that.tableData)
                // that.pageSize=res.data.fsp.pageSize      //每页的条数
                that.pageCount=res.data.fsp.pageCount      //页总数
                that.currentPage=res.data.fsp.page        //当前页
                that.tableData.forEach(function(v,i){                   
                    let time=new Date(that.tableData[i].createTime)
                    // let time1=new Date(that.tableData[i].updateTime)
                    // console.log(that.getTimer(time))
                    that.tableData[i].createTime=that.getTimer(time)
                    // that.tableData[i].updateTime=that.getTimer(time1)
                    if(that.detail.updateTime){
                        let time1=new Date(that.detail.updateTime)
                        that.detail.updateTime=that.getTimer(time1)
                    }
                    if(v.status==1){
                        v.status1='启用'
                    }else if(v.status==0){
                        v.status1='禁用'
                    }
                })
            }
            }).catch(function (res) {
            console.log(res)
            })
      },
      excel(){
        console.log(this.multipleSelection)
        
        let that = this
        let param = qs.stringify(this.form)       
        if(this.multipleSelection.length==0){
            window.open(this.biz.serverUrl+'enrol/exportEnrolEmpl2Excel?name='+this.form.name+'&code='+this.form.code+'&startTime='+this.form.startTime+'&endTime='+this.form.endTime+'&company='+this.form.company+'&position='+this.form.position)
        }else{
            let ids=''
            this.multipleSelection.forEach(function(v,i){
                if(i==that.multipleSelection.length-1){
                    ids+=v.id
                }else{
                    ids+=v.id+','
                }
            })
            console.log(ids)
            window.open(this.biz.serverUrl+'enrol/exportEnrolEmpl2Excel?ids='+ ids )

        }
      }
    }
  }
</script>