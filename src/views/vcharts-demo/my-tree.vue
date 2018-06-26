/* eslint-disable */
<template>
  <svg v-bind="$attrs" viewBox="0,0,500,300" :x="x" :y="y" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" style="overflow: visible;">
    <image xlink:href="/static/logo.png"  x="0" :y="(containerH - imgW) / 2" :height="imgW" :width="imgW"/>

    <g fill="none" stroke="black" stroke-width="1px">

      <line :x1="imgW" :y1="containerH/2" :x2="imgW + line1" :y2="containerH/2"/>

      <line :x1="imgW + line1" :y1="yAxisTop" :x2="imgW + line1" :y2="yAxisBot"/>

      <svg :x="imgW + line1" viewBox="0,0,500,300" :y="yAxisTop" preserveAspectRatio="xMinYMin meet" style="overflow: visible;">
        <template v-for="(item, index) in data.child">
          <line :key="index" :x1="0" :y1="lWidth(item, index)" :x2="lineX" :y2="lWidth(item, index)"/>
          <my-tree :key="index+1000" v-if="item.child"
            :data="item"
            :x="lineX"
            :y="lWidth(item, index) - liney"
          ></my-tree>
          <image v-else :key="index+90" xlink:href="/static/logo.png"
            :x="lineX"
            :y="lWidth(item, index) - imgW / 2"
            :height="imgW" :width="imgW"/>
        </template>
      </svg>
    </g>
  </svg>
</template>

<script>
/* eslint-disable */
export default {
  name: 'my-tree',
  props: ['data', 'x', 'y'],
  data() {
    return {
      line1: 20,
      lineX: 40,
      liney: 50,
      imgW: 30,
    };
  },
  computed: {
    containerH() {
      return this.getChildNum(this.data) * this.liney;
    },
    childNum() {
      return this.data.child ? this.data.child.length : 0;
    },
    yAxisTop() {
      return this.containerH/2 - (this.liney * ( this.getChildNum(this.data) -1 )) / 2;
    },
    yAxisBot() {
      return this.containerH/2 + (this.liney * ( this.getChildNum(this.data) -1 )) / 2;
    },
  },
  methods: {
    lWidth(item, index) {
      const getNum = (iNum) => {
        if (iNum === 0) {
          return this.getChildNum(this.data.child[iNum]);
        } else {
          return (this.getChildNum(this.data.child[iNum]) || 1) + getNum(-- iNum);
        }
      };
      const totalH = (this.getChildNum(this.data) - 1) * this.liney;
      if (index === 0) {
        return 1;
      } else if (index === this.data.child.length - 1) {
        return totalH - 1;
      } else {
        return totalH * (getNum(index) / this.getChildNum(this.data));
      }
    },
    getChildNum(data) {
      let num = 0;
      if (data.child && data.child.length > 0) {
        data.child.forEach((item) => {
          if (item.child && item.child.length > 0) {
            num += this.getChildNum(item);
          } else {
            num += 1;
          }
        });
      }
      return num;
    },
  },
};
</script>

<style>
svg line {
  shape-rendering: crispEdges;
}
svg {height:100%;width:100%;}
</style>
