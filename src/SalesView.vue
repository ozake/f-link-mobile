<template>
    <!--  section -->
    <section>
        <div class="sale">
            <div class="main">
                <img-slide-viewer :img="item.IMG_URL"></img-slide-viewer>
                <!-- <div class="slider">
                    <ul>
                        <li><img src="http://img.mk.co.kr/2018/franchise/photo1.jpg" alt="슬라이드이미지"></li>
                        <li><img src="http://img.mk.co.kr/2018/franchise/photo1.jpg" alt="슬라이드이미지"></li>
                        <li><img src="http://img.mk.co.kr/2018/franchise/photo1.jpg" alt="슬라이드이미지"></li>
                    </ul>
                </div>
                <div class="slider_btn prev">
                    <a href="#"><img src="http://m.mk.co.kr/images/2018/franchise/btn_arrow_left.png" alt="슬라이드왼쪽버튼"></a>
                </div>
                <div class="slider_btn next">
                    <a href="#"><img src="http://m.mk.co.kr/images/2018/franchise/btn_arrow_right.png" alt="슬라이드오른쪽버튼"></a>
                </div> -->
                <div class="tit">
                    <h1>{{item.BUILD_NAME +' '+item.BUILD_KIND}}<span>{{bubaddr}}</span></h1>
                    <h2>매경공인중개사사무소<span>매물등록일&nbsp;&nbsp;{{item.FIRST_REG_DATE}}</span></h2>
                    <ul>
                        <li>
                            <span>월세</span>
                            <p>보증금/월세</p>
                            <strong>보 {{item.MONTH_DEPOSIT_PRICE}} / 월{{item.MONTH_PRICE}}</strong>
                        </li>
                        <li>
                            <span>면적</span>
                            <p>계약/전용</p>
                            <strong>{{item.SUPP_METER}} / {{item.USE_METER}}㎡</strong>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="box">
                <div class="txt">
                    <h1>매물정보</h1>
                    <table>
                        <tr>
                            <th>상가종류</th>
                            <td>{{item.BUILD_KIND}}</td>
                        </tr>
                        <tr>
                            <th>해당/총층</th>
                            <td>{{item.CORRP_FLR}}층/{{item.GROUND_FLR}}층 </td>
                        </tr>
                        <tr>
                            <th>총주차대수</th>
                            <td>{{item.TOTAL_PARK_COUNT}}대</td>
                        </tr>
                        <tr>
                            <th>엘리베이터</th>
                            <td>{{item.ELV_COUNT}}대</td>
                        </tr>
                        <tr>
                            <th>준공년도</th>
                            <td>{{item.BUILD_DAY}}</td>
                        </tr>
                        <tr>
                            <th>보증금/ 월세</th>
                            <td>{{item.MONTH_DEPOSIT_PRICE}}/{{item.MONTH_PRICE}}만원</td>
                        </tr>
                        <tr>
                            <th>권리금</th>
                            <td>{{item.PRE_PRICE}}</td>
                        </tr>
                        <tr>
                            <th>관리비</th>
                            <td>{{item.MONTH_M_PRICE}}원</td>
                        </tr>
                        <tr>
                            <th>계약/전용면적</th>
                            <td>{{item.SUPP_METER}}/{{item.USE_METER}}㎡</td>
                        </tr>
                        <tr>
                            <th>입주가능일</th>
                            <td>{{item.INTO_DAY}}</td>
                        </tr>
                        <tr>
                            <th>추천업종</th>
                            <td>{{item.REC_USING}}</td>
                        </tr>
                        <tr>
                            <th>매물특징</th>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="word-break: break-all;">
                            <br>{{item.MEMUL_AD}}<br><br>{{item.MEMUL_DESC1}} </td>
                        </tr>
                    </table>
                </div>

                <div class="txt">
                    <h1>정보제공</h1>
                    <img :src="item.PROFILE_IMAGE" />
                    <div class="box_beige">
                        <h2>{{item.SANGHO_NAME}}</h2>
                        <ul>
                            <li>대표</li>
                            <li>{{item.PRESENT_NAME}}</li>
                        </ul>
                        <ul>
                            <li>전화</li>
                            <li>{{item.TEL_NO}} / {{item.CHARGE_MOBILE}}</li>
                        </ul>
                    </div>

                </div>

                <div class="txt">


                    <div class="map_list">
                        <div class="map" ref="map">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="st_03 bl" type="button" @click="calling(item.TEL_NO)">{{item.SANGHO_NAME}}<span>{{item.TEL_NO}}</span></button>
    </section>
		<!--//  section -->
</template>

<script>
    import ImgSlideViewer from "./components/imgSlideViewer.vue"
    import ApiModel from "./model/apiModel.js"
    export default {
        name: 'Sales',
        components: {
            ImgSlideViewer
        },
        data () {
            return {
                apiModel: new ApiModel(this.$http),
                item: '',
                mapInstance: Object,
                geoCoder: Object,
                pyeongToggle: false,
                meterToggle: true,
                bubaddr: ''
            }
        },
        watch : {
            $route: function(){
                this.getSalesView(this.$route.params.id)
            }
        },
        created () {
            this.getSalesView(this.$route.params.id)
        },
        mounted () {
            this.$nextTick(function () {
                // 모든 화면이 렌더링된 후 실행합니다.
                this.mapRendering()
                //this.$EventBus.$on('layerOff', this.recommLayerToggle)
            })
        },
        methods : {
            mapRendering() {
                console.log("지도 셋팅 시작")
                let container = this.$refs.map //지도를 담을 영역의 DOM 레퍼런스
                let options = { //지도를 생성할 때 필요한 기본 옵션
                    center: new daum.maps.LatLng(37.56611900511385, 126.97774128459538), //지도의 중심좌표.
                    level: 3 //지도의 레벨(확대, 축소 정도)
                };

                let map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
                this.mapInstance = map
                // 주소-좌표 변환 객체를 생성합니다
                let geocoder = new daum.maps.services.Geocoder();
                this.geoCoder = geocoder
                // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다

                // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
                let zoomControl = new daum.maps.ZoomControl();
                map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
                map.setMaxLevel(7);
                let coords = map.getCenter()
                /* geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), this.displayCenterInfo)
                this.mapEventListener(map,geocoder) */
                console.log("지도 셋팅 완료")
            },
            calling(val){
                location.href = `tel:${val}`
            },
            getSalesView(code){
                this.apiModel.getSalesView(code).then((result)=>{
                    if(result.status === 200)
                    {
                        console.log(result)
                        let data = result.data
                        if(typeof data === 'string'){
                            /* data = data.replace(/\r/g, "")
                            data = data.replace(/\\r/g, "")
                            data = data.replace(/\n/g, "")
                            data = data.replace(/\\n/g, "")
                            data = data.replace(/\\'/g, "") */
                            //console.log(data)
                            data = eval("("+data+")")
                            //data = JSON.parse(data)
                        }
                        data = data[0]
                        let tmpDate = data.FIRST_REG_DATE
                        data.FIRST_REG_DATE = tmpDate.substring(0,10)
                        let img = data.IMG_URL
                        let tmparr = []
                        //console.log(data.IMG_URL)
                        if(img === ''){
                            img = '../../src/assets/fc_noimg_263168.jpg'
                            if(location.hostname === 'www.f-link.co.kr' || location.hostname === 'f-link.co.kr'){
                                img = '/src/assets/fc_noimg_263168.jpg'
                            }
                            tmparr.push(img)
                            data.IMG_URL = tmparr
                        }else{
                            img = img.split( ',' )
                            for (const value of img) {
                                let str = value.replace("http://image.bizmk.kr", "")
                                let res = str.search("http://image.bizmk.kr")
                                if(res === -1){
                                    str = 'http://image.bizmk.kr'+str
                                }
                            tmparr.push(str)
                        }
                        data.IMG_URL = tmparr
                        }
                        let pimg = data.PROFILE_IMAGE
                        if(pimg === ''){
                            pimg = pimg = "/src/assets/fc_noimg_253128.jpg"
                            data.PROFILE_IMAGE = pimg
                        }
                        data.SUPP_PYEONG = this.calPyeong(data.SUPP_METER)
                        data.USE_PYEONG = this.calPyeong(data.USE_METER)
                        //data.bubAddr = this.getAddrToCodelaw(data.bubcode)
                        this.getAddrToCodelaw(data.BUBCODE)
                        this.item = data
                        this.setMaker(data.YPOS, data.XPOS, data)

                    }
                })
		    },
            setMaker(x,y,value){
                //let tmparr = []
                //tmparr = convertGeo([x,y])
                let coords = new daum.maps.LatLng(x, y)
                let marker = new daum.maps.Marker({
                    map: this.mapInstance, // 마커를 표시할 지도
                    position: coords, // 마커를 표시할 위치
                    title : value.BUILD_NAME +' '+value.BUILD_KIND, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                })
                this.mapInstance.setCenter(coords)
            },
            calPyeong(val){
                let meter = Number(val)
                let pyeong = meter * 0.3025
                return pyeong.toFixed(2)
            },
            meterPyeongSwitch(){
                if(this.meterToggle){
                    this.meterToggle = false
                    this.pyeongToggle = true
                }else if(this.pyeongToggle){
                    this.meterToggle = true
                    this.pyeongToggle = false
                }
            },
            getAddrToCodelaw(codelaw){
                this.apiModel.getAddrToCodelaw(codelaw).then((result)=>{
                    let addr = ''
                    if(result.status === 200){
                        let data = result.data[0]
                        console.log(data)
                        addr = `${data.area1} ${data.area2} ${data.area3}`
                        this.bubaddr = addr
                    }
                })
            }
        }



    }
</script>

<style>
.map_list .map {
	height: 320px;
    margin-bottom: 47px;
}
/*
.tit {
    color: #fff;
}
*/
</style>
