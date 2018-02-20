<template>
  <div class="field-textarea">
    <Input
      v-model.trim="desc"
      type="textarea"
      :maxlength="maxlength"
      :autosize="{minRows: 5,maxRows: 10}"
      :placeholder="placeholder"
    />
    <span class="text-count">
      {{desc.length}}/{{maxlength}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    maxlength: {
      type: Number,
      default: 250
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
.field-textarea {
  position: relative;
}
.text-count {
  position: absolute;
  right: 10px;
  bottom: 0;
  color: #999;
  user-select: none;
}
</style>