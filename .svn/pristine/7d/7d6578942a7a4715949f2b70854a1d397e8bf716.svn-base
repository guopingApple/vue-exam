<template>
    <div>
        <el-form ref="form" :model="form" inline class="pt15 pl20">
            <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="员工编号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="所属单位">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="岗位名称">
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
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="pr10">
            <el-col :span="24" align="right">
                <el-button type="primary" @click="goToAdd">查看调研统计</el-button>
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
                    label="姓名"
                    width="270"
                    >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="员工编号"
                    width="100"
                    >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="所属单位"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="岗位名称"
                    width="100"
                    >
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="创建时间"
                    width=""
                    >
                </el-table-column>

                <el-table-column
                    prop="operation"
                    label="操作" width="270">
                    <template slot-scope="scope">
                        <el-button @click="dialogVisible = true" type="primary" size="mini">查看调研问卷详情</el-button>
                        <el-button type="primary" size="mini">单个导出Excel</el-button>
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
        <!-- 弹框 -->
        <el-dialog title="查看报名结果详情" :visible.sync="dialogVisible ">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>调研情况</span>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{'Q' + o + '测试大脑好使不[单选题] ww(必答) '}}
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>
<style>
 .el-form--inline .el-form-item{ margin-bottom:10px;}
</style>

<script>
  export default {
    data() {
      return {
          dialogVisible: false,
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
                operation: ''
            },
            {
                id: '2',
                name: '新疆移动Office 办公操作实务培训测',
                score: '100分',
                time: '120分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '已关闭',
                operation: ''
            },
            {
                id: '3',
                name: '测试测试',
                score: '120分',
                time: '60分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '已发放',
                operation: ''
            },
            {
                id: '4',
                name: '测试条件2',
                score: '100分',
                time: '0分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '未发放',
                operation: ''
            },
            {
                id: '5',
                name: '新疆移动Office 办公操作实务培训测',
                score: '100分',
                time: '120分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '已关闭',
                operation: ''
            },
            {
                id: '6',
                name: '测试测试',
                score: '120分',
                time: '60分钟',
                date: '2017-08-15 11:42:44',
                creat: 'superAdmin',
                state: '已发放',
                operation: ''
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
    // end
    }
  }
</script>
