<template>
   <div class="all-container">
    <div class="all-container-padding bg" >
     <el-tabs v-model="activeName" @tab-click="handleClick">
     <el-tab-pane label="基本信息" name="first">
      <el-form :model="userlist" :rules="rules" ref="EditorUserForms">
        <el-form-item label="头像" prop="avatar_url" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" action="//shujiaoke.oss-cn-hangzhou.aliyuncs.com" :before-upload="beforeupload" :data="uploadParm" :show-file-list="false" :on-success="handleUpSuccess">
          <img v-if="userlist.avatar_url" :src="userlist.avatar_url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon " style="width:80px;height:80px;"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
         <el-col :span="8"> <el-input v-model="userlist.username" disabled ></el-input></el-col>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
         <el-col :span="8">  <el-input v-model="userlist.phone" placeholder="请输入电话"></el-input></el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
         <el-col :span="8">  <el-input v-model="userlist.email" placeholder="请输入邮箱"></el-input></el-col>
        </el-form-item>
        <el-form-item label="用户角色" prop="full_name" :label-width="formLabelWidth">
         <el-col :span="8">
          <el-input v-model="userlist.full_name" disabled ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="grid-content bg-purple">
       <el-button type="primary" @click="EditorUserClick('userlist')" >保存</el-button>
      </div>
     </el-tab-pane>
     <el-tab-pane label="修改密码" name="second">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
       <el-form-item label="原密码" prop="pass" :label-width="formLabelWidth">
         <el-col :span="8">  <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input></el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass" :label-width="formLabelWidth">
         <el-col :span="8"><el-input v-model="ruleForm.newpass" placeholder="请输入新密码" id="newkey" type="password"></el-input></el-col>
        </el-form-item>
        <el-form-item label="重复新密码" prop="checknewpass" :label-width="formLabelWidth">
         <el-col :span="8">  <el-input v-model="ruleForm.checknewpass" placeholder="请再次输入新密码" id='newkey1' type="password"></el-input></el-col>
        </el-form-item>
        </el-form>
        <div class="grid-content bg-purple">
       <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </div>
     </el-tab-pane>
    </el-tabs>
    </div>
    <div class="">
      <span @click="back_mall()">返回商城</span>
    </div>
   </div>
</template>
<script>
//这些是自定义的接口
// import {fetchAll,fetchByID,fetchList,postData,putData,deleteByID,deleteAllByID,guid,bytesToSize} from "@/api/dbhelper";
//这一步很重要，一般我们直接从后台拿过来输出来会是在data里面，但是我发现却在store里面，这里就要用到vuex
import { mapGetters } from "vuex";


export default {
  data() {
    /*****检验两次密码是否一致***/
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checknewpass !== "") {
          this.$refs.ruleForm.validateField("checknewpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      uploadParm: {}, //图片的上传
      ruleForm: {}, //修改密码的表单
      activeName: "first",
      loading: true,
      baseUrl: process.env.BASE_API,
      userlist: {}, //用户信息表单
      formLabelWidth: "150px",
      /***校验***/
      rules: {
        phone: [
          {
            required: true,
            message: "请输入电话号码"
          },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: "手机格式不对"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入电子邮箱"
          },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
            message: "请输入有效的邮箱"
          }
        ],
        pass: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码"
          }
        ],
        newpass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checknewpass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    //   this.getUser();
    // this.upload();
  },
  computed: {
    ...mapGetters(["username"])
  },
  methods: {
    back_mall() {
      this.$router.push({ name:"common"});
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    
    beforeupload(file) {
      this.uploadParm.key = this.uploadParm.dir + guid();
      // console.log(this.uploadParm)
    },
    //图片上传上传成功
    handleUpSuccess(response, file, fileList) {
      var newfile = {
        name: file.name,
        type: file.raw.type,
        size: bytesToSize(file.size),
        url: this.uploadParm.key
      };
      
      console.log(this.userlist);
    },
    //修改密码
    submitForm(ruleForm) {
        var _this=this;  
        console.log("_this.$store.state.token,",_this.$store.state);
              
      var obj = {
        // username: this.username,
        token:_this.$store.state.token,
        CustomerID: _this.$store.state.CustomerID,
        CustomerNo: _this.$store.state.CustomerNo,
        PassWord: this.ruleForm.pass,
        new_password: this.ruleForm.newpass,

      };
      console.log(obj);
    
    
        $.ajax
        ({
          type: "PUT",
          url: "http://192.168.0.94:5050/api/v1/open/user",
          dataType: 'json',
          async: false,
          data: obj,
          headers: {
            "Authorization": "Basic " + btoa(this.CustomerID + ":" + this.new_password)
          },
          success: function (res){
            console.log(obj);
            
            console.log(res)
             
          }
        });
    },
    // 编辑提交的方法
    EditorUserClick() {
      this.$refs.EditorUserForms.validate(valid => {
        if (valid) {
          console.log(this.userlist);
          putData("接口", this.userlist).then(response => {
            if (response.status == 200) {
              this.$message({
                message: "编辑成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "修改失败" + response.message,
                type: "error"
              });
            }
          });
        }
      });
    }
  }
};
</script>