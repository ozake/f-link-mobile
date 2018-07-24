<template>
  <!-- 레이더차트 -->
    <canvas ref="raderChart" height="300"></canvas>
  <!-- //레이더 차트 -->
</template>
<script>
import Chart  from 'chart.js';
export default {
  name: 'ChartRader',
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
      setChart() {
        let ctx = this.$refs.raderChart
        let myChart = new Chart(ctx, {
            type: 'radar',
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
