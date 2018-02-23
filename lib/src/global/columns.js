import bus from '@/bus'
import $store from '@/vuex'
import $router from '@/router'
import { handleTimestamp } from '@/global/funs'
import { Modal, Message } from 'iview'
import * as $http from '@/ajax'

const hDetail = (h, params, {modal, router, text}) => h('a', {
  attrs: {class: 'mr-10'},
  on: {
    click: (e) => {
      e.stopPropagation()
      if (modal) {
        $store.dispatch('modal', {show: modal, detail: params.row})
      }
      if (router) {
        $router.push(router)
      }
    }
  }
}, text || '详情')

const hEdit = (h, params, {modal, router, text}) => h('a', {
  attrs: {class: 'mr-10'},
  on: {
    click: (e) => {
      e.stopPropagation()
      if (modal) {
        $store.dispatch('modal', {show: modal, detail: params.row})
      }
      if (router) {
        $router.push(router)
      }
    }
  }
}, text || '编辑')

const hDel = (h, params, {api}) => h('a', {
  on: {
    click: e => {
      e.stopPropagation()
      let row = params.row
      Modal.confirm({
        title: '操作确认',
        content: `确定删除该条记录（行号： ${row._index + 1}）？`,
        onOk: () => {
          $http[api].del(row).then(res => {
            Message.success('删除成功！')
            bus.$emit('update')
          })
        }
      })
    }
  }
}, '删除')

export default {
  selection: {
    type: 'selection',
    align: 'center',
    width: 60
  },
  orderIndex: {
    title: '序号',
    width: 70,
    render: (h, params) => h('span', params.row._index + 1)
  },
  ctime: {
    title: '创建时间',
    key: 'ctime',
    width: 160,
    sortable: true,
    render: (h, params) => h('span', handleTimestamp.toDateTime(params.row.ctime))
  },
  atime: {
    title: '激活时间',
    width: 160,
    key: 'atime',
    sortable: true,
    render: (h, params) => h('span', handleTimestamp.toDateTime(params.row.atime))
  },
  hDetail,
  hEdit,
  hDel,
  del: ({api}) => ({
    title: '操作',
    key: 'action',
    render: (h, params) => hDel(h, params, api)
  })
}
