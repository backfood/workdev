<template>
  <div>
    <nodetree :item="treeData" @addChildren="addChildren">
      <template v-slot:default="{item}">{{ item.name }}</template>
    </nodetree> 
    <el-tree ref="tree" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import nodetree from "./nodetree";
export default {
  name: "tree",
  components: {
    nodetree
  },
  data() {
    return {
      treeData: {
        name:
          "用户ID:10339 账号:123456789@qq.com 推荐人账号:+8615999569636 工会人数:0 矿机租赁资产:-- 工会矿机租赁业绩:-- 等级:V0",
        children: []
      },
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created(){
    console.log(this.$route.query)
    let query=window.location.search.substr(1).split("=")
    console.log(query[1])
  },
  mounted() {
    // console.log(this.$refs.tree);
  },
  methods: {
    addChildren(item) {
      item.children.push({
        name:
          "用户ID:10339 账号:123456789@qq.com 推荐人账号:+8615999569636 工会人数:0 矿机租赁资产:-- 工会矿机租赁业绩:-- 等级:V0",
        children: []
      });
    },
    handleNodeClick(data) {
      // console.log(data);
    }
  }
};
</script>

<style>
</style>