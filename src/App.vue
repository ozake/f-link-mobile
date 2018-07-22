<template>
  <div id="wrapper" data-role="page">
    <Header :subHeaderTitle="subHeaderTitle"></Header>
    <router-view></router-view>
    <Footer v-if="!isStore"></Footer>
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
          isStore: false
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
          break;
        case 'storeView':
          this.subHeaderTitle = '매장 상세정보'
          break;

        default:
          this.subHeaderTitle = ''

          break;
      }
      if(this.$route.path === '/m/store'){
        this.isStore = true
      }else {
        this.isStore = false
      }
    }
  }
}
</script>
<style>
/* #wrapper {
  height: 95vh;
} */
</style>

