<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">树组件</router-link> |
      <router-link to="/export">文档导出</router-link> |
      <router-link to="/svgdemo">svg</router-link>|
      <router-link to="/tree">tree</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: auto;
  a{
    text-decoration: none;
  }
  #nav{
    display: flex;
    justify-content: center;
    color: greenyellow;
    font-size: 24px;
    margin-bottom: 12px;
  }
}
</style>
