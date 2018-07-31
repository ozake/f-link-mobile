<template>
  <!--  section -->
  <section>
    <div class="box">
      <div class="src">
        <div class="tab">
          <ul>
            <li v-bind:class="{ on : nameFlag }" @click="tabSwich('name')"><span>이름 검색</span></li>
            <li v-bind:class="{ on : sectorFlag }" @click="tabSwich('sector')"><span>업종 검색</span></li>
          </ul>
        </div>
        <search-brand v-show="nameFlag"></search-brand>
        <sector-brand v-show="sectorFlag"></sector-brand>
      </div>
    </div>
  </section>
  <!--//  section -->
</template>

<script>
  import SearchBrand from './components/SearchBrnad.vue'
  import SectorBrand from './components/SectorBrand.vue'
  export default {
    name: 'Brands',
    data() {
      return {
        nameFlag: true,
        sectorFlag: false
      }
    },
    components : {
      SearchBrand,
      SectorBrand
    },
    created() {

    },
    watch : {

    },
    methods : {
      tabSwich(val) {
        if(val === 'name'){
          this.sectorFlag = false
          this.nameFlag = true
        }
        else if(val === 'sector') {
          this.nameFlag = false
          this.sectorFlag = true
        }
      }
    }
  }
</script>

<style>
.src .tab ul li span {
    font-size: 16px;
    color: #333;
    font-weight: 500;
    letter-spacing: -.7px;
    display: block;
}
.src .tab ul li.on span {
  color: #14a115;
  font-weight: 500;
}
</style>
