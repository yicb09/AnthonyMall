<template>
    <div>
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
  
</template>

<script>
import Common from "./Common.vue";
export default {
    components:{
        Common
    },
  data() {
    return {
        res:{},
        res_data:[],
        data:{
                'OrderID': 307,
                'page': 1, //当前页
                'per_page': 10 //每页显示数量
            },
        tableData3: [
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   date: "2016-05-08",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   date: "2016-05-06",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   date: "2016-05-07",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // }
      ],
      multipleSelection: []
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },

  created() {
    var data = {
            'OrderID': 307,
            'page': 1, //当前页
            'per_page': 10 //每页显示数量
        };
    var _this = this;
    var token = _this.$store.state.token;
    $.ajax({
      type: "GET",
      url: "http://192.168.0.94:5050/api/v1/order_list",
      // contentType: 'application/json; charset=utf-8',
      data: data,
      headers: {
        Authorization: "Basic " + btoa(token + ":" + "")
      },
      success: function(res) {
        console.log(123);
        console.log(res);
        _this.res_data = res.data;

      }
    });
  }
};
</script>