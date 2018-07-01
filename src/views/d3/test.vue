<template>
  <div id="d3">
    <svg class="chart"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  mounted() {
    const barHeight = 20;
    const chartWidth = 420;
    const data = [1, 2, 3, 4];
    const xAxis = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, chartWidth]);

    const chart = d3.select('.chart')
      .attr('width', chartWidth)
      .attr('height', barHeight * data.length);

    const bar = chart.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);

    bar.append('rect')
      .attr('width', xAxis)
      .attr('height', barHeight - 1);
  },
};
</script>

