<template>
    <div>
        <common></common>
        <div class="order_detail">
            <!-- <ul>
                <li v-for="(item, index) in res_data" :key="index"> 
                    {{index}}
                </li>
            </ul> -->
            <table>
                <tr>
                    <td>序号</td>
                    <td>订单编号</td>
                    <td>OrderDate</td>
                    <td>ClassName</td>
                    <td>ClothesName</td>
                    <td>CustomerNo</td>
                    <td>FStatusName</td>
                    <td>FollowEmpName</td>
                    <td>IsRelease</td>
                    <td>QuarterName</td>
                    <td>TotalMoneyTax</td>
                </tr>
                <tr v-for="(item, index) in res_data" :key="index">
                    <td>{{index}}</td>
                    <td>{{item.OrderNo}}</td>
                    <td>{{item.OrderDate}}</td>
                    <td>{{item.ClassName}}</td>
                    <td>{{item.ClothesName}}</td>
                    <td>{{item.CustomerNo}}</td>
                    <td>{{item.FStatusName}}</td>
                    <td>{{item.FollowEmpName}}</td>
                    <td>{{item.IsRelease}}</td>
                    <td>{{item.QuarterName}}</td>
                    <td>{{item.TotalMoneyTax}}</td>
                </tr>
            </table>
            <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="113">
            </el-pagination>
        </div>
        </div>
        
    </div>
</template>
<script>
import Common from "./Common.vue";
export default {
    components:{
        Common
    },
    data(){
        return{
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            res:{},
            res_data:[],
            data : {
                'OrderID': 307,
                'page': 1, //当前页
                'per_page': 10 //每页显示数量
            }
        }
    },
    methods:{
        get_data() {
            var _this=this;
            var token = _this.$store.state.token;
            $.ajax
            ({
                type: "GET",
                url: "http://192.168.0.94:5050/api/v1/order_list",
                // contentType: 'application/json; charset=utf-8',
                data: this.data,
                headers: {
                    "Authorization": "Basic " + btoa(token + ":" + '')
                },
                success: function (res){
                    console.log(123);
                    console.log(res);
                    _this.res_data = res.data;
            
                }
            });
        },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        // console.log(data);
        this.data['page'] =  `${val}`;
        console.log(this.data['page']);
        this.get_data()
        
      }
    },
    created() {
        this.get_data()
        
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
    .order_detail{
        margin-left: 350px;
        table{
            tr{
                td{
                    width: 150px;
                    height: 50px;
                }
            }
        }
    }

</style>
