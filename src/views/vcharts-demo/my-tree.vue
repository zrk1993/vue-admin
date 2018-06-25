<template>
  <svg :viewBox="`0 0 100 ${containerH}`" xmlns="http://www.w3.org/2000/svg" width="100" :height="containerH" preserveAspectRatio="xMinYMin meet">
    <image xlink:href="@/assets/logo.png"  x="0" :y="(containerH - imgW) / 2" :height="imgW" :width="imgW"/>

    <g fill="none" stroke="black" stroke-width="1px">

      <line :x1="imgW" :y1="containerH/2" :x2="imgW + line1" :y2="containerH/2"/>

      <line :x1="imgW + line1" :y1="containerH/2 - (liney * ( childNum -1 )) / 2" :x2="imgW + line1" :y2="containerH/2 + (liney * ( childNum -1 )) / 2"/>

      <line v-for="(i, index) in childNum" :key="index" :x1="imgW + line1" :y1="lWidth(i)" :x2="imgW + 2 * lineX" :y2="lWidth(i)"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'my-tree',
  props: ['data', 'x', 'y'],
  data() {
    return {
      line1: 20,
      lineX: 40,
      liney: 50,
      imgW: 30,
      childNum: 5,
      containerH: 50 * 5 + 20,
    };
  },
  methods: {
    lWidth(i) {
      const containerH = this.containerH;
      const liney = this.liney;
      const childNum = this.childNum;
      return containerH/2 + (i - 1) * liney - (childNum - 1) / 2 * liney;
    },
  },
};
</script>

<style>
svg line {
  shape-rendering: crispEdges;
}
</style>
