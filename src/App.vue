<template>
  <div id="app">
      <router-view @userSignIn="userSignIn"></router-view>
  </div>
</template>
<style>
/*根节点初始化css 全局样式*/
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  html, body,#app {
    width:100% ;
    height: 100%;
  }
   body {
    font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "WenQuanYi Micro Hei", sans-serif;
    font-size: 14px;
    color: #444;
    line-height: 1;
    background-color: #f2f2f2;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after, q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 12px;
  }
  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
      -webkit-appearance: none !important;
      margin: 0; 
  }
  input[type="number"]{-moz-appearance:textfield;}

  .center{text-align: center;}
  .p10{padding: 10px;}
  .p20{padding: 20px;}
  .pr10{padding-right: 10px;}
  .p15{padding: 15px;}
  .pt15{padding-top: 15px;}
  .pl15{padding-left: 15px;}
  .pl20{padding-left: 20px;}
  .pt20{padding-top: 20px;}
  .mr10{margin-right: 10px;}
  .mr20{margin-right: 20px;}
  .mr30{margin-right: 30px;}
  .ml10{margin-left: 10px;}
  .ml15{margin-left: 15px;}
  .mb20{margin-bottom: 20px;}
  .fl{float: left;}
  .fr{float: right;}
  .gray-999{color: #999;}
  .pointer{cursor: pointer;}
  .relative{position: relative;}
  .el-table .el-button+.el-button{margin-left: 3px;}
  .paperSet .el-form-item__content .el-form-item__error{right: 0;left: inherit;}
  /* .Single-answer .el-form-item__content .el-form-item__error,.Multiple-answer .el-form-item__content .el-form-item__error{top: 22%;right: 13.5%;left: inherit;} */
  /* .fill-answer .el-form-item__content .el-form-item__error{top: 25%;right: 10px;left: inherit;z-index: 99} */
  .w_880{width: 880px;}
  #login .box .el-input__inner{height: 46px;-webkit-box-shadow: 0 0 0px 1000px white inset;box-shadow: 0 0 0px 1000px white inset;}
  #login .box .el-form-item{margin-bottom: 20px;}
  .el-tabs__content{overflow: auto;}
</style>

<script>
  export default {
    name: 'app',
    data: function () {
      return {
        userName: sessionStorage.userName,
        password: sessionStorage.password
      }
    },
    methods: {
      // 子组件(login)将用户名传过来
      userSignIn(userName,password){
        sessionStorage.userName = userName;
        sessionStorage.password = password;
        // console.log(this.userName) // admin
        // console.log(this.password) // 123456
      }
    }
  }
</script>
