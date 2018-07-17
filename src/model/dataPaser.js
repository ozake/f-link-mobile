import proj4 from "proj4"
 /**
  * 배후지영역 json데이터 가공 클래스
  */
export default class DataPaser {


  /**
   * constructor - 배후지 정보를 내부 멤버변수에 담는 생성자 함수
   *
   * @param  {Array} data 배후지 Jsone데이터에서 배후지 정보를 담은 배열 객체를 파람으로 전달한다.
   * @return {type}      description
   */
  constructor(data){
    this.data = data
  }

  /**
   * hinterlandGeocode - 배후지영역좌표 파싱 메소드
   *
   * @return {Map}      배후지 id값에 매칭되는 좌표 배열을 담은 Map객체를 리턴한다.
   */
  hinterlandGeocode(){
    let iterable = new Map();
    let coordinates = [];
    let dataGeo = JSON.parse(this.data.geomJson)
    let tmpGeo = dataGeo.coordinates[0]
    for(const value of tmpGeo){
        coordinates.push(this.convertGeo(value));
    }
    iterable.set(this.data.bdMgtSn, coordinates);
    return iterable;
  }

  /**
   * 배후지 좌표 파싱 메소드
   * 파싱하여 좌표를 컨버팅하여 배열로 리턴한다
   * @return {Array}
   */
  landGeocodeArr(){
    let dataGeo = JSON.parse(this.data.geomJson)
    let coordinates = []
    let tmpGeo = dataGeo.coordinates[0]
    for(const value of tmpGeo){
        coordinates.push(this.convertGeo(value))
    }
    return coordinates
  }


  /**
   * hinterlandCentercode - 배후지 중심좌표 파싱 메소드
   *
   * @return {Map}  배후지 id값에 매칭되는 중심좌표값을 담은 Map객체를 리턴한다.
   */
  hinterlandCentercode(){
    let iterable = new Map();
    for(const value of this.data){
      iterable.set(value.properties.fid, value.properties.base_xycrd);
    }
    return iterable;
  }

  /**
   * landCentercode - 배후지 중심좌표 파싱 메소드
   * @return {Map}  중심좌표값을 담은 배열을 리턴한다.
   */
  landCentercode(){
    let dataGeo = JSON.parse(this.data.baseXyJson)
    let coordinates = dataGeo.coordinates
    coordinates = this.convertGeo(coordinates)
    return coordinates
  }




  /**
   * convertGeo - UTMK좌표를 WGS84좌표값으로 변환하는 메소드
   *
   * @param  {Array} code UTMK좌표가 담긴 배열을 전달한다.
   * @return {type}      WGS84로 변환된 좌표 배열을 리턴한다
   */
  convertGeo(code){
    proj4.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"
    let firstProjection = proj4.defs('EPSG:5179')
    let secondProjection = proj4.defs('EPSG:4326')

    let convertRes = proj4(firstProjection,secondProjection,code)

    return convertRes
  }


}
