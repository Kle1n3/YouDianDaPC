<template>
  <div>
    <el-row class="login-container" type="flex" justify="center" align="middle">
      <el-col :span="6" class="login-box">
        <div class="title-container"><h3 class="title">优点达资讯系统</h3></div>
        <el-form :model="formData" :rules="formRules" ref="formRef">
          <el-form-item label="" prop="login_name">
            <el-input
              clearable
              v-model="formData.login_name"
              prefix-icon="el-icon-s-custom"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              clearable
              v-model="formData.password"
              show-password
              prefix-icon="el-icon-lock"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button
              @click="login"
              class="login-btn"
              :loading="isLoading"
              type="primary"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      formData: {
        login_name: "admin",
        password: "111111",
      },
      isLoading: false,
      formRules: {
        login_name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, max: 20, message: "长度在2-20", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  mounted() {},

  methods: {
    async login() {
      try {
        await this.$refs.formRef.validate();
        console.log(111);
      } catch (error) {
        return console.log(error);
      }
      this.isLoading = true;
      await this.$store.dispatch("user/loginAction", this.formData);
      this.$router.push("/");
    },
  },
};
</script>

<style  scoped>
.login-container {
  width: 100%;
  background-size: cover;
  background-color: #283443;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: 100vh;
  background-image: url("http://124.223.14.236:8060/static/admin/image/loginbg.png");
}
.login-box {
  background-color: #fff;
  min-height: 300px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 35px;
}
.title {
  font-size: 26px;
  color: coral;
  margin: 0 auto 30px auto;
  /* padding-bottom: 10px; */
  line-height: 60px;
  text-align: center;
  font-weight: 400;
  border-bottom: 1px solid #ddd;
}
.login-btn {
  display: block;
  width: 100%;
  background-color: #ff7f50;
  border: #ff7f50;
}
</style>