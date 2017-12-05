<template>
    <div>        
        <div id="tree">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" highlight-current default-expand-all show-checkbox node-key="id" ref="tree"></el-tree>         
        </div>
            <el-row class="pr10">
                <el-col :span="24" align="center">
                    <el-button type="primary" size="medium" @click="addPot()">确定</el-button>
                    <el-button type="primary" size="medium" @click="goback()">返回</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>    
<style scoped>
.signinPeople {
  width: 100%;
  display: inline-block;
  border: none;
  background: none;
}
.el-input {
  width: 200px;
}
/* .el-form--inline .el-form-item{ margin-bottom:10px;} */
.popUp,
.deck {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  display: none;
}

.popUpcontent {
  width: 700px;
  background: #fff;
  height: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 10px;
}
.contentbox {
  width: 100%;
}
.contentbox h2 {
  font-size: 16px;
  border-bottom: 1px solid #ececec;
  padding-bottom: 5px;
}
.content {
  overflow: hidden;
}
.content li {
  width: 100%;
  box-sizing: border-box;
  line-height: 40px;
}
.content li:after {
  display: table;
  content: "";
  clear: both;
}
.content label {
  width: 15%;
  float: left;
  text-align: right;
}
.content span {
  width: 85%;
  float: left;
  text-align: left;
  display: inline-block;
  padding: 0 10px;
  box-sizing: border-box;
}
.close {
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 24px;
  background: none;
  z-index: 999;
}
.el-table .el-button + .el-button,
.el-button + .el-button {
  margin-left: 0;
}
</style>
<script>
import $ from "jquery";
var qs = require("qs");
var axios = require("axios");
export default {
  data() {
    return {
      highlight: true,
      all: true,
      show: false,
      showadd: false,
      showdele: false,
      shows: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    addPot: function() {
      let that=this;
      let id=this.$route.query.id
      let param=qs.stringify({'roleId':id,'ids':this.$refs.tree.getCheckedKeys().join(',')})
      this.axios
        .post(this.biz.serverUrl + "permission/allot",param, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(function(res) {
          console.log(res);
          if (res.data.code == 200) {
            that.$message({
                type: 'success',
                message: '分配权限成功!'
            });
            that.$router.push({ path: "/roleManage" });
          }else{
            that.$message({
                type: 'error',
                message: '分配权限成功!'
            });
          }
        })
        .catch(function(res) {
          console.log(res);
        });     
    },
    editInfo: function(id) {
      this.$router.push({ path: "/menuEdit", query: { id: id } });
    },
    handleNodeClick(data) {
      console.log(data)
      this.getCheckedNodes()
      this.getCheckedKeys()
      if (data.hasOwnProperty("children")) {
        this.showadd = true;
        this.showdele = true;
        this.show = false;
      } else {
        this.show = true;
        this.showadd = false;
        this.showdele = true;
        this.shows = true;
      }
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCurrentKey());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    list() {
      let that = this;
	  let param=qs.stringify({})
      this.axios
        .post(this.biz.serverUrl + "permission/getPermissionTree",param, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(function(res) {
          console.log(res);
          if (res.data.code == 200) {
            that.data=res.data.datas
          }
        })
        .catch(function(res) {
          console.log(res);
        });
    }
  }
};
</script>