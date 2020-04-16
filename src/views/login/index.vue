<template>
  <div class="login">
    <div class="slideShadow" v-show="showSlide">
      <transition>
        <div class="slideSty animated bounce">
          <slide-verify @success="onSuccess" @fail="onFail" :sliderText="text" :w="350" :h="175" ref="slideDiv"></slide-verify>
          <div class="iconBtn">
            <i class="el-icon-circle-close" @click="showSlide = false"></i>
            <i class="el-icon-refresh" @click="refresh"></i>
          </div>
        </div>
      </transition>
    </div>
    <div class="loginBox">
      <div class="loginCon">
        <div class="titleDiv">
          <h3>{{ title }}</h3>

          <!-- <i class="el-icon-key"></i> -->
          <div class="welcome" v-show="!flg">
            <div class="img">
              <img src="../../assets/pageBg/logo.png" alt />
            </div>
            <p>欢迎使用智掘内容风控总台</p>
          </div>

        </div>
        <!-- 登录 -->
        <el-form ref="loginForm" :rules="rules" :model="ruleForm" v-show="!flg">
          <el-form-item prop="user">
            <el-input placeholder="请输入手机号/用户名" prefix-icon="el-icon-user" v-model="ruleForm.user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <div class="loginBtn">
            <el-button type="primary" @click="loginYz('loginForm')">登录</el-button>
            <el-row type="flex" class="row-bg" justify="space-between" style="width:332px">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-link type="primary" @click="
                flg = !flg;
                title = '注册新账号';
              " :underline="false">注册新账号</el-link>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-link type="primary" @click="
                flg = !flg;
                title = '注册新账号';
              " :underline="false">修改密码</el-link>
                </div>
              </el-col>

            </el-row>

          </div>
        </el-form>
        <!-- 修改密码 -->
        <el-form ref="elForm" :model="formData" :rules="rules1" size="medium" label-width="px" label-position="left" v-show="flg">
          <el-form-item label prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入手机号" clearable prefix-icon="el-icon-mobile-phone" :style="{ width: '100%' }"></el-input>
          </el-form-item>

          <el-form-item label prop="code">
            <el-input v-model="formData.code" placeholder="请输入验证码" clearable prefix-icon="el-icon-eleme" :style="{ width: '66%' }"></el-input>
            <el-button type="primary" style="display:inline-block">获取验证码</el-button>
          </el-form-item>

          <el-form-item label prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" clearable :style="{ width: '100%' }"></el-input>
          </el-form-item>

          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="submitForm">确认修改</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-link type="primary" @click="flg = !flg" :underline="false">已有账号?去登陆</el-link>
          </el-row>

          <!-- <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>-->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SlideVerify from '@/components/SlideVerify'
export default {
  data() {
    return {
      notifyObj: null,
      text: '向右滑动',
      showSlide: false,
      ruleForm: {
        user: 'admin',
        password: '123qwe'
      },
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在3到5个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      formData: {
        mobile: undefined,
        code: undefined,
        password: undefined
      },
      rules1: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      flg: false,
      show: true, // 初始启用按钮
      count: '', // 初始化次数
      timer: null,
      title: '登录'
    }
  },
  mounted() {
    // this.shopTip()
  },
  methods: {
    //确认修改密码
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    onSuccess() {
      this.showSlide = false
      this._login()
    },
    onFail() {
      this.$message.error('验证失败')
    },
    refresh() {
      this.$refs.slideDiv.reset()
    },
    loginYz(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //   this.showSlide = true
          this._login()
        } else {
          return
        }
      })
    },
    _login() {
      let params = {
        username: this.ruleForm.user,
        password: this.ruleForm.password
      }
      let self = this
      self.$store
        .dispatch('user/_login', params)
        .then(res => {
          //   if (!res.data.success) {
          if (!res.data) {
            self.refresh()
          } else {
            console.log(self.$route.query.redirect)
            // self.$router.push(self.$route.query.redirect)
            self.$router.push('/sms/index')
            if (self.notifyObj) {
              self.notifyObj.close()
            }
            self.notifyObj = null
          }
        })
        .catch(error => {
          self.refresh()
          self.$message.error(error)
        })
    },
    shopTip() {
      this.notifyObj = this.$notify({
        title: '提示',
        message:
          '目前有两个登陆角色，管理员和普通用户，账号分别为：admin、user,密码都为：123456',
        duration: 0,
        iconClass: 'el-icon-s-opportunity'
      })
    }
  },
  components: {
    SlideVerify
  }
}
</script>
<style scoped lang="scss">
.loginCon .el-form-item {
  width: 332px;
  margin: 40px auto;
}
.login {
  height: 100%;
  width: 100%;
  background: url(../../assets/pageBg/login_bg.png) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
}
.loginBox {
  margin: 0 auto;
  position: relative;
  top: 50%;
  margin-top: -287px;
}
.loginH2 {
  font-size: 38px;
  color: #fff;
  text-align: center;
}
.loginCon {
  width: 477px;
  height: 584px;
  //   margin-top: 30px;
  background: #eee;
  border-radius: 4px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 11px 0px rgba(0, 0, 0, 0.41);

  position: absolute;
  right: 15%;
  .titleDiv {
    padding: 0 28px;
    background: #fff;
    position: relative;
    // height: 120px;
    border-radius: 4px 4px 0 0;
    color: rgba(70, 70, 70, 1);
    h3 {
      font-size: 22px;
      font-weight: 600;
      font-weight: initial;
      padding-top: 23px;
    }
    .img {
      width: 89px;
      height: 92px;
      margin: 5px auto 32px auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      font-size: 16px;
      //   color: #888;
      font-weight: 600;
      padding-top: 12px;
      text-align: center;
    }
    i {
      font-size: 65px;
      color: #ddd;
      position: absolute;
      right: 27px;
      top: 29px;
    }
  }
  .el-form {
    padding: 25px 25px 30px 25px;
    // background: #eee;
    border-radius: 0 0 4px 4px;
  }
}
.loginBtn {
  width: 332px;
  margin: 0 auto;
  button {
    width: 100%;
    margin-bottom: 20px;
  }
}
.slideShadow {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.slideSty {
  position: absolute;
  width: 380px;
  height: 311px;
  background: #e8e8e8;
  border: 1px solid #dcdcdc;
  left: 50%;
  top: 50%;
  margin-left: -188px;
  margin-top: -176px;
  z-index: 99;
  border-radius: 5px;
}
.iconBtn {
  padding: 9px 0 0 19px;
  color: #5f5f5f;
  border-top: 1px solid #d8d8d8;
  margin-top: 17px;
  i {
    font-size: 22px;
    cursor: pointer;
  }
  i:last-child {
    margin-left: 7px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
<style>
.slideSty .slide-verify {
  margin: 13px auto 0 auto;
  width: 350px !important;
}
.slideSty .slide-verify-slider {
  width: 100% !important;
}
.slideSty .slide-verify-refresh-icon {
  display: none;
}
</style>
