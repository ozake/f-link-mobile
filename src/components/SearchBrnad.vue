<template>
  <div class="contant">
    <div class="srch_wrap">
      <div class="srch_in">
      <input type="search" title="검색어 입력" @input="keyword" v-bind:value="searchTxt" class="inp" placeholder="브랜드/본사 이름 검색">
      <button type="button" class="bt_srch_02" onclick="toggleMenuSearchDiv()" style="display: block;"><span class="bt_srch_02_im"><span class="blind">검색</span></span></button>
      </div>
    </div>
    <ul class="search_complete">
      <li v-for="(item, index) in searchDisplay" @click="onClickItem(item)">{{item.txt}}</li>
    </ul>
  </div>
</template>

<script>
  import ApiModel from '../model/apiModel.js'
  export default {
    name: 'SearchBrand',
    data() {
      return {
        searchTxt: '',
        T: Object,
        searchDisplay: Array,
        apiModel: new ApiModel(this.$http)
      }
    },
    watch: {

    },
    created() {

    },
    methods: {
      keyword(e){
        clearTimeout(this.T)
        this.T = setTimeout(()=>{
            if(e.target.value !== ''){
              this.searchFc(e.target.value)
            }
            this.searchTxt = e.target.value
        },400)
      },
      searchFc(val) {
        if(val !== ''){
            this.apiModel.getFranchiseSearch(val).then((result)=>{
            if(result.status === 200){
                //console.log(result.data)
                let data = []

                /* for(let i=0; i<10; i++){
                    let tmpdata = {}
                    tmpdata.txt = result.data[i].brand
                    tmpdata.no = result.data[i].regnumber
                    data.push(tmpdata)
                } */
                let i=0
                for (const value of result.data) {
                    let tmpdata = {}
                    tmpdata.txt = value.brand
                    tmpdata.no = value.regnumber
                    data.push(tmpdata)
                    if(i===10){
                        break
                    }
                    i++
                }
                this.searchDisplay = data
            }
          })
        }
      },
      onClickItem(item) {
        console.log(item)
      },
    }
  }
</script>

<style>
.search_complete li {
  padding: 10px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
}
</style>
