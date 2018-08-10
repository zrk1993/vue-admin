<template>
  <div>
    <h3>d3拖拽缩放</h3>
    <svg id="container"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

// function throttle(delay, action) {
//   let last = 0;
//   return function () {
//     const curr = + new Date();
//     if (curr - last > delay) {
//       action.apply(this, arguments);
//       last = curr;
//     }
//   };
// }

export default {
  mounted() {
    const container = d3.select('#container')
      .attr('width', 500)
      .attr('height', 300)
      .append('g')
      .attr('id', 'pan-zoom');

    container.append('circle')
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', 16)
      .attr('fill', 'red')
      .attr('strok', 'blue')
      .attr('strok-width', 1);


    function zoom() {
      const ts = d3.event.transform;
      console.log(d3.event);
      container.attr('transform', `translate(${ts.x}, ${ts.y}) scale(${ts.k})`);
    }
    const zoomListener = d3.zoom().scaleExtent([0.1, 3]).on('zoom', zoom);
    container.call(zoomListener);

    function drag() {
      // const ts = d3.event.transform;
      console.log(d3.event);
      // container.attr('transform', `translate(${ts.x}, ${ts.y}) scale(${ts.k})`);
    }
    const dragListener = d3.drag().on('drag', drag);
    container.call(dragListener);
  },
};
</script>

<style scoped>
#container {
  border: 1px solid #555;
}
</style>

