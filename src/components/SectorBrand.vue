<template>
    <div class="contant" >
        <div class="grouping">
            <ul>
                <li>
                    <select title="대분류" v-model="sectorSelected">
                        <option>대분류</option>
                        <option v-for="item in sector" :value="item.code">{{item.categoryName}}</option>
                    </select>
                </li>
                <li>
                    <select title="중분류" v-model="sectorMSelected">
                        <option>중분류</option>
                        <option v-for="item in sectorMcode" :value="item.categoryName">{{item.categoryName}}</option>
                    </select>
                </li>
            </ul>   
        </div>
        <button class="st_01 gr" type="button" @click="searchBrand">검 색</button>
    </div>

</template>

<script>
    export default {
        name: 'SectorBrand',
        data() {
            return {
                sector: [],
                sectorMcode : [],
                sectorSelected : '대분류',
                sectorMSelected : '중분류',
            }
        },
        watch : {
            sectorSelected : function (val){
                if(val !== '업종'){
                    this.getSectorM(val)
                }
            },

        },
        created() {
            this.getSector()
        },
        methods : {
            searchBrand(){
                if(this.sectorSelected !== '대분류' && this.sectorMSelected !== '중분류'){
                    this.$router.push({ name: 'brands-list-page', params: {categoryCode: this.sectorMSelected, page: 1 }  })
                }else {
                    alert('분류를 선택해주세요.')
                }
            },
            getSector() {
                let url = "./src/assets/sectorCode.json"
                /* if(location.hostname === "www.f-link.co.kr"){
                url = "http://www.f-link.co.kr/dist/sectorCode.json"
                }else if(location.hostname === "www.f-link.co.kr"){
                url = "http://f-link.co.kr/dist/sectorCode.json"
                }else */
                if(location.hostname === "110.13.170.148" || location.hostname === "127.0.0.1" || location.hostname === "192.168.1.180"){
                    url = "../src/assets/sectorCode.json"
                }
                this.$http.get(url).then((result)=>{
                    if(result.status === 200){
                        let data = result.data
                        this.sector = data.sector
                    }
                })
            },
            getSectorM(val) {
                for (const value of this.sector) {
                    if(value.code === val){
                        this.sectorMcode = value.sectorMcode
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>