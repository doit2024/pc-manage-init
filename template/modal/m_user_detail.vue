<template>
  <Form label-position="left" :label-width="100">
    <FormItem label="用户id">
      <b>{{detail.uid}}</b>
    </FormItem>
    <FormItem label="账号">
      <b>{{detail.username}}</b>
    </FormItem>
    <FormItem label="昵称">
      <b>{{detail.nickname}}</b>
    </FormItem>
    <FormItem label="生日">
      <b>{{detail.birthday | f_toDate}}</b>
    </FormItem>
    <FormItem label="性别">
      <b v-if="detail.sex === '1'"><Icon type="male"></Icon> 男</b>
      <b v-else><Icon type="female"></Icon> 女</b>
    </FormItem>
    <FormItem label="创建时间">
      <b>{{detail.ctime | f_toDateTime}}</b>
    </FormItem>
    <FormItem label="最近登录时间">
      <b>{{detail.last_login_time | f_toDateTime}}</b>
    </FormItem>
    <FormItem label="设备(序列号)">
      <p v-for="(item, i) in detail.device" :key="i"><b>{{item.sn}}</b></p>
      <p v-if="!detail.device.length">无</p>
    </FormItem>
  </Form>
</template>

<script>
export default {
  props: ['modal'],
  data: () => ({
    detail: {
      device: []
    }
  }),
  // computed: {
  //   detail () {
  //     return this.modal.detail
  //   }
  // },
  mounted () {
    this.$http.user.detail(this.modal.detail).then(data => {
      this.detail = data
    })
  },
  methods: {
    submit () {
      this.close()
    }
  }
}
</script>
