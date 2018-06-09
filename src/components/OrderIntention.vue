<template>
    <div>
        <common></common>
        <div class="floors container">
            
            <ul>
                <li v-for="(item,index) in res_data" :key="index">
                    <div class="goods_title">

                    </div>
                    <div class="img_box">
                        {{index}}
                        <img v-for="(imgitem,i) in item.pictures" :key="i" :src="'http://192.168.0.209:8098/UploadFile' + imgitem.URL">
                    </div>
                    <div class="goods_sample">
                        <table>
                            <tr>
                                <td>{{item.ArchivesType}}</td>
                                <td>{{item.ArchivesTypes}}</td>
                                <td>{{item.ClothesNo}}</td>
                                <td>{{item.CmpColorNo}}</td>
                                <td>{{item.Code}}</td>
                                <td>{{item.Sizes}}</td>
                                <td>{{item.StyleNo}}</td>
                            </tr>
                        </table>
                        <!-- 选择size -->
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedSizes" @change="handleCheckedSizesChange" >
                            <el-checkbox v-for="size in sizes" :label="size" :key="size">{{size}}</el-checkbox>
                        </el-checkbox-group>
                        
                        <el-input-number size="mini" v-model="num1" @change="handleChange" :min="0" :max="20" label="描述文字"></el-input-number>
                        <button @click="submitOrder()">提交订单</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Common from "./Common.vue";
const sizeOptions = ['L', 'M', 'S', 'XS'];
export default {
    components:{
        Common
    },
    data(){
        return{
            checkAll: false,
            checkedSizes: ['M'],
            sizes: sizeOptions,
            isIndeterminate: true,

            num1: 1,

            res:{},
            res_data:[],
            //数据接口所需的查询字符串
            data:{
                'FStatusName': '审批通过',   //下面三个是过滤条件 
                'QuarterName': '2018春季二', 
                'ClothesName': 'xxx', 
                'begin_date': '2018-05-24', //日期
                'end_date': '2018-05-24', //日期
                'page': 1, //当前页
                "per_page": 10 //每页显示数量
            },
            post_data:{
                "order_details":[
                    {
                        "Count": 10,
                        "Size": 129,
                    },
                    {
                        "Count": 99,
                        "Size": 130,
                        "其他": "xxx",  //可以加任何自定义参数
                    },
                ]
            },
            // 商品列表数据
            goodsList: [],
            // 数据总量
            totalcount: 0
        }
    },
    methods: {
        handleCheckAllChange(val) {
        this.checkedSizes = val ? sizeOptions : [];
        this.isIndeterminate = false;
      },
      
      handleCheckedSizesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.sizes.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.sizes.length;
        console.log(value);
        console.log(checkedCount);
        console.log(this.checkAll);
        console.log(this.isIndeterminate);
        
        
        
      },
      getSize() {
          console.log(333);
          
      },

      handleChange(value) {
        console.log(value);
      },
    
    //确认上传
      submitOrder(){
          console.log(111);
           var _this=this;
            var token = _this.$store.state.token;
          $.ajax({
            type: "POST",
            url: "http://192.168.0.94:5050/api/v1/order_list",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.post_data),
            headers: {
                "Authorization": "Basic " + btoa(token + ":" + '')
            },
            success: function (detail_res){
                console.log(detail_res);
                
            }
        })
      }
      },
      watch:{
        //   res_data:{
        //       handler(newval,oldval){
        //           console.log('new',newval); 
        //       },
        //       deep:true,
        //   }
        // res_data:function(newval,oldval) {
        //     console.log(oldval);
            
        // }
      },

    created (){
        var data = {
            'page': 1, //当前页        
            'per_page': 10 //每页显示数量
        }
        var _this=this;
        var token = _this.$store.state.token;
        // console.log(_this.$store.state.token);

        //请求样衣数据     
        $.ajax
        ({
          type: "GET",
          url: "http://192.168.0.94:5050/api/v1/archives_list",
          // contentType: 'application/json; charset=utf-8',
          data: data,
          headers: {
            "Authorization": "Basic " + btoa(token + ":" + '')
          },
          success: function (res){
            // alert('成功'); 
            console.log(res);
            console.log(res.data);
            _this.res_data = res.data;
            // console.log(_this.res_data[0].pictures[0].URL);
            
          }
        });
        
        
        
      },
    mounted(){

    },
    updated(){

    }
    }
    
</script>
<style lang="less" scoped>
    *{
        padding: 0;
        margin: 0;
    }
    ul,li{
        list-style:none;
    }
    .floors{
        width: 100%;
        height: 100%;
        background-color: #ededed;
        ul{
            li{
                margin-top: 30px;
                display: block;
                height: 300px;
                position: relative;
                .img_box{
                    width: 300px;
                    height: 250px;
                    background-color: green;
                    display: inline-block;
                }
                .goods_title{
                    width: 100%;
                    height: 50px;
                    background-color: yellow;
                }
                .goods_sample{
                    width: 900px;
                    height: 250px;
                    background-color: red;
                    position: absolute;
                    top: 50px;
                    left: 300px;
                    table{
                        tr{
                            td{
                                width: 150px;
                                height: 50px;
                            }
                        }
                    }
                }
            }
        }
    }
    .container{
        margin: 0 auto;
        width: 1200px;
        height: 100%;
        margin-left: 350px;
    }
</style>
