<template>
  <div>
    <svg id="chart"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  mounted() {
    const data = [2, 5, 3, 7, 8, 1, 4, 7];
    const barWidth = 20;
    const chartHeight = 240;
    // const chartWidth = barWidth * data.length;

    const yAxisLinear = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, chartHeight - 20]);

    const xAxisLinear = d3.scaleBand()
      .domain(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])
      .range([0, barWidth * data.length + 20])
      .paddingInner(1)
      .paddingOuter(30)
      .round(true);

    const chart = d3.select('#chart')
      .append('g');

    const bar = chart.selectAll('.bar')
      .data(data).enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${i * barWidth + 30}, 0)`);

    bar.append('rect')
      .attr('y', d => chartHeight - yAxisLinear(d))
      .attr('height', d => yAxisLinear(d))
      .attr('width', barWidth - 1);

    chart.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(20, ${20})`)
      .call(d3.axisLeft(yAxisLinear.domain([d3.max(data), 0])));

    chart.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(20, ${chartHeight + 5})`)
      .call(d3.axisBottom(xAxisLinear));

    chart.call(d3.zoom()
      .scaleExtent([1 / 2, 8])
      .on('zoom', () => {
        chart.attr('transform', d3.event.transform);
      }));
  },
};
</script>

<style>
#chart {
  width: 100%;
  height: 500px;
}
#chart rect {
  fill: steelblue;
}
</style>
