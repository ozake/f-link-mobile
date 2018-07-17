/**
 * 큐 컬렉션 클래스
 */
export default class Queue {

    constructor(){
        this.queue = []
    }

    /**
     * 큐에 데이터를 저장하는 메소드
     * @param {*} data 
     */
    setQueue(data){
        this.queue.push(data)
    }

    /**
     * 이미 큐에 저장된 데이터가 아닌 데이터만 큐에 저장하는 메소드
     * (단, 배열, 오브젝트 같은 이터레이터블한 리터럴은 파람으로 넘기면 안됨.
     * 원시형 리터럴만 파라미터로 넘겨야 한다.)
     * 
     * @param {*} data
     * @returns {boolean} 중복 여부를 리턴한다.
     */
    setNoOverlapQue(data){
        let flag = this.queue.includes(data)
        if( ! flag ){
            this.queue.push(data)
        }
        return flag
    }

    /**
     * 이터레이터블한 데이터(배열)를 큐에 저장하는 메소드
     * @param {Iterable} arr 
     */
    setQueueArray(arr){
        for (let value of arr) {
            this.queue.push(value)
        }
    }

    /**
     * 큐에 가장 처음 담긴 데이터를 반환하며 반환한 데이터는 큐에서 삭제하는 메소드
     * 배열의 길이가 0이면 undefined를 리턴한다.
     * @returns {*}
     */
    getQueue(){
        return this.queue.shift()
    }

    /**
     * 현재 큐의 길이를 반환하는 메소드
     * @returns {number} 
     */
    getQueueLength(){
        return this.queue.length
    }

    /**
     * 현재 큐 내의 전체 데이터를 반환하고, 큐는 비운다.
     * @returns {Array}
     */
    getQueueAll(){
        let arr = this.queue
        this.queue = []
        return arr
    }



}