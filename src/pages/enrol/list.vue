<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" inline class="pt15 pl20" label-width="80px">
            <el-form-item label="培训主题" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>         
            <el-form-item label="培训状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="未发布" value="0"></el-option>
                    <el-option label="已发布" value="1"></el-option>
                    <el-option label="已关闭" value="2"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="创建人" prop="createUser">
                <el-input v-model="form.createUser"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-col :span="11">
                    <el-form-item prop="startTime">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.startTime" style="width: 100%;" format='yyyy-MM-dd HH:mm:ss' value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line center" :span="1">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="endTime">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.endTime" style="width: 100%;" format='yyyy-MM-dd HH:mm:ss' value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>          
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">查询</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="pr10">
            <el-col :span="24" align="right">
                <el-button type="primary" size="medium" @click="addInfo()">创建培训报名信息</el-button>
                <el-button type="primary" size="medium" @click="excel()">批量导出Excel</el-button>
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
                    label="培训主题"
                    width="120"
                    >
                </el-table-column>
                <el-table-column
                    prop="trainTime"
                    label="培训时间范围"
                    width="150"
                    >
                </el-table-column>
                <el-table-column
                    prop="enrolTime"
                    label="报名时间范围"
                    width="150"
                    >
                </el-table-column>
                <el-table-column
                    prop="status1"
                    label="状态"
                    width="60"
                    >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="90"
                    >
                </el-table-column>
                <el-table-column
                    prop="createUser"
                    label="创建人"
                    width="60"
                    >
                </el-table-column>
                <el-table-column
                    prop="enrolCount"
                    label="已报名人数"
                    width="80">
                    <template slot-scope="scope">                       
                        <div slot="reference" class="name-wrapper">
                            <el-button class='signinPeople' @click='toResult(scope.row.id)' size="mini">{{scope.row.enrolCount}}</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" size="mini">查看</el-button>
                        <el-button type="primary" size="mini" @click="setopen(scope.row,0)" v-if="scope.row.status==2">恢复</el-button>
                        <el-button type="primary" size="mini" @click="setopen(scope.row,1)" v-if="scope.row.status==0">发布</el-button>
                        <el-button type="primary" size="mini" @click="setopen(scope.row,2)" v-if="scope.row.status==1">关闭</el-button>
                        <el-button type="primary" size="mini" @click="editInfo(scope.row.id)">修改</el-button>
                        <!-- <el-button type="danger" size="mini"  @click="handleDelete(scope.$index, scope.row)">创建签到</el-button> -->
                        <el-button type="danger" size="mini" v-if="scope.row.status==0"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                    <h2>查看详情</h2>
                    <ul class="content">
                        <li>
                            <label>培训主题:</label><span>{{detail.name}}</span>
                        </li>
                        <li>
                            <label>培训时间:</label><span>{{detail.trainTime}}</span>
                        </li>
                        <li>
                            <label>报名时间:</label><span>{{detail.enrolTime}}</span>
                        </li>
                        <li>
                            <label>培训地址:</label><span>{{detail.enrolAddress}}</span>
                        </li>
                        <li>
                            <label>封面:</label><span><img :src="detail.coverPicUrl" alt="" style="width: 60%;"></span>
                        </li>
                        <li>
                            <label>报名条件:</label><span>{{detail.enrolRequirement}}</span>
                        </li>
                        <li>
                            <label>简介:</label><span>{{detail.courseDesc}}</span>
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
        display: inline-block;
        box-sizing: border-box;
        padding-left: 15px;
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
          status:'',
          startTime: '',
          endTime: '',
          createUser: ''
        },
        rules:{
          name: [
            { min: 0, max: 50, message: '长度在50个字符之内', trigger: 'blur' }
          ]
        },
        currentPage: 1,
        pageSize: 10,
        pageCount:0,
        multipleSelection:[],
        tableData:[],
        detail:{}
      }
    },
    mounted(){
        this.list()
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
            this.axios.post(this.biz.serverUrl+'enrol/list',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
              console.log(res)
              if(res.data.code==200){         
                  that.tableData=res.data.datas
                //   that.pageSize=res.data.fsp.pageSize
                  that.pageCount=res.data.fsp.pageCount
                  that.currentPage=res.data.fsp.page
                  that.tableData.forEach(function(v,i){                   
                    let time=new Date(that.tableData[i].createTime)
                    that.tableData[i].createTime=that.getTimer(time)
                    that.tableData[i].enrolTime=that.getTimer(new Date(that.tableData[i].enrolStartDate))+'~'+that.getTimer(new Date(that.tableData[i].enrolEndDate))
                    that.tableData[i].trainTime=that.getTimer(new Date(that.tableData[i].trainStartDate))+'~'+that.getTimer(new Date(that.tableData[i].trainEndDate))
                    if(v.status==1){
                        v.status1='已发布'
                    }else if(v.status==0){
                        v.status1='未发布'
                    }else if(v.status==2){
                        v.status1='已关闭'
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
          $("body").css("overflow-y","hidden")
          let that=this
            this.axios.get(this.biz.serverUrl+'enrol/getEnrolById?id='+data.id,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
            console.log(res)
            if(res.data.code==200){
                that.detail=res.data.element;
                if(that.detail.status==1){
                    that.detail.status1='已发布'
                }else if(that.detail.status==0){
                    that.detail.status1='未发布'
                }else if(that.detail.status==2){
                    that.detail.status1='已关闭'
                }
                that.detail.enrolTime=that.getTimer(new Date(that.detail.enrolStartDate))+'~'+that.getTimer(new Date(that.detail.enrolEndDate))
                that.detail.trainTime=that.getTimer(new Date(that.detail.trainStartDate))+'~'+that.getTimer(new Date(that.detail.trainEndDate))
            }
            }).catch(function (res) {
            console.log(res)
            })
          
      },
      toResult:function(id){
          this.$router.push({path: '/enrolResult',query:{id:id}});		
      },
      addInfo:function(){
          this.$router.push({path: '/enrolAdd'});		
      },
      handleDelete:function(index,data){
        let that=this
        this.$confirm('', '您确定要删除吗?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(() => {
            if(data.enrolCount>0){
                that.$message({
                    type: 'error',
                    message: '已有人报名，删除失败!'
                });
            }else{
                let param=qs.stringify({'id':data.id})           
                this.axios.post(this.biz.serverUrl+'enrol/delete',param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
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
            }                       
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });      
      },
      editInfo:function(id){
          this.$router.push({path: '/enrolEdit',query:{id:id}});	
      },
      setopen:function(data,state) {
          let arr={};
          let that=this
        //   arr.name=data.name;
        //   arr.trainStartDate=data.trainStartDate;
        //   arr.trainEndDate=data.trainEndDate;
        //   arr.enrolStartDate=data.enrolStartDate;
        //   arr.enrolEndDate=data.enrolEndDate;
        //   arr.status=data.status
        //   arr.contactPhone=data.contactPhone
        //   arr.enrolRequirement=data.enrolRequirement
        //   arr.courseDesc=data.courseDesc
        //   arr.coverPicUrl=data.coverPicUrl
          arr.id=data.id;
          if(state==1){
            this.$confirm('', '是否发布?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                arr.status=1;
                let param=qs.stringify(arr)
                console.log(param)
                this.axios.post(this.biz.serverUrl+'enrol/update',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
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
          }else if(state==2){
              this.$confirm('', '是否关闭?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                arr.status=2;
                let param=qs.stringify(arr)
                console.log(param)
                this.axios.post(this.biz.serverUrl+'enrol/update',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
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
          }else if(state==0){
              this.$confirm('', '是否恢复?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                arr.status=0;
                let param=qs.stringify(arr)
                console.log(param)
                this.axios.post(this.biz.serverUrl+'enrol/update',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
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
          $("body").css("overflow-y","auto")
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      list(){
        let that = this
        let pages=qs.stringify({'page':this.currentPage,'rows':this.pageSize})
        this.axios.post(this.biz.serverUrl+'enrol/list', pages,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
          console.log(res)
          if(res.data.code == 200){
              that.tableData=res.data.datas
            //   that.pageSize=res.data.fsp.pageSize      //每页的条数
              that.pageCount=res.data.fsp.pageCount      //页总数
              that.currentPage=res.data.fsp.page        //当前页
              that.tableData.forEach(function(v,i){                   
                let time=new Date(that.tableData[i].createTime)
                that.tableData[i].createTime=that.getTimer(time)
                that.tableData[i].enrolTime=that.getTimer(new Date(that.tableData[i].enrolStartDate))+'~'+that.getTimer(new Date(that.tableData[i].enrolEndDate))
                that.tableData[i].trainTime=that.getTimer(new Date(that.tableData[i].trainStartDate))+'~'+that.getTimer(new Date(that.tableData[i].trainEndDate))
                if(v.status==1){
                    v.status1='已发布'
                }else if(v.status==0){
                    v.status1='未发布'
                }else if(v.status==2){
                    v.status1='已关闭'
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
            window.open(this.biz.serverUrl+'enrol/exportEnrol2Excel?name='+this.form.name+'&status='+this.form.status+'&startTime='+this.form.startTime+'&endTime='+this.form.endTime+'&createUser='+this.form.createUser)
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
            window.open(this.biz.serverUrl+'enrol/exportEnrol2Excel?ids='+ ids )

        }
      }
    }
  }
</script>