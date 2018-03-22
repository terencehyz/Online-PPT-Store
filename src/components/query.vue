<template>
  <div>
    <elnav></elnav>
    <search></search>
    <el-row :key="2" class="bgcolor">
      <el-col :span="20" :offset="2">
        <h2>
          <i class="fa fa-search" aria-hidden="true" style="color: #409EFF"></i>&nbsp;“{{$route.params.id }}”的搜索结果
        </h2>
        <el-row :gutter="16">
          <el-col :span="8" v-for="(good,index) in goods" :key="good.id">
            <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 25px">
              <img v-bind:src="good.Thumbnail" class="image" v-on:click="pptNav(good.id)">
              <div style="padding: 14px;">
                <span>{{good.Title}}</span>
                <div class="bottom clearfix">
                  <time class="time">
                    <i class="fa fa-jpy" aria-hidden="true"></i>
                    {{ good.value }}
                  </time>
                  <el-button type="text" class="button">更多</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <foot></foot>
  </div>
</template>
<style>
  .bgcolor {
    background-color: #F7F7F7
  }

  .time {
    font-size: 13px;
    color: #FA5555;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
<script>
  import elnav from './el-nav.vue'
  import Axios from 'axios'
  import foot from './foot.vue'
  import search from './search.vue'

  export default {
    data() {
      return {
        goods: [],
        w: ["总结报告", "项目策划", "产品推广", "学术答辩", "实用图表", "个性简历", "文化创意"]
      }
    },
    components: {
      elnav,
      foot,
      search
    },
    methods: {
      pptNav(pptId) {
        this.$router.push({path: '/ppt/' + pptId});
      },
      getData() {
        var _this = this;
        var url = 'api/Query?keyWord=' + this.$route.params.id;
        this.$http.get(url).then(function (res) {
          var response = res.data;
          if (response.status == 1) {
            _this.goods = response.data;
          }
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>
