<template>
  <div>
      <div class="viewExam">
            <h1>{{ paper.name }}</h1>
            <el-form  label-width="80px">
                <h6 class="mb20">
                    <span>姓名：{{ answerResult.employeeName }}</span>
                    <span style="padding:0 50px;">工号：{{ answerResult.employeeId }}</span>
                    <span>考试分数：{{ answerResult.totalScores }} 分</span>
                </h6>
                <div v-for="(item,index) in questionList">
                    <dl v-if="item.questionType == 1">
                        <dt>{{ index + 1 }}.{{item.question}}<span class="pl15">单选题 {{ item.score }}分</span><el-button type="success" round class="fr">得 {{ answerDetailList[index].score }} 分</el-button></dt>
                        <dd v-for="(item2,innerIndex) in JSON.parse(item.answers)">
                            {{ String.fromCharCode(64 + parseInt( innerIndex + 1 )) }} . {{ item2.value }}
                        </dd>
                        <el-alert
                            title="正确答案："
                            type="success" :closable="false">{{ item.correctAnswer }}
                        </el-alert>
                        <el-alert
                            title="学员答案："
                            type="success" :closable="false">{{ answerDetailList[index].answer }}
                        </el-alert>
                    </dl>
                    <dl v-if="item.questionType == 2">
                        <dt>{{ index + 1 }}.{{item.question}}<span class="pl15">多选题 {{ item.score }}分</span><el-button type="success" round class="fr">得  {{ answerDetailList[index].score }} 分</el-button></dt>
                        <dd v-for="(item2,innerIndex) in JSON.parse(item.answers)">
                            {{ String.fromCharCode(64 + parseInt( innerIndex + 1 )) }} . {{ item2.value }}
                        </dd>
                        <el-alert
                            title="正确答案："
                            type="success" :closable="false">{{ item.correctAnswer }}
                        </el-alert>
                        <el-alert
                            title="学员答案："
                            type="success" :closable="false">{{ answerDetailList[index].answer }}
                        </el-alert>
                    </dl>
                    <dl v-if="item.questionType == 3">
                        <dt>{{ index + 1 }}.{{item.question}}<span class="pl15">单选题 {{ item.score }}分</span><el-button type="success" round class="fr">得 {{ answerDetailList[index].score }} 分</el-button></dt>
                        <dd>
                            A. 对   B.错
                        </dd>
                        <el-alert
                            title="正确答案："
                            type="success" :closable="false">{{ item.correctAnswer }}
                        </el-alert>
                        <el-alert
                            title="学员答案："
                            type="success" :closable="false">{{ answerDetailList[index].answer }}
                        </el-alert>
                    </dl>
                    <dl v-if="item.questionType == 4">
                        <dt>{{ index + 1 }}.{{item.question}}
                            <span class="pl15">填空题</span>
                            <span  v-for="(item2,innerIndex) in JSON.parse(item.answers)">
                                    {{ item2.score }}分
                            </span>
                            <el-button type="success" round class="fr">得 {{ answerDetailList[index].score }} 分</el-button></dt>
                        <el-alert
                            title="正确答案："
                            type="success" :closable="false">{{ item.correctAnswer }}
                        </el-alert>
                        <el-alert
                            title="学员答案："
                            type="success" :closable="false">{{ answerDetailList[index].answer }}
                        </el-alert>
                    </dl>
                    <dl v-if="item.questionType == 5">
                        <dt>{{ index + 1 }}.{{item.question}}<span class="pl15">主观题 {{ item.score }}分</span>
                        <el-button type="success" round class="fr">得 {{ answerDetailList[index].score }} 分</el-button></dt>
                        <el-alert
                            title="参考答案："
                            type="success" :closable="false">{{ item.answers }}
                        </el-alert>
                        <el-alert
                            title="学员答案："
                            type="success" :closable="false">{{ answerDetailList[index].answer }}
                        </el-alert>
                    </dl>
                </div>
                <div class="center p10"><el-button @click="close()">关闭</el-button></div>
            </el-form>
        </div>
  </div>
</template>
<style scoped>
    .viewExam h1{text-align: center;line-height:70px;}
    .viewExam h6{text-align: center;}
    .viewExam dl{padding: 15px;}
    .viewExam dl dt{padding-bottom: 20px;}
    .viewExam dl dd{line-height: 22px;padding-left: 20px;}
</style>
<script>
    let qs = require('qs')
    let axios = require('axios')
export default {
    data() {
      return {
          oid: this.$route.query.id,
          paper:{
              name: ''
          },
          answerResult:{
              employeeName:'',
              employeeId:'',
              totalScores: ''
          },
          questionList:[],
          answerDetailList:[]
        }
    },
    mounted: function () {
      this.findById(this.oid)
    },
    methods: {
        findById(id){
            console.log( id )
            let that = this
            this.axios.post(this.biz.serverUrl+'/exam/queryexamresult/'+ id,this.biz.urlencodedConfig )
            .then(function (res) { 
                if(res.status == 200){      
                    console.log(res)

                    that.paper = res.data.paper
                    that.answerResult = res.data.answerResult
                    that.questionList = res.data.questionList
                    that.answerDetailList = res.data.answerDetailList

                    for (var i = 0; i < that.questionList.length; i++) {
                        var element = that.questionList[i];
                        if (element.questionType == '4') {// 填空题
                            let substr = "（？）"
                            let newstr = ' ___ '
                            if (that.isContains(element.question, substr)) {
                                element.question = element.question.replace(/（？）/g, newstr)
                                // console.log(element.question)
                            }
                        }
                    }
                    
                }
            }).catch(function (res) {
                console.log(res)
            })
        },
        // 填空题（？）
        isContains(str, substr) {
            return new RegExp(substr).test(str)
        },
        close() {
            this.$router.push({path: '/examResult'})
        }
    }
}
</script>
