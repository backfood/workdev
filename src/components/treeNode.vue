<template>
  <div class="item">
    <div class="li-body">
      <span class="line-align"></span>
      <div :class="{bold: hasChildren,}">
        <span v-if="hasChildren">
          <span @click="toggle" v-if="isOpen">-</span>
          <span @click="addchildren(item)" v-else>+</span>
        </span>
        <span>
          <slot :item="item">{{ item.name }}</slot>
          <button @click="addchildren(item)" style="border:node;">新增</button>
        </span>
      </div>
      <div v-show="isOpen" v-if="hasChildren" class="item-ul li-body">
        <span class="line-vertical"></span>
        <treeNode
          class="item"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          @addChildren="$emit('addChildren',$event)"
        ></treeNode>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "treeNode",
  props: {
    item: Object
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    hasChildren() {
      return this.item.children && this.item.children.length;
    }
  },
  mounted() {
    //   console.log(this)
  },
  methods: {
    toggle() {
      if (this.hasChildren) {
        this.isOpen = !this.isOpen;
      }
    },
    addchildren(item) {
      this.toggle();
      this.$emit("addChildren", item);
      this.isOpen = true;
    }
  }
};
</script>

<style>
.item {
  cursor: pointer;
  font-family: Menlo, Consolas, monospace;
  color: #444;
  white-space: nowrap;
}

.bold {
  font-weight: bold;
  
}
.li-body {
  padding-left: 20px;
  line-height: 28px;
  position: relative;
}

.item-ul {
  position: relative;
}

.line-vertical {
  width: 3px;
  content: "";
  display: block;
  background-color: rgb(102, 80, 80);
  clear: both;
  position: absolute;
  top: -4px;
  bottom: 14px;
  left: 20px;
}

.line-align {
  display: inline-block;
  content: "";
  width: 10px;
  height: 3px;
  display: block;
  background-color: rgb(102, 80, 80);
  position: absolute;
  top: 12px;
  left: 0;
}
</style>