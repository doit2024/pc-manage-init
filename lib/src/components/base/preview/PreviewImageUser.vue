<template>
  <img
    :src="src || './static/user_default.png'"
    class="image-preview"
    :class="{pointer: src}"
    @click="preview"
  >
</template>

<script>
export default {
  props: {
    src: String,
    path: String
  },
  methods: {
    preview () {
      this.src && this.$Modal.error({
        width: 600,
        closable: true,
        render: (h) => {
          return h('img', {
            attrs: {
              src: this.src,
              style: 'width:100%;border-radius: 16px;'
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.image-preview {
  width: 100%;
  max-width: 80px;
  padding: 10px;
  border: none;
  border-radius: 20px;
}

</style>
