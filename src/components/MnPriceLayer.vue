<template>
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
                <button class="st_01 gr" type="button">검 색</button>
            </div>	
        </div>				
    </div>
</template>

<script>
export default {
    name: 'MnPriceLayer',
    data() {
        return {
            capitalSelected: '',
        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>