<template>
  <div class="home">
    <HelloWorld :item="treeData" @addChildren="addChildren">
      <!-- <template v-slot:default="{item}">
        <h6>{{item.name}}</h6>
      </template>-->
    </HelloWorld>
    <!-- <div class="father">
      <div class="children">
        1
        <div class="children">
          1
          <div class="children">
            1
            <div class="children">
              1
              <div class="children">
                1
                <div class="children">
                  1
                  <div class="children">
                    1
                    <div class="children">
                      1
                      <div class="children">1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
var treeData = {
  name:
    "用户ID:10339 账号:123456789@qq.com 推荐人账号:+8615999569636 工会人数:0 矿机租赁资产:-- 工会矿机租赁业绩:-- 等级:V0",
  children: []
};

import HelloWorld from "@/components/treeNode.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return { treeData: treeData };
  },
  methods: {
    addChildren(item) {
      item.children.push({
        name:
          "用户ID:10339 账号:123456789@qq.com 推荐人账号:+8615999569636 工会人数:0 矿机租赁资产:-- 工会矿机租赁业绩:-- 等级:V0",
        children: []
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  overflow-x: auto;
}
.father {
  width: 100%;
  .children {
    // width: 10000px;
    padding-left: 200px;
  }
}
</style>
