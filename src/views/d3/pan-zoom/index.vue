<template>
  <div>
    <h3>d3拖拽缩放</h3>
    <svg id="container"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  mounted() {
    const baseSvg = d3.select('#container')
      .attr('width', 500)
      .attr('height', 300)
      .style('border', '1px solid #555');

    const container = baseSvg.append('g')
      .attr('id', 'pan-zoom');

    container.append('circle')
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', 16)
      .attr('fill', 'red')
      .attr('strok', 'blue')
      .attr('strok-width', 1);

    function zoom() {
      container.attr('transform', d3.event.transform);
    }
    const zoomListener = d3.zoom().scaleExtent([0.1, 3]).on('zoom', zoom);
    baseSvg.call(zoomListener);
  },
};
</script>
