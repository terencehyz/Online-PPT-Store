<template>
  <div>
    <el-row style="margin-top: 120px">
      <el-col :span="6" :offset="9">
        <el-card class="box-card">
          <h2>注册</h2>
          <div class="form-group">
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">
              <el-form-item prop="name">
                <el-input v-model="loginForm.name" type="email" placeholder="邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item prop="nickName">
                <el-input v-model="loginForm.nickName" type="text" placeholder="昵称"></el-input>
              </el-form-item>
              <el-row>
                <el-button type="primary" @click="getVcode" style="width: 100%">注册</el-button>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-button type="text" style="color: #878D99">忘记密码</el-button>
                </el-col>
                <el-col :span="6" :offset="12">
                  <el-button type="text" style="color: #878D99; text-align: right" @click="navLog()">已经注册</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <myCanvas :dotsNum="30" :isColor="true"></myCanvas>
  </div>
</template>

<script>
  import myCanvas from 'vue-atom-canvas'
  import Axios from 'axios'

  export default {
    components: {
      myCanvas
    },
    data() {
      return {
        loginForm: {
          name: '',
          password: '',
          nickName: '',
          code: ''
        },
        loginRules: {
          name: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      navLog() {
        this.$router.push({path: '/login'})
      },
      getVcode() {
        let _this = this;
        let url = 'api/getVcode?email=' + this.loginForm.name;
        this.$http.get(url).then(function (res) {
          if (res.data.status == 1) {
            _this.$prompt('请输入验证码', '邮箱验证', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then((value) => {
              _this.loginForm.code = value.value;
              _this.submitForm();
            })
          }
          else {
            _this.$message.error(res.data.msg);
          }
        })
      },
      submitForm() {
        let _this = this;
        let url = '/api/register';
        let params = new URLSearchParams();
        params.append('email', this.loginForm.name);
        params.append('password', this.loginForm.password);
        params.append('nickName', this.loginForm.nickName);
        params.append('code', this.loginForm.code);
        const loading = this.$loading({
          lock: true,
          text: '注册中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.post(url, params)
          .then(function (res) {
            loading.close();
            if (res.data.status == 1) {
              _this.$message({
                message: '注册成功',
                type: 'success'
              });
              _this.$router.push({path: '/login'});
            }
            else {
              _this.$message.error(res.data.msg);
            }
          })
          .catch(function (res) {
            console.log(res);
          })
      }
    }
  }
</script>


