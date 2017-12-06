<template>
  <div>
    <div class="block">
      <el-carousel height="">
        <el-carousel-item v-for="item in carousel_img" :key="item">
          <!--<h3>{{ item }}</h3>-->
          <img v-bind:src="item" style="width: 100%">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
  export default {
    data() {
      return {
        carousel_img: ["http://pic.qiantucdn.com/images/banner/5a1f614d9c0bb.jpg",
          "http://pic.qiantucdn.com/images/banner/5a1e53cdecd5c.jpg",
          "http://pic.qiantucdn.com/images/banner/5a20b1d941322.jpg",
          "http://pic.qiantucdn.com/images/banner/5a1e46585a874.jpg"
        ],
        imgW: window.innerWidth,
        imgH: 0
      }
    }
  }
</script>
