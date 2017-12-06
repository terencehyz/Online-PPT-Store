<template>
  <div>
    <elnav></elnav>
    <el-row>
      <el-col :span="20" :offset="2">
        <h2>{{good.Title}}</h2>
        <el-row>
          <el-col :span="14">
            <iframe v-bind:src="PPTurl" width="100%" height="500" frameborder="0" scrolling="no">
              <a src="">不好了！你的浏览器版本太低，点击这里进行查看</a>
            </iframe>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-card class="box-card">
              <el-row class="col_margin">
                <el-col :span="12">
                  <h3>类型</h3>
                  <el-tag>{{t[good.Type-1]}}</el-tag>
                </el-col>
                <el-col :span="12">
                  <h3>用途</h3>
                  <el-tag>{{w[good.Way-1]}}</el-tag>
                </el-col>
                <el-col>
                  <h3>PPT描述</h3>
                  {{good.Description}}
                </el-col>
                <el-col>
                  <h3>价格</h3>
                  {{good.value}}
                </el-col>
              </el-row>
              <el-row v-show="!visiable">
                <el-col>
                  <el-button type="success" round v-on:click="purchase()">购买商品</el-button>
                  <el-button type="danger" round v-on:click="addCart()"><i class="fa fa-shopping-cart"
                                                                           aria-hidden="true"></i>&nbsp;加入购物车
                  </el-button>
                </el-col>
              </el-row>
              <el-row v-show="visiable">
                <el-col>
                  <el-button type="primary" v-on:click="sendMail()"><i class="fa fa-share" aria-hidden="true"></i>&nbsp;发送到我的邮箱
                  </el-button>
                  <el-button v-on:click="download()"><i class="fa fa-cloud-download" aria-hidden="true"></i>&nbsp;下载
                  </el-button>
                </el-col>
              </el-row>
            </el-card>

          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .col_margin {
    margin-bottom: 2rem;
  }
</style>
<script>
  import elnav from './el-nav.vue'
  import Axios from 'axios'

  export default {
    components: {
      elnav
    },
    data() {
      return {
        visiable: true,
        w: ["总结报告", "项目策划", "产品推广", "学术答辩", "实用图表", "个性简历", "文化创意"],
        t: ["创意扁平", "简约时尚", "端庄大气", "可爱温馨", "iOS风格", "清新活泼", "多彩艳亮"],
        good: {
          id: '',
          Title: '',
          Description: '',
          Thumbnail: '',
          Download: '',
          FavoriteCount: '',
          Type: '',
          Way: '',
          value: ''
        },
        PPTurl: ''
      }
    },
    methods: {
      setVisible() {
        let _this = this;
        let params = new URLSearchParams();
        params.append('Uid', localStorage.getItem('userId'));
        params.append('Pid', _this.$route.params.id);
        let url = '/api/visiable';
        this.$http.post(url, params).then(function (res) {
          if (res.data.status == 1) {
            _this.visiable = true;
          }
          else {
            _this.visiable = false;
          }
        })
      },
      getData() {
        var _this = this;
        var url = 'api/getProudctDetail?id=' + this.$route.params.id;
        this.$http.get(url).then(function (res) {
          var response = res.data;
          if (response.status == 1) {
            _this.good = response.data[0];
            _this.PPTurl = "http://ow365.cn/?i=13431&furl=" + response.data[0].Download;
          }
          else {
            _this.$message.error('网络错误，请稍后再试');
            _this.$router.push({path: '/'});
          }
        })
      },
      sendMail() {
        var _this = this;
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({value}) => {
          const loading = _this.$loading({
            lock: true,
            text: '发送中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          var url = '/api/send?id=' + this.good.id + '&email=' + value;
          _this.$http.get(url).then(function (res) {
            if (res.data.status == 1) {
              loading.close();
              _this.$message({
                type: 'success',
                message: '发送成功'
              });
            }
            else {
              loading.close();
              this.$message.error('服务器繁忙，请稍后再试');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        })
      },
      download() {
        var _this = this;
        this.$alert(_this.good.Download, '下载链接', {
          confirmButtonText: '确定'
        });
      },
      purchase() {
        var _this = this;
        this.$prompt('请输入密码', '确认购买', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          const loading = _this.$loading({
            lock: true,
            text: '购买中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          var url = '/api/Signalpurchase';
          var params = new URLSearchParams();
          params.append('Uid', localStorage.getItem('userId'));
          params.append('Pid', _this.good.id);
          params.append('Password', value);
          _this.$http.post(url, params).then(function (res) {
            if (res.data.status == 1) {
              loading.close();
              _this.visiable = true;
              _this.$message({
                type: 'success',
                message: '购买成功'
              });
            }
            else {
              _this.visiable = false;
              loading.close();
              _this.$message.error(res.data.msg);
            }
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消输入'
          });
        })
      },
      addCart() {
        var _this = this;
        var url = 'api/addToCart';
        var params = new URLSearchParams();
        params.append('productId', this.good.id);
        params.append('userId', localStorage.getItem('userId'));
        _this.$http.post(url, params)
          .then(function (res) {
            if (res.data.status == 1) {
              _this.$message({
                type: 'success',
                message: '成功加入购物车'
              });
            }
            else {
              _this.$message.error(res.data.msg);
            }
          })
      }
    },
    created() {
      this.getData();
      this.setVisible();
    }
  }
</script>
