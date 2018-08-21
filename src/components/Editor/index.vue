<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangeditor';

export default {
  name: 'editor',
  data() {
    return {
      editorContent: '',
    };
  },
  methods: {
    getContent() {
      return this.editorContent;
    },
  },
  mounted() {
    const editor = new E(this.$refs.editor);
    editor.customConfig.onchange = (html) => {
      this.editorContent = html;
    };
    editor.create();
  },
};
</script>

<style scoped>
</style>
