<template>
  <!--  section -->
  <section>
    <div class="box">
      <div class="view">
        <div class="tit">
          <img :src="displayItem.img3" alt="브랜드로고">
          <h1>{{displayItem.brand}}</h1>
          <h2>{{displayItem.company}}</h2>
          <button class="st_01 home" type="button" @click="moveURL(displayItem.url)">브랜드 공식 홈페이지 바로가기<span><img src="http://m.mk.co.kr/images/2018/franchise/btn_hompage.png" alt="홈페이지"></span></button>

        </div>

        <!-- <button class="btn_v1" type="button">착한 컨설팅 신청 </button>
        <button class="btn_v2" type="button">가맹본사 상담받기</button> -->

        <div class="txt">
          <h1>기본 정보</h1>
          <table>
            <colgroup>
              <col width="100px" />
              <col width="*" />
              </colgroup>
              <tbody>
              <tr>
                <th>회사명</th>
                <td>{{displayItem.company}}</td>
              </tr>
              <tr>
                <th>대표자</th>
                <td>{{displayItem.ceo}}</td>
              </tr>
              <tr>
                <th>창업비용</th>
                <td>{{displayItem.total}}만원 ({{displayItem.storearea}}평)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="txt">
          <h1>브랜드 소개</h1>
          <table>
            <tr>
              <td>{{displayItem.memo}}</td>
            </tr>
            <tr>
              <!-- <td class="off"><a href="#">내용보기</a></td> -->
            </tr>
          </table>
        </div>

        <div class="txt">
          <h1>가맹 창업 조건</h1>
          <table>
            <colgroup>
              <col width="100px" />
              <col width="*" />
              <col width="60px" />
              </colgroup>
              <tbody>
              <tr>
                <th>가맹계약기간</th>
                <td colspan="2">최초 {{displayItem.initial}}년 / 연장 {{displayItem.extended}}년</td>
              </tr>


              <tr>
                <th>예상창업비용</th>
                <td>{{displayItem.total}}만원</td>
                <!-- <td class="on"><a href="#">내용보기</a></td> -->
              </tr>
              <tr class="drop">
                <td colspan="3">
                  <table class="box_white">
                    <colgroup>
                      <col width="50%" />
                      <col width="*" />
                      </colgroup>
                    <tbody>
                      <tr>
                        <th>가맹비</th>
                        <td>{{displayItem.membership}}만원</td>
                      </tr>
                      <tr>
                        <th>교육비</th>
                        <td>{{displayItem.educost}}만원</td>
                      </tr>
                      <tr>
                        <th>보증금</th>
                        <td>{{displayItem.deposit}}만원</td>
                      </tr>
                      <tr>
                        <th>기타비용</th>
                        <td>{{displayItem.othercost}}만원</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <th>인테리어비용 </th>
                <td>{{displayItem.interiorcost}}만원</td>
                <!-- <td class="off"><a href="#">내용보기</a></td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="txt">
          <h1>가맹 사업 규모</h1>
          <table class="grid">
              <colgroup>
                              <col width="16%" />
                <col width="16%" />
                <col width="16%" />
              <col width="16%" />
              <col width="16%" />
              <col width="16%" />
                            </colgroup>
              <tbody><tr>
              <th>연도 </th>
              <th>신규개점</th>
              <th>명의변경 </th>
              <th>총 매장 수 </th>
              <th>폐업 매장 수 </th>
              <th>폐업률</th>
              </tr>

              <tr v-for="ydata in yearData">
                <td>{{ydata.year}} </td>
								<td>{{ydata.ncount}}</td>
                <td>{{ydata.mcount}}</td>
								<td>{{ydata.totalStore}}</td>
								<td>{{ydata.closerStore}}</td>
								<td>{{ydata.closerRate}}</td>
              </tr>

          </tbody>
          </table>

          <table class="grid">
            <colgroup>
                              <col width="14%" />
                <col width="14%" />
                <col width="20%" />
              <col width="18%" />
                            </colgroup>
              <tbody>
                <tr>
                <td><strong>임직원수</strong></td>
                <th>{{displayItem.executives}} /{{displayItem.employee}}</th>
                <td><strong>가맹사업개시일</strong></td>
                <th>{{displayItem.start}}</th>
                </tr>
            </tbody>
          </table>
        </div>

        <div class="txt">
          <h1>가맹 재무 상황</h1>
          <table class="grid" style="width:150%;">
            <colgroup>
              <col width="14%" />
              <col width="14%" />
              <col width="14%" />
              <col width="14%" />
              <col width="14%" />
              <col width="14%" />
              <col width="14%" />
            </colgroup>
            <tbody>
              <tr>
                <th>연도 </th>
                <th>자산</th>
                <th>부채</th>
                <th>자본 </th>
                <th>매출액 </th>
                <th>영업이익</th>
                <th>단기순이익</th>
              </tr>

              <tr v-for="fdata in finenceYearData">
                <td>{{fdata.year}} </td>
                <td>{{fdata.assets}}</td>
                <td>{{fdata.debt}}</td>
                <td>{{fdata.capital}}</td>
                <td>{{fdata.sales}}</td>
                <td>{{fdata.profit}}</td>
                <td>{{fdata.income}}</td>
              </tr>

            </tbody>
          </table>

        </div>


        <div class="txt">
          <h1>지점안내</h1>
          <ul class="select_03">
            <li>
              <select onchange="selectMove(this.form)" title="시">
                <option>서울시</option>
              </select>
            </li>
            <li>
              <select v-model="sggSelected" title="구">
                <option>구</option>
                <option v-for="item in sggList" :value="item.code">{{item.area2}}</option>
              </select>
            </li>
            <li>
              <select v-model="dongSelected" @change="dongChange" title="동">
                <option>동</option>
                <option v-for="item in dongList" :value="item">{{item.area3}}</option>
              </select>
            </li>
          </ul>

        </div>

        <div class="map_list">
          <div class="map" ref="map">
          </div>
          <ul style="height: 200px;">
            <li v-for="(store,idx) in storeList" class="item-store" :class="{'list-item-active': idx === listActiveIdx}">
              <router-link :to="{name: 'store-view', params: { categoryCode: store.categoryCode, storeName: store.storeNameEncode, id: store.bdMgtSn }}">
                <div class="icon_b"></div>
                <span>{{store.refBnm}}</span>
                <p>{{store.tel}}</p>
              </router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <button class="st_03 bl" type="button" @click="calling(displayItem.tel)">창업상담 대표전화 {{displayItem.tel}}</button>
  </section>
  <!--//  section -->
</template>

<script>
  import ApiModel from './model/apiModel.js'
  import { Queue } from './model/colections.js'
  import numeral from "numeral";
  import { convertGeo, phoneFomatter } from "./model/util.js";
  import { Base64 } from 'js-base64'
  export default {
    name: 'FranchiseView',
    data() {
      return {
        displayItem: {},
        yearData: [],
        apiModel: new ApiModel(this.$http),
        centerCode: "",
        sggCd: '',
        storeList: [],
        mapInstance: "",
        geoCoder: "",
        queue: new Queue(),
        estateList: [],
        selected: "시/군/구",
        selectedStore: "지점",
        brandMemo: false,
        categoryCode: '',
        finenceYearData: [],
        consultLayer: false,
        submitBrandCk: [this.$route.params.id],
        cursor: 0,
        sggList: [],
        sggSelected: '구',
        dongList: [],
        dongSelected: '동',
        infoWindow: Object,
        listActiveIdx: String,
        mapLevel: ''
      }
    },
    components: {

    },
    watch : {
      sggSelected : function(val) {
          this.getZoneList(val, 'dong').then(result => {
              this.dongList = result
              this.dongSelected = '동'
          })
      },
      sggCd : function (val) {
        this.getStoreList(this.$route.params.id,val)
      }
    },
    created() {
      this.fetchData()
      this.getZoneList('1100000000', 'sgg').then((result)=>{
          this.sggList = result
      })
    },
    mounted() {
      this.$nextTick(function () {
        // 모든 화면이 렌더링된 후 실행합니다.
        this.mapRendering()
      })
    },
    methods: {
      calling(val){
        location.href = `tel:${val}`
      },
      moveURL(url){
        window.open('about:blank').location.href = url
      },
      fetchData(){
        let ap1 = this.getFranchiseView(this.$route.params.id);
        let ap2 = this.getFranchiseYearData(this.$route.params.id);
        let ap3 = this.getFinenceYearData(this.$route.params.id);
        Promise.all([ap1, ap2, ap3]).then(result => {
          //console.log(result)
          let data1 = result[0];
          let data2 = result[1];
          let data3 = result[2];
          console.log(data3)
          let tmpArray = [];
          if(typeof data1 === 'string'){
            data1 = eval("("+data+")")
          }

          if (data1[0].memo) {
            this.brandMemo = true;
          }
          data1 = data1[0];
          this.categoryCode = data1.code2
          let date = data1.start;
          date =
            date.substr(0, 4) + "년 " + date.substr(4, 2) + "월 " + date.substr(6, 2) + "일";
          data1.start = date;
          this.displayItem = data1;
          for (let v of data2) {
            let totalStore = Number(v.fcount) + Number(v.rcount);
            totalStore = Number(totalStore);
            let closerStore = Number(v.ecount) + Number(v.ccount);
            closerStore = Number(closerStore);
            let closerRate = closerStore / totalStore * 100;
            closerRate = closerRate.toFixed(1);
            v.totalStore = totalStore;
            v.closerStore = closerStore;
            v.closerRate = closerRate;
            tmpArray.push(v);
          }
          this.yearData = tmpArray;

          this.finenceYearData = data3

        })
      },
      async getFranchiseView(frnchiseCode) {
        //let model = new ApiModel(this.$http)
        let result = await this.apiModel.getFranchiseView(frnchiseCode);
        let data = null;
        if (result.status === 200) {
          data = result.data;

          if(typeof data === 'string'){
            data = data.replace(/\\'/g, "")
            //console.log(data)
            //data = JSON.parse(data)
            data1 = eval("("+data+")")
          }
          let paging = data.shift();
          for (const value of data) {
            value.total = this.numberFormating(value.total);
            value.educost = this.numberFormating(value.educost);
            value.deposit = this.numberFormating(value.deposit);
            value.othercost = this.numberFormating(value.othercost);
            value.interiorcost = this.numberFormating(value.interiorcost);
            value.membership = this.numberFormating(value.membership);
            value.sicost = this.numberFormating(value.sicost);
            let img3 = value.img3;
            if (value.img3 === "") {
              img3 = "../../src/assets/fc_noimg_263168.jpg";
              if(location.host === 'f-link.co.kr' || location.host === 'www.f-link.co.kr'){
                img3 = "../src/assets/fc_noimg_263168.jpg";
              }
            } else {
              img3 = "//file.mk.co.kr" + img3.slice(12);
            }
            value.img3 = img3;
          }
          console.log(data);
          return data;
        }
      },
      async getFranchiseYearData(frnchiseCode) {
        let result = await this.apiModel.getFranchiseYearData(frnchiseCode);
        let data = null;
        if (result.status === 200) {
          data = result.data;
        }
        return data;
      },
      getStoreList(frnchiseCode, centerCode = "") {
        this.apiModel.getOP402(
          frnchiseCode,
          "100",
          "1",
          centerCode
        ).then((result)=>{
          if (result.status === 200) {
            let data = result.data.data.rows;
            let tmparr = [];
                let x = null;
                let y = null;
                for (const value of data) {
                  x = Number(value.xAxis);
                  y = Number(value.yAxis);
                  let date = this.getDateFormat(new Date(value.firstDate));
                  let tel = value.tel;
                  if (tel.slice(3, 4) === "2") {
                    tel = tel.slice(2)
                  }else{
                    tel = tel.slice(1)
                  }
                  tel = phoneFomatter(tel);
                  value.tel = tel;
                  value.firstDate = date;
                  let position = [];
                  position = convertGeo([x, y]);
                  value.position = position;
                  value.categoryCode = this.categoryCode
                  value.storeNameEncode = Base64.encode(value.refBnm)
                  tmparr.push(value);
                }
                //console.log(tmparr)
                this.storeList = tmparr;
                this.makeMakers(tmparr);
          }
        })

      },

      async getFinenceYearData(frnchiseCode) {
        let result = await this.apiModel.getFinanceYearData(frnchiseCode);
        let data = null;
        if (result.status === 200) {
          data = result.data;
          for (const value of data) {
            value.assets = this.numberFormating(value.assets)
            value.capital = this.numberFormating(value.capital)
            value.debt = this.numberFormating(value.debt)
            value.sales = this.numberFormating(value.sales)
            value.profit = this.numberFormating(value.profit)
            value.income = this.numberFormating(value.income)
          }
        }
        return data;
      },
      numberFormating(num) {
        num = num.slice(0, -1);
        num = Number(num);
        num = numeral(num).format("0,0");
        return num;
      },
      mapRendering() {
        console.log("지도 셋팅 시작")
        let container = this.$refs.map //지도를 담을 영역의 DOM 레퍼런스
        let options = { //지도를 생성할 때 필요한 기본 옵션
            center: new daum.maps.LatLng(37.56611900511385, 126.97774128459538), //지도의 중심좌표.
            level: 5 //지도의 레벨(확대, 축소 정도)
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
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), this.displayCenterInfo)
        this.mapEventListener(map,geocoder)
        console.log("지도 셋팅 완료")
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
            })
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
      displayCenterInfo(result, status) {
          if (status === daum.maps.services.Status.OK) {
            for(let i = 0; i < result.length; i++) {
                // 법정동의 region_type 값은 'B' 이므로
                if (result[i].region_type === 'B') {
                    let code = result[i].code
                    this.centerCode = code
                    this.sggCd = code.substring(0, 5)
                }
            }
          }
      },
      makeMakers(rows) {
        let x = null;
        let y = null;
        this.makersClean();
        let idx = 0;
        for (const value of rows) {
          //console.log(value)
          //x = Number(value.xAxis);
          //y = Number(value.yAxis);
          let marker = null;
          value.idx = idx;
          marker = this.setMaker(value);
          marker.idx = idx;
          this.makeInfoWindow(marker, value);
          this.clickAddEvnentListener(marker, value);
          this.queue.setQueue(marker);
          idx++;
        }
      },
      setMaker(value) {
        let tmparr = [];
        //tmparr = convertGeo([x, y]);
        tmparr = value.position;
        let marker = new daum.maps.Marker({
          map: this.mapInstance, // 마커를 표시할 지도
          position: new daum.maps.LatLng(tmparr[1], tmparr[0]), // 마커를 표시할 위치
          title: value.refBnm // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });
        return marker;
      },
      makeInfoWindow(marker, value){
        // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
        let iwContent = `<div style="padding:5px;height:25px;">${value.refBnm}</div>` // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

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
            this.$nextTick(function(){
                //let activeItem = document.getElementById(value.bdMgtSn)
                let activeItem = this.$el.getElementsByClassName('list-item-active')
                setTimeout(()=>{
                    //console.log(activeItem.item(0))
                    activeItem.item(0).scrollIntoView(true)
                    }, 150)
            })
        })

        /* // 마커에 마우스오버 이벤트를 등록합니다
        daum.maps.event.addListener(marker, 'mouseover', () => {
          // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(this.mapInstance, marker)
            this.cursor = value.idx
            let activeItem = this.$el.getElementsByClassName('item-store')[value.idx]
            activeItem.scrollIntoView(true)
        })

        // 마커에 마우스아웃 이벤트를 등록합니다
        daum.maps.event.addListener(marker, 'mouseout', () => {
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            infowindow.close()
        }) */
      },
      clickAddEvnentListener(marker, value){
        daum.maps.event.addListener(marker, 'click', () => {
          //this.$router.push({ name: 'store-view', params: { categoryCode: value.categoryCode, storeName: value.storeNameEncode, id: value.bdMgtSn } })
        })

      },
      makersClean() {
        let tmp = undefined;
        let length = this.queue.getQueueLength();
        if (length !== 0) {
          for (let i = 0; i < length; i++) {
            tmp = this.queue.getQueue();
            if (typeof tmp === "undefined") {
              break;
            }
            tmp.setMap(null);
          }
          this.cursor = 0;
        }
      },
      getDateFormat(date) {
        let year = date.getFullYear(); //yyyy

        let month = 1 + date.getMonth(); //M

        month = month >= 10 ? month : "0" + month; // month 두자리로 저장

        let day = date.getDate(); //d

        day = day >= 10 ? day : "0" + day; //day 두자리로 저장

        return year + "-" + month + "-" + day;
      },


    }
  }
</script>

<style>
.txt {
  overflow-x: scroll;
}
.map_list {
  margin-bottom: 45px;
}
.map_list .map {
  height: 320px;
}
.list-item-active {
    background-color: antiquewhite;
}
</style>
