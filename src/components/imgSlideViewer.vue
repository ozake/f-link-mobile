<template>
    <div>
        <div class="slider">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" v-for="url in img"><img :src="url" alt="슬라이드이미지"></li>
            </ul>
        </div>
        <div class="slider_btn prev">
            <img src="http://m.mk.co.kr/images/2018/franchise/btn_arrow_left.png" alt="슬라이드왼쪽버튼">
        </div>
        <div class="slider_btn next">
            <img src="http://m.mk.co.kr/images/2018/franchise/btn_arrow_right.png" alt="슬라이드오른쪽버튼">
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import Swiper from "swiper/dist/js/swiper";
export default {
    name: 'ImgSlideViewer',
    props : {
        img: Array
    },
    data() {
        return {
            swiper : Object
        }
    },
    watch: {
        img : function () {
          this.$nextTick(function () {
              this.setSwiper()
          })     
        }
    },
    methods: {
        setSwiper(){
          console.log('스와이퍼 실행')
        //   this.$refs.container.style.width = '1018px'
        let swiper = new Swiper('.slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            initialSlide: 0,
            allowTouchMove: true,
            // width: 1018,
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
            }
        })
        // swiper.updateProgress()
        // swiper.updateProgress()
        this.swiper = swiper
      },
    }
}
</script>

<style scoped>
.swiper-slide img {
    height: 100%;
}
.main ul li:first-child {
    margin-right: 0px;
}
.sale .main .slider ul {
    overflow: visible;
}
</style>