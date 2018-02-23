<template>
  <DtTable title="{{$title}}" :api="{{$api}}" :keys="keys" :columns="columns">{{$slots}}</DtTable>
</template>

<script>
export default {
  data () {
    return {
      keys: {
        page: 1
      },
      columns: [{{$columns}}]
    }
  }
}
</script>
