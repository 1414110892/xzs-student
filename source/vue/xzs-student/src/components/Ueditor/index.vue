<template>
  <div class="edui-editor-body" contenteditable="true" tabindex="0">
    <script :id="randomId" type="text/plain" style="height: 300px;"></script>
  </div>
</template>

<script>

export default {
  name: 'UE',
  props: {
    value: {
      default: function () {
        return ''
      }
    }
  },
  data () {
    return {
      randomId: 'editor_' + Math.random() * 100000000000000000,
      // 编辑器实例
      instance: null,
      ready: false
    }
  },
  watch: {
    value: function (val, oldVal) {
      if (val != null && this.ready) {
        // eslint-disable-next-line no-undef
        this.instance = UE.getEditor(this.randomId)
        this.instance.setContent(val)
      }
    }
  },
  mounted () {
    this.initEditor()
  },

  beforeDestroy () {
    if (this.instance !== null && this.instance.destroy) {
      this.instance.destroy()
    }
  },
  methods: {
    initEditor () {
      this.$nextTick(() => {
        // eslint-disable-next-line no-undef
        this.instance = UE.getEditor(this.randomId, {
          autoClearinitialContent: true // 添加autoClearinitialContent配置选项
          // autoBlur: false
        })
        // eslint-disable-next-line no-undef
        this.instance.addListener('ready', () => {
          this.ready = true
          this.$emit('ready', this.instance)
        })
      })
    },
    getUEContent () {
      return this.instance.getContent()
      // return this.instance.getContentTxt()
    },
    setText (con) {
      // eslint-disable-next-line no-undef
      this.instance = UE.getEditor(this.randomId)
      this.instance.setContent(con)
    }
  }
}
</script>
