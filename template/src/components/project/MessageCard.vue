<template>
  <div class="message-card">
    <div>
      <h3>{{data.title}}</h3>
      <p class="time">{{data.time | f_datetime}}</p>
    </div>
    <div class="center">
      <img :src="data.link" class="image">
    </div>
    <div v-if="footer" class="footer">
      <Button class="mr-15" type="warning" shape="circle" icon="edit" @click="edit"></Button>
      <Button type="error" shape="circle" icon="trash-a" @click="del"></Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    editRouterName: String,
    delUrl: String
  },
  methods: {
    edit () {
      const { id } = this.data
      this.$router.push({name: this.editRouterName, params: { id }})
    },
    async del () {
      const res = this.$http[this.api].del(this.data)
      res && alert('done!')
    }
  }
}
</script>

<style lang=less>
.message-card {
  padding: 20px;
  margin-bottom: 24px;
  background-color: #fff;
  .center {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .image {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .footer {
    text-align: right;
    margin-top: 10px;
  }
  .time {
    font-size: 12px;
    color: #AFAFAF;
    line-height: 40px;
  }
}
</style>
