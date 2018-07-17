import proj4 from 'proj4';

/**
   * convertGeo - UTMK좌표를 WGS84좌표값으로 변환하는 메소드
   *
   * @param  {Array} code UTMK좌표가 담긴 배열을 전달한다.
   * @return {type}      WGS84로 변환된 좌표 배열을 리턴한다
   */
  export function convertGeo(code){
    proj4.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"
    let firstProjection = proj4.defs('EPSG:5179')
    let secondProjection = proj4.defs('EPSG:4326')

    let convertRes = proj4(firstProjection,secondProjection,code)

    return convertRes
  }

  /**
   * 전화번호 문자열을 3자리로 전화번호 타입으로 변환
   * @param {String} num 포맷팅할 번호 문자열
   * @param {Number} type 0이면 중간번호 별표 표시 
   * @returns {String} 변환된 전화번호 문자열
   */
  export function phoneFomatter(num, type) {
    let formatNum = "";

    if (num.length == 11) {
      if (type == 0) {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
      } else {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      }
    } else if (num.length == 8) {
      formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
    } else {
      if (num.indexOf("02") == 0) {
        if (type == 0) {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-****-$3");
        } else {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
        }
      } else {
        if (type == 0) {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-***-$3");
        } else {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }
      }
    }
    return formatNum;
  }
