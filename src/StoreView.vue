<template>
  <!--  section -->
		<section>
			<div class="box">
				<div class="view">
					<div class="tit">
						<img src="http://m.mk.co.kr/images/2018/franchise/img_brand_logo03.jpg" alt="브랜드로고">
						<h1>이디야 충무로점</h1>
						<h2>서울 중구 퇴계로 188 (필동1가) 36-2<br>02-1234-5678</h2>
					</div>

					<div class="map_list">
						<div class="map" ref="map">
							<!-- <img src="http://m.mk.co.kr/images/2018/franchise/bg_map.jpg" alt="지도" style="display:block;width:100%"> -->
							<!-- <div class="icon_peple" style="position:absolute;left:100px;top:60px;"></div> -->
						</div>
						<div class="peple">
							<h1>유동인구 유입경로</h1>
							<h2>이 영역에서 유동인구가 가장 높게 유입되는 방향은 ‘남서’측이며, 도보한계치는 최대 596m까지 입니다. </h2>
							<p>※ 도보한계치란? 도보로 이동했을 때, 빌딩을 이용하는데 불편함을 느끼지 않는 한계 거리를 의미합니다</p>
						</div>
					</div>
					<br>
					<div class="txt">
						<h1>기본 정보</h1>
						<table>
							<tr>
								<th>건물명</th>
								<td>애경타워</td>
							</tr>
							<tr>
								<th>주소</th>
								<td>서울특별시 중구 명동2가 1-5</td>
							</tr>
							<tr>
								<th>건물유형</th>
								<td>기타 제2종 근생</td>
							</tr>
							<tr>
								<th>연면적</th>
								<td>747.3㎡</td>
							</tr>
							<tr>
								<th>층수</th>
								<td>지하1층-지상4층</td>
							</tr>
							<tr>
								<th>지하철/버스</th>
								<td>7m/131m</td>
							</tr>
							<tr>
								<th>주차대수</th>
								<td>옥외 2대/옥내 5대</td>
							</tr>
							<tr>
								<th>승강기대수</th>
								<td>3대</td>
							</tr>
							<tr>
								<th>준공연도</th>
								<td>1900년</td>
							</tr>
						</table>
					</div>

					<div class="txt">
						<h1>건물 내 업체 현황</h1>
						<table class="box_white">
							<tbody>
								<tr>
									<th>이마트 everyday(지하1층)</th>
									<td>02-2000-5450</td>
								</tr>
								<tr>
									<th>이디야 필동점(1층)</th>
									<td>02-2000-5450</td>
								</tr>
								<tr>
									<th>오매가매</th>
									<td>02-2000-5450</td>
								</tr>
								<tr>
									<th>고도일학원 필동점</th>
									<td>02-2000-5450</td>
								</tr>
								<tr>
									<th>이마트 everyday(지하1층)</th>
									<td>02-2000-5450</td>
								</tr>
								<tr>
									<th>이디야 필동점(1층)</th>
									<td>02-2000-5450</td>
								</tr>
								<tr>
									<th>오매가매</th>
									<td>02-2000-5450</td>
								</tr>
								<tr>
									<th>고도일학원 필동점</th>
									<td>02-2000-5450</td>
								</tr>
							</tbody>
						</table>

					</div>

					<div class="txt">
						<h1>건물 평가지표</h1>
						<p>※건물을 중심으로 인구 흐름을 분석한 배후지영역에 대한 평가</p>
						<div class="value">
							<div>
								<div class="graph1"><img alt="건물평가지표 임시이미지" src="http://m.mk.co.kr/images/2018/franchise/img_graph1.jpg" style="width:100%"></div>
								<div class="box_beige">
									<ul>
										<li><strong>지표 설명</strong></li>
										<li><b>성장성</b>한식 업종의 전(12개월 전)년 대비 매출성장률을 지수로 나타냅니다.</li>
										<li><b>안정성</b>한식 업종을 창업 시 얼마나 오래 유지할 수 있는지를 지수화 했습니다.</li>
										<li><b>유동성</b>건물의 배후지영역의 잠재 고객수를 지수화 했습니다.</li>
										<li><b>수익성</b>한식 업종 창업 시 객단가를 지역 평균과 비교해 제시합니다.</li>
										<li><b>접근성</b>건물의 교통 및 접근 편의성을 지수화 했습니다.</li>
									</ul>
								</div>
							</div>

							<div>
								<h1>유동성</h1>
								<p>※건물 주변 배후지영역 내 유동인구 분석</p>
								<div>
									<h2>성별 분포</h2>
									<div class="graph2" style="width: 100%; height: 65px; background-color: rgb(220, 220, 220);"></div>
								</div>
								<div>
									<h2>연령별 분포</h2>
									<div class="graph2" style="width: 100%; height: 65px; background-color: rgb(220, 220, 220);"></div>
								</div>
								<div class="mobility">
									<h2>유동성 - 요일별, 시간대별 유동인구 현황</h2>
									<div>
										<h3>동월 매출 변동 추이</h3>
										<select onchange="selectMove(this.form)" title="달력">
											<option>1월</option>
										</select>
										<p>*매출추이는 특정 카드사의 매출자료로 추정한 금액입니다.</p>
										<div  class="graph3" style="width: 100%; height: 150px;background-color: rgb(242, 242, 242);"></div>
									</div>
									<div>
										<h3>시간대별 매출 비중 (최근 3개월 평균매출)</h3>
										<div  class="graph3" style="width: 100%; height: 150px;background-color: rgb(242, 242, 242);"></div>
									</div>
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
												<td>20대</td>
											</tr>
											<tr>
												<td>승강기 대수</td>
												<td>2대</td>
											</tr>
											<tr class="line"><td colspan="3"></td></tr>
											<tr>
												<th rowspan="2">배후지영역</th>
												<td>지하철 정보</td>
												<td>동묘앞역2번출구</td>
											</tr>
											<tr>
												<td>버스정류장 수</td>
												<td>2개</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div>
								<h1>성장성</h1>
								<p>※한식업종 매출추이</p>
								<div>
									<h2>전년도 연간 매출 변동추이</h2>
									<div  class="graph3" style="width: 100%; height: 150px;background-color: rgb(242, 242, 242);"></div>
								</div>
							</div>
							<div>
								<h1>안정성</h1>
								<div>
									<h2>한식업종 평균 영업기간 [단위: 년]</h2>
									<div  class="graph3" style="width: 100%; height: 150px;background-color: rgb(242, 242, 242);"></div>
								</div>
								<div>
									<h2>배후지 영역 내 한식업종 사업체 수</h2>
									<ul class="box_white">
										<li><span>사랑방 갈비</span><p>서울특별시 중구 필동 1가 134 매경빌딩 102허</p></li>
										<li><span>사랑방 갈비</span><p>서울특별시 중구 필동 1가 134 매경빌딩 102허</p></li>
										<li><span>사랑방 갈비</span><p>서울특별시 중구 필동 1가 134 매경빌딩 102허</p></li>
										<li><span>사랑방 갈비</span><p>서울특별시 중구 필동 1가 134 매경빌딩 102허</p></li>
										<li><span>사랑방 갈비</span><p>서울특별시 중구 필동 1가 134 매경빌딩 102허</p></li>
										<li><span>사랑방 갈비</span><p>서울특별시 중구 필동 1가 134 매경빌딩 102허</p></li>
										<li><span>사랑방 갈비</span><p>서울특별시 중구 필동 1가 134 매경빌딩 102허</p></li>
										<li><span>사랑방 갈비</span><p>서울특별시 중구 필동 1가 134 매경빌딩 102허</p></li>
									</ul>
								</div>
							</div>
							<div>
								<h1>수익성</h1>
								<p>※한식 업종의 지역 객단가 비교</p>
								<div class="box_beige">
									<p>한식 업종의 선택 지역 객단가(결제 1건당 매출액)는 지역 평균값 0,000원과 비슷한 수준입니다. (업종 특성 상 메뉴, 영업형태 등 요소에 의해 객단가 평가에 차이가 발생할 수 있습니다.)</p>
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
  import ApiModel from './model/apiModel.js'
  export default {
    name: 'Main',
    components: {

    },
    data() {
      return {
        mapInstance: Object,
        geoCoder: Object,
        apiModel: new ApiModel(this.$http)
      }
    },
    watch: {

    },
    created() {

    },
    mounted() {
      this.$nextTick(function () {
      // 모든 화면이 렌더링된 후 실행합니다.
        this.mapRendring()
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

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        let zoomControl = new daum.maps.ZoomControl();
        map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
        map.setMaxLevel(7);
        let coords = map.getCenter()
        //geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), this.displayCenterInfo)
        //this.mapEventListener(map,geocoder)
        console.log("지도 셋팅 완료")
      },
    }
  }
</script>

<style scoped>

</style>
