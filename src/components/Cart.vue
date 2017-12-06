<template>
  <div>
    <elnav></elnav>
    <el-row>
      <el-col :span="20" :offset="2">
        <h2><i class="fa fa-shopping-cart iconColor" aria-hidden="true"></i>&nbsp;购物车</h2>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="全选"
            width="140">
            <template slot-scope="scope">
              <img v-bind:src="scope.row.Thumbnail" style="width: 100%">
            </template>
          </el-table-column>
          <el-table-column
            prop="Title"
            label="PPT名称"
            width="300">
          </el-table-column>
          <el-table-column
            prop="value"
            label="价格"
            width="100">
          </el-table-column>
          <el-table-column
            prop="Way"
            label="用途"
            width="100">
          </el-table-column>
          <el-table-column
            prop="Description"
            label="描述">
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <span>共计：{{total}} 元</span>
          <span style="float: right">
            <el-button type="danger" @click="checkOut()">去结算</el-button>
          </span>
        </div>
      </el-col>
    </el-row>
    <foot></foot>
  </div>
</template>
<style>
  .bgcolor {
    background-color: #F7F7F7
  }

  .iconColor {
    color: #409EFF
  }
</style>
<script>
  import elnav from './el-nav.vue'
  import foot from './foot.vue'
  import Axios from 'axios'

  export default {
    components: {
      elnav,
      foot
    },
    data() {
      return {
        total: 0,
        tableData3: [],
        multipleSelection: []
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        let _this = this;
        this.multipleSelection = val;
        let v = 0;
        for (let x in this.multipleSelection) {
          v = v + _this.multipleSelection[x].value;
        }
        this.total = v;
      },
      getData() {
        var _this = this;
        var url = '/api/getCart?Uid=' + localStorage.getItem('userId');
        this.$http.get(url).then(function (res) {
          _this.tableData3 = res.data.data;
        })
      },
      checkOut() {
        let toBuy = [];
        let _this = this;
        for (let x in this.multipleSelection)
          toBuy.push(_this.multipleSelection[x].id)
        if (toBuy.length < 1) {
          _this.$message.error("还没有选择商品");
          return;
        }
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
          let url = '/api/checkOut';
          let params = new URLSearchParams();
          params.append('Uid', localStorage.getItem('userId'));
          params.append('Pids', toBuy);
          params.append('password', value);
          _this.$http.post(url, params).then(function (res) {
            if (res.data.status == 1) {
              loading.close();
              _this.$message({
                message: '购买成功！',
                type: 'success'
              });
              _this.getData();
            }
            else {
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
      }
    },
    created() {
      this.getData();
    }
  }
</script>
