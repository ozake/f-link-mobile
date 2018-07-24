<template>
  <!--  section -->
		<section>
			<div class="box">
				<div class="view">
					<div class="tit">
						<!-- <img src="http://m.mk.co.kr/images/2018/franchise/img_brand_logo03.jpg" alt="브랜드로고"> -->
						<h1>{{storeName}}</h1>
						<h2>{{item.addr}}</h2>
					</div>

					<div class="map_list">
						<div class="map" ref="map">
							<!-- <img src="http://m.mk.co.kr/images/2018/franchise/bg_map.jpg" alt="지도" style="display:block;width:100%"> -->
							<!-- <div class="icon_peple" style="position:absolute;left:100px;top:60px;"></div> -->
						</div>
						<div class="peple">
							<h1>유동인구 유입경로</h1>
							<h2>이 영역에서 유동인구가 가장 높게 유입되는 방향은 ‘{{basedMaster.direction}}’이며, 도보한계치는 최대 {{basedMaster.distM}}m까지 입니다. </h2>
							<p>※ 도보한계치란? 도보로 이동했을 때, 빌딩을 이용하는데 불편함을 느끼지 않는 한계 거리를 의미합니다</p>
						</div>
					</div>
					<br>
					<div class="txt">
						<h1>기본 정보</h1>
						<table>
							<tr>
								<th>건물명</th>
								<td>{{item.buldNm}}</td>
							</tr>
							<tr>
								<th>주소</th>
								<td>{{item.addr}}</td>
							</tr>
							<tr>
								<th>건물유형</th>
								<td>{{item.bdtypNm}}</td>
							</tr>
							<tr>
								<th>연면적</th>
								<td>{{item.grossArea}}㎡</td>
							</tr>
							<tr>
								<th>층수</th>
								<td>지하{{item.undFloor}}층-지상{{item.groFloor}}층</td>
							</tr>
							<tr>
								<th>지하철/버스</th>
								<td>{{item.subDist}}m/{{item.busDist}}m</td>
							</tr>
							<tr>
								<th>주차대수</th>
								<td>{{item.totalparknum}}</td>
							</tr>
							<tr>
								<th>승강기대수</th>
								<td>{{item.liftnum}}대</td>
							</tr>
							<tr>
								<th>준공연도</th>
								<td>{{item.useapprovaldate}}년</td>
							</tr>
						</table>
					</div>

					<div class="txt">
						<h1>건물 내 프랜차이즈 업체 현황</h1>
						<table class="box_white">
							<tbody>
								<tr v-for="item in buildIn">
									<th>{{item.refNm}} {{item.refBnm}}</th>
									<td>{{item.tel}}</td>
								</tr>
							</tbody>
						</table>

					</div>

					<div class="txt">
						<h1>건물 평가지표</h1>
						<p>※건물을 중심으로 인구 흐름을 분석한 배후지영역에 대한 평가</p>
						<div class="value">
							<div>
								<div class="RaderGraphContainer">
									<chart-rader :labels="raderChartLabels" :datasets="raderChartDatasets" :options="raderChartOption"></chart-rader>
								</div>
								<div class="box_beige">
									<ul>
										<li><strong>지표 설명</strong></li>
										<li><b>성장성</b>{{sectorName}} 업종의 전(12개월 전)년 대비 매출성장률을 지수로 나타냅니다.</li>
										<li><b>안정성</b>{{sectorName}} 업종을 창업 시 얼마나 오래 유지할 수 있는지를 지수화 했습니다.</li>
										<li><b>유동성</b>건물의 배후지영역의 잠재 고객수를 지수화 했습니다.</li>
										<li><b>수익성</b>{{sectorName}} 업종 창업 시 객단가를 지역 평균과 비교해 제시합니다.</li>
										<li><b>접근성</b>건물의 교통 및 접근 편의성을 지수화 했습니다.</li>
									</ul>
								</div>
							</div>

							<div>
								<h1>유동성</h1>
								<p>※건물 주변 배후지영역 내 유동인구 분석</p>
								<div>
									<h2>성별 분포</h2>
									<div class="genderGraph">
										<div v-for="(item,index) in basedInfo.fpoplSex" v-bind:style="{ width: item + '%'}" v-bind:class="{ male: ( index === 0 ), female: ( index === 1 ) }">{{(index === 0) ? '남성' : '여성'}}<br/>{{item + '%'}}</div>
									</div>
								</div>
								<div>
									<h2>연령별 분포</h2>
									<div class="ageGraph">
										<div v-for="(item,index) in basedInfo.fpoplAge" class="ageBlock" v-bind:style="{ width: item.rate + '%'}">{{ (item.rate > 10) ? item.ageTxt : ''  }}<br/>{{(item.rate > 10) ? item.rate+'%' : '' }}</div>
									</div>
								</div>
								<div class="mobility">
									<h2>유동성 - 요일별, 시간대별 유동인구 현황</h2>
									<!--요일별, 시간대별  그래프영역 -->
									<div class="lineGraphContainer">
										<chart-line :labels="lineChartLabels" :datasets="lineChartDatasets" :options="lineChartOption"></chart-line>
									</div>
									<!--//요일별, 시간대별  그래프영역 -->
								</div>
							</div>

							<div>
								<h1>접근성</h1>
								<p>※선택 건물의 교통편의시설 및 배후지영역 내 교통시설</p>
								<div class="box_white">
									<table class="access">
										<tbody>
											<tr>
												<th rowspan="2">건물</th>
												<td>주차가능 대수</td>
												<td>{{item.totalparknum}}대</td>
											</tr>
											<tr>
												<td>승강기 대수</td>
												<td>2대</td>
											</tr>
											<tr class="line"><td colspan="3"></td></tr>
											<tr>
												<th rowspan="2">배후지영역</th>
												<td>지하철역 입구 수</td>
												<td>{{basedInfo.subCnt}}개</td>
											</tr>
											<tr>
												<td>버스정류장 수</td>
												<td>{{basedInfo.busCnt}}개</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div>
								<h1>성장성</h1>
								<p>※{{sectorName}}업종 매출추이</p>
								<div>
									<h2>전년도 연간 매출 변동추이</h2>
									<div class="lindGraphContainer">
										<chart-line v-show="tpindSlngFlag" :labels="salesChartLabels" :datasets="salesChartDatasets" :options="salesChartOption"></chart-line>
						     			 <!--그래프 없을경우 -->
										<div v-if="!tpindSlngFlag" style="background-color:#f2f2f2; width:100%; height: 100%;">
											<p class="nograph">해당업종 정보가 5건 이하로 그래프를 제공하지 않습니다.</p>
										</div>
							  			<!--//그래프 없을경우 -->
									</div>
									<!-- <div  class="graph3" style="width: 100%; height: 150px;background-color: rgb(242, 242, 242);"></div> -->
								</div>
							</div>
							<div>
								<h1>안정성</h1>
								<div>
									<h2>{{sectorName}}업종 평균 영업기간 [단위: 년]</h2>
									<div  class="graph3" style="width: 100%; height: 150px;">
										<chart-bar :labels="averageChartLabels" :datasets="averageChartDatasets" :options="averageChartOption"></chart-bar>
									</div>
								</div>
								<div>
									<h2>배후지 영역 내 {{sectorName}}업종 사업체 수</h2>
									<ul class="box_white">
										<li v-for="item in catStoreList"><span>{{item.refNm + ' ' + item.refBnm}}</span><p>{{item.addr}}</p></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!--//  section -->

</template>

<script>
  import ChartRader from './components/ChartRader.vue';
  import ChartLine from './components/ChartLine.vue';
  import ChartBar from './components/ChartBar.vue';
  import { convertGeo, phoneFomatter } from './model/util.js'
  import DataPaser from "./model/dataPaser.js"
  import ApiModel from './model/apiModel.js'
  export default {
    name: 'Main',
    components: {
		ChartRader,
		ChartLine,
		ChartBar
    },
    data() {
      return {
        mapInstance: Object,
        geoCoder: Object,
		apiModel: new ApiModel(this.$http),
      	item : '',
      	storeName : Base64.decode(this.$route.params.storeName),
		buildIn : [],
		basedMaster : {},
		mapInstance : '',
		geocorderInstance : '',
		raderChartLabels : ['안전성', '유동성', '수익성', '접근성', '성장성'],
		raderChartDatasets : [],
		raderChartOption : {
			scale: {
				ticks: {
					beginAtZero: true
				}
			},
			devicePixelRatio: 2
		},
		//lineChartLabels : ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
		lineChartLabels : ['00','03','06','09','12','15','18','21'],
		lineChartDatasets : [],
		lineChartOption : {
			tooltips: {
				mode: 'index',
				intersect: true,
			},
			/* hover: {
				mode: 'nearest',
				intersect: true
			}, */
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Hour'
					}
				}],
				yAxes: [{
					display: false,
					scaleLabel: {
						display: false,
						labelString: '유동인구(명)'
					}
				}]
			},
			devicePixelRatio: 2,
			maintainAspectRatio: false
		},
		salesChartLabels : ['2017.02','2017.03','2017.04', '2017.05', '2017.06', '2017.07', '2017.08', '2017.09','2017.10', '2017.11', '2017.12', '2018.01', '2018.02'],
		salesChartDatasets : [],
		salesChartOption : {
			tooltips: {
				enabled: false,
				mode: 'index',
				intersect: false,
			},
			hover: {
				enabled: false,
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: false,
					scaleLabel: {
						display: false,
						labelString: '매출(만원)'
					}
				}]
			},
			devicePixelRatio: 2
		},
		averageChartLabels: [],
		averageChartDatasets : [],
		averageChartOption : {
			responsive: true,
			legend: {
				position: 'top'
			},
			scales: {
				yAxes: [{
					display: true,
					ticks: {
				min: 0
				},
					scaleLabel: {
						display: true,
						labelString: '영업기간(년도)'
					}
				}]
			},
			devicePixelRatio: 2
		},
		basedInfo: {},
        ageText: '',
		catStoreList: [],
		catStoreListNum: 0,
		sectorName: '',
		tpindSlngFlag: false
      }
    },
    watch: {

    },
    created() {
		let bdid = this.$route.params.id
		this.getBuildingInfo(bdid)
		this.getBuildingBasedStore(bdid)
		this.getSectorNmae()
    },
    mounted() {
      this.$nextTick(function () {
      // 모든 화면이 렌더링된 후 실행합니다.
        this.mapRendring()
      })
    },
    methods: {
		getSectorNmae() {
			let url = '../../../src/assets/sectorMcode.json'
			if(location.hostname === "110.13.170.148" || location.hostname === "127.0.0.1" || location.hostname === "192.168.1.180"){
				url = '../../../../src/assets/sectorMcode.json'
			}
			this.$http.get(url).then((result)=>{
				if(result.status === 200){
					for (const value of result.data.sectorM) {
						if(value.code === this.$route.params.categoryCode){
							this.sectorName = value.categoryName
						}
					}
				}
			})
		},
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

			// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
			let zoomControl = new daum.maps.ZoomControl();
			map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
			map.setMaxLevel(7);
			let coords = map.getCenter()
			//geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), this.displayCenterInfo)
			//this.mapEventListener(map,geocoder)
			console.log("지도 셋팅 완료")
		},
		getBuildingInfo(bdMgtSn){
			this.apiModel.getOP408(bdMgtSn).then((result)=>{
				if(result.status === 200){
					let data = result.data.data.rows[0]
					console.log('건물정보')
					console.log(data)
					data.subDist = Number(data.subDist).toFixed(0)
					data.busDist = Number(data.busDist).toFixed(0)
					data.grossArea = Number(data.grossArea).toFixed(2)
					let useYear = new Date(Number(data.useapprovaldate))
					data.useapprovaldate = useYear.getFullYear()
					let xAxis = Number(data.xAxis)
					let yAxis = Number(data.yAxis)
					this.setMaker(xAxis,yAxis,data.storeName)

					this.item = data
					this.getBasedInfo(data.baseXycrd)
					this.getBasedCategory(data.baseXycrd, this.$route.params.categoryCode ,data.bdMgtSn)
					this.getBasedMaster(data.bdMgtSn, data.baseXycrd)
					this.getStoreListbyCte(data.baseXycrd, this.$route.params.categoryCode)
							
				}
			})
		},
		getBasedInfo(basedCode){
			this.apiModel.getOP409(basedCode).then((result)=>{
				if(result.status === 200){
					console.log(result)
					let data = result.data.data.rows[0]
					data.fpoplSex = this.makeNumberArray(data.fpoplSex, 2)
					data.fpoplAge = this.makeBasedAgeArr(data.fpoplAge, 0)
					data.fpoplSun = JSON.parse(data.fpoplSun).filter(this.arrayMudularFilter)
					data.fpoplMon = JSON.parse(data.fpoplMon).filter(this.arrayMudularFilter)
					data.fpoplTue = JSON.parse(data.fpoplTue).filter(this.arrayMudularFilter)
					data.fpoplWed = JSON.parse(data.fpoplWed).filter(this.arrayMudularFilter)
					data.fpoplThu = JSON.parse(data.fpoplThu).filter(this.arrayMudularFilter)
					data.fpoplFri = JSON.parse(data.fpoplFri).filter(this.arrayMudularFilter)
					data.fpoplSat = JSON.parse(data.fpoplSat).filter(this.arrayMudularFilter)
					this.basedInfo = data
					this.basedAge = data.fpoplAge
					this.lineChartDatasets = [{
						label : '일요일',
						borderColor: '#4dc9f6',
						backgroundColor: '#4dc9f6',
						borderWidth: 1.5,
						fill: false,
						data: data.fpoplSun
					},
					{
						label : '월요일',
						borderColor: '#f67019',
						backgroundColor: '#f67019',
						borderWidth: 1.5,
						fill: false,
						data: data.fpoplMon
					},
					{
						label : '화요일',
						borderColor: '#f53794',
						backgroundColor: '#f53794',
						borderWidth: 1.5,
						fill: false,
						data: data.fpoplTue
					},
					{
						label : '수요일',
						borderColor: '#537bc4',
						backgroundColor: '#537bc4',
						borderWidth: 1.5,
						fill: false,
						data: data.fpoplWed
					},
					{
						label : '목요일',
						borderColor: '#acc236',
						backgroundColor: '#acc236',
						borderWidth: 1.5,
						fill: false,
						data: data.fpoplThu
					},
					{
						label : '금요일',
						borderColor: '#166a8f',
						backgroundColor: '#166a8f',
						borderWidth: 1.5,
						fill: false,
						data: data.fpoplFri
					},
					{
						label : '토요일',
						borderColor: '#00a950',
						backgroundColor: '#00a950',
						borderWidth: 1.5,
						fill: false,
						data: data.fpoplSat
					}]
				}
			})
		},
		arrayMudularFilter(el, idx){
			return ( idx%3 === 0 ) ? true : false
		},
		getBuildingBasedStore(val){
			this.apiModel.getOP412(val).then((result)=>{
				if(result.status === 200){
				//console.log(result)
				let data = result.data.data.rows
				let tmpArr = []
				for (const value of data) {
					let tel = value.tel
					tel = tel.slice(2)
					tel = phoneFomatter(tel)
					/* if(tel.slice(1,2) === '0'){
					tel = tel.slice(1)
					} */
					value.tel = tel
					tmpArr.push(value)
				}
				this.buildIn = tmpArr
				}
			})
		},
		getBasedCategory(basedCode, categoryCode, bdid){
			this.apiModel.getOP410(basedCode, categoryCode, bdid).then((result)=>{
				if(result.status === 200){
					console.log("410")
					console.log(result)
					let data = result.data.data.rows[0]
					let stbiz = this.reverseData(Number(data.stbiz))
					let liqdt = this.reverseData(Number(data.liqdt))
					let prftb = this.reverseData(Number(data.prftb))
					let aces = this.reverseData(Number(data.aces))
					let groth = this.reverseData(Number(data.groth))
					let stbizAvg = this.reverseData(Number(data.stbizAvg))
					let liqdtAvg = this.reverseData(Number(data.liqdtAvg))
					let prftbAvg = this.reverseData(Number(data.prftbAvg))
					let acesAvg = this.reverseData(Number(data.acesAvg))
					let grothAvg = this.reverseData(Number(data.grothAvg))
					let tpindSlngPanal = JSON.parse(data.tpindSlngPanal)
					let tpindSlngPanalAvg = JSON.parse(data.tpindSlngPanalAvg)
					let mktPerd = Number(data.mktPerd)
					let mktPerdAvg = Number(data.mktPerdAvg)
					let tpindSlngFlag = tpindSlngPanal.every((item, index, array)=>{
						//console.log(item)
						let flag = true
						if(item === null){
							flag = false
						}
						return flag
					})
					this.tpindSlngFlag = tpindSlngFlag
					this.salesChartDatasets = [
						{
							label : '배후지',
							borderColor: '#f53794',
							backgroundColor: '#f53794',
							borderWidth: 1.5,
							fill: false,
							data: tpindSlngPanal
						}
						/* {
							label : '지역평균',
							borderColor: '#4dc9f6',
							backgroundColor: '#4dc9f6',
							fill: false,
							data: tpindSlngPanalAvg
						} */
					]
					this.averageChartDatasets = [
						{
							label : '배후지',
							borderColor: '#f53794',
							backgroundColor: 'rgba(245, 55, 148, 0.6)',
							borderWidth: 1,
							data: [mktPerd]
						},
						{
							label : '지역평균',
							borderColor: '#4dc9f6',
							backgroundColor: 'rgba(77, 201, 246, 0.6)',
							borderWidth: 1,
							data: [mktPerdAvg]
						}
					]
					this.raderChartDatasets = [{
						label: '건물 평가지표',
						backgroundColor: 'rgba(200, 0, 27, 0.25)',
						borderColor: 'rgba(200, 9, 17, 0.45)',
						pointBackgroundColor: 'rgba(200, 9, 17, 0.6)',
						data : [
							stbiz, liqdt, prftb, aces, groth
						]
					},{
						label: '지역 평균',
						backgroundColor: 'rgba(0, 38, 209, 0.2)',
						borderColor: 'rgba(0, 38, 209, 0.4)',
						pointBackgroundColor: 'rgba(35, 48, 209, 0.5)',
						data : [
							stbizAvg, liqdtAvg, prftbAvg, acesAvg, grothAvg
						]
					}]
				}
			})
		},
		reverseData(num){
			switch (num) {
				case 10:
				num = 1;
				break;
				case 9:
				num = 2;
				break;
				case 8:
				num = 3;
				break;
				case 7:
				num = 4;
				break;
				case 6:
				num = 5;
				break;
				case 5:
				num = 6;
				break;
				case 4:
				num = 7;
				break;
				case 3:
				num = 8;
				break;
				case 2:
				num = 9;
				break;
				case 1:
				num = 10;
				break;
				default:
				break;
			}
			return num
		},
		getStoreListbyCte(basedCode, categoryCode){
			this.apiModel.getOP411(basedCode, categoryCode).then((result)=>{
				if(result.status === 200){
							console.log('411')
							//console.log(result.data)
							let data = result.data.data.rows
							this.catStoreListNum = data.length
							for (const value of data) {
								
							}
				this.catStoreList = data
				}
			})
		},
		/**
		 * 배열내의 스트링을 숫자형 변환 및
		 * 소수점 자리 지정하여 반올림해서 배열로 반환하는 메소드
		 * @param {Array} arr 데이터 배열
		 * @param {Number} digit 자릿수 지정
		 * @returns {Array}
		 */
		makeNumberArray(data, digit=0){
			let tmpArr = []
			data = JSON.parse(data)
			for (const value of data) {
				tmpArr.push(Number(value).toFixed(digit))
			}
			return tmpArr
		},
		makeBasedAgeArr(data, digit=0){
			let tmpArr = []
			data = JSON.parse(data)
			let age = 10
			for (const value of data) {
				tmpArr.push({ ageTxt: age+'대', rate: Number(value).toFixed(digit) })
				age = age+10
			}
			return tmpArr
		},
		mapEventListener(map,geocoder){
			daum.maps.event.addListener(map, 'dragend', () => {
				this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)
			})
		},
		searchAddrFromCoords(geocoder,coords,callback){
			geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
		},
		displayCenterInfo(result, status) {
			let addrText = '';
			if (status === daum.maps.services.Status.OK) {

				for(let i = 0; i < result.length; i++) {
					// 법정동의 region_type 값은 'B' 이므로
					if (result[i].region_type === 'B') {
						addrText = result[i].address_name
						let code = result[i].code
						code = code.substring(0,8)
						if(this.centerCode !== code){
						this.centerCode = code
						//console.log(code)
						/* this.getStoreList(this.$route.params.id, code).then((result)=>{

							let tmparr = []
							let x = null
							let y = null
							for (const value of result.rows) {
							x = Number(value.xAxis)
							y = Number(value.yAxis)
							let position = []
							position = convertGeo([x,y])
							value.position = position
							tmparr.push(value)
							}
							this.storeList = tmparr
							this.makeMakers(result.rows)

						}) */
						}
						//this.setAddr(addrText+"/ 법정동코드: "+code)

						break;
					}
				}
			}
		},
		makeMakers(rows){
			let x = null
			let y = null
			this.makersClean()
			for (const value of rows) {
				//console.log(value)
				x = Number(value.xAxis)
				y = Number(value.yAxis)
				let marker = null
				marker = this.setMaker(x,y,value)
				this.queue.setQueue(marker)
			}

		},
		setMaker(x,y,value){
			let icon = new daum.maps.MarkerImage(
				'http://img.mk.co.kr/2018/franchise/icon_loca02.png',
				new daum.maps.Size(20, 30),
				{
				offset: new daum.maps.Point(15, 30),
				alt: value,
				shape: "rect",
				coords: "0,0,20,30"
				})
			let tmparr = []
			tmparr = convertGeo([x,y])
			let marker = new daum.maps.Marker({
				map: this.mapInstance, // 마커를 표시할 지도
							position: new daum.maps.LatLng(tmparr[1], tmparr[0]), // 마커를 표시할 위치
							image: icon,
				title : value, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
			})
			return marker
		},
		makersClean(){
			let tmp = undefined
			let length = this.queue.getQueueLength()
			if(length !== 0){
				for(let i=0; i<length; i++){
				tmp = this.queue.getQueue()
				if(typeof tmp === 'undefined'){
					break;
				}
				tmp.setMap(null)
				}
			}

		},
		getBasedMaster(buildid, basedId){
			this.apiModel.getOP413(buildid,basedId).then((result)=>{
				if(result.status === 200){
					console.log('배후지마스터')

					console.log(result.data)
					let data = result.data.data.rows[0]
					console.log(data)
					let direction = data.direction
					data.direction = this.changeDirectionName(direction)
					/* let geomJson = data.geomJson
					geomJson = JSON.parse(geomJson)
					console.log(geomJson) */
					this.basedMaster = data
					let parser = new DataPaser(data)
					let geoArr = parser.landGeocodeArr()
					let centerArr = parser.landCentercode()
					this.setPolygon(geoArr)
					this.setCenterMap(centerArr[1],centerArr[0])
				}
			})
		},
		/**
		 * setPolygon - 배후지영역을 지도에 다각형으로 그린다
		 *
		 * @param  {Array} data 배후지좌표 배열을 파람으로 전달
		 * @return {void}
		 */
		setPolygon(data){
			let pathArr = []
			for(let value of data){
				pathArr.push(new daum.maps.LatLng(value[1],value[0]))
			}

			let polygon = new daum.maps.Polygon({
				map: this.mapInstance,
				path: pathArr,
				strokeWeight: 2,
				strokeColor: '#FF00FF',
				strokeOpacity: 0.8,
				strokeStyle: 'dashed',
				fillColor: '#61D5B4',
				fillOpacity: 0.6
			})

			polygon.setMap(this.mapInstance)

			/* let customOverlay = new daum.maps.CustomOverlay({})
			customOverlay.setZIndex(1000)
			
			daum.maps.event.addListener(polygon, 'mouseover', (mouseEvent) => {
				polygon.setOptions({fillColor: '#8EF5CD'});

				customOverlay.setContent(`<div class="areainfo">
								<b>배후지 영역이란?</b>
								해당 건물 기준  인구수, 이동거리,이동방향을 고려해<br> 창업에 영향을 미치는 상권영역	
							</div>`);
				
				customOverlay.setPosition(mouseEvent.latLng); 
				customOverlay.setMap(this.mapInstance);
			});

			// 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다 
			daum.maps.event.addListener(polygon, 'mousemove', (mouseEvent) => {	
				customOverlay.setPosition(mouseEvent.latLng); 
			});

			// 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
			// 커스텀 오버레이를 지도에서 제거합니다 
			daum.maps.event.addListener(polygon, 'mouseout', ()=> {
				polygon.setOptions({fillColor: '#61D5B4'});
				customOverlay.setMap(null);
			}); */

		},
		setCenterMap(x,y){
			this.mapInstance.setCenter(new daum.maps.LatLng(x, y))
		},
		changeDirectionName(data){
			let res = ''
			switch (data) {
				case "E":
					res = "동쪽"
					break;
				case "W":
					res = "서쪽"
					break;
				case "S":
					res = "남쪽"
					break;
				case "N":
					res = "동쪽"
					break;
			
				default:
					break;
			}
			return res
		}


    }
  }
</script>
<style>
.view .map {
	height: 320px;
}
.genderGraph {
	width:100%;
	height:65px;
	overflow:hidden;
	font-size: 14px;
	font-weight: bold;
	text-align: center;
	line-height: 28px;
	color: aliceblue;
}
.male {
	background-color: #23B4E6;
	float: left;
	overflow: hidden;
	height: 65px;
	box-sizing:border-box;
}
.female {
	background-color: #9DCB64;
	float: left;
	overflow: hidden;
	height: 65px;
	box-sizing:border-box;
}
.ageGraph {
	width:100%;
	height:65px;
	overflow: hidden;
	font-size: 14px;
	font-weight: bold;
	text-align: center;
	line-height: 28px;
	color: aliceblue;
}
.ageBlock {
	float: left;
	overflow: hidden;
	height: 65px;
	box-sizing:border-box;
}
.ageBlock:nth-child(0) {
	background-color: #9DCB64;
}
.ageBlock:nth-child(1) {
	background-color: rgba(157, 203, 100, 0.911);
}
.ageBlock:nth-child(2) {
	background-color: rgba(148, 192, 95, 0.911);
}
.ageBlock:nth-child(3) {
	background-color: rgba(133, 172, 85, 0.911);
}
.ageBlock:nth-child(4) {
	background-color: rgba(102, 131, 75, 0.911);
}
.ageBlock:nth-child(5) {
	background-color: rgba(91, 119, 59, 0.911);
}
.ageBlock:nth-child(6) {
	background-color: rgba(64, 83, 41, 0.911);
}
.ageBlock:nth-child(7) {
	background-color: rgba(29, 37, 18, 0.911);
}
.RaderGraphContainer {
	width: 100%;
	overflow: hidden;
}
.lineGraphContainer {
	width:100%;
	overflow: hidden;
}
.nograph {
    text-align: center;
    padding-top: 14%;
    font-size: 17px;
    color: #666;
}
</style>
