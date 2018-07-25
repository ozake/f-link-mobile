<template>
    <div>
    <!--  section -->
		<section>
			<div class="main">
				<ul>
					<li><router-link :to="{ name: 'store-page' }"><img src="http://m.mk.co.kr/images/2018/franchise/btn_fc03.png" alt="우리동네매장"><span>우리동네<br>매장</span></router-link></li>
					<li><router-link :to="{ name: 'sales-page' }"><img src="http://m.mk.co.kr/images/2018/franchise/btn_fc04.png" alt="상가매물"><span>상가 매물</span></router-link></li>
				</ul>
				<ul>
					<li><a href="#"><img src="http://m.mk.co.kr/images/2018/franchise/btn_fc01.png" alt="브랜드"><span>브랜드</span></a></li>
					<li><a href="http://www.f-link.co.kr/m/index.php?TM=C"><img src="http://m.mk.co.kr/images/2018/franchise/btn_fc02.png" alt="착한 컨설팅"><span>착한 컨설팅</span></a></li>
				</ul>
				<ul>
					<li><a href="http://www.f-link.co.kr/m/index.php?TM=N"><img src="http://m.mk.co.kr/images/2018/franchise/btn_fc06.png" alt="창업 뉴스"><span>창업 뉴스</span></a></li>
					<li><a href="http://www.f-link.co.kr/m/index.php?TM=D"><img src="http://m.mk.co.kr/images/2018/franchise/btn_fc07.png" alt="이벤트"><span>이벤트</span></a></li>
				</ul>
			</div>
		</section>
		<!--//  section -->
        
    </div>
</template>
<script>
export default {
  name: 'Main'
}
</script>
