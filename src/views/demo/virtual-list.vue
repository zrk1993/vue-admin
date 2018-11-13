<template>
  <div>
    <div ref="list" class="list-view" @scroll="handleScroll($event)">
      <div class="list-view-phantom" :style="{ height: data.length * 30 + 'px' }"></div>
      <div ref="content" class="list-view-content">
        <div class="list-view-item" v-for="item in visibleData" :key="item">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight);
    this.start = 0;
    this.end = this.start + this.visibleCount;
    this.visibleData = this.data.slice(this.start, this.end);
  },
  data() {
    const data = [];
    for (let i = 0; i < 10000; i += 1) {
      data.push({ value: i });
    }
    return {
      data,
      start: 0,
      end: null,
      visibleCount: null,
      visibleData: [],
      scrollTop: 0,
      itemHeight: 30,
    };
  },
  methods: {
    handleScroll() {
      const scrollTop = this.$refs.list.scrollTop;
      const fixedScrollTop = scrollTop - scrollTop % 30;
      this.$refs.content.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;
      this.start = Math.floor(scrollTop / 30);
      this.end = this.start + this.visibleCount;
      this.visibleData = this.data.slice(this.start, this.end);
    },
  },
};
</script>

<style scoped>
.list-view {
  height: 400px;
  overflow: auto;
  position: relative;
  border: 1px solid #666;
}

.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list-view-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.list-view-item {
  padding: 5px;
  color: #666;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
}
</style>

