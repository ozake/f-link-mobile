<template>
<!--  section -->
    <section>
        <div class="store">
            <div class="blak_close" v-if="recommLayerFlag" @click="recommLayerToggle"><img src="http://m.mk.co.kr/images/2018/franchise/btn_menu_close.png" alt="닫기"></div>
            <div class="blak_bg" v-if="recommLayerFlag" @click="recommLayerToggle"></div>
            <div class="srch_wrap1" v-show="!listFlag">
                    <ul class="select_03">
                                <li>
                                    <select onchange="selectMove(this.form)" title="서울">
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
                    <ul class="select_03" v-show="!recommBldFlag">
                                <li>
                                    <select title="대분류" v-model="sectorSelected">
                                        <option>대분류</option>
                                        <option v-for="item in sector" :value="item.code">{{item.categoryName}}</option>
                                    </select>
                                </li>
                                <li>
                                    <select title="중분류" v-model="sectorMSelected" @change="sectorMChange">
                                        <option>중분류</option>
                                        <option v-for="item in sectorMcode" :value="item.code">{{item.categoryName}}</option>
                                    </select>
                                </li>
                                <li>
                                    <select title="브랜드" v-model="brandSeldected" @change="brandChange">
                                        <option>브랜드</option>
                                        <option :value="'all'">전체선택</option>
                                        <option v-for="item in brandList" :value="item.franchiseNo">{{item.brand}}</option>
                                    </select>
                                </li>
                    </ul>
            </div>
            <div class="map" ref="map" v-bind:style="mapHeight">
                <button class="ticker" type="button" @click="recommLayerToggle">건물 추천</button>
                <button class="ticker02" type="button" @click="anotherRecomm" v-if="recommBldFlag">다른 업종<br>선택</button>
                <button class="st_05" type="button" @click="ListToggle">목록</button>
                <span class="recomm_close" v-if="recommBldFlag" @click="recommBldClose">
                  <span class="css-cancel"></span>
                </span>
            </div>


            <div class="map_list" v-show="listFlag">
					<ul style="height: 242px;" v-if="!recommBldFlag">
						<li v-for="(item, index) in mapList" :class="{'list-item-active': index === listActiveIdx}" :id="item.bdMgtSn">
							<strong>{{index + 1}}</strong>
							<a href="#">{{item.refBnm}}<img :src="item.img1" :alt="item.refBnm"></a>
							<span>{{item.addr}}</span>
						</li>
					</ul>
          <h1 v-if="recommBldFlag">본 추천서비스는 매출 통계를 활용한 추천이며, 본사는 추천에 대한 책임을 지지 않습니다.</h1>
          <ul style="height: 193px;" v-if="recommBldFlag">
						<li v-for="(item, index) in recommList" :class="{'list-item-active': index === recommActiveIdx}">
						  <div class="icon_b"></div>
						  <a href="#"><p>{{item.addr}}</p>- {{item.buldNm}}</a>
					  </li>

					</ul>

				</div>

        </div>
        <recomm-layer v-if="recommLayerFlag"></recomm-layer>

    </section>
<!--//  section -->
</template>
<script>
import recommLayer from './components/recommLayer.vue';
import ApiModel from "./model/apiModel.js"
import { Queue } from './model/colections'
import { convertGeo, phoneFomatter } from './model/util.js'
export default {
  name: 'Store',
  data() {
      return {
          mapInstance : Object,
          geoCoder: Object,
          apiModel: new ApiModel(this.$http),
          sggList: [],
          dongList: [],
          sggSelected: '구',
          dongSelected: '동',
          sector: [],
          sectorMcode : [],
          brandList: [],
          sectorSelected : '대분류',
          sectorMSelected : '중분류',
          brandSeldected : '브랜드',
          MakrersQueue : new Queue(),
          CenterCode: '',
          mapLevel: '',
          listFlag: false,
          mapList: [],
          infoWindow: Object,
          listActiveIdx: String,
          recommLayerFlag: false,
          recommBldFlag: false,
          recommMarkerQueue: new Queue(),
          recommInfoWindow: Object,
          recommActiveIdx: String,
          recommList: []
      }
  },
  components: {
      recommLayer
  },
  computed: {
    mapHeight: function() {
      let height = window.innerHeight - 154

      if(this.listFlag){
          height = height - 155
      }

      if(this.recommBldFlag && ! this.listFlag){
          height = height + 40
      }

      return {
        height: height + 'px'
      }
    }
  },
  created(){
      this.getZoneList('1100000000', 'sgg').then((result)=>{
          this.sggList = result
      })
      this.getSector()

  },
  mounted(){
      this.$nextTick(function () {
      // 모든 화면이 렌더링된 후 실행합니다.
        this.mapRendring()
        //this.$EventBus.$on('layerOff', this.recommLayerToggle)
        this.$EventBus.$on('recommCte', (val)=>{
          if(val){
              //this.recommBldToggle()
              this.recommBld(val)
          }
          this.recommLayerToggle()
          //this.recommBldToggle()
          //this.recommBld()
        })
      })
  },
  watch : {
      sggSelected : function(val) {
          this.getZoneList(val, 'dong').then(result => {
              this.dongList = result
              this.dongSelected = '동'
          })
      },
      sectorSelected : function (val){
		  if(val !== '업종'){
			this.getSectorM(val)
		  }
      },
      CenterCode : function (val){
          if(this.sectorMSelected !== '중분류'){
              if(this.brandSeldected !== '')
              this.getFranchiseList(this.sectorMSelected, val)
          }
      },
      mapList : function (val){
          this.listActiveIdx = ''
          if(Object.keys(this.infoWindow).length !== 0){
            this.infoWindow.close()
          }
          if(val.length === 0){
              if(this.listFlag === true){
                  this.ListToggle()
              }

          }
      }
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
      /* getBrandList(code) {
        this.apiModel.getBrandList(code).then((result)=>{
          if(result.status === 200){
            //console.log(result)
            let data = result.data
            let t = data.shift()
            console.log(data)
            //this.brandList = data
          }
        })
      }, */
      sectorMChange() {
          if(this.sectorMSelected !== '중분류'){
              this.getFranchiseList(this.sectorMSelected, this.CenterCode)
              this.brandSeldected = '브랜드'
          }
      },
      brandChange() {
          if( this.brandSeldected !== '브랜드' && this.brandSeldected !== 'all' ){
              console.log('브랜드 선택')
              this.getBrandList(this.CenterCode, this.brandSeldected)
          }else if(this.brandSeldected == 'all'){
              this.getFranchiseList(this.sectorMSelected, this.CenterCode)
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
                if(Object.keys(this.infoWindow).length !== 0){
                    this.infoWindow.close()
                    this.listActiveIdx = ''
                }
                if(Object.keys(this.recommInfoWindow).length !== 0){
                  this.recommInfoWindow.close()
                  this.recommActiveIdx = ''
                }
            })
      },
      displayCenterInfo(result, status) {
          if (status === daum.maps.services.Status.OK) {
            for(let i = 0; i < result.length; i++) {
                // 법정동의 region_type 값은 'B' 이므로
                if (result[i].region_type === 'B') {
                    let code = result[i].code
                    this.CenterCode = code
                }
            }
          }
      },
      async makersCleanPromise() {
        let tmp = undefined
        let length = this.MakrersQueue.getQueueLength()
        let recommLength = this.recommMarkerQueue.getQueueLength()
        //console.log('마커클린 실행')
        //console.log('기존 마커 갯수: '+length)
        let promise = new Promise((resolve, reject)=>{
            if(length !== 0){
                /* let clusterer = this.cluster
                clusterer.clear() */
                for(let i=0; i<length; i++){
                tmp = this.MakrersQueue.getQueue()
                if(typeof tmp === 'undefined'){
                    resolve()
                    break;
                }
                tmp.setMap(null)
                }
                resolve()
            }else{
                //console.log('길이가 0')
                resolve()
            }
        })
        let tmp2 = undefined
        let promise2 = new Promise((resolve, reject)=>{
            if(recommLength !== 0){
                /* let clusterer = this.cluster
                clusterer.clear() */

                for(let i=0; i<recommLength; i++){
                tmp2 = this.recommMarkerQueue.getQueue()
                if(typeof tmp2 === 'undefined'){
                    resolve()
                    break;
                }
                tmp2.setMap(null)
                }
                resolve()
            }else{
                //console.log('길이가 0')
                resolve()
            }
        })
        if(Object.keys(this.infoWindow).length !== 0){
          this.infoWindow.close()
          this.listActiveIdx = ''
        }
        if(Object.keys(this.recommInfoWindow).length !== 0){
          this.recommInfoWindow.close()
          this.recommActiveIdx = ''
        }
        //this.brandQueue.queue = []
        return Promise.all([promise, promise2])
      },
      getFranchiseList(SectorCode,CenterCode='') {
          CenterCode= CenterCode.substring(0,8);
          this.makersCleanPromise().then(()=>{
              this.apiModel.getOP501(CenterCode,SectorCode, 100, 1, CenterCode).then((result)=>{
                  //console.log(result)
                  if(result.status === 200){
                      let data = result.data.data.rows
                      let brands = result.data.data.brands
                      if(this.brandSeldected !== '브랜드' && this.brandSeldected !== 'all'){
                          let brandSlectedFlag = false
                          for (const value of brands) {
                              if(value.franchiseNo === this.brandSeldected){
                                  brandSlectedFlag = true
                                  this.getBrandList(this.CenterCode, this.brandSeldected)
                                  break
                              }
                          }
                          if(!brandSlectedFlag){
                              this.makeMarkers(data)
                              this.makeList(data)
                              this.brandSeldected = 'all'
                          }
                          this.brandList = brands
                      }else {
                          this.makeMarkers(data)
                          this.makeList(data)
                          this.brandList = brands
                      }

                  }
              })
          })
      },
      makeMarkers(data) {
          //console.log('마커생성')
          let x = null
          let y = null
          let marker = null
          let idx = 0;
          for (const value of data) {
              x = Number(value.xAxis)
              y = Number(value.yAxis)
              marker = this.setMarker(x,y,value)
              marker.idx = idx
              this.MakrersQueue.setQueue(marker)
              this.markerAddEventListenner(marker, value)
              idx++
          }
      },
      setMarker(x,y,value) {
        let tmparr = [] = convertGeo([x,y])
        let marker = new daum.maps.Marker({
            //map: this.mapInstance, // 마커를 표시할 지도
            position: new daum.maps.LatLng(tmparr[1], tmparr[0]), // 마커를 표시할 위치
            title : value.refBnm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        })
        marker.setMap(this.mapInstance)
        marker.setZIndex(100)
        return marker
      },
      getBrandList(CenterCode,franchiseNo){
          CenterCode= CenterCode.substring(0,8)
          this.makersCleanPromise().then(()=>{
              this.apiModel.getOP405(CenterCode, franchiseNo, 100, 1).then((result)=>{
                  if(result.status === 200){
                  let data = result.data.data.rows
                      this.makeMarkers(data)
                      this.makeList(data)
                  }
              })
          })
      },
    makeList(data){
        for (const value of data) {
            let img = value.img2
            if(img === '' || img === null || img === undefined){
                img = 'src/assets/fc_noimg_253128.jpg'
                if(location.hostname === "110.13.170.148" || location.hostname === "127.0.0.1"){
                    img = "../src/assets/fc_noimg_253128.jpg"
                }
            } else {
            // console.log(img)
            img = "//file.mk.co.kr"+img.slice(12)
            }
            value.img1 = img

            let tel = value.tel
            if (tel.slice(3, 4) === "2") {
                tel = tel.slice(2)
            }else{
                tel = tel.slice(1)
            }
            tel = phoneFomatter(tel)
            value.tel = tel
        }

        this.mapList = data
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
    markerAddEventListenner(marker, value) {
        // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
        let iwContent = `<div style="padding:5px;height:65px;">${value.addr}<br/>${value.refBnm}</div>` // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

        // 인포윈도우를 생성합니다
        let infowindow = new daum.maps.InfoWindow({
            content : iwContent
        })
        infowindow.setZIndex(100)

        daum.maps.event.addListener(marker, 'click', () => {
            //console.log(marker)
            if(Object.keys(this.infoWindow).length !== 0){
                this.infoWindow.close()
            }
            let coords = marker.getPosition()
            this.mapInstance.setCenter(coords)
            infowindow.open(this.mapInstance, marker)
            this.infoWindow = infowindow
            this.listActiveIdx = marker.idx
            if(!this.listFlag) this.listFlag = true
            this.$nextTick(function(){
                //let activeItem = document.getElementById(value.bdMgtSn)
                let activeItem = this.$el.getElementsByClassName('list-item-active')
                setTimeout(()=>{
                    //console.log(activeItem.item(0))
                    activeItem.item(0).scrollIntoView(true)
                    }, 150)
            })
        })
    },
    recommBld(CategoryCode) {
        this.apiModel.getOP407(this.CenterCode, CategoryCode, 10, 1).then((result)=>{
          let data = result.data.data.rows
          //console.log(data)
          this.makersCleanPromise().then(()=>{
            this.makeRecommMarkers(data)
            this.recommList = data
            this.recommBldToggle()
            this.ListOnOff('on')
          })
        })
    },
    recommBldToggle() {
        this.recommBldFlag = (this.recommBldFlag) ? false : true
    },
    recommLayerToggle() {
        this.recommLayerFlag = (this.recommLayerFlag) ? false : true
        if(this.recommLayerFlag){
            this.ListOnOff('off')
        }
    },
    anotherRecomm() {
        this.recommBldFlag = false
        this.recommLayerToggle()
    },
    makeRecommMarkers(data) {
      let x = null
      let y = null
      let marker = null
      let idx = 0;
      for (const value of data) {
          x = Number(value.xAxis)
          y = Number(value.yAxis)
          marker = this.setRecommMarker(x,y,value)
          marker.idx = idx
          if(idx === 1){
            let coords = marker.getPosition()
            this.mapInstance.setCenter(coords)
          }
          //this.MakrersQueue.setQueue(marker)
          this.recommMarkerQueue.setQueue(marker)
          this.recommMarkerEventListenner(marker, value)
          idx++
      }
    },
    setRecommMarker(x,y,value) {
      let tmparr = [] = convertGeo([x,y])
      let icon = new daum.maps.MarkerImage(
                'http://img.mk.co.kr/2018/franchise/icon_loca02.png',
                new daum.maps.Size(20, 30),
                {
                  offset: new daum.maps.Point(15, 30),
                  alt: value.buldNm,
                  shape: "rect",
                  coords: "0,0,20,30"
                })
      let marker = new daum.maps.Marker({
          //map: this.mapInstance, // 마커를 표시할 지도
          position: new daum.maps.LatLng(tmparr[1], tmparr[0]), // 마커를 표시할 위치
          image: icon,
          title : value.addr, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      })
      marker.setMap(this.mapInstance)
      marker.setZIndex(100)
      return marker
    },
    recommMarkerEventListenner(marker, value) {
      let iwContent = `<div style="padding:5px;height:65px;">${value.addr}<br/>${value.buldNm}</div>` // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

      // 인포윈도우를 생성합니다
      let infowindow = new daum.maps.InfoWindow({
          content : iwContent
      })
      infowindow.setZIndex(100)

      daum.maps.event.addListener(marker, 'click', () => {
        //console.log(marker)
        if(Object.keys(this.recommInfoWindow).length !== 0){
            this.recommInfoWindow.close()
        }
        let coords = marker.getPosition()
        this.mapInstance.setCenter(coords)
        infowindow.open(this.mapInstance, marker)
        this.recommInfoWindow = infowindow
        this.recommActiveIdx = marker.idx
        if(!this.listFlag) this.listFlag = true
        this.$nextTick(function(){
            //let activeItem = document.getElementById(value.bdMgtSn)
            let activeItem = this.$el.getElementsByClassName('list-item-active')
            setTimeout(()=>{
                //console.log(activeItem.item(0))
                activeItem.item(0).scrollIntoView(true)
                }, 150)
        })
      })
    },
    async recommMakersCleanPromise() {
        let tmp = undefined
        let length = this.recommMarkerQueue.getQueueLength()
        //console.log('마커클린 실행')
        //console.log('기존 마커 갯수: '+length)
        let promise = new Promise((resolve, reject)=>{
            if(length !== 0){
                /* let clusterer = this.cluster
                clusterer.clear() */
                for(let i=0; i<length; i++){
                tmp = this.recommMarkerQueue.getQueue()
                if(typeof tmp === 'undefined'){
                    resolve()
                    break;
                }
                tmp.setMap(null)
                }
                resolve()
            }else{
                //console.log('길이가 0')
                resolve()
            }
        })
        //this.brandQueue.queue = []
        return promise
      },
      recommBldClose() {
        this.makersCleanPromise().then(()=>{
          this.recommBldFlag = false
          this.ListToggle()
        })
      }
  }

}
</script>
<style>
.store .ticker {
    bottom: 25px;
    width: 85px;
    height: 85px;
}
.store .ticker02 {
    bottom: 25px;
    width: 85px;
    height: 85px;
}
.map_list {
    -webkit-overflow-scrolling:touch;
}
.list-item-active {
    background-color: antiquewhite;
}
.map_list ul li a img {
    top: 14px;
}
.recomm_close {
    position: absolute;
    left: 42px;
    bottom: 120px;
    width: 25px;
    z-index: 4;
    background-color: rgba(182, 182, 182, 0.6);
    border-radius: 5px;
    padding-left: 6px;
    padding-top: 6px;
}
.css-cancel {
    display: inline-block;
    position: relative;
    margin: 0 20px 0 7px;
    padding: 0;
    width: 4px;
    height: 20px;
    background: #000;
    transform: rotate(45deg);
}
.css-cancel:before {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: -8px;
    width: 20px;
    height: 4px;
    margin-top: -2px;
    background: #000;
}
</style>


