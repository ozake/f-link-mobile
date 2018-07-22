<template>
  <!-- 레이더차트 -->
    <canvas id="lineChart" ref="lineChart" width="1003" height="300"></canvas>
  <!-- //레이더 차트 -->
</template>
<script>
import Chart  from 'chart.js';
export default {
  name: 'ChartLine',
  props: {
      labels: Array,
      datasets: Array,
      options: Object 
  },
  watch: {
      datasets : function() {
          this.setChart()
      }
  },
  methods: {
      setChart(){
        //let ctx = document.getElementById("lineChart")
        let ctx = this.$refs.lineChart
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: this.datasets
            },
            options: this.options
        })
      }
  }
}
</script>
