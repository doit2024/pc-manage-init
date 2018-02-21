<template>
  <DtTable title="{{$title}}" :keys="keys" :api="{{$api}}" :columns="columns">{{$slots}}</DtTable>
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
