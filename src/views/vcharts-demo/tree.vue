<template>
  <div style="width: 100%; height: 400px;" id="svg1">
    <el-row class="panzoom">
      <el-col :span="12">
        <my-tree :data="treeData" :x="0" y="0" ></my-tree>
      </el-col>
      <el-col :span="12">
        <my-tree :data="treeData" :x="0" y="0" ></my-tree>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import myTree from './my-tree';

export default {
  components: {
    myTree,
  },
  mounted() {
    // window.SVGPan(document.getElementById('svg1'), {
    //   enablePan: true,
    //   enableZoom: true,
    //   enableDrag: true,
    //   zoomScale: 0.2,
    // });
    const $section = window.$('#svg1');
    const $panzoom = $section.find('.panzoom').panzoom();
    $panzoom.parent().on('mousewheel.focal', (e) => {
      e.preventDefault();
      const delta = e.delta || e.originalEvent.wheelDelta;
      const zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      $panzoom.panzoom('zoom', zoomOut, {
        increment: 0.1,
        animate: false,
        focal: e,
      });
    });
  },
  data() {
    return {
      treeData: {
        name: '小米',
        img: '/static/img/logo.png',
        child: [
          {
            name: '大米1',
            img: '/static/img/logo.png',
          },
          {
            name: '小米3',
            img: '/static/img/logo.png',
            child: [
              {
                name: '小米1-1',
                img: '/static/img/logo.png',
              },
              {
                name: '小米1-2',
                img: '/static/img/logo.png',
              },
            ],
          },
          {
            name: '小米1',
            img: '/static/img/logo.png',
            child: [
              {
                name: '小米1-1',
                img: '/static/img/logo.png',
              },
              {
                name: '小米1-2',
                img: '/static/img/logo.png',
              },
            ],
          },
        ],
      },
    };
  },
};
</script>

