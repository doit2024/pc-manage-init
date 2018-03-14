<template>
  <Cascader
    :data="data"
    v-model="selected"
    :style="{width}"
    :placeholder="`请选择省市${short?'':'区'}`"
    :transfer="true"
    @on-change="onChange"
  />
</template>

<script>
import level2 from './level2'
// import level3 from './level3'
export default {
  props: {
    width: {
      type: String,
      default: '200px'
    },
    obj: {
      type: Object,
      required: true
    },
    short: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    data () {
      // return this.short ? level2 : level3
      return level2
    },
    selected: {
      get () {
        return [this.obj.province_code, this.obj.city_code]
      },
      set (v) {
        [this.obj.province_code, this.obj.city_code] = v
      }
    }
  },
  methods: {
    onChange (c, v, b) {
      this.$emit('getLabel', v[1] ? v[1].__label : '')
    }
  }
}
</script>
