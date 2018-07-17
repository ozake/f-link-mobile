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
      switch (this.$route.path) {
        case '/store':
          this.subHeaderTitle = '우리동네 매장'
          break;
      
        default:
          this.subHeaderTitle = ''
          
          break;
      }
      if(this.$route.path === '/store'){
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

