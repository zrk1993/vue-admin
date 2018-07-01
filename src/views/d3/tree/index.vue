<template>
  <div>
    <svg id="tree"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import leftData from './data-l';
import rightData from './data-r';

export default {
  mounted() {
    const treeWidth = 800;
    const treeHeight = 450;
    const linkWidth = 150;

    window.console.log('d3---', d3);
    const treeLayout = d3.layout.tree()
      .size([treeWidth - 300, treeHeight])
      .separation((a, b) => {
        return (a.parent === b.parent ? 1 : 2) / a.depth;
      });

    const leftNodesData = treeLayout.nodes(leftData);
    let leftNodesDataParent = null;
    leftNodesData.forEach((item) => {
      item.type = 'left';
      item.y = item.depth * linkWidth;
      item._x = item.x;
      item._y = item.y;
      // 旋转90°
      item.x = -item._y;
      item.y = item._x;

      if (!item.parent) leftNodesDataParent = item;
    });
    const rightNodesData = treeLayout.nodes(rightData);
    rightNodesData.forEach((item) => {
      item.type = 'right';
      item.y = item.depth * linkWidth;
      item._x = item.x;
      item._y = item.y;
      // 旋转90°
      item.x = item._y;
      item.y = item._x;

      if (!item.parent) {
        item.x = leftNodesDataParent.x;
        item.y = leftNodesDataParent.y;
      }
    });

    const nodesData = leftNodesData.concat(rightNodesData);
    const linksData = treeLayout.links(nodesData);

    window.console.log('nodesData---', nodesData);
    window.console.log('linksData---', linksData);

    const margin = [30, 30, 30, 30];
    const tree = d3.select('#tree')
      .attr('width', treeWidth + margin[1] + margin[3])
      .attr('height', treeHeight + margin[0] + margin[2])
      .attr('overflow', 'visible')
      .append('g')
      .attr('transform', `translate(${treeWidth / 2 + margin[0]}, ${-margin[3]})`);

    const treeNodes = tree.selectAll('.node')
      .data(nodesData)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    treeNodes.append('circle')
      .attr('r', 6)
      .attr('fill', 'red')
      .attr('strok', 'blue')
      .attr('strok-width', 1);

    treeNodes.append('text')
      .attr('x', (d) => {
        return d.children ? -40 : -40;
      })
      .attr('y', 5)
      .text(d => d.name);

    const link = tree.selectAll('path')
      .data(linksData);
    link.enter()
      .append('g')
      .append('polyline')
      .attr('class', 'link')
      .attr('style', 'fill:none; stroke:red; stroke-width:0.8;')
      .attr('points', (d) => {
        const points = [
          `${d.source.x},${d.source.y}`,
          `${d.target.x + (d.source.x - d.target.x) * 0.4},${d.source.y}`,
          `${d.target.x + (d.source.x - d.target.x) * 0.4},${d.target.y}`,
          `${d.target.x},${d.target.y}`,
        ].join(' ');
        return points;
      });
  },
};
</script>

