<template>
  <DtTable
    title="{{$title}}"
    :api="api"
    :keys="keys"
    :columns="columns"{{$selectIdName}}
  >{{$slots}}</DtTable>
</template>

<script>
export default {
  data () {
    return {
      api: '{{$api}}',
      keys: {
        page: 1
      },
      columns: [{{$columns}}
      ]
    }
  }
}
</script>
