<template>
    <!--  section -->
    <section>
        <div class="store">
            <div class="srch_wrap">
                    <ul class="select_03">
                        <li>
                            <select title="시,도">
                                <option>서울</option>
                            </select>
                        </li>
                        <li>
                            <select title="구" v-model="sggSelected">
                                <option>구</option>
                                <option v-for="item in sggList" :value="item.code">{{item.area2}}</option>
                            </select>
                        </li>
                        <li>
                            <select title="동" v-model="dongSelected" @change="dongChange">
                                <option>동</option>
                                <option v-for="item in dongList" :value="item">{{item.area3}}</option>
                            </select>
                        </li>
                    </ul>
            </div>
            <div class="map" ref="map" v-bind:style="mapHeight">
            </div>
        </div>
    </section>
	<!--//  section -->
</template>

<script>
import ApiModel from "./model/apiModel.js"
import { Queue } from './model/colections'
import { convertGeo, phoneFomatter } from './model/util.js'
import { Base64 } from 'js-base64'
export default {
    name: 'Sales',
    data() {
        return {
            mapInstance : Object,
            geoCoder: Object,
            apiModel: new ApiModel(this.$http),
            sggList: [],
            dongList: [],
            sggSelected: '구',
            dongSelected: '동',
            CenterCode: '',
            sggCd: '',

        }
    },
    computed: {
        mapHeight: function() {
            let height = window.innerHeight - 110

            /* if(this.listFlag){
                height = height - 155
            }

            if(this.recommBldFlag && ! this.listFlag){
                height = height + 40
            } */

            return {
                height: height + 'px'
            }
        }
    },
    watch : {
        sggSelected : function(val) {
            if(val !== '구'){
                this.getZoneList(val, 'dong').then(result => {
                    this.dongList = result
                    this.dongSelected = '동'
                })
            }  
        },
        CenterCode : function (val){
            //this.getEstateList(val)
        },
        sggCd : function (val) {
            this.getEstateList(val)
        }
    },
    created(){
        this.getZoneList('1100000000', 'sgg').then((result)=>{
            this.sggList = result
        })
    },
    mounted(){
        this.$nextTick(function () {
            // 모든 화면이 렌더링된 후 실행합니다.
            this.mapRendring()
            //this.$EventBus.$on('layerOff', this.recommLayerToggle)
        })
    },
    methods: {
        mapRendring() {
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

            // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
            let mapTypeControl = new daum.maps.MapTypeControl();

            // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
            // daum.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
            map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
            let zoomControl = new daum.maps.ZoomControl();
            map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
            map.setMaxLevel(7);
            let coords = map.getCenter()
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), this.displayCenterInfo)
            this.mapEventListener(map,geocoder)
            console.log("지도 셋팅 완료")
        },
        async getZoneList(codelaw, grade) {
            let data = null
            let result = await this.apiModel.getZoneListToCodelaw(codelaw, grade)
            if(result.status === 200){
                data = result.data
                data.shift()
            }
            return data
        },
        dongChange() {
            //console.log(this.dongSelected)
            let item = this.dongSelected
            let address = `${item.area2} ${item.area3}`
            this.addressTogeocode(address)
        },
        addressTogeocode(address) {
            this.geoCoder.addressSearch(address, (result, status) => {
                    // 정상적으로 검색이 완료됐으면
                    if (status === daum.maps.services.Status.OK) {
                        let coords = new daum.maps.LatLng(result[0].y, result[0].x)
                        //map.setCenter(coords);
                        this.setMapCenter(coords)

                        /* this.searchAddrFromCoords(
                            geocoder,
                            this.mapInstance.getCenter(),
                            this.displayCenterInfo
                        ) */
                    }
            })
        },
        setMapCenter(coords) {
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            if (this.mapInstance !== "") {
                this.mapInstance.setCenter(coords)
                this.geoCoder.coord2RegionCode(coords.getLng(), coords.getLat(), this.displayCenterInfo)
            }
        },
        mapEventListener(map,geocoder) {

            daum.maps.event.addListener(map, 'dragend', () => {
                let coords = map.getCenter()
                geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), this.displayCenterInfo)
            })
            daum.maps.event.addListener(map, 'bounds_changed', () => {
                let coords = map.getCenter()
                let level = map.getLevel()
                if(this.mapLevel !== level){
                    this.mapLevel = level
                    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), this.displayCenterInfo)
                }
            })

            daum.maps.event.addListener(map, 'click', (mouseEvent) => {
                /* if(Object.keys(this.infoWindow).length !== 0){
                    this.infoWindow.close()
                    this.listActiveIdx = ''
                }
                if(Object.keys(this.recommInfoWindow).length !== 0){
                  this.recommInfoWindow.close()
                  this.recommActiveIdx = ''
                } */
            })
        },
        displayCenterInfo(result, status) {
            if (status === daum.maps.services.Status.OK) {
                for(let i = 0; i < result.length; i++) {
                    // 법정동의 region_type 값은 'B' 이므로
                    if (result[i].region_type === 'B') {
                        let code = result[i].code
                        this.CenterCode = code
                        this.sggCd = code.substring(0,5)
                    }
                }
            }
        },
        getEstateList(code){
            code = code.substring(0,5)
            let sggCd = code+'00000'
            let pageNo = '1'
            let rows = 100
            let markers = []
            this.apiModel.getEstateList(pageNo,rows,sggCd).then((result)=>{
                if(result.status === 200){
                    let data = result.data
                    //console.log(data)
                    if(typeof data === 'string'){
                                    data = data.replace(/\r/g, "")
                                    data = data.replace(/\\r/g, "")
                                    data = data.replace(/\n/g, "")
                                    data = data.replace(/\\n/g, "")
                                    data = data.replace(/\\'/g, "")
                        //console.log("파싱에러")
                        data1 = eval("("+data+")")
                        //data = JSON.parse(data)
                        
                        }
                    let paging = data.shift()
                    for (const value of data) {
                        // if(value.month_deposit_price === 0 && value.month_price){
                        //   continue
                        // }
                        let img = value.img_url
                        if(img === ''){
                        img = '/src/assets/fc_noimg_263168.jpg'
                        }
                        else {
                        let tmparr = []
                        tmparr = img.split( ',', 2 )
                        img = tmparr[0]
                        let str = img.replace("http://image.bizmk.kr", "")
                        let res = str.search("http://image.bizmk.kr")
                        if(res === -1){
                            str = 'http://image.bizmk.kr'+str
                        }
                        img = str
                        }
                        value.img_url = img
                        //let marker = this.setEstateMaker(value.xpos, value.ypos, value.memul_seq)
                        markers.push(marker)
                        this.estateQueue.setQueue(marker)
                    }


                }
            })
        },
        makeEstateMarkers() {
            
        }

    }
}
</script>

<style scoped>

</style>