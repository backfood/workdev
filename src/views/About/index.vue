<template>
  <div class="about">
    <el-row>
      <span class>
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </span>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column label="配送信息">
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column label="地址">
            <el-table-column prop="province" label="省份" width="120"></el-table-column>
            <el-table-column prop="city" label="市区" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" width="300"></el-table-column>
            <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <!-- <mutileheader></mutileheader> -->
    </el-row>
  </div>
</template>
<script>
// import mutileheader from "./mutileheader";
export default {
  name: "exportexcel",
  components: {
    // mutileheader
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",

          address: "上海市普陀区金沙江路 1518 弄",
          city: "普陀区",
          zip: 200333
        }
      ]
    };
  },
  // mounted() {
  //   let tableData = this.tableData;
  //   let res = tableData.map(e => Object.values(e));
  // console.log(res)
  // },
  created() {},
  mounted() {
    // let tHeader = [
    //   ["日期", "配送信息"],
    //   [null, "姓名", "地址"],
    //   [null, null, "省份", "市区", "地址", "邮编"]
    // ]; // 上面设置Excel的表格第一行的标题
    let filterVal = ["date", "name", "province", "city", "address", "zip"]; // 上面的index、nickName、name是tableData里对象的属性key值
    let list = this.tableData; //把要导出的数据tableData存到list
    // const data = this.formatJson(filterVal, list);
    const merges = ["A1:A3", "B1:F1", "B2:B3", "C2:F2"];
    let name = "列表excel";
    let params = {
      tHeader: [
        ["日期", "配送信息"],
        [null, "姓名", "地址"],
        [null, null, "省份", "市区", "地址", "邮编"]
      ],
      dataList: {
        data: this.tableData,
        sortCol: filterVal
      },
      name,
      merges
    };
  },
  methods: {
    exportExcel() {
      const { export_json_to_excel } = require("./Export2Excel.js");
      let tHeader = [
        ["日期", "配送信息"],
        [null, "姓名", "地址"],
        [null, null, "省份", "市区", "地址", "邮编"]
      ]; // 上面设置Excel的表格第一行的标题
      let filterVal = ["date", "name", "province", "city", "address", "zip"]; // 上面的index、nickName、name是tableData里对象的属性key值
      let list = this.tableData; //把要导出的数据tableData存到list
      // const data = this.formatJson(filterVal, list);
      const merges = ["A1:A3", "B1:F1", "B2:B3", "C2:F2"];
      let name = "列表excel";
      let dataList= {
          'data': this.tableData,
          'sortCol': filterVal
        }
      const params = {
       tHeader,
        
        name,
        merges
      };
      export_json_to_excel(tHeader,dataList,name,merges); //表头 数据 表名 合并规则
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
       * return 数字的行数组 //["2016-05-02", "上海市普陀区金沙江路 1518 弄", "王小虎"]
       */
      console.log(jsonData.map(v => filterVal.map(j => v[j])));
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
