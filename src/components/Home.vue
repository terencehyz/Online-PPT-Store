<template>
  <div>
    <elnav></elnav>
    <search></search>
    <elcarousel></elcarousel>
    <transition-group enter-active-class="animated zoomInRight" leave-active-class="animated zoomOutRight">
      <el-row :key="1">
        <el-col :span="20" :offset="2">
          <h2>
            <i class="fa fa-trophy" aria-hidden="true" style="color:#409EFF;"></i>&nbsp;主题选择
          </h2>
        </el-col>
        <el-col :span="20" :offset="2">
          <el-tag @click.native="wayNav(1)">总结报告</el-tag>
          <el-tag @click.native="wayNav(2)" type="success">项目策划</el-tag>
          <el-tag @click.native="wayNav(3)" type="info">产品推广</el-tag>
          <el-tag @click.native="wayNav(4)" type="warning">学术答辩</el-tag>
          <el-tag @click.native="wayNav(5)" type="danger">实用图表</el-tag>
          <el-tag @click.native="wayNav(6)">个性简历</el-tag>
          <el-tag @click.native="wayNav(7)" type="success">文化创意</el-tag>
        </el-col>
        <el-col :span="20" :offset="2">
          <h2><i class="fa fa-road" aria-hidden="true" style="color: #409EFF"></i>&nbsp;风格</h2>
        </el-col>
        <el-col :span="20" :offset="2" style="margin-bottom: 20px">
          <el-tag @click.native="typeNav(1)">创意扁平</el-tag>
          <el-tag @click.native="typeNav(2)" type="success">简约时尚</el-tag>
          <el-tag @click.native="typeNav(3)" type="info">端庄大气</el-tag>
          <el-tag @click.native="typeNav(4)" type="warning">可爱温馨</el-tag>
          <el-tag @click.native="typeNav(5)" type="danger">iOS风格</el-tag>
          <el-tag @click.native="typeNav(6)">清新活泼</el-tag>
          <el-tag @click.native="typeNav(7)" type="success">多彩艳亮</el-tag>
        </el-col>
      </el-row>
      <el-row :key="2" class="bgcolor">
        <el-col :span="20" :offset="2">
          <h2>
            <i class="fa fa-fire" aria-hidden="true" style="color: #409EFF"></i>&nbsp;热门模板
          </h2>
          <el-row :gutter="16">
            <el-col :span="8" v-for="(good,index) in goods" :key="good.id">
              <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 5px">
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
    </transition-group>
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
  import search from './search.vue'
  import elcarousel from './el-carousel.vue'
  import Axios from 'axios'
  import foot from './foot.vue'

  export default {
    components: {
      elnav,
      elcarousel,
      foot,
      search
    },
    data() {
      return {
        goods: []
      }
    },
    methods: {
      typeNav(id) {
        this.$router.push({path: '/type/' + id})
      },
      wayNav(id) {
        this.$router.push({path: '/way/' + id})
      },
      pptNav(pptId) {
        this.$router.push({path: '/ppt/' + pptId});
      },
      getData() {
        var _this = this;
        var url = 'api/getAll';
        this.$http.get(url).then(function (res) {
          var response = res.data;
          if (response.status == 1) {
            _this.goods = response.data;
          }
          else {

          }
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>
