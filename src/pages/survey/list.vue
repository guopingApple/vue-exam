<template>
    <div>
        <el-form ref="form" :model="form" inline class="pt15 pl20">
            <el-form-item label="调研主题">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker
                    v-model="value7"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="未发布" value="toPublish"></el-option>
                    <el-option label="已发布" value="published"></el-option>
                    <el-option label="已关闭" value="closed"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建人">
                <el-input v-model="form.create"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="pr10">
            <el-col :span="24" align="right">
                <el-button type="primary" @click="goToAdd">创建培训调研信息</el-button>
                <el-button type="primary">批量导出Excel</el-button>
            </el-col>
        </el-row>
        <div class="p10">
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
                <el-table-column
                    prop="id"
                    label="序号"
                    width="60"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="调研主题"
                    width=""
                    >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="调研时段"
                    width=""
                    >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width=""
                    >
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="创建人"
                    width=""
                    >
                </el-table-column>
                <el-table-column
                    prop="peoper"
                    label="已调研人数"
                    width=""
                    >
                </el-table-column>

                
                <el-table-column
                    prop="operation"
                    label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button @click="view" type="primary" size="mini">查看</el-button>
                        <el-button type="primary" size="mini">发放</el-button>
                        <el-button type="primary" size="mini">修改</el-button>
                        <el-button type="danger" size="mini"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button type="primary" size="mini">查看二维码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length" style="margin:15px auto;text-align: center">
            </el-pagination>
        </div>
    </div>
</template>
<style>
 .el-form--inline .el-form-item{ margin-bottom:10px;}
</style>

<script>
  export default {
    data() {
      return {
          pickerOptions: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
            }]
        },
        value7: '',
        form: {
          name: '',
          create:'',
          region: ''
          
        },
        currentPage: 1,
        pageSize: 10,
        // tableData:[]
        tableData:[
            {
                id: '1',
                name: '测试条件2',
                score: '100分',
                time: '0分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '未发放',
                peoper: '1'
            },
            {
                id: '2',
                name: '新疆移动Office 办公操作实务培训测',
                score: '100分',
                time: '120分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '已关闭',
                peoper: '2'
            },
            {
                id: '3',
                name: '测试测试',
                score: '120分',
                time: '60分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '已发放',
                peoper: '3'
            },
            {
                id: '4',
                name: '测试条件2',
                score: '100分',
                time: '0分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '未发放',
                peoper: '4'
            },
            {
                id: '5',
                name: '新疆移动Office 办公操作实务培训测',
                score: '100分',
                time: '120分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '已关闭',
                peoper: '5'
            },
            {
                id: '6',
                name: '测试测试',
                score: '120分',
                time: '60分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '已发放',
                peoper: '6'
            }
        ]
      }
    },
    mounted: function () {
    //   this.list()
    //   http://192.168.1.32:8080/company/list
    },
    methods: {
      goToAdd() {
        this.$router.push({path: '/surveyAdd'})
      },
      view() {
          this.$router.push({path: '/surveyView'})
      },
      onSubmit() {
        console.log('submit!');
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      list: function () {
        let _this = this
        this.axios.post('http://192.168.1.32:8080/company/list', this.form,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
          console.log(res)
          _this.tableData = res.data.datas
          _this.form = res.data.fsp
        }).catch(function (res) {
          console.log(res)
        })
      },
      add: function () {
//        alert('add')
        this.$router.push({path: '/add'})
      },
      del: function (id) {
        var that = this
        this.axios.post(this.biz.serverUrl + '/ivvi/ivviAdDel', qs.stringify({id: id}), this.biz.urlencodedConfig).then(function (res) {
          if (res.data.status) {
            that.$notify.success({message: res.data.msg})
            that.list()
          } else {
            that.$notify.error({message: res.data.msg})
          }
        }).catch(function (res) {
          console.log(res)
        })
      },
      edit: function (id) {
        this.$router.push({path: '/edit?id=' + id})
      },
      handleSizeChange: function (size) {
        this.pageSize = size
//        console.log(size)
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
        console.log(currentPage)
      }
    }
  }
</script>
