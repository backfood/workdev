<template>
  <div>
    <button class="copy" @click="copy">复制</button>
  </div>
</template>

<script>
export default {
  name: "copy",
  methods: {
    copy() {
      console.log("1111触发了");
      const range = document.createRange(); //创建一个range对象
      // num++
      let div = document.createElement("div");
      div.id = "text";
      div.opacity = 0;
      div.innerText = "这是一段文本";
      document.body.appendChild(div);
      let copyDIV = document.getElementById("text");
      console.log(div.style);
      //使用innerhtml只可以触发一次
      // document.body.innerHTML += `<div id="text" style="opacity: 0;">
      // 	这是一段文本
      // </div>`
      // let node = document.getElementById(div)
      range.selectNode(copyDIV); //使range包含某个节点的内容
      const selection = window.getSelection(); //创建一个selection对象
      //selection.rangeCount返回选区中range对象数量的只读属性
      //在用户点击一个加载完毕的新打开页面之前，rangeCount的值是0，使用者点击页面之后，其值变为1 即并没有可忽视的选区
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      document.body.removeChild(copyDIV);
      console.log("复制成功");
    },
  },
};
</script>

<style>
</style>