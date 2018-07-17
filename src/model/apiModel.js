export default class ApiModel {

    /**
     * ApiModel 클래스 생성자 함수
     * axios 모듈을 반드시 생성자 함수 인자로 넘겨준다
     * @param {Axios} $http Axios모듈 인자
     */
    constructor($http) {
      this.http = $http;
      this.baseURI = 'http://www.f-link.co.kr';
      this.apiNo = '402';
      this.config = {
        method: 'post',
        url: `${this.baseURI}/container/OP-${this.apiNo}.php`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
        //각 메소드에서 http request로 전달할 데이터 객체를 정의해서 사용
        }
      }
    }

    /**
     * OP-402 API 조회 메소드
     * 리턴형은 http Axios의 promise형으로 반환
     * @param {*} franchiseNo
     * @param {*} pageNo
     * @param {*} row
     * @param {*} centerCode //법정동 코드
     * @returns {promise}
     */
    getOP402(franchiseNo='20080100047', row='10', pageNo='1',centerCode=''){
      let sggCd = centerCode.substring(0,5)
      this.apiNo = '402';
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = {
        'pageNo':pageNo,
        'row':row,
        //'emdCd':centerCode,
        'sggCd': sggCd,
        'franchiseNo':franchiseNo
      }
      return this.http(this.config)
    }

    /**
     * OP-403 API 조회 메소드
     * 업종별 SNS 베스트
     * 리턴형은 http Axios의 promise형으로 반환
     * @param {*} ftcCate2Cd 업종코드
     * @param {*} pageNo
     * @param {*} row
     * @returns {promise}
     */
    getOP403(ftcCate2Cd='0101', row='16', pageNo='1'){
      this.apiNo = '403_2';
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = {
        'pageNo':pageNo,
        'row':row,
        'ftcCate2Cd': ftcCate2Cd
      }
      return this.http(this.config)
    }

    /**
     * OP-404 API 조회 메소드
     * @param {*} centerCode 구단위 코드
     * @param {*} ftcCate2Cd 업종코드
     * @param {*} row 표시할 데이터 갯수
     * @param {*} pageNo 페이지 넘버
     * @param {*} emdCd 법정동 코드
     * @returns {Promise}
     */
    getOP404(centerCode, ftcCate2Cd = '0101', row='10', pageNo='1', emdCd=''){
      centerCode = centerCode.substring(0,5);
      this.apiNo = '404'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = {
        'pageNo':pageNo,
        'row':row,
        'sggCd':centerCode,
        'emdCd':emdCd,
        'ftcCate2Cd':ftcCate2Cd
      }
      return this.http(this.config)
    }

    /**
     * OP-501 API 조회 메소드
     * @param {*} centerCode 구단위 코드
     * @param {*} ftcCate2Cd 업종코드
     * @param {*} row 표시할 데이터 갯수
     * @param {*} pageNo 페이지 넘버
     * @param {*} emdCd 법정동 코드
     * @returns {Promise}
     */
    getOP501(centerCode, ftcCate2Cd = '0101', row='10', pageNo='1', emdCd=''){
      centerCode = centerCode.substring(0,5);
      this.apiNo = '501'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = {
        'pageNo':pageNo,
        'row':row,
        'sggCd':centerCode,
        'emdCd':emdCd,
        'ftcCate2Cd':ftcCate2Cd
      }
      return this.http(this.config)
    }

    /**
     * OP-405 API 조회 메소드
     * @param {*} centerCode 구단위 코드
     * @param {*} franchiseNo 프렌차이즈번호
     * @param {*} row 표시할 데이터 갯수
     * @param {*} pageNo 페이지 넘버
     * @param {*} emdCd 법정동 코드
     * @returns {Promise}
     */
    getOP405(centerCode, franchiseNo = '', row='10', pageNo='1', emdCd=''){
      centerCode = centerCode.substring(0,5);
      this.apiNo = '405'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = {
        'pageNo':pageNo,
        'row':row,
        'sggCd':centerCode,
        'emdCd':emdCd,
        'franchiseNo':franchiseNo
      }
      return this.http(this.config)
    }

    /**
     * OP-407 API 조회 메소드
     * 건물추천리스트 조회
     * @param {*} emdCd 법정동코드
     * @param {*} ftcCate2Cd 업종코드
     * @param {*} row 표시할 데이터 갯수
     * @param {*} pageNo 페이지 넘버
     * @returns {Promise}
     */
    getOP407(emdCd='', ftcCate2Cd = '', row='10', pageNo='1'){
      emdCd = emdCd.substring(0,8)
      let sggCd = emdCd.substring(0,5)
      this.apiNo = '407'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = {
        'pageNo':pageNo,
        'row':row,
        'emdCd':emdCd,
        'sggCd':sggCd,
        'ftcCate2Cd':ftcCate2Cd
      }
      return this.http(this.config)
    }

    /**
     * OP-408 API 조회 메소드
     * 건물정보 조회
     * @param {*} bdMgtSn 건물아이디
     * @returns {Promise}
     */
    getOP408(bdMgtSn=''){
      this.apiNo = '408'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `bdMgtSn=${bdMgtSn}`
      return this.http(this.config)
    }

    /**
     * OP-409 API 조회 메소드
     * 배후지정보 조회
     * @param {*} baseXycrd 배후지기반기지국 번호
     * @returns {Promise}
     */
    getOP409(baseXycrd=''){
      this.apiNo = '409'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `baseXycrd=${baseXycrd}`
      return this.http(this.config)
    }

    /**
     * OP-410 API 조회 메소드
     * 업종별 배후지정보 조회
     * @param {*} baseXycrd 배후지기반기지국 번호
     * @param {*} ftcCate2Cd  업종 번호
     * @param {*} bdMgtSn 건물아이디
     * @returns {Promise}
     */
    getOP410(baseXycrd='', ftcCate2Cd='', bdMgtSn=''){
      this.apiNo = '410'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `baseXycrd=${baseXycrd}&ftcCate2Cd=${ftcCate2Cd}&bdMgtSn=${bdMgtSn}`
      return this.http(this.config)
    }

    /**
     * OP-411 API 조회 메소드
     * 배후지 업종별 사업체 리스트 조회
     * @param {*} baseXycrd 배후지기반기지국 번호
     * @param {*} ftcCate2Cd  업종 번호
     * @returns {Promise}
     */
    getOP411(baseXycrd='', ftcCate2Cd=''){
      this.apiNo = '411'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `baseXycrd=${baseXycrd}&ftcCate2Cd=${ftcCate2Cd}`
      return this.http(this.config)
    }

     /**
     * OP-412 API 조회 메소드
     * 건물내 업체리스트 조회
     * @param {*} bdMgtSn 건물아이디
     * @returns {Promise}
     */
    getOP412(bdMgtSn=''){
      this.apiNo = '412'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `bdMgtSn=${bdMgtSn}`
      return this.http(this.config)
    }

     /**
     * OP-412 API 조회 메소드
     * 건물내 업체리스트 조회
     * @param {String} bdMgtSn 건물아이디
     * @param {String} baseXycrd 건물아이디
     * @returns {Promise}
     */
    getOP413(bdMgtSn='',baseXycrd=''){
      this.apiNo = '413'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      //this.config.data = `bdMgtSn=${bdMgtSn}&baseXycrd=${baseXycrd}`
      this.config.data = {
        'bdMgtSn' : bdMgtSn,
        'baseXycrd' : baseXycrd
      }
      return this.http(this.config)
    }


    /**
     * 카테고리별 프렌차이즈 리스트 출력
     * @param {*} categoryName
     * @param {*} row
     * @param {*} pageNo
     * @returns {promise}
     */
    getFranchiseList(categoryName='한식', row='10', pageNo='0', min='', max=''){
      this.apiNo = '101'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `category2=${categoryName}&row=${row}&page=${pageNo}&minprice=${min}&maxprice=${max}`
      return this.http(this.config)
    }

     /**
     * 카테고리별 프렌차이즈 리스트 출력
     * @param {*} categoryName
     * @param {*} row
     * @param {*} pageNo
     * @returns {promise}
     */
    getFranchiseListGet(categoryName='한식', row='10', pageNo='0', min='', max=''){
      this.apiNo = '701_2'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `category2=${categoryName}&row=${row}&page=${pageNo}&minprice=${min}&maxprice=${max}`
      this.config.method = 'get'
      return this.http(this.config)
    }

    /**
     * 프렌차이즈 브랜드 정보 가져오기
     * @param {*} franchiseCode
     * @returns {promise}
     */
    getFranchiseView(franchiseCode='20080100243'){
      this.apiNo = '102'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `regnumber=${franchiseCode}`
      return this.http(this.config)
    }

    /**
     * 프렌차이즈 연도별 점포 정보 가져오기
     * @param {*} franchiseCode
     * @returns {promise}
     */
    getFranchiseYearData(franchiseCode='20080100243'){
      this.apiNo = '103'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `regnumber=${franchiseCode}`
      return this.http(this.config)
    }

    /**
     * 프렌차이즈 연도별 재무 정보 가져오기
     * @param {*} franchiseCode
     * @returns {promise}
     */
    getFinanceYearData(franchiseCode='20080100243'){
      this.apiNo = '104'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `regnumber=${franchiseCode}`
      return this.http(this.config)
    }


    /**
     * 소자본 창업 BEST 리스트
     * @param {*} pageNo
     * @returns {promise}
     */
    getScapitalBest(categoryCode='0101',pageNo='0'){
      this.apiNo = '105_2'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `cmd=1&category2=${categoryCode}&page=${pageNo}`
      return this.http(this.config)
    }


    /**
     * 스테디셀러 BEST 리스트
     * @param {*} pageNo
     * @returns {promise}
     */
    getSteadyBest(categoryCode='0101',pageNo='0'){
      this.apiNo = '105_2'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `cmd=2&category2=${categoryCode}&page=${pageNo}`
      return this.http(this.config)
    }


    /**
     * 매장증가율 BEST 리스트
     * @param {*} pageNo
     * @returns {promise}
     */
    getGrowthBest(categoryCode='0101',pageNo='0'){
      this.apiNo = '105_2'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `cmd=3&category2=${categoryCode}&page=${pageNo}`
      return this.http(this.config)
    }

    /**
     * 부동산 매물 리스트 조회
     * @param {*} pageNo
     * @param {*} rows
     * @param {*} sggCd
     * @returns {promise}
     */
    getEstateList(pageNo='0',rows='20',sggCd=''){
      this.apiNo = '107'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `display=${rows}&page=${pageNo}&code=${sggCd}`
      return this.http(this.config)
    }

    /**
     * 검색시 업종을 검색하는 메소드
     * @param {String} txt
     * @returns {promise}
     */
    getSectorSearch(txt){
      this.apiNo = '1001'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `searchTxt=${txt}`
      return this.http(this.config)
    }

    /**
     * 검색시 프랜차이즈 검색하는 메소드
     * @param {String} txt
     * @returns {promise}
     */
    getFranchiseSearch(txt){
      this.apiNo = '1002'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `searchTxt=${txt}`
      return this.http(this.config)
    }

    /**
     * 검색시 지역을 검색하는 메소드
     * @param {String} txt
     * @returns {promise}
     */
    getAddrSearch(txt){
      this.apiNo = '1003'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `searchTxt=${txt}`
      return this.http(this.config)
    }


    /**
     * 카테고리 코드로 브랜드 조회 메소드
     * @param {String} code
     * @returns {promise}
     */
    getBrandList(code){
      this.config.url = `${this.baseURI}/brand/ajaxBrand.php`;
      this.config.data = `PR=${code}`
      return this.http(this.config)
    }

    /**
     * 매물 상세 보기 조회 메소드
     * @param {*} code
     * @returns {promise}
     */
    getSalesView(code){
      this.apiNo = '108'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `code=${code}`
      return this.http(this.config)
    }

    /**
     *  법정동코드로 주소 조회 메소드
     * @param {*} code
     * @returns {promise}
     */
    getAddrToCodelaw(codelaw){
      this.apiNo = '106'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `code=${codelaw}`
      return this.http(this.config)
    }

    /**
     *  시도 코드로 시군구 목록 조회 메소드
     * @param {*} sidocode
     * @returns {promise}
     */
    getSggCdsToCodelaw(sidocode){
      this.apiNo = '1004'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `code=${sidocode}`
      return this.http(this.config)
    }

    /**
     *  법정동 코드로 시군구, 법정동 목록 조회 메소드
     * @param {String} codelaw 법정동코드
     * @param {String} grade 조회할 행정구역 단위 (시도:sido, 시군구:sgg, 동: dong)
     * @returns {Promise} Promise객체 반환
     */
    getZoneListToCodelaw(codelaw, grade='sgg'){
      switch (grade) {
        case 'sido':
          break;
        case 'sgg':
          codelaw = codelaw.substring(0,2)
          break;
        case 'dong':
          codelaw = codelaw.substring(0,5)
          break;
        default:
          codelaw = codelaw.substring(0,2)
          break;
      }
      this.apiNo = '1006'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `code=${codelaw}&grade=${grade}`
      return this.http(this.config)
    }

    /**
     *  매물 번호를 통한 매물 리스트  조회 메소드
     * @param {String} memulSeq 쉼표로 구분된 매물 번호 스트링
     * @returns {promise}
     */
    getEstateListToSeq(memulSeq){
      this.apiNo = '112'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `memulSeq=${memulSeq}`
      return this.http(this.config)
    }

    /**
     * 가맹본사 상담 이메일 전송을 위한 메소드
     * @param {Object} dataObject
     * @returns {promise} 
     */
    sendEmail(dataObject) {
      this.config.url = 'http://220.73.139.114/f-link/mail.php'
      this.config.data = `name=${dataObject.name}&hp1=${dataObject.hp1}&hp2=${dataObject.hp2}
      &hp3=${dataObject.hp3}&age=${dataObject.age}&gender=${dataObject.gender}&capital=${dataObject.capital}
      &brand=${dataObject.brand}&email=${dataObject.email}`
      return this.http(this.config)
    }

    /**
     * 가맹본사 상담자 정보 저장 메소드
     * @param {Object} dataObject
     * @returns {promise} 
     */
    consultHeadOffice(dataObject) {
      this.config.url = 'http://www.f-link.co.kr/consult/consultMailingProc.php'
      this.config.data = `name=${dataObject.name}&hp1=${dataObject.hp1}&hp2=${dataObject.hp2}
      &hp3=${dataObject.hp3}&age=${dataObject.age}&gender=${dataObject.gender}&capital=${dataObject.capital}&userEmail=${dataObject.userEmail}&id=${dataObject.id}&alertBrand=${dataObject.alertBrand}`
      return this.http(this.config)
    }



}
