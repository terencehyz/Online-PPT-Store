<template>
  <div>
    <elnav></elnav>
    <el-row class="bgcolor">
      <el-col :span="20" :offset="2" style="padding-bottom: 50px">
        <div>
          <h2><i class="fa fa-user-circle-o iconColor" aria-hidden="true"></i>&nbsp;个人中心</h2>
        </div>
        <el-row>
          <el-col :span="9">
            <el-card class="box-card bgimg">
              <el-row>
                <el-col :span="18">
                  <h4>{{User.nickName}}</h4>
                  <p><i class="fa fa-jpy" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;{{User.credit}}</p>
                  <p><i class="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;{{User.email}}</p>
                  <p><i class="fa fa-id-card-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;{{User.id}}</p>
                </el-col>
                <el-col :span="6"><el-button type="primary" plain @click="modifyData()">修改信息</el-button></el-col>
              </el-row>

            </el-card>
          </el-col>
          <el-col :span="14" :offset="1">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>充值</span>
              </div>
              <el-input placeholder="请输入内容" v-model="value">
                <template slot="append">元</template>
              </el-input>
              <el-button type="primary" style="float: right; margin: 20px 0 20px 0" @click="addCredit()">充值</el-button>
            </el-card>
          </el-col>
        </el-row>
        <h3 style="margin-top: 50px"><i class="fa fa-file-powerpoint-o iconColor" aria-hidden="true"></i>&nbsp;已购项目</h3>
        <el-tabs type="border-card">
          <el-tab-pane label="创意扁平">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Type==1">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="简约时尚">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Type==2">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="端庄大气">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Type==3">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="可爱温馨">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Type==4">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="iOS风格">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Type==5">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="清新活泼">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Type==6">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="多彩艳亮">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Type==7">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-tabs type="border-card" style="margin-top: 30px">
          <el-tab-pane label="总结报告">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Way==1">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="项目策划">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Way==2">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="产品推广">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Way==3">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="学术答辩">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Way==4">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="实用图表">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Way==5">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="个性简历">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Way==6">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="文化创意">
            <el-row :gutter="16">
              <el-col :span="8" v-for="(item,index) in ppts" :key="item.id" v-if="item.Way==7">
                <img v-bind:src="item.Thumbnail" class="image" @click="pptNav(item.id)">
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <foot></foot>
  </div>
</template>
<style>
  .image {
    width: 100%;
    display: block;
  }

  .bgcolor {
    background-color: #F7F7F7;
  }

  .bgimg {
    background-image: url("http://icon.qiantucdn.com/js/showfu/images/user-myself-bg.png");
    background-size: cover;
    color: white;
  }

  .iconColor {
    color: #409EFF
  }
</style>
<script>
  import elnav from './el-nav.vue'
  import Axios from 'axios'
  import foot from './foot.vue'

  export default {
    components: {
      elnav,
      foot
    },
    data() {
      return {
        value: '',
        User: {},
        ppts: []
      }
    },
    methods: {
      pptNav(pptId) {
        this.$router.push({path: '/ppt/' + pptId});
      },
      addCredit() {
        let _this = this;
        let url = '/api/addCredit';
        let params = new URLSearchParams();
        params.append('Uid', localStorage.getItem('userId'));
        params.append('Credit', _this.value);
        this.$http.post(url, params).then(function (res) {
          if (res.data.status == 1) {
            _this.$message({
              message: '充值成功！',
              type: 'success'
            });
            _this.getData();
          }
          else {
            _this.$message.error('充值失败，请稍后再试');
          }
        })
      },
      modifyData() {
        let _this = this;
        this.$prompt('请输入新昵称','昵称修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value})=> {
          const loading = _this.$loading({
            lock: true,
            text: '修改中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          let params = new URLSearchParams();
          params.append('Uid', localStorage.getItem('userId'));
          params.append('NickName', value);
          let url = 'api/modifyUser';
          _this.$http.post(url,params).then(function (res) {
            if (res.data.status == 1) {
              _this.getData();
              _this.$message({
                message: '修改成功！',
                type: 'success'
              });
            }
            loading.close();
          })
        })
      },
      getData() {
        let _this = this;
        let url = 'api/getUserInfo?Uid=' + localStorage.getItem('userId');
        this.$http.get(url).then(function (res) {
          if (res.data.status == 1) {
            _this.User = res.data.data;
          }
        });
        let url1 = '/api/getPurchase?Uid=' + localStorage.getItem('userId');
        this.$http.get(url1).then(function (res) {
          if (res.data.status == 1) {
            _this.ppts = res.data.data;
          }
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>
