<template>
  <div id="wrapper" data-role="page">
    <Header :subHeaderTitle="subHeaderTitle"></Header>
    <router-view></router-view>
    <Footer v-if="footerFlag"></Footer>
    <div class="nav_bg" v-show="navBgFlag" @click="sideMenuOff"></div>
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
export default {
  name: 'app',
  components:{
    Header,
    Footer
  },
  data(){
      return {
          navBgFlag : false,
          subHeaderTitle: '',
          footerFlag: true
      }
  },
  created(){
    this.$EventBus.$on('navBgOnOff', this.navBgOnOff)
    this.makeHeaderTitle()
  },
  watch: {
    $route: function () {
      this.makeHeaderTitle()
    }
  },
  methods: {
    navBgOnOff(){
		  if(this.navBgFlag){
			  this.navBgFlag = false
		  }else {
			  this.navBgFlag = true
		  }
    },
    sideMenuOff(){
      this.$EventBus.$emit('sideMenuOff', '')
    },
    makeHeaderTitle(){
      let path = this.$route.path
      let matchArr = path.split('/', 3)
      let matchStr =  matchArr[2]
      switch (matchStr) {
        case 'store':
          this.subHeaderTitle = '우리동네 매장'
          this.footerFlag = false
          break;
        case 'storeView':
          this.subHeaderTitle = '매장 상세정보'
          this.footerFlag = true
          break;
        case 'sales':
          this.subHeaderTitle = '상가점포 매물검색'
          this.footerFlag = false
          break;
        case 'salesView':
          this.subHeaderTitle = '매물 상세정보'
          this.footerFlag = true
          break;
        case 'brands':
          this.subHeaderTitle = '브랜드 검색'
          this.footerFlag = true
          break;

        default:
          this.subHeaderTitle = ''
          this.footerFlag = true
          break;
      }
      /* if(this.$route.path === '/m/store'){
        this.footerFlag = true
      }else {
        this.footerFlag = false
      } */
    }
  }
}
</script>
<style>
/* #wrapper {
  height: 95vh;
} */
</style>

