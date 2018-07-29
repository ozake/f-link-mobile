<template>
    <!--  section -->
    <section>
        <div class="store">
            <div class="srch_wrap" v-show="!listFlag">
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
                <button class="st_05" type="button" @click="ListToggle">목록</button>
            </div>
            <div class="map_list" v-show="listFlag">
                <ul class="sale" style="height: 242px;">
                    <li v-for="item in estateList">
						<router-link :to="{ name: 'sales-view', params: { id:item.memul_seq } }">
							<span class="img"><img :src="item.img_url" alt=""></span>
							<span class="text">
								<span class="tit"><strong>월</strong>보{{item.month_deposit_price}}/월{{item.month_price}}</span>
								<span class="adress">{{item.area1 + ' ' + item.area2 +' '+ item.area3}}</span>
								{{item.corrp_flr}}층  {{item.supp_meter}}㎡<br>{{item.subway_info}}
							</span>
						</router-link>
					</li>
                </ul>
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
            estateQueue: new Queue(),
            clusterer: Object,
            clusterClick: '',
            estateList: [],
            listFlag: false
        }
    },
    computed: {
        mapHeight: function() {
            let height = window.innerHeight - 110

            if(this.listFlag){
                height = height - 201
            }
            /*
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
        },
        clusterClick : function(val) {
            this.estateClusterList(val)
        },
        estateList : function(val) {
            if(val) {
                this.ListOnOff('on')
            }
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
                level: 4 //지도의 레벨(확대, 축소 정도)

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
        ListToggle() {
            this.mapHeight
            this.listFlag = (this.listFlag) ? false : true
        },
        ListOnOff(val) {
            this.mapHeight
            // this.listFlag = (this.listFlag) ? false : true
            if(val === 'on'){
                this.listFlag = true
            }else if(val === 'off'){
                this.listFlag = false
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
                        //data = eval("("+data+")")
                        data = eval(`(${data})`)
                    }
                    let paging = data.shift()
                    let markers = this.makeEstateMarkers(data)
                    let clusterer = this.makeClusterEstate(markers)
                    this.estateClusterAddEventListener(clusterer)
                    this.clusterer = clusterer
                }
            })
        },
        makeEstateMarkers(data) {
            let markers = []
            for (const value of data) {
              let img = value.img_url
              if(img === ''){
                img = '../src/assets/fc_noimg_263168.jpg'
                if(location.hostname === 'www.f-link.co.kr' || location.hostname === 'f-link.co.kr'){
                  img = '/src/assets/fc_noimg_263168.jpg'
                }
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
              let marker = this.setEstateMaker(value.xpos, value.ypos, value.memul_seq)
              markers.push(marker)
              //this.estateQueue.setQueue(marker)
            }
            //this.makeClusterEstate(markers)
            return markers
        },
        setEstateMaker(x,y,memul_seq) {
          let icon = new daum.maps.MarkerImage(
                'http://www.f-link.co.kr/src/assets/estateMarker.png',
                new daum.maps.Size(20, 30),
                {
                  offset: new daum.maps.Point(15, 30),
                  alt: memul_seq,
                  shape: "rect",
                  coords: "0,0,20,30"
                })
          let marker = new daum.maps.Marker({
              //map: this.mapInstance, // 마커를 표시할 지도
              image: icon,
              position: new daum.maps.LatLng(y, x), // 마커를 표시할 위치
              title : memul_seq, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          })
          /* if(this.mapLevel !== 6){
            marker.setMap(this.mapInstance)
          } */
          return marker
        },
        makeClusterEstate(markers){
            this.cleanClusterer()
            let clusterer = new daum.maps.MarkerClusterer({
                map: this.mapInstance,
                markers: markers,
                gridSize: 60,
                averageCenter: true,
                minLevel: 2,
                disableClickZoom: true,
                styles: [{
                width: '85px',
                height: '85px',
                backgroundColor: '#14a114',
                opacity: '0.7',
                color: '#fff',
                fontSize: '25px',
                fontWeight: '500',
                position: 'absolute',
                borderRadius: '50px',
                textAlign: 'center',
                lineHeight: '80px'
                }]
            })
            clusterer.setMinClusterSize(3)
            return clusterer
        },
        cleanClusterer() {
            if(Object.keys(this.clusterer).length !== 0){
                let clusterer = this.clusterer
                clusterer.clear()
            }
        },
        estateClusterAddEventListener(clusterer){
            let clustererObj = clusterer
            daum.maps.event.addListener( clusterer, 'clusterclick', ( cluster ) => {
                let clickStyles = {
                    width:'85px',
                    height:'65px',
                    backgroundColor:'#4db007',
                    opacity:'1.0',
                    border:'8px solid #fff',
                    paddingTop: '20px',
                    color:'#fff',
                    fontSize: '22px',
                    fontWeight:'500',
                    borderRadius:'50px',
                    textAlign:'center',
                    lineHeight: '23px'
                }
                
                let defaultStyles = {
                    width: '85px',
                    height: '85px',
                    backgroundColor: '#14a114',
                    opacity: '0.7',
                    color: '#fff',
                    fontSize: '25px',
                    fontWeight: '500',
                    position: 'absolute',
                    borderRadius: '50px',
                    textAlign: 'center',
                    lineHeight: '80px',
                    paddingTop: '0',
                    border:'0px'
                }

                for (const value of clustererObj._clusters) {
                
                if(value.clicked){
                    this.domStyleObjSet(value._content, defaultStyles)
                    let num = value._markers.length
                    value._content.innerHTML = num
                }
                value.clicked = false
                
                }
                
                this.domStyleObjSet(cluster._content, clickStyles)
                cluster._content.innerHTML = '내놓은<br>매물'
                cluster.clicked = true

                //console.log(cluster)
                //console.log(cluster._content)

                
                let markers = cluster.getMarkers()
                let i=1
                let str = ''
                for (const value of markers) {
                //console.log("매물번호:"+value.Xd)
                str+= `${value.Xd},`
                if(i === 10){
                    break
                }
                i++
                }
                str = str.slice(0,-1)
                this.clusterClick = str
                //console.log( cluster.getCenter() );
            })

        },
        domStyleObjSet(dom, styles){
            for (const key in styles) {
                if (styles.hasOwnProperty(key)) {
                const element = styles[key];
                const hypenKey = this.camelCaseToDash(key)
                //console.log(element)
                
                //dom.style.removeProperty(key)
                dom.style.setProperty(hypenKey, element)
                
                //console.log(dom.style.key)
                }
            }
        },
        camelCaseToDash( myStr ) {
            return myStr.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
        },
        estateClusterList(seq){
            this.apiModel.getEstateListToSeq(seq).then((result)=>{
                if(result.status === 200){
                    console.log(result)
                    let data = result.data
                    let paging = data.shift()
                    for (const value of data) {
                        let img = value.img_url
                        if(img === ''){
                            img = '../src/assets/fc_noimg_263168.jpg'
                            if(location.hostname === 'www.f-link.co.kr' || location.hostname === 'f-link.co.kr'){
                                img = '/src/assets/fc_noimg_263168.jpg'
                            }
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
                        let subwayInfo = value.subway_info
                        subwayInfo = subwayInfo.split(',')
                        let str = ''
                        if(subwayInfo.length > 1){
                            str = `${subwayInfo[0]}, ${subwayInfo[1]}`
                        }else{
                            str = subwayInfo[0]
                        }
                        value.subway_info = str
                    }
                    this.estateList = data
                }
            })
        }


    }
}
</script>
<style>
.map_list {
    -webkit-overflow-scrolling:touch;
}
.img img {
    max-height: 150px;
}
</style>
