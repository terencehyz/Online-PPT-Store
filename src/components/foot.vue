<template>
  <div class="full">
    <el-row>
      <el-col :span="12" :offset="6" class="bheight">
        <div style="text-align: center; font-size: x-small; margin-top: 70px">
          <span>关于我们</span>
          <span class="mod_copyright_split">|</span>
          <span>联系我们</span>
          <span class="mod_copyright_split">|</span>
          <span>联系客服</span>
          <span class="mod_copyright_split">|</span>
          <span>友情链接</span>
          <span class="mod_copyright_split">|</span>
          <span>隐私政策</span>
          <span class="mod_copyright_split">|</span>
          <span>使用条款</span>
          <span class="mod_copyright_split">|</span>
          <span>加入我们</span>

        </div>
        <p style="font-size: x-small; text-align: center">Copyright &copy;2018 shop.hanyuzhou.com 版权所有</p>
      </el-col>
      <el-col :span="6" class="bheight">
        <h4>We Accept</h4>
        <img src="../assets/pay.png" style="width:70%;">
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .bheight {
    height: 100%;
  }

  .full {
    margin: 10px 0 20px 0;
  }

  .mod_copyright_split {
    margin: 0 8px;
    color: #ccc;
  }
</style>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      navTo() {
        alert("dddd");
        this.$router.push({path: '/AddProduct'});
      }
    }
  }
</script>
