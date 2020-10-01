<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      label-width="80px"
      label-position="left"
      :rules="loginRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">管理后台系统</h3>
      </div>
      <el-form-item
        prop="username"
        label="账号"
      >
        <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        label="密码"
      >
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          type="password"
          tabindex="2"
        />
      </el-form-item>
      <el-button
        class="login-btn"
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      // 简单验证
      loginRules: {
        username: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [
          {
            required: true,
            min: 5,
            max: 16,
            trigger: "blur",
            message: "请输入5至16位密码"
          }
        ]
      },
      loading: false,
      redirect: undefined
    };
  },
  methods: {
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          localStorage.setItem("token", 'hadLogged')
          this.$router.push("/list")
        } else {
          this.$message.error("提交错误")
          return false
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;

  .login-form {
    width: 400px;
    max-width: 100%;
    padding: 100px 35px 0;
    margin: 100px auto;
    overflow: hidden;

    .title-container {
      .title {
        font-size: 26px;
        color: #eee;
        margin: 0px auto 40px;
        text-align: center;
        font-weight: bold;
      }
    }

    .el-input {
      display: inline-block;
      width: 100%;
      height: 50px;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
