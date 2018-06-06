<template>
    <div id="login_index">
        <div class="at_logo">
        <img src="../assets/images/u2.jpg">
      
        </div>
        <div class="at_bcg">
            <img src="../assets/images/u6.png">
            <span>包容</span>
            <span>用品质链接世界</span>
        </div>
        
        <div class="login_content">
            <span>客户商城订货平台</span>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="Form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名：" prop="FullName">
                <el-input type="text" v-model="ruleForm2.FullName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="PassWord">
                <el-input type="password" v-model="ruleForm2.PassWord" auto-complete="off"></el-input>
                </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm('Form')">登录</el-button>
                <el-button @click="resetForm('Form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    <!-- <router-view/> -->
    </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm2: {
        FullName: "sj",
        PassWord: "123"
      },
        // user: {
        //   // FullName: 'bvbvb',
        //   // PassWord: '123'
        //   FullName: '',
        //   PassWord: ''
        // },
      //添加校验规则
      rules2: {
        FullName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        PassWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
      //   登录方法
    login() {
      
        
        $.ajax ({
          type: "POST",
          url: "http://192.168.0.94:5050/api/v1/open/user",
          dataType: 'json',
          async: false,
          data: this.ruleForm2,
          headers: {
            "Authorization": "Basic " + btoa(this.USERNAME + ":" + this.PASSWORD)
          },
          success: (res)=>{
            // alert('Thanks for your comment!');
            console.log(res)
            this.$store.state.token = res.data.token;
            this.$store.state.CustomerID = res.data.CustomerID;
            this.$store.state.CustomerNo = res.data.CustomerNo;
            if (res.message == "密码不对") {
              alert("密码或用户名有误");
            }else {
              this.$router.push({ name: "common" });
            }
            
            
          }
        });
    },
      //点击登录按钮登录处理
    //  this.$refs用来获取页面中的元素或组件, 这里通过它拿到form表单组件, 调用validate方法, 给所有表单进行校验
    submitForm(Form) {

      this.$refs[Form].validate(res => {
        if (res) {
          this.login();
        } else {
          this.$alert("账号或密码不合格!");
        }
      });
    },
  },
  created() {
  }
};
</script>
<style>
/* @import '../../'; */
* {
  margin: 0;
  padding: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
#login_index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 100%;
}
#login_index .at_logo img {
  width: 100%;
  min-width: 1418px;
  height: 100%;
}
#login_index .at_bcg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: #333;
  opacity: 0.8;
  display: block;
}
#login_index .at_bcg img:nth-child(1) {
  width: 300px;
  height: 75px;
  position: absolute;
  left: 309px;
  top: 75px;
}
#login_index .at_bcg span:nth-child(2) {
  font-size: 50px;
  color: #FFFFFF;
  position: absolute;
  left: 408px;
  top: 160px;
}
#login_index .at_bcg span:nth-child(3) {
  position: absolute;
  left: 517px;
  top: 184px;
  font-size: 32px;
  color: #FFFFFF;
}
#login_index .login_content {
  width: 480px;
  position: absolute;
  right: 100px;
  top: 300px;
}
#login_index .login_content > span:nth-child(1) {
  font-size: 50px;
  color: #FFFFFF;
}
#login_index .login_content > span:nth-child(2) {
  font-size: 72px;
  color: #4385F4;
}
#login_index .login_content form span {
  font-weight: 400;
  font-size: 24px;
  color: #FFFFFF;
}
#login_index .login_content form input {
  width: 273px;
  height: 22px;
}

</style>
