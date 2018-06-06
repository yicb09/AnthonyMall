
<template>
    <div class="common_nav">
        <div class="nav_top">
            <img src="../assets/images/u31.png" alt="">
            <!-- <input type="search"> -->
            
            <div class="nav_right">
              <input type="search">
              <span @click="back_set()">账号设置</span>
              <span>消息中心</span>
              <i class="el-icon-error" @click="back_login()"></i>
            </div>
        </div>
        
    <el-row class="tac">
        <el-col :span="4">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">商城</span>
      </el-menu-item>
      
      <el-menu-item index="2" @click="turn_intention()">
        <i class="el-icon-setting"></i>
        <span slot="title">下单意向</span>
      </el-menu-item>
      <el-menu-item index="3" @click="turn_tracking()">
        <i class="el-icon-setting"></i>
        <span slot="title">订单跟踪</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">退货申请</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">退货跟踪</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">意见反馈</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">财务</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
<!-- <order-intention></order-intention> -->
</div>
</template>

<script>
// import OrderIntention from  "./OrderIntention"
export default {
  // components:{
  //   OrderIntention
  // },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    turn_intention() {
      this.$router.push({ name: "orderintention" });
    },
    turn_tracking() {
      this.$router.push({ name: "ordertracking" });
    },
    back_login() {
      this.$router.push({ name: "login" });
    },
    back_set() {
      this.$router.push({ name: "changepassword" });
    }
  }
};
</script>
<style lang="less" scoped>
    .common_nav{
      position: relative;
      .nav_top{
        width: 100%;
        background-color: #e33333;
      }
      .nav_top img{
        width: 224px;
        height: 60px;
      }
      .nav_right{
        position: absolute;
        right: 20px;
        top: 0;
        line-height: 60px;
      }
    } 
    .el-row{
      height: 0;
    }
    .el-col-4{
      width: 300px;
    }
</style>
