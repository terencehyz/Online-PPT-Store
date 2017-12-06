<template>
  <el-menu class="el-menu-demo" mode="horizontal" :router="true">

    <el-menu-item index="/">主页</el-menu-item>

    <el-menu-item index="/cart">购物车</el-menu-item>

    <el-menu-item index="/purchased">仓库</el-menu-item>

    <el-menu-item index="/login" v-if="!logged">登陆</el-menu-item>

    <el-submenu index="" v-if="logged">
      <template slot="title">我的</template>
      <el-menu-item index="/login" @click.native="logout()">登出</el-menu-item>
      <el-menu-item index="/profile">个人中心</el-menu-item>
    </el-submenu>

  </el-menu>
</template>
<script>
  export default {
    data() {
      return {
        logged: false,
        username: '',
        credit: ''
      }
    },
    methods: {
      userState() {
        var _this = this;
        this.logged = localStorage.getItem('logged');
        if (this.logged == true) {
          _this.username = localStorage.getItem('nickName');
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
