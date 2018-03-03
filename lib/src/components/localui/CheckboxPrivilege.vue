<template>
  <CheckboxGroup v-model="selected">
    <Checkbox v-for="x in list" :key="x.id" :label="'' + x.id" style="margin-right: 80px">{{x.name}}</Checkbox>
  </CheckboxGroup>
</template>

<script>
export default {
  props: {
    value: Array
  },
  data: () => ({
    list: []
  }),
  computed: {
    selected: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  mounted () {
    this.$http.member.get_privileges().then(data => {
      this.list = data
    })
  }
}
</script>
