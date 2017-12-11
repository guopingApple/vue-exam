import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/'
import Hello from '@/components/Hello'
import axios from 'axios'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/login', component:require('../pages/login.vue'), meta: {title:'登录'}},
    {path: '', component:require('../pages/login.vue'), meta: {title:'登录'} },
    {path: '/', component:require('../pages/login.vue'), meta: {title:'登录'}},
    {path:'/main', component:require('../pages/main.vue'), meta: {title:'首页'},
      children: [
        // {path:'hello', alias:'/hello', component:require('../pages/hello.vue'), meta:{title:'欢迎',index:0}},
        // {path:'operate', alias:'/operate', component:require('../pages/operate.vue'), meta:{title:'运营数据',index:1}},
        // {path:'example', alias:'/example', component:require('../pages/example.vue'), meta:{title:'示例页面',index:1}},
        // {path:'userList', alias:'/userList', component:require('../pages/userList.vue'), meta:{title:'用户管理',index:2}},
        // {path:'userEdit', alias:'/userEdit', component:require('../pages/userEdit.vue'), meta:{title:'修改用户',index:2}},
        // {path:'userAdd', alias:'/userAdd', component:require('../pages/userAdd.vue'), meta:{title:'新增用户',index:2}},
        // {path:'userPw', alias:'/userPw', component:require('../pages/userPw.vue'), meta:{title:'修改密码',index:2}},
        // {path:'roleList', alias:'/roleList', component:require('../pages/roleList.vue'), meta:{title:'角色管理',index:3}},
        // {path:'roleEdit', alias:'/roleEdit', component:require('../pages/roleEdit.vue'), meta:{title:'修改角色',index:3}},
        // {path:'roleAdd', alias:'/roleAdd', component:require('../pages/roleAdd.vue'), meta:{title:'新增角色',index:3}},


        {path:'cntPaltformVV', alias:'/cntPaltformVV', component:require('../pages/report/cntPaltformVV.vue'), meta:{title:'排行榜',index:4}},
        {path:'cntZhiruyi', alias:'/cntZhiruyi', component:require('../pages/report/cntZhiruyi.vue'), meta:{title:'植入易',index:4}},
        {path:'cntVideoyi', alias:'/cntVideoyi', component:require('../pages/report/cntVideoyi.vue'), meta:{title:'video易',index:4}},


        {path:'ivviAdAdd', alias:'/ivviAdAdd', component:require('../pages/ivvi/ivviAdAdd.vue'), meta:{title:'新增ivvi物料',index:4}},
        {path:'ivviAdEdit', alias:'/ivviAdEdit', component:require('../pages/ivvi/ivviAdEdit.vue'), meta:{title:'修改ivvi物料',index:4}},
        {path:'ivviAdList', alias:'/ivviAdList', component:require('../pages/ivvi/ivviAdList.vue'), meta:{title:'ivvi物料列表',index:4}},

        {path:'ivviPlanAdd', alias:'/ivviPlanAdd', component:require('../pages/ivvi/ivviPlanAdd.vue'), meta:{title:'新增ivvi计划',index:4}},
        {path:'ivviPlanEdit', alias:'/ivviPlanEdit', component:require('../pages/ivvi/ivviPlanEdit.vue'), meta:{title:'修改ivvi计划',index:4}},
        {path:'ivviPlanList', alias:'/ivviPlanList', component:require('../pages/ivvi/ivviPlanList.vue'), meta:{title:'ivvi计划列表',index:4}},


        {path:'rolePermission', alias:'/rolePermission', component:require('../pages/rolePermission.vue'), meta:{title:'授权',index:2}},

        // Apple demo

        {path:'add', alias:'/add', component:require('../pages/test/add.vue'), meta:{title:'新增',index:4}},
        {path:'edit', alias:'/edit', component:require('../pages/test/edit.vue'), meta:{title:'编辑',index:4}},
        {path:'list', alias:'/list', component:require('../pages/test/list.vue'), meta:{title:'测试',index:4}},

        {path:'examList', alias:'/examList', component:require('../pages/exam/list.vue'), meta:{title:'试卷列表',index:4}},
        {path:'examAdd', alias:'/examAdd', component:require('../pages/exam/add.vue'), meta:{title:'新增考卷',index:4}},
        {path:'examEdit', alias:'/examEdit', component:require('../pages/exam/edit.vue'), meta:{title:'修改试卷',index:4}},
        {path:'examView', alias:'/examView', component:require('../pages/exam/view.vue'), meta:{title:'查看考卷',index:4}},
        {path:'examPublish', alias:'/examPublish', component:require('../pages/exam/publish.vue'), meta:{title:'试卷发放',index:4}},

        {path:'examResult', alias:'/examResult', component:require('../pages/exam/result.vue'), meta:{title:'考试结果',index:4}},
        {path:'examResultStat', alias:'/examResultStat', component:require('../pages/exam/resultStat.vue'), meta:{title:'考试结果统计',index:4}},
        {path:'examMarking', alias:'/examMarking', component:require('../pages/exam/marking.vue'), meta:{title:'阅卷',index:4}},
        {path:'examMarkResult', alias:'/examMarkResult', component:require('../pages/exam/markResult.vue'), meta:{title:'查看阅卷结果',index:4}},

        {path:'signinList', alias:'/signinList', component:require('../pages/signin/list.vue'), meta:{title:'在线签到',index:4}},
        {path:'signinResult', alias:'/signinResult', component:require('../pages/signin/result.vue'), meta:{title:'签到结果',index:4}},
        {path:'signinaddInfo', alias:'/signinaddInfo', component:require('../pages/signin/addInfo.vue'), meta:{title:'创建签到信息',index:4}},
        {path:'signinEdit', alias:'/signinEdit', component:require('../pages/signin/edit.vue'), meta:{title:'修改签到信息',index:4}},

        {path:'enrolList', alias:'/enrolList', component:require('../pages/enrol/list.vue'), meta:{title:'在线报名',index:4}},
        {path:'enrolAdd', alias:'/enrolAdd', component:require('../pages/enrol/add.vue'), meta:{title:'创建报名信息',index:4}},
        {path:'enrolResult', alias:'/enrolResult', component:require('../pages/enrol/result.vue'), meta:{title:'报名结果',index:4}},
        {path:'enrolEdit', alias:'/enrolEdit', component:require('../pages/enrol/edit.vue'), meta:{title:'修改报名信息',index:4}},

        {path:'surveyList', alias:'/surveyList', component:require('../pages/survey/list.vue'), meta:{title:'在线调研',index:4}},
        {path:'surveyAdd', alias:'/surveyAdd', component:require('../pages/survey/add.vue'), meta:{title:'新增调研',index:4}},
        {path:'surveyView', alias:'/surveyView', component:require('../pages/survey/view.vue'), meta:{title:'查看调研详情',index:4}},
        {path:'surveyResult', alias:'/surveyResult', component:require('../pages/survey/result.vue'), meta:{title:'调研结果',index:4}},

        // {path:'userManage', alias:'/userManage', component:require('../pages/systemManage/userManage.vue'), meta:{title:'用户管理',index:4}},
        // {path:'userManageAdd', alias:'/userManageAdd', component:require('../pages/systemManage/userAdd.vue'), meta:{title:'添加用户',index:4}},

        // {path:'roleManage', alias:'/roleManage', component:require('../pages/systemManage/roleManage.vue'), meta:{title:'角色管理',index:4}},
        // {path:'roleManageAdd', alias:'/roleManageAdd', component:require('../pages/systemManage/roleAdd.vue'), meta:{title:'添加用户',index:4}},

        // {path:'menuManage', alias:'/menuManage', component:require('../pages/systemManage/menuManage.vue'), meta:{title:'菜单管理',index:4}},

        {path:'companyManage', alias:'/companyManage', component:require('../pages/companyManage/company/list.vue'), meta:{title:'公司管理',index:4}},
        {path:'companyManageAdd', alias:'/companyManageAdd', component:require('../pages/companyManage/company/add.vue'), meta:{title:'添加公司管理',index:4}},
        {path:'companyManageEdit', alias:'/companyManageEdit', component:require('../pages/companyManage/company/edit.vue'), meta:{title:'修改公司管理',index:4}},
        {path:'staffManage', alias:'/staffManage', component:require('../pages/companyManage/staff/list.vue'), meta:{title:'员工管理',index:4}},
        {path:'staffAdd', alias:'/staffAdd', component:require('../pages/companyManage/staff/add.vue'), meta:{title:'添加员工信息',index:4}},
        {path:'staffEdit', alias:'/staffEdit', component:require('../pages/companyManage/staff/edit.vue'), meta:{title:'修改员工信息',index:4}},
        {path:'supplierManage', alias:'/supplierManage', component:require('../pages/companyManage/supplier/list.vue'), meta:{title:'供应商管理',index:4}},
        {path:'supplierAdd', alias:'/supplierAdd', component:require('../pages/companyManage/supplier/add.vue'), meta:{title:'添加供应商信息',index:4}},
        {path:'supplierEdit', alias:'/supplierEdit', component:require('../pages/companyManage/supplier/edit.vue'), meta:{title:'修改供应商信息',index:4}},


        {path:'userManage', alias:'/userManage', component:require('../pages/systemManage/user/list.vue'), meta:{title:'用户管理',index:4}},
        {path:'userManageAdd', alias:'/userManageAdd', component:require('../pages/systemManage/user/add.vue'), meta:{title:'添加用户',index:4}},
        {path:'userManageEdit', alias:'/userManageEdit', component:require('../pages/systemManage/user/edit.vue'), meta:{title:'修改用户',index:4}},
        {path:'userRoleManageEdit', alias:'/userRoleManageEdit', component:require('../pages/systemManage/user/role.vue'), meta:{title:'设置用户角色',index:4}},
        {path:'menuManage', alias:'/menuManage', component:require('../pages/systemManage/menu/list.vue'), meta:{title:'菜单管理',index:4}},
        {path:'menuAdd', alias:'/menuAdd', component:require('../pages/systemManage/menu/add.vue'), meta:{title:'添加菜单',index:4}},
        {path:'menuEdit', alias:'/menuEdit', component:require('../pages/systemManage/menu/edit.vue'), meta:{title:'修改菜单',index:4}},
        {path:'menuAddPot', alias:'/menuAddPot', component:require('../pages/systemManage/menu/pot.vue'), meta:{title:'添加权限',index:4}},
        {path:'roleManage', alias:'/roleManage', component:require('../pages/systemManage/role/list.vue'), meta:{title:'角色管理',index:4}},
        {path:'roleAdd', alias:'/roleAdd', component:require('../pages/systemManage/role/add.vue'), meta:{title:'添加角色',index:4}},
        {path:'roleEdit', alias:'/roleEdit', component:require('../pages/systemManage/role/edit.vue'), meta:{title:'修改角色',index:4}},
         {path:'rolePot', alias:'/rolePot', component:require('../pages/systemManage/role/pot.vue'), meta:{title:'分配权限',index:4}},
        
        // end
      ]

    }
  ]
});

// http request 拦截器
//axios.interceptors.request.use(
//  config => {
//    if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//      config.headers.Authorization = `token ${store.state.token}`;
//    }
//    return config;
//  },
//  err => {
//    return Promise.reject(err);
//  });


axios.interceptors.response.use(
  response => {
    // console.log(response)
    // return response;
  },
  error => {
    // console.log(error.response)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          //store.commit(types.LOGOUT);
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
          //console.log("401 lelele");
         // window.location.href = 'https://testcas.zhiruyi.cn:8443/cas/login?service=http://localhost:8080/shiro-cas'
      }
    }
     return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });
router.beforeEach((to, from, next)=>{

  //var userJson = sessionStorage.user;
  //debugger;
//重新转换为对象
//  try {
//   // var currentUser = JSON.parse(userJson);
//  }catch (e){
//    console.log(e);
//  }
  // console.log(router.app)
  if(router.app.$store.state.user.name){
    document.title = to.meta.title
    next()
  }else if(sessionStorage.user){
    document.title = to.meta.title
    next()
  }
  else {
    console.log("redirect login")
    if (to.path !== '/login') {
      next('/login')
    }else{
      next()
    }
  }
})
// 路由全局钩子
// router.beforeEach((to, from, next)=>{
//   router.app.$store.commit('setPageInf',{title:to.meta.title});
//   //document.title = to.meta.title
//   next()
// })


export default router;
