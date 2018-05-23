<template>
  <div>
    <elnav></elnav>
    <el-row>
      <el-col :span="20" :offset="2">
        <h2><i class="fa fa-bitbucket iconColor" aria-hidden="true"></i>&nbsp;审核</h2>
        <el-table
          :data="purchaseList"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="缩略图">
                  <span><img v-bind:src="props.row.Thumbnail" style="width: 50%"></span>
                </el-form-item>
                <el-form-item label="描述">
                  <span>{{ props.row.Description }}</span>
                </el-form-item>
                <el-form-item label="风格">
                  <span>{{t[props.row.Type-1]}}</span>
                </el-form-item>
                <el-form-item label="使用方向">
                  <span>{{ w[props.row.Way-1] }}</span>
                </el-form-item>
                <el-form-item label="下载链接">
                  <span>{{ props.row.Download }}</span>
                </el-form-item>
                <el-form-item label="审核">
                  <span>
                    <el-button type="primary" plain v-on:click="verifySuccess(props.row.id)">通过</el-button>
                  </span>
                  <span>
                    <el-button type="warn" plain v-on:click="verifyFailed(props.row.id)">不通过</el-button>
                  </span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="商品名称"
            prop="Title">
          </el-table-column>
          <el-table-column
            label="价格"
            prop="value">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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
        purchaseList: [],
        w: ["总结报告", "项目策划", "产品推广", "学术答辩", "实用图表", "个性简历", "文化创意"],
        t: ["创意扁平", "简约时尚", "端庄大气", "可爱温馨", "iOS风格", "清新活泼", "多彩艳亮"]
      }
    },
    methods: {
      getdata() {
        var _this = this;
        var url = '/api/getVerify';
        this.$http.get(url).then(function (res) {
          _this.purchaseList = res.data.data;
        })
      },
      verifySuccess(id){
        let _this = this;
        let url = '/api/verifySuccess';
        let params = new URLSearchParams();
        params.append('Pid', id);
        this.$http.post(url,params).then(function (res) {

        });
        this.getdata();
      },
      verifyFailed(id){
        let _this = this;
        let url = '/api/verifyFailed';
        let params = new URLSearchParams();
        params.append('Pid',id);
        this.$http.post(url,params).then(function (res) {

        });
        this.getdata();
      }
    },
    created() {
      this.getdata();
    }
  }
</script>
