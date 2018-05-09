<template>
  <Form ref="form" :rules="$v.firmare" :model="formData" label-position="left" :label-width="80">
    <FormItem prop="title" label="消息标题">
      <Input v-model="formData.title" :maxlength="$ml.name" :placeholder="`请输入消息标题（${$ml.name}字以内）`"></Input>
    </FormItem>
    <FormItem prop="content" label="消息正文">
      富文本...
    </FormItem>
    <FormItem label="消息类型">
      <div class="flex">
        <Select v-model="formData.message_type" class="mr-10">
          <Option value="1">type1</Option>
          <Option value="2">type2</Option>
        </Select>
        <DtPopNewMessage @onNewMessageType="handleNewMessageType"/>
      </div>
    </FormItem>
    <FormItem prop="version" label="推送范围">
      <RadioGroup v-model="formData.scope_type">
        <Radio label="1">群发</Radio><br>
        <Radio label="2">
          筛选
          <div v-if="formData.scope_type==='2'">各种筛选条件...</div>
        </Radio>
      </RadioGroup>
    </FormItem>
    <FormItem prop="version" label="消息到达后动作">
      <RadioGroup v-model="formData.open_type">
        <Radio label="1">
          打开URL：
          <Input v-model="formData.url" placeholder="请输入url"/>
        </Radio><br>
        <Radio label="2">
          需要用户点击确认
        </Radio>
      </RadioGroup>
    </FormItem>
  </Form>
</template>

<script>
import bus from '@/bus'
export default {
  props: ['modal'],
  data: () => ({
    formData: {
      title: '',
      content: '',
      message_type: '1',
      scope_type: '1',
      open_type: '1',
      url: ''
    }
  }),
  computed: {
    detail () {
      return this.modal.detail
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.detail) {
        this.formData = {...this.detail}
      }
    },
    submit () {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$http.firmware.put(this.formData).then(data => {
          this.$Message.success('保存成功')
          this.close()
          bus.$emit('update', { is_reset_page: !this.detail })
        })
      })
    },
    handleNewMessageType () {
      console.log('http-new')
    }
  }
}
</script>
