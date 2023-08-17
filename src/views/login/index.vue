<template>
  <div class="loginPage">
    <div class="imgbox"></div>
    <div class="right">
      <div class="box">
        <h2>登录</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            
              <el-checkbox label="用户平台使用协议" v-model="ruleForm.isAgree" ></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;" type="primary" class="loginbutton"
              @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span style="color: red;font-size:14px ;">仅用于IT培训教学使用，为保障您的个人信息安全，请勿向平台录入任何个人敏感信息 (如手机号、身份证号等)!</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    var isAgreeFn = (rule, value, callback) => {
      // value 要校验的值
      // rule 校验规则
      // callback 回调函数（成功和失败都执行 成功直接执行callback 失败执行回调函数并抛出异常）
      // console.log(callback);
      value ? callback() : callback(new Error("您必须勾选用户的使用协议"))
    }
    return {
      ruleForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!',
        isAgree: true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度应该为6-16位之间', trigger: 'blur' }
          // {validator:validatorPass}
        ],
        isAgree: [{
          validator: isAgreeFn
        }]
      }
    };
  },
  methods: {
    ...mapActions('user',['login']),
    submitForm(formName) {
      this.$refs[formName].validate( async(valid) => {
        if (valid) {
        //  console.log(111);
        // 调用vuex里面actions里边的方法
          await this.login(this.ruleForm)
          // 跳转到首页
          this.$router.push('/')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() { },
  mounted() { },
};
</script>

<style lang="scss" scoped>
.loginPage {
  display: flex;
  height: 100vh;

  .imgbox {
    width: 60%;
    height: 100vh;
    background: url('../../assets/login_back.5ecbf4ab.png') no-repeat;
    background-size: 100%;
    margin-right: 10%;
  }

  .right {
    width: 30%;
    padding-top: 170px;

    h2 {
      margin-bottom: 30px;
    }

    .box {
      padding: 0 30px 0 0;
    }
  }
}

.loginbutton {
  color: #FFF;
  background-color: #2752fb;
}

.loginbutton:hover {
  opacity: 0.7;
}

::v-deep {
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #f4f5fb;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }
}</style>