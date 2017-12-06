<template>
  <div>
    <el-row :gutter="20" style="margin: 20px 0">
      <el-col :span="12" :offset="6">
        <el-input placeholder="请输入内容" v-model="inputData" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getResule(inputData)"></el-button>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>
<style>

</style>
<script>
  export default {
    data() {
      return {
        inputData: ''
      }
    },
    methods: {
      getResule(val) {
        this.$router.push({path: '/query/' + val})
      }
    }
  }
</script>
