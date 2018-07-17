<template>
<!--  section -->
    <section>
        <div class="store">
            <div class="srch_wrap1">
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
                    <ul class="select_03">
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
                                    <select title="브랜드" v-model="brandSeldected">
                                        <option>브랜드</option>
                                        <option v-for="item in brandList" :value="item.categoryName">{{item.categoryName}}</option>
                                    </select>									
                                </li>
                    </ul>
            </div>
            <div class="map" ref="map" v-bind:style="mapHeight">
            </div>
            <button class="ticker" type="button" onclick="location.href='#'">건물 추천</button>
        </div>
    </section>
<!--//  section -->
</template>
<script>
import ApiModel from "./model/apiModel.js"
import { Queue } from './model/colections'
import { convertGeo } from './model/util.js'
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
          mapLevel: ''
      }
  },
  computed: {
    mapHeight: function() {
      let height = window.innerHeight - 154

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
              this.getFranchiseList(this.sectorMSelected, val)
          }
      }
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
        map.setMaxLevel(8);
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
      dongChange(){
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
            this.mapInstance.setCenter(coords);
        }
      },
      getSector(){
        let url = "./src/assets/sectorCode.json"
        /* if(location.hostname === "www.f-link.co.kr"){
          url = "http://www.f-link.co.kr/dist/sectorCode.json"
        }else if(location.hostname === "www.f-link.co.kr"){
          url = "http://f-link.co.kr/dist/sectorCode.json"
        }else if(location.hostname === "110.13.170.148" || location.hostname === "127.0.0.1"){
          url = "/src/assets/sectorCode.json"
        } */
        this.$http.get(url).then((result)=>{
          if(result.status === 200){
            let data = result.data
            this.sector = data.sector
          }
        })
      },
      getSectorM(val){
		  for (const value of this.sector) {
			  if(value.code === val){
				  this.sectorMcode = value.sectorMcode
			  }
		  }
      },
      getBrandList(code){
        this.apiModel.getBrandList(code).then((result)=>{
          if(result.status === 200){
            //console.log(result)
            let data = result.data
            let t = data.shift()
            console.log(data)
            //this.brandList = data
          }
        })
      },
      sectorMChange(){
          if(this.sectorMSelected !== '중분류'){
              this.getFranchiseList(this.sectorMSelected, this.CenterCode)
          }
      },
      mapEventListener(map,geocoder){
          
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
      async makersCleanPromise(){
      let tmp = undefined
      let length = this.MakrersQueue.getQueueLength()
      //console.log('마커클린 실행')
      //console.log('기존 마커 갯수: '+length)
      let promise = new Promise((resolve, reject)=>{
        if(length !== 0){
          /* let clusterer = this.cluster
            clusterer.clear() */
          for(let i=0; i<length; i++){
            tmp = this.queue.getQueue()
            if(typeof tmp === 'undefined'){
              break;
              resolve()
            }
            tmp.setMap(null)
          }
        }
      })
      //this.brandQueue.queue = []
      //return promise
    },
    getFranchiseList(SectorCode,CenterCode=''){
        CenterCode= CenterCode.substring(0,8);
        this.apiModel.getOP501(CenterCode,SectorCode, 1000, 1, CenterCode).then((result)=>{
            //console.log(result)
        })
    },
  }
}
</script>
<style>
.store .ticker {
    bottom: 25px;
    width: 85px;
    height: 85px;
}
</style>


