<template>
  <div class="about">
    <el-row>
      <span class>
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </span>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import Blob from "./Blob";
import Export2Excel from "./Export2Excel.js";
export default {
  name: "exportexcel",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  mounted() {},
  created() {},
  methods: {
    exportExcel() {
      const { export_json_to_excel } = require("./Export2Excel.js");
      const tHeader = ["时间", "地址", "姓名"]; // 上面设置Excel的表格第一行的标题
      const filterVal = ["date", "address", "name"]; // 上面的index、nickName、name是tableData里对象的属性key值
      const list = this.tableData; //把要导出的数据tableData存到list
      const data = this.formatJson(filterVal, list);
      export_json_to_excel(tHeader, data, "列表excel"); //最后一个是表名字
    },
    formatJson(filterVal, jsonData) {
      /**
       * filterVal = ["date", "address", "name"]
       * v={
       *    date: "2016-05-03",
       *    name: "王小虎",
       *    address: "上海市普陀区金沙江路 1516 弄" 
       *    }
       * j= data
       * v[j] 即 具体值
       *
       * 数组map后返回数组
       */
      console.log(jsonData.map(v => filterVal.map(j => v[j])))
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>
<style lang="less" scoped>
.right {
  float: right;
}
</style>
