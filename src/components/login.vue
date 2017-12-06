<template>
  <div>
    <el-row style="margin-top: 150px">
      <el-col :span="6" :offset="9">
        <el-card class="box-card">
          <h2>登录</h2>
          <div class="form-group">
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">
              <el-form-item prop="name">
                <el-input v-model="loginForm.name" type="text" placeholder="邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
              </el-form-item>
              <el-row>
                <el-button type="primary" v-on:click="submitForm" style="width: 100%">登录</el-button>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-button type="text" style="color: #878D99">忘记密码</el-button>
                </el-col>
                <el-col :span="6" :offset="12">
                  <el-button type="text" style="color: #878D99; text-align: right" @click="navReg()">还没注册</el-button>
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
          password: ''
        },
        loginRules: {
          name: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      navReg() {
        this.$router.push({path: '/register'});
      },
      submitForm() {
        var _this = this;
        var url = '/api/login';
        var params = new URLSearchParams();
        params.append('email', this.loginForm.name);
        params.append('password', this.loginForm.password);
        this.$http.post(url, params)
          .then(function (res) {
            if (res.data.status == 1) {
              localStorage.setItem('nickName', res.data.data.nickName);
              localStorage.setItem('userId', res.data.data.id);
              localStorage.setItem('userEmail', res.data.data.email);
              localStorage.setItem('userCredit', res.data.data.credit);
              localStorage.setItem('logged', true);
              _this.$message({
                message: '登陆成功',
                type: 'success'
              });
              _this.$router.push({path: '/'});
            }
            else {
              if (res.data.status == -3) {
                _this.$message.error('用户名或密码错误');
              }
              if (res.data.status == -2) {
                _this.$message.error('用户名不存在');
              }
              if (res.data.status == -1) {
                _this.$message.error('结构验证错误');
              }
            }
          })
          .catch(function (res) {
            console.log(res);
          })
      }
    }
  }
</script>


