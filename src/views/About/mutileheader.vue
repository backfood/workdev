<template>
  <!-- 授权信息 -->
  <div class="door">
    <el-form :inline="true" :model="elform" class="demo-form-inline" size="mini">
      <el-form-item label="区域:" label-width="50px">
        <el-select
          v-model="defaultArea"
          placeholder="请选择"
          size="mini"
          clearable
          style="width:140px"
          @change="selectArea"
        >
          <el-option label="全部类型" value></el-option>
          <el-option
            v-for="item in areaInfoList"
            :key="item.areaGuid"
            :label="item.areaName"
            :value="item.areaGuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼栋:" label-width="50px">
        <el-select
          v-model="defaultBuilding"
          placeholder="请选择"
          size="mini"
          clearable
          style="width:100px"
        >
          <el-option label="全部类型" value></el-option>
          <el-option
            v-for="item in buildingInfoList"
            :key="item.buildingGuid"
            :label="item.buildingName"
            :value="item.buildingGuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间:" label-width="50px">
        <el-input v-model="roomName" placeholder="名称" size="mini" clearable style="width:110px"></el-input>
      </el-form-item>
      <el-form-item label="姓名/编号/卡号:" label-width="110px">
        <el-input v-model="userName" placeholder="名称" size="mini" clearable style="width:110px"></el-input>
      </el-form-item>
      <el-form-item class="searchmarigin">
        <el-button type="primary" @click="onSubmit" size="mini" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onExport" size="mini" icon="el-icon-document-copy">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 房内人员信息显示 -->
    <div class="my_table">
      <el-table
        v-loading="loading"
        :data="detailslist"
        ref="table"
        border
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="roomName" label="房间" align="center"></el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          v-if="formThead.userName.checked"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="departmentName"
          label="部门"
          v-if="formThead.departmentName.checked"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cardNumber"
          label="卡号"
          v-if="formThead.cardNumber.checked"
          align="center"
        ></el-table-column>

        <!-- 开门-礼拜 -->
        <el-table-column prop="Sunday" label="星期" v-if="formThead.Sunday.checked" align="center">
          <el-table-column
            prop="monday"
            label="一"
            v-if="formThead.monday.checked"
            align="center"
            width="35px"
          >
            <template slot-scope="scope">
              <el-checkbox
                :model="scope.row.monday"
                :checked="scope.row.monday == 1"
                @change="handleChange(scope.row,'monday')"
                :disabled="true"
                style="padding:0"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="tuesday"
            label="二"
            v-if="formThead.tuesday.checked"
            align="center"
            width="35px"
          >
            <template slot-scope="scope">
              <el-checkbox
                :model="scope.row.tuesday"
                :checked="scope.row.tuesday == 1"
                @change="handleChange(scope.row,'tuesday',scope.$index)"
                :disabled="true"
              ></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column
            prop="wednesday"
            label="三"
            v-if="formThead.wednesday.checked"
            align="center"
            width="35px"
            :disabled="true"
          >
            <template slot-scope="scope">
              <el-checkbox
                :model="scope.row.wednesday"
                :checked="scope.row.wednesday == 1"
                @change="handleChange(scope.row,'wednesday')"
                :disabled="true"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="thursday"
            label="四"
            v-if="formThead.thursday.checked"
            align="center"
            width="35px"
          >
            <template slot-scope="scope">
              <el-checkbox
                :model="scope.row.thursday"
                :checked="scope.row.thursday == 1"
                @change="handleChange(scope.row,'thursday')"
                :disabled="true"
              ></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column
            prop="friday"
            label="五"
            v-if="formThead.friday.checked"
            align="center"
            width="35px"
          >
            <template slot-scope="scope">
              <el-checkbox
                :model="scope.row.friday"
                :checked="scope.row.friday == 1"
                @change="handleChange(scope.row,'friday')"
                :disabled="true"
              ></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column
            prop="saturday"
            label="六"
            v-if="formThead.saturday.checked"
            align="center"
            width="35px"
          >
            <template slot-scope="scope">
              <el-checkbox
                :model="scope.row.saturday"
                :checked="scope.row.saturday == 1"
                @change="handleChange(scope.row,'saturday')"
                :disabled="true"
              ></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column
            prop="sunday"
            label="日"
            v-if="formThead.sunday.checked"
            align="center"
            width="35px"
          >
            <template slot-scope="scope">
              <el-checkbox
                :model="scope.row.sunday"
                :checked="scope.row.sunday == 1"
                @change="handleChange(scope.row,'sunday')"
                :disabled="true"
              ></el-checkbox>
            </template>
          </el-table-column>
        </el-table-column>

        <!-- 星期时段 -->
        <el-table-column
          prop="SundayTime"
          label="星期时段"
          v-if="formThead.SundayTime.checked"
          align="center"
        >
          <el-table-column
            prop="mondayTimeStageIndex"
            label="一"
            v-if="formThead.mondayTimeStageIndex.checked"
            align="center"
            width="38px"
          ></el-table-column>
          <el-table-column
            prop="tuesdayTimeStageIndex"
            label="二"
            v-if="formThead.tuesdayTimeStageIndex.checked"
            align="center"
            width="38px"
          ></el-table-column>

          <el-table-column
            prop="wednesdayTimeStageIndex"
            label="三"
            v-if="formThead.wednesdayTimeStageIndex.checked"
            align="center"
            width="38px"
          ></el-table-column>

          <el-table-column
            prop="thursdayTimeStageIndex"
            label="四"
            v-if="formThead.thursdayTimeStageIndex.checked"
            align="center"
            width="38px"
          ></el-table-column>
          <el-table-column
            prop="fridayTimeStageIndex"
            label="五"
            v-if="formThead.fridayTimeStageIndex.checked"
            align="center"
            width="38px"
          ></el-table-column>
          <el-table-column
            prop="saturdayTimeStageIndex"
            label="六"
            v-if="formThead.saturdayTimeStageIndex.checked"
            align="center"
            width="38px"
          ></el-table-column>
          <el-table-column
            prop="sundayTimeStageIndex"
            label="日"
            v-if="formThead.sundayTimeStageIndex.checked"
            align="center"
            width="38px"
          ></el-table-column>
        </el-table-column>
        <!-- 假日时段 -->
        <el-table-column
          prop="holidayTimeStageIndex"
          label="假日时段"
          v-if="formThead.holidayTimeStageIndex.checked"
          align="center"
          width="50px"
        ></el-table-column>
        <el-table-column
          prop="backLock"
          label="反锁开门"
          v-if="formThead.backLock.checked"
          align="center"
          width="50px"
        >
          <template slot-scope="scope">
            <el-checkbox
              :model="scope.row.backLock"
              :checked="scope.row.backLock == 1"
              @change="handleChange(scope.row,'backLock')"
              :disabled="true"
            ></el-checkbox>
          </template>
        </el-table-column>
        <!-- 有效时间 -->
        <el-table-column
          prop="endTime"
          label="开门有效期"
          v-if="formThead.endTime.checked"
          align="center"
          max-width="160px"
        ></el-table-column>

        <!-- 授权状态 -->
        <el-table-column
          prop="empowerType"
          label="授权类型"
          v-if="formThead.empowerType.checked"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.empowerType | handleEmpowerType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateFlag" label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.updateFlag+","+ scope.row.downloadState}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChangepage"
        :current-page="currentPage"
        :page-sizes="[5,10,15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="recordCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
// import bus from "@/bus.js";
export default {
  data() {
    return {
      // 导出表格名称
      filename: "授权信息",
      elform: {},
      // 默认选择的quyu
      defaultArea: "",
      // 区域列表
      areaInfoList: [],
      // 楼栋默认
      defaultBuilding: "",
      // 楼栋列表
      buildingInfoList: [],
      // 房间号信息
      roomName: "",
      // 姓名/编号/卡号信息
      userName: "",
      loading: false,
      // 房内授权信息
      detailslist: [],
      pageNum: 1,
      pageSize: 10,
      currentPage: 1,
      recordCount: 0,
      searchInfo: {},
      // 授权信息表头
      formThead: {
        userName: {
          label: "用户",
          prop: "userName",
          checked: true
        },
        departmentName: {
          label: "编号",
          prop: "departmentName",
          checked: true
        },
        cardNumber: {
          label: "卡号",
          prop: "cardNumber",
          checked: true
        },
        endTime: {
          label: "开门有效期",
          prop: "endTime",
          checked: true
        },
        backLock: {
          label: "反锁开门",
          prop: "backLock",
          checked: true
        },
        Sunday: {
          label: "星期",
          prop: "backLock",
          checked: true
        },
        monday: {
          label: "星期一",
          prop: "monday",
          checked: true
        },

        tuesday: {
          label: "星期二",
          prop: "tuesday",
          checked: true
        },
        wednesday: {
          label: "星期三",
          prop: "wednesday",
          checked: true
        },
        thursday: {
          label: "星期四",
          prop: "thursday",
          checked: true
        },
        friday: {
          label: "星期五",
          prop: "friday",
          checked: true
        },
        saturday: {
          label: "星期六",
          prop: "saturday",
          checked: true
        },
        sunday: {
          label: "星期日",
          prop: "sunday",
          checked: true
        },
        SundayTime: {
          label: "星期时段",
          prop: "SundayTime",
          checked: true
        },
        mondayTimeStageIndex: {
          label: "星期一",
          prop: "mondayTimeStageIndex",
          checked: true
        },
        tuesdayTimeStageIndex: {
          label: "星期二",
          prop: "tuesdayTimeStageIndex",
          checked: true
        },
        wednesdayTimeStageIndex: {
          label: "星期三",
          prop: "wednesdayTimeStageIndex",
          checked: true
        },
        thursdayTimeStageIndex: {
          label: "星期四",
          prop: "thursdayTimeStageIndex",
          checked: true
        },
        fridayTimeStageIndex: {
          label: "星期五",
          prop: "fridayTimeStageIndex",
          checked: true
        },
        saturdayTimeStageIndex: {
          label: "星期六",
          prop: "saturdayTimeStageIndex",
          checked: true
        },
        sundayTimeStageIndex: {
          label: "星期七",
          prop: "sundayTimeStageIndex",
          checked: true
        },
        holidayTimeStageIndex: {
          label: "假日时段",
          prop: "holidayTimeStageIndex",
          checked: true
        },
        empowerType: {
          label: "授权状态",
          prop: "empowerType",
          checked: true
        }
      }
    };
  },
  computed: {
    changeschoolid: {
      get() {
        return this.$store.state.user.changeschoolid;
      }
    }
  },
  created() {
    this.userGuid = sessionStorage.getItem("administrator");
    // 区域列表
    this.getAreaInfo();
  },
  filters: {
    handleEmpowerType(empower) {
      if (empower == 0) {
        return "未授权";
      }
      if (empower == 1) {
        return "指定房间";
      }
      if (empower == 2) {
        return "临时授权";
      }
      if (empower == 2) {
        return "导入授权";
      }
    }
  },
  mounted() {
    bus.$on("listenToA", this.getHeaderDate);
  },
  props: ["datetime", "unitGuid", "consumptionpoint", "radio", "roomGuid"],
  methods: {
    // 区域查询
    getAreaInfo() {
      this.$http({
        url: this.$http.adornUrl("/area/room/area-info-search"),
        method: "post",
        data: this.$http.adornData({
          messageContent: {
            unitGuid: this.changeschoolid,
            userGuid: this.userGuid
          },
          messageType: 0
        })
      }).then(({ data }) => {
        if (data.messageCode == 200) {
          this.areaInfoList = data.messageContent;
          console.log(data.messageContent);
        } else {
          this.$message.error(data.errorMessage);
        }
      });
    },
    // 选择区域后触发
    selectArea() {
      console.log(this.defaultArea);
      this.defaultBuilding = "";
      // 获取对应区域内的楼栋信息
      this.$http({
        url: this.$http.adornUrl("/area/room/get-area-building"),
        method: "post",
        data: this.$http.adornData({
          messageContent: {
            areaGuid: this.defaultArea
          },
          messageType: 0
        })
      }).then(({ data }) => {
        if (data.messageCode == 200) {
          this.buildingInfoList = data.messageContent;
          console.log(data.messageContent);
        } else {
          this.$message.error(data.errorMessage);
        }
      });
      // this.getAreaInfo();
    },

    // 查询
    onSubmit() {
      let searchInfo = {};
      // 区域限定
      if (this.defaultArea != "") {
        searchInfo.areaGuid = this.defaultArea;
      }
      // 楼栋限定
      if (this.defaultBuilding != "") {
        searchInfo.buildingGuid = this.defaultBuilding;
      }
      // 姓名/编号/卡号  规则
      if (this.userName != "") {
        searchInfo.userData = this.userName;
      }
      // 房间限定
      if (this.roomName != "") {
        searchInfo.roomName = this.roomName;
      }
      searchInfo.unitGuid = this.changeschoolid;
      this.$http({
        url: this.$http.adornUrl("/terminal/doorLock/empower-name-search-page"),
        method: "post",
        data: this.$http.adornData({
          messageContent: {
            asc: true,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            searchInfo: searchInfo
          },
          messageType: 0
        })
      }).then(({ data }) => {
        console.log(data);
        if (data.messageCode == 200) {
          this.$message({
            message: "查询成功",
            type: "success"
          });
          this.detailslist = data.messageContent.data;
          this.recordCount = data.messageContent.recordCount;
          console.log(data.messageContent.data);
        } else {
          this.$message.error(data.errorMessage);
        }
      });
    },
    // 导出数据需要用到的
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    // 导出
    onExport() {
      if (this.detailslist.length == 0) {
        this.$message({
          message: "无数据可导出",
          type: "warning"
        });
        return false;
      }
      console.log("导出");
      require.ensure([], () => {
        let multiHeader = [
          [
            "房间",
            "姓名",
            "部门",
            "卡号",
            "星期",
            "",
            "",
            "",
            "",
            "",
            "",
            "星期时段",
            "",
            "",
            "",
            "",
            "",
            "",
            "假日时段",
            "反锁开门",
            "有效期",
            "授权类型"
          ]
        ];
        let merges = [
          "A1:A2",
          "B1:B2",
          "C1:C2",
          "D1:D2",
          "E1:K1",
          "L1:R1",
          "S1:S2",
          "T1:T2",
          "U1:U2",
          "V1:V2"
        ];
        let tHeader = [
          "房间",
          "姓名",
          "部门",
          "卡号",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六",
          "日",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六",
          "日",
          "假日时段",
          "反锁开门",
          "有效期",
          "授权类型"
        ];
        let filterValArr = [
          "roomName",
          "userName",
          "departmentName",
          "cardNumber",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
          "mondayTimeStageIndex",
          "tuesdayTimeStageIndex",
          "wednesdayTimeStageIndex",
          "thursdayTimeStageIndex",
          "fridayTimeStageIndex",
          "saturdayTimeStageIndex",
          "sundayTimeStageIndex",
          "holidayTimeStageIndex",
          "backLock",
          "endTime",
          "empowerType"
        ];
        const { export_json_to_excel } = require("./Export2Excel");
        const filterVal = filterValArr;
        const list = this.detailslist;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader,
          header: tHeader,
          data,
          merges,
          filename: this.filename + this.getimeto(),
          tableheader: "2"
        });
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.onSubmit();
    },
    handleCurrentChangepage(val) {
      this.pageNum = val;
      this.onSubmit();
    },
    getHeaderDate(val) {
      this.formThead = val;
    }
  }
};
</script>

<style lang="less" scoped>
.door {
  padding: 20px;
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.TimeWeek {
  padding: 20px 0 0;
}
.el-dialog--center .el-dialog__body {
  padding: 0 50px;
}
// 隐藏纵向滚动条
</style>
