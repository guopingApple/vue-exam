<template>
    <div>        
        <div class="p10">
            <!-- @selection-change="handleSelectionChange" -->
            <el-table :data="tableData" style="width: 100%" class="roleDate">
                <!-- <el-table-column
                    type="selection"
                    width="30">
                </el-table-column> -->
                <el-table-column label="" width="50">
                  <template scope="scope">
                    <el-radio :label='scope.$index' v-model="tableData.id" @change.native="handleSelectionChange(scope.$index)"></el-radio>
                  </template>
                </el-table-column>
                <el-table-column
                    type="index"
                    width="50"
                    >
                </el-table-column>
                <el-table-column
                    prop="role"
                    label="角色名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                    >
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
            <el-row class="pr10">
                <el-col :span="24" align="center">
                    <el-button type="primary" size="medium" @click="addRole()">确定</el-button>
                    <el-button type="primary" size="medium" @click="goback()">返回</el-button>
                </el-col>
            </el-row>
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
    }
    
    .popUpcontent{
        width:700px;
        background: #fff;
        height: auto;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: 0;
        margin: 0 auto;
        padding:10px;
    }
    .contentbox{
        width:100%;
    }
    .contentbox h2{
        font-size: 16px;
        border-bottom: 1px solid #ececec;
        padding-bottom: 5px;
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
    .el-table .el-button+.el-button,.el-button+.el-button{
        margin-left:0;
    }
</style>
<script>
 import $ from 'jquery' 
 import './role.css'
 var qs = require('qs')
 var axios = require('axios')
 export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        pageCount:0,
        multipleSelection:[],
        tableData:[]
      }
    },
    mounted(){
        this.list()
    },
    methods: {
      addRole() {
        let that=this
        let arr={}
        arr.roleId=this.tableData[this.multipleSelection].roleId
        console.log(this.tableData[this.multipleSelection])
        arr.id=this.tableData[this.multipleSelection].id
        let param = qs.stringify(arr)
        console.log(param)
        this.axios.post(this.biz.serverUrl+'user/edit',param,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
            console.log(res)
            if(res.data.code == '200'){         
                that.$message({
                    type: 'success',
                    message: '分配成功!'
                });
            }else{
                that.$message({
                    type: 'error',
                    message: '分配失败!'
                });
            }
        }).catch(function (res) {
            that.$message({
                type: 'error',
                message: '分配失败!'
            });
            console.log(res)
        }) 
      },
      goback(){
          history.go(-1)
      },
      handleSizeChange: function (size) {
        this.pageSize = size
        this.list()
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
        // console.log( this.currentPage,currentPage)
        this.list()
      },
      list:function(){
        let that = this
        let pages=qs.stringify({'page':this.currentPage,'rows':this.pageSize})
        this.axios.post(this.biz.serverUrl+'user/list', pages,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
          console.log(res)
          if(res.data.msg == 'success'){
              that.tableData=res.data.datas
              console.log(that.tableData)
            //   that.pageSize=res.data.fsp.pageSize      //每页的条数
              that.pageCount=res.data.fsp.pageCount      //页总数
              that.currentPage=res.data.fsp.page        //当前页
          }
        }).catch(function (res) {
          console.log(res)
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(val)
      } 
    }
    
  }
</script>