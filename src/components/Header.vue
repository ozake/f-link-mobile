<template>
    <div v-bind:class="{ main_bg: isMain }">
        <!-- nav -->
		<nav style='right:-285px; position: fixed;' ref="nav">
			<ul class="menu_login">
				<li v-if="Nauth"><a href="http://www.f-link.co.kr/m/index.php?TM=M&MM=1">로그인</a></li>
				<li v-if="Nauth"><a href="http://www.f-link.co.kr/m/index.php?TM=M&MM=2">회원가입</a></li>
				<li class="menu_info" v-if="!Nauth">
					<a href="http://www.f-link.co.kr/m/index.php?TM=M&MM=5">
						<img src="http://m.mk.co.kr/images/2018/franchise/img_login.png" alt="회원정보">{{sessionstroage.ID}}
					</a>
				</li>
				<li class="logout" v-if="!Nauth"><a href="http://www.f-link.co.kr/m/index.php?TM=M&MM=4">로그아웃</a></li>
				<li><button type="button" @click="sideMenuOnOff"><span class="ic_close"></span></button></li>
			</ul>
			<ul class='menu_list'>
				<li><router-link :to="{ path: '/m/' }"><img src="http://m.mk.co.kr/images/2018/franchise/ico_menu_home.png" alt="홈">홈</router-link></li>
				<li><router-link :to="{ name: 'store-page' }"><img src="http://m.mk.co.kr/images/2018/franchise/ico_menu_loca.png" alt="우리동네 매장">우리동네 매장</router-link></li>
				<li><router-link :to="{ name: 'sales-page' }"><img src="http://m.mk.co.kr/images/2018/franchise/ico_menu_building.png" alt="상가매물">상가매물</router-link></li>
				<li><router-link :to="{ name: 'brands-page' }"><img src="http://m.mk.co.kr/images/2018/franchise/ico_menu_store.png" alt="브랜드">브랜드</router-link></li>
				<li><a href="http://www.f-link.co.kr/m/index.php?TM=C"><img src="http://m.mk.co.kr/images/2018/franchise/ico_menu_sale.png" alt="착한 컨설팅">착한 컨설팅</a></li>
				<li><a href="http://www.f-link.co.kr/m/index.php?TM=N"><img src="http://m.mk.co.kr/images/2018/franchise/ico_menu_news.png" alt="창업뉴스">창업뉴스</a></li>
				<li><a href="http://www.f-link.co.kr/m/index.php?TM=D"><img src="http://m.mk.co.kr/images/2018/franchise/ico_menu_event.png" alt="이벤트">이벤트</a></li>
			</ul>
		</nav>
		<!--// nav -->

		<!--  header -->
		<header>
			<ul>
				<li class="logo" v-if="isMain"><span><img src="http://m.mk.co.kr/images/2018/franchise/img_main_logo.png" alt="프랜차이즈링크"></span></li>
				<li class="back" v-show="!isMain" @click="back"><img src="http://m.mk.co.kr/images/2018/franchise/btn_back.png" alt="뒤로가기"></li>
				<li class="title" v-if="!isMain">{{subHeaderTitle}}</li>
				<li class="menu" ><img src="http://m.mk.co.kr/images/2018/franchise/btn_main_menu.png" @click="sideMenuOnOff" alt="메뉴"></li>
			</ul>
		</header>
		<!--// header  -->
    </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
	  return {
		  sideMenuFlag: false,
		  isMain: true,
		  Nauth : true,
		  isMkUser : false,
		  sessionstroage : '',
	  }
  },
  props: {
	  subHeaderTitle: String
  },
  created(){
	  this.$EventBus.$on('sideMenuOff', this.sideMenuOnOff)
	  //console.log(this.$route.path)
	  if(this.$route.path === '/m/' || this.$route.path === '/m'){
		  this.isMain = true
	  }else {
			this.isMain = false
	  }

	  this.sessionCheck()
  },
  watch: {
	  $route: function() {
		  //console.log(this.$route.path)
		if(this.$route.path === '/m/' || this.$route.path === '/m') {
			this.isMain = true
		}else {
			this.isMain = false
		}
		if(this.sideMenuFlag){
			  this.sideMenuFlag = false
			  this.$refs.nav.style.right = '-285px'
			  this.$EventBus.$emit('navBgOnOff', this.sideMenuFlag)
		}

	  }
  },
  methods: {
	  sideMenuOnOff(){
		  if(this.sideMenuFlag){
			  this.sideMenuFlag = false
			  this.$refs.nav.style.right = '-285px'
			  this.$EventBus.$emit('navBgOnOff', this.sideMenuFlag)
		  }else {
			  this.sideMenuFlag = true
			  this.$refs.nav.style.right = '0px'
			  this.$EventBus.$emit('navBgOnOff', this.sideMenuFlag)
		  }
	  },
	  back(){
		  history.back()
	  },
	  sessionCheck(){
      this.$http.get("http://www.f-link.co.kr/member/sessionCheck.php").then((result)=>{
        if(result.status === 200){
          let data = result.data
          if(data.SESSION){
            if(! sessionStorage.getItem('ID')){
              for (const key in data) {
                if (data.hasOwnProperty(key)) {
                  const element = data[key];
                  sessionStorage.setItem(key, element)
                }
              }
            }
            this.getAuth()
          }else if(!data.SESSION && sessionStorage.getItem('ID')){
            sessionStorage.clear()
          }
        }
      })
    },
    getAuth(){
      if(sessionStorage.getItem('ID')) {
        this.Nauth = false
        this.sessionstroage = sessionStorage
        //console.log(sessionStorage.getItem('PROVIDER'))
        if(sessionStorage.getItem('PROVIDER') === 'MK'){
          this.isMkUser = true
        }
      }
      else{

      }
    },
  }
}
</script>
<style>
header .title {
	color: #fff;
}
header .logo span {display: block;overflow: hidden;width: 200px;margin: 0 auto;padding-top: 12px}
</style>
