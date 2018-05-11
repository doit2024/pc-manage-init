<template>
  <div class="dt-textarea">
    <Input
      v-model.trim="desc"
      type="textarea"
      :maxlength="maxlength"
      :autosize="{minRows: 5,maxRows: 10}"
      :placeholder="placeholder"
    ></Input>
    <span class="text-count">
      {{desc.length}}/{{maxlength}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    placeholder: String,
    maxlength: {
      type: Number,
      default: 255
    }
  },
  computed: {
    desc: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>

<style>
.dt-textarea {
  position: relative;
}
.text-count {
  position: absolute;
  right: 10px;
  bottom: 0;
  color: #ccc;
  user-select: none;
}
</style>
