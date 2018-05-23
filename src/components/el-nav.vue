<template>
  <el-menu class="el-menu-demo" mode="horizontal" :router="true">

    <el-menu-item index="/" v-if="!admin">主页</el-menu-item>

    <el-menu-item index="/verify" v-if="admin&&logged">审核</el-menu-item>

    <el-menu-item index="/cart" v-if="(!admin)&&logged">愿望清单</el-menu-item>

    <el-menu-item index="/purchased" v-if="(!admin)&&logged">仓库</el-menu-item>

    <el-menu-item index="/addProduct" v-if="logged">上传</el-menu-item>

    <el-menu-item index="/Uploaded" v-if="logged">我的上传</el-menu-item>

    <el-menu-item index="/login" v-if="!logged">登陆</el-menu-item>

    <el-submenu index="" v-if="(!admin)&&logged">
      <template slot="title">我的</template>
      <el-menu-item index="/login" @click.native="logout()">登出</el-menu-item>
      <el-menu-item index="/profile">个人中心</el-menu-item>
    </el-submenu>

    <el-menu-item index="/login" v-if="admin" @click.native="logout()">登出</el-menu-item>


  </el-menu>
</template>
<script>
  export default {
    data() {
      return {
        logged: false,
        username: '',
        credit: '',
        admin: false
      }
    },
    methods: {
      userState() {
        var _this = this;
        this.logged = localStorage.getItem('logged');
        if (this.logged == true) {
          _this.username = localStorage.getItem('nickName');
        }
        let ad = localStorage.getItem('userId');
        if (ad==1){
          _this.admin = true;
        }
        else{
          _this.admin = false;
        }
      },
      logout() {
        localStorage.clear();
      }
    },
    created() {
      this.userState();
    }
  }
</script>
