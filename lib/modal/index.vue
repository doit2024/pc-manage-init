<template>
  <transition name="slide-right">
    <div class="modal" v-if="modal.show">
      <div class="modal_layer" @click="close"></div>
      <div class="modal_title">
        <span>{{ mapModal.title }}</span>
        <a class="modal_close" @click="close">&times;</a>
      </div>
      <transition name="modal">
        <div class="modal_container">
          <div class="modal_view" :modal="modal" :is="mapModal.name" :btns="btns"></div>
        </div>
      </transition>
      <div class="modal_bottom">
        <Button v-if="btns.indexOf('submit')!==-1" type="primary" @click="handle('submit')">确定</Button>
        <Button v-if="btns.indexOf('reset')!==-1" type="error" @click="handle('reset')">重置</Button>
        <Button v-if="btns.indexOf('edit')!==-1" type="error" @click="handle('edit')">编辑</Button>
        <Button type="ghost" @click="close">取消</Button>
      </div>
    </div>
  </transition>
</template>

<script>
import bus from '@/bus'
import { mapGetters } from 'vuex'
import { map, modals } from './config.js'
import mixin from './amixin'
// 为每个modal注入mixin
Object.values(modals).forEach(modal => {
  modal.mixins = [mixin]
})
export default {
  computed: {
    ...mapGetters(['modal']),
    mapModal () {
      return map[this.modal.show]
    },
    btns () {
      return this.mapModal.btn || ['submit']
    }
  },
  methods: {
    close () {
      this.$store.dispatch('modal', {show: false})
    },
    handle (action) {
      bus.$emit(`modal-${action}`)
    }
  },
  components: {
    ...modals
  }
}
</script>

<style lang=less>
@import '../../style/var';
.modal {
  position: fixed;
  z-index: 109;
  top: @header-height; right: 0; bottom: 0;
  width: 800px;
  min-width: 630px;
  box-shadow: -6px 0 8px 0 rgba(100,146,179,0.40);
  background: #fff;
  &_close {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 22px;
    border-radius: 12px;
    text-align: center;
    color: @color-w0;
    font-size: 20px;
    font-weight: bold;
    user-select: none;
    transition: all .3s ease;
    background-color: @color-theme;
    &:hover {
      color: @color-w0;
      transform: rotate(-90deg);
      box-shadow: -3px 3px 3px rgba(0, 0, 0, .2);
    }
  }
  &_layer {
    position: fixed;
    z-index: -1;
    top: 0; right: 0; bottom: 0; left:0;
  }
  &_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    font-size: 16px;
    color: @color-b6;
    padding: 0 20px 0 50px;
    background-color: #fff;
    border-bottom: 1px solid #f3f3f3;
  }
  &_container {
    position: absolute;
    top: 64px;
    bottom: 100px;
    width: 100%;
    padding: 30px 50px;
    background-color: rgb(250, 250, 250);
  }
  &_view {
    height: 100%;
    padding-right: 100px;
    overflow: auto;
    .btn-group {
      .ivu-form-item-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .title {
      position: relative;
      overflow: visible !important;
      &-blank {
        &:extend(.title);
        visibility: hidden;
      }
      &:before {
        width: 8px;
        height: 8px;
        line-height: 8px;
        border-radius: 4px;
        text-align: center;
        position: absolute;
        top: 50%;
        left: -19px;
        transform: translateY(-50%);
        background-color: @color-theme;
      }
      .ivu-form-item-label {
        font-size: 16px;
        font-weight: bold;
      }
      &-info {
        position: relative;
        font-weight: bold;
        overflow: visible !important;
        &:before {
          content: '!';
          position: absolute;
          top: 50%;
          left: -19px;
          transform: translateY(-50%);
          color: @color-theme;
        }
        .ivu-form-item-label {
          font-size: 15px;
        }
      }
    }
  }
  &_bottom {
    background: #fff;
    padding: 30px 50px;
    height: 100px;
    position: absolute;
    bottom: 0;
    .ivu-btn {
      width: 80px;
      margin-right: 10px;
    }
  }
  /* .ivu-input-wrapper[data-after]::after {
    content: attr(data-after);
    position: absolute;
    left: 45%;
    top: 0;
    width: 0;
    height: 0;
    overflow: visible;
    white-space: nowrap;
    text-align: center;
    line-height: 32px;
    color: #000;
    opacity: 0.2;
  } */
}
</style>
