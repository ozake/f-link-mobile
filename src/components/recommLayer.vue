<template>
<!--   popup   -->
    <div class="popup_wrap">
        <div class="popup">
            
            <h1>건물 추천</h1>
            <h2>이 지역에서 창업 시, 가장 유망한 건물은 어디?  <strong>관심 업종</strong>을 골라보세요.</h2>
            <table>
                <tr>
                    <td><input type="radio" value="radio" class="i_radio" v-model="checked" id="0101" :value="'0101'"><label for="0101">한식</label></td>
                    <td><input type="radio" value="radio" class="i_radio" v-model="checked" id="0108" :value="'0108'"><label for="0108">커피</label></td>
                </tr>
                <tr>
                    <td><input type="radio" value="radio" class="i_radio" v-model="checked" id="0102" :value="'0102'"><label for="0102">치킨</label></td>
                    <td><input type="radio" value="radio" class="i_radio" v-model="checked" id="0104" :value="'0104'"><label for="0104">제과제빵</label></td>
                </tr>
                <tr>
                    <td><input type="radio" value="radio" class="i_radio" v-model="checked" id="0107" :value="'0107'"><label for="0107">피자</label></td>
                    <td><input type="radio" value="radio" class="i_radio" v-model="checked" id="0106" :value="'0106'"><label for="0106">분식</label></td>
                </tr>
                <tr>
                    <td><input type="radio" value="radio" class="i_radio" v-model="checked" id="0306" :value="'0306'"><label for="0306">편의점</label></td>
                    <td><input type="radio" value="radio" class="i_radio" v-model="checked" id="0112" :value="'0112'"><label for="0112">주점</label></td>
                </tr>
                
            </table>
            <button class="st_01 gr" type="button" @click="confirm">확 인</button>
        </div>
    </div>
<!--//   popup   -->
</template>

<script>
export default {
    name: 'recommLayer',
    data() {
        return {
            checked: ''
        }
    },
    methods: {
        confirm() {
            /* if(this.checked){
                this.$EventBus.$emit('recommCte', this.checked)
            } */
            this.$EventBus.$emit('recommCte', this.checked)
        }
    }
}
</script>

<style>

</style>
