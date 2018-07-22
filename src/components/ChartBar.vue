<template>
  <!-- 레이더차트 -->
    <canvas id="BarChart" ref="BarChart" width="490" height="200"></canvas>
  <!-- //레이더 차트 -->
</template>
<script>
import Chart  from 'chart.js';
export default {
  name: 'ChartBar',
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
        let ctx = this.$refs.BarChart
        let myChart = new Chart(ctx, {
            type: 'bar',
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
