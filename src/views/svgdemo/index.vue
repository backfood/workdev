<template>
  <div>
    <div>
      <svg width="800px" height="400px" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 300 C 100 300, 100 0, 200 0" stroke="black" fill="transparent" />
        <path d="M0 300 C 100 300, 100 0, 200 0" stroke="black" fill="transparent" />
        <path
          d="M10 315
           L 110 215
           A 30 50 0 0 1 162.55 162.45
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10"
          stroke="black"
          fill="green"
          stroke-width="2"
          fill-opacity="0.5"
        />
      </svg>
    </div>
    <div>svg</div>
    <div>
      <div>{{$t('common.home')}}</div>
    </div>
    <div @click="toggle">多语言</div>
    <div>
      <el-button @click="tree">tree</el-button>
      <el-button @click="svg">svg</el-button>
      <el-button @click="xslx">xslx</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "sGdemo",
  data() {
    return {
      isChinese: false
    };
  },
  created(){
    console.log(this.$route.query)
    let query=window.location.search.substr(1).split("=")
    console.log(query[1])
  },
  methods: {
    toggle() {
      this.isChinese = !this.isChinese;
      if (this.isChinese) {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "zh";
      }
    },
    tree(){
      this.$router.push('/tree?languaage=en')
    },
    svg(){
      this.$router.push('/svgdemo?languaage=zh')
    },
    xslx(){
      this.$router.push('/export?languaage=jp')
    }
  }
};
</script>

<style>
</style>