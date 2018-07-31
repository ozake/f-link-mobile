<template>
    <!--  section -->
    <section>
        <div class="list">
            <div class="box">
                <div class="src">
					<div class="contant">
                        <div>
                            <h1>창업자금 <span class="label">단위 : 만원</span></h1>
                            <ul class="select_02">								
                                <li>
                                    <select v-model="capitalSelected" title="창업자금">
                                        <option>창업자금</option>
                                        <option>전체보기</option>
                                        <option :value="{min:1, max:50000}">5천만원 미만</option>
                                        <option :value="{min:50000, max:100000}">5천만원~1억원</option>
                                        <option :value="{min:100000, max:150000}">1억~1.5억원</option>
                                        <option :value="{min:150000, max:200000}">1.5~2억원</option>
                                        <option :value="{min:200000, max:250000}">2~2.5억원</option>
                                        <option :value="{min:250000, max:300000}">2.5~3억</option>
                                        <option :value="{min:300000, max:9999999}">3억원 이상</option>
                                    </select>								
                                </li>	               
                            </ul>
                        </div>
					</div>
                </div>
                <div v-if="noResultFlag" class="no_brand">조건에 맞는 프랜차이즈 브랜드가 없습니다.<br>검색 조건을 다시 한 번 확인해 보세요.</div>
                <div v-if="!noResultFlag">  
                    <ul v-for="(item, index) in listItems">
                        <router-link :to="{ name: 'franchise-view', params: {id: item.regnumber } }">
                        <li class="img"><img :src="item.img2" :alt="item.brand"></li>
                        <li class="text">
                            <strong>{{item.brand}}</strong>
                            <span>{{item.cateory1}} > {{item.category2}}</span>
                            <p>창업비용 {{item.tatal}}만원,<br>기준면적 ({{item.storearea}}평)</p>
                        </li>
                        </router-link>
                    </ul>
                    <Pagination :totalCount="totalCount" :currentPage="currentPage" :pageingRange="pageingRange" :pageRows="pageRows" :routeName="routeName" :min="minprice" :max="maxprice"></Pagination>
                </div>
            </div>            
        </div>
        <!-- <button class="st_03 gr" type="button" onclick="location.href='#'"><img src="http://m.mk.co.kr/images/2018/franchise/btn_filter.png" alt="필터아이콘">결과 내 상세검색</button> -->
    </section>
    <!--//  section -->
</template>

<script>
import ApiModel from './model/apiModel.js';
import numeral from "numeral";
import Pagination from './components/Pagination.vue'
import MnPriceLayer from './components/MnPriceLayer.vue'
export default {
    name: 'BrandList',
    components : {
        Pagination,
        MnPriceLayer
    },
    data() {
        return {
            listItems : '',
            apiModel: new ApiModel(this.$http),
            checked: [],
            categorycode1: '',
            categorycode2: '',
            category2: '',
            totalCount : 0,
            currentPage : 1,
            pageingRange : 5,
            pageRows : 9,
            routeName : 'brands-list-page',
            capital : {},
            minprice : 0,
            maxprice : 0,
            noResultFlag: false,
            capitalSelected: '창업자금'
        }
    },
    watch : {
        $route: function () {
            this.currentPage = Number(this.$route.params.page)
            this.fetchData()
        },
        capitalSelected: function (val){
            this.$nextTick(()=>{
                if(val !== '창업자금'){
                    if(this.capitalSelected === '전체보기'){
                        this.$router.push({ name: 'brands-list-page', params: {categoryCode: this.$route.params.categoryCode, page: 1 }  })
                    }else{
                        this.$router.push({ name: 'brands-list-mnpage', params: {categoryCode: this.$route.params.categoryCode, page: 1, minprice: this.capitalSelected.min, maxprice:this.capitalSelected.max }  })
                    }
                }
            })
      
    },
    },
    created() {
        if(this.$route.params.page){
            this.currentPage = Number(this.$route.params.page)
            //console.log(Number(this.$route.params.page))
        }
        this.fetchData()
    },
    methods: {
        fetchData(){
            let page = this.currentPage
            page = page -1
            console.log("page:"+page)
            if(this.$route.params.minprice && this.$route.params.maxprice){
                this.minprice = this.$route.params.minprice
                this.maxprice = this.$route.params.maxprice
                this.routeName = 'brands-list-mnpage'
                //this.capital = {min:this.$route.params.minprice, max:this.$route.params.maxprice}
                //console.log('여기!?')
                
                this.franchiseList(this.$route.params.categoryCode, page, this.$route.params.minprice, this.$route.params.maxprice).then((result)=>{
                //this.listItems = this.makeArrayModuler(result,5)
                if(result.length !== 0){
                    this.listItems = result
                    this.noResultFlag = false
                }else{
                    this.noResultFlag = true
                }
                
                })
            }else{
                this.franchiseList(this.$route.params.categoryCode, page).then((result)=>{
                //this.listItems = this.makeArrayModuler(result,5)
                if(result.length !== 0){
                    this.listItems = result
                    this.noResultFlag = false
                }else{
                    this.noResultFlag = true
                }
                })
            }
            //alert(this.$route.params.categoryCode)
        },
        async franchiseList(categoryname, page, min='', max=''){
            let data = null
            //page = Number(page)
            if(categoryname === '' || categoryname === null || categoryname === undefined){
                //console.log("error")
            }else{
                //console.log(min+' '+max)
                //let model = new ApiModel(this.$http)
                /* model.getFranchiseList(categoryname).then((result)=>{
                //console.log(result)
                if(result.status === 200){
                    let data = result.data
                    //console.log(data)
                    //this.rItems = data
                    return data
                }
                }) */
                let result = await this.apiModel.getFranchiseList(categoryname,this.pageRows,page,min,max)
                if(result.status === 200){
                    console.log(result)
                    let data = []
                    data = result.data
                    if(!data){
                    this.noResultFlag = true
                    return data
                    }
                    let paging = data.shift()
                    console.log(paging)
                    this.totalCount = Number(paging.totalCount)
                    this.currentPage = Number(paging.pageNo) + 1
                    let tmpdata = data
                    tmpdata = tmpdata[0]
                    this.categorycode1 = tmpdata.code1
                    this.category2 = tmpdata.category2
                    this.categorycode2 = tmpdata.code2
                    for (const value of data) {
                    let total = value.total
                    total = total.slice(0,-1)
                    total = Number(total)
                    total = numeral(total).format('0,0')
                    value.total = total
                    let img2 = value.img2
                    if(value.img2 === ''){
                        img2 = "/src/assets/fc_noimg_253128.jpg"
                    }else{
                        img2 = "//file.mk.co.kr"+img2.slice(12)
                    }
                    value.img2 = img2
                    }
                    //console.log(data[0].img1)
                    //console.log(data)
                    //this.rItems = data
                    return data
                }
            }

        },

    }
}
</script>

<style>
.box {
    overflow: hidden;
}
.list {
    /* margin-bottom: 47px; */
}
.src .contant {
    min-height: 40px;
    margin-bottom: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>