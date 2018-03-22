<template>
  <div>
    <elnav></elnav>
    <div class="bodyBg">
      <el-row class="divpos">
        <el-col :span="20" :offset="2">
          <el-card class="box-card">
            <h2><i class="fa fa-cloud-upload iconColor" aria-hidden="true"></i>&nbsp;上传PPT</h2>
            <el-row>
              <el-col :span="11" class="inputmg">
                <el-input
                  placeholder="请输入标题"
                  prefix-icon="el-icon-date"
                  v-model="Title">
                </el-input>
              </el-col>
              <el-col :span="11" :offset="2" class="inputmg">
                <el-input
                  placeholder="请输入描述"
                  prefix-icon="el-icon-info"
                  v-model="Description">
                </el-input>
              </el-col>
              <el-col :span="11" class="inputmg">
                <el-input
                  placeholder="请输入图片链接"
                  prefix-icon="el-icon-picture"
                  v-model="Thumbnail">
                </el-input>
              </el-col>
              <el-col :span="11" :offset="2" class="inputmg">
                <el-input
                  placeholder="请输入下载链接"
                  prefix-icon="el-icon-download"
                  v-model="Download">
                </el-input>
              </el-col>
              <el-col :span="11" class="inputmg">
                <el-select v-model="Type" placeholder="选择风格">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="Way" placeholder="选择用途">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="11" :offset="2" class="inputmg">
                <el-input
                  placeholder="请输入价格"
                  prefix-icon="el-icon-star-on"
                  v-model="value">
                </el-input>
              </el-col>
              <el-col>
                <el-button type="primary" class="flr" @click="add()">添加</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import elnav from './el-nav.vue'
  import Axios from 'axios'
  import foot from './foot.vue'

  export default {
    name: "add-product",
    components: {
      foot,
      elnav
    },
    data() {
      return {
        Title: '',
        Description: '',
        Thumbnail: '',
        Download: '',
        Type: '',
        Way: '',
        value: '',
        options: [{
          value: '1',
          label: '创意扁平'
        }, {
          value: '2',
          label: '简约时尚'
        }, {
          value: '3',
          label: '端庄大气'
        }, {
          value: '4',
          label: '可爱温馨'
        }, {
          value: '5',
          label: 'iOS风格'
        }, {
          value: '6',
          label: '清新活泼'
        }, {
          value: '7',
          label: '多彩艳亮'
        }],
        options2: [{
          value: '1',
          label: '总结报告'
        }, {
          value: '2',
          label: '项目策划'
        }, {
          value: '3',
          label: '产品推广'
        }, {
          value: '4',
          label: '学术答辩'
        }, {
          value: '5',
          label: '实用图表'
        }, {
          value: '6',
          label: '个性简历'
        }, {
          value: '7',
          label: '文化创新'
        }]
      }
    },
    methods: {
      add() {
        let url = 'api/addProduct';
        let _this = this;
        let params = new URLSearchParams();
        params.append('Title', this.Title);
        params.append('Description', this.Description);
        params.append('Thumbnail', this.Thumbnail);
        params.append('Download', this.Download);
        params.append('Type', this.Type);
        params.append('Way', this.Way);
        params.append('value', this.value);
        params.append('Uid', localStorage.getItem('userId'));
        this.$http.post(url, params).then(function (res) {
          if (res.data.status == 1) {
            _this.$message({
              message: '添加成功！',
              type: 'success'
            });
            _this.Title = '';
            _this.Description = '';
            _this.Thumbnail = '';
            _this.Download = '';
            _this.Type = '';
            _this.Way = '';
            _this.value = '';
          }
          else {
            _this.$message.error("请重试");
          }
        })
      },
      checkUser() {
        let _this = this;
        let uid = localStorage.getItem("userId");
        if (uid != 1 || typeof uid == undefined) {
          _this.$message.error("该用户没有权限");
          _this.$router.back();
        }
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .flr {
    float: right;
  }

  .inputmg {
    margin-bottom: 20px;
  }

  .bodyBg {
    background-color: #F7F7F7;
  }

  .divpos {
    padding: 50px 0;
  }
</style>
