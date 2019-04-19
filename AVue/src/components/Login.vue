<template>
  <div class="login_content">
    <el-row type="flex"
            justify="center">
      <el-form ref="loginForm"
               :model="user"
               :rules="loginRules"
               status-icon
               label-width="80px">
        <el-form-item label="用户名"
                      prop="name">
          <el-input v-model="user.name"
                    @keyup.enter.native="login('loginForm')"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="pass">
          <el-input v-model="user.pass"
                    type="password"
                    @keyup.enter.native="login('loginForm')"></el-input>
        </el-form-item>
        <el-form-item label="验证码"
                      prop="verifycode">
          <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
          <el-input v-model="user.verifycode"
                    placeholder="请输入验证码"
                    class="identifyinput"
                    @keyup.enter.native="login('loginForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="identifybox">
            <div @click="refreshCode">
              <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
            <el-button @click="refreshCode"
                       type='text'
                       class="textbtn">看不清，换一张</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-upload"
                     @click="login">登录</el-button>
        </el-form-item>

      </el-form>
    </el-row>
  </div>
</template>

<script>
import SIdentify from '@/components/identify.vue'
export default {

  components: {
    SIdentify
  },
  created() {
  },
  mounted() {
    // 验证码初始化
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  computed: {
  },
  props: [],
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.user.name === 'admin' && this.user.pass === '123') {
            this.$notify({
              type: 'success',
              message: '欢迎你,' + this.user.name + '!',
              duration: 3000
            })
            this.$router.replace('/home')
          } else {
            this.$message({
              type: 'error',
              message: '用户名或密码错误',
              showClose: true
            })
          }
        }
        else {
          return false
        }
      })
    },

    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      console.log(this.identifyCode)
    },
  },

  data() {
    // 验证码自定义验证规则
    const validateVerifycode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'))
      } else if (value !== this.identifyCode) {
        console.log('validateVerifycode:', value)
        callback(new Error('验证码不正确!'))
      } else {
        callback()
        console.log('validateVerifycode:', value)
      }
    }
    return {
      fontstyle: {},
      checked: false,
      identifyCodes: '1234567890',
      identifyCode: '',
      user: {},
      loginRules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        verifycode: [
          { required: true, trigger: 'blur', validator: validateVerifycode }
        ],
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login_content {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 10px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>