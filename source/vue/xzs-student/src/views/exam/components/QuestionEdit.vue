<template>
  <div style="line-height:1.8">
    <div v-if="qType==1" v-loading="qLoading">
      <div class="q-title" v-html="question.title"/>
      <div class="q-content">
        <el-radio-group v-model="answer.content" @change="answer.completed = true" >
          <el-radio  v-for="item in question.items"  :key="item.prefix"  :label="item.prefix" >
            <span class="question-prefix">{{item.prefix}}.</span>
            <span v-html="item.content" class="q-item-span-content"></span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div v-else-if="qType==2" v-loading="qLoading">
      <div class="q-title" v-html="question.title"/>
      <div class="q-content">
        <el-checkbox-group v-model="answer.contentArray" @change="answer.completed = true" >
          <el-checkbox v-for="item in question.items" :label="item.prefix" :key="item.prefix"  >
            <span class="question-prefix">{{item.prefix}}.</span>
            <span v-html="item.content" class="q-item-span-content"></span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div v-else-if="qType==3" v-loading="qLoading">
      <div class="q-title" v-html="question.title" style="display: inline;margin-right: 10px"/>
      <span style="padding-right: 10px;">(</span>
      <el-radio-group v-model="answer.content" @change="answer.completed = true" >
        <el-radio  v-for="item in question.items"  :key="item.prefix"  :label="item.prefix" >
          <span v-html="item.content" class="q-item-span-content"></span>
        </el-radio>
      </el-radio-group>
      <span style="padding-left: 10px;">)</span>
    </div>
    <div v-else-if="qType==4" v-loading="qLoading">
      <div class="q-title" v-html="question.title"/>
      <div>
        <el-form-item :label="item.prefix" :key="item.prefix"  v-for="item in question.items"  label-width="50px" style="margin-top: 10px;margin-bottom: 10px;">
          <el-input ref="input" v-model="answer.contentArray[item.prefix-1]"  @change="answer.completed = true" @focus="inputClick(answer,/*'contentArray['+*/item.prefix-1/*+']'*/,qType)"/>
        </el-form-item>
      </div>
    </div>
    <div v-else-if="qType==5" v-loading="qLoading">
      <div class="q-title" v-html="question.title"/>
      <div>
        <el-input v-model="answer.content" type="textarea" rows="5"  @change="answer.completed = true" @focus="inputClick5(answer,'content')"/>
      </div>
    </div>
    <div v-else>
    </div>
    <el-dialog  :visible.sync="richEditor.dialogVisible"  append-to-body :close-on-click-modal="false" style="width: 100%;height: 100%"   :show-close="false" center>
      <Ueditor @ready="editorReady"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editorConfirm">确 定</el-button>
        <el-button @click="closeBtnUeditor">取 消</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import Ueditor from '@/components/Ueditor'
export default {
  components: { Ueditor },
  name: 'QuestionShow',
  mounted () {

  },
  data () {
    return {
      richEditor: {
        dialogVisible: false,
        object: null,
        parameterName: '',
        instance: null
      },
      index: null,
      isScreenOff2: false
    }
  },
  props: {
    getisScreenOff2: {},
    question: {
      type: Object,
      default: function () {
        return {}
      }
    },
    answer: {
      type: Object,
      default: function () {
        return { id: null, content: '', contentArray: [] }
      }
    },
    qLoading: {
      type: Boolean,
      default: false
    },
    qType: {
      type: Number,
      default: 0
    }
  },
  methods: {

    // 取消按钮
    closeBtnUeditor () {
      this.richEditor.dialogVisible = false
      this.getisScreenOff2(true)
    },
    getInputValue (index) {
      return this.$refs.input[index].value
    },
    editorConfirm () {
      let content = this.richEditor.instance.getContent()
      content = content.replace(/<(?!img)[^>]*>/g, '')
      // let content = this.richEditor.instance.getContentTxt()
      console.log(content)
      if (this.richEditor.parameterName === 'title') { // 题干的正确答案重置
        if (this.questionItemReset(content)) {
          this.richEditor.object[this.richEditor.parameterName] = content
          this.richEditor.dialogVisible = false
        } else {

        }
      } else {
        this.richEditor.object[this.richEditor.parameterName] = content
        this.richEditor.dialogVisible = false
      }
      // 将文本编辑器上的内容显示在输入框中
      this.answer.contentArray[this.index] = content
      if (this.qType === 5) {
        this.richEditor.object[this.richEditor.parameterName] = content
        this.richEditor.dialogVisible = false
      }
      this.getisScreenOff2(true)
    },

    questionItemReset (content) {
      let spanRegex = new RegExp('<span class="gapfilling-span (.*?)">(.*?)<\\/span>', 'g')
      let _this = this
      let newFormItem = []
      let gapfillingItems = content.match(spanRegex)
      if (gapfillingItems === null) {
        this.$message.error('请插入填空')
        return false
      }
      gapfillingItems.forEach(function (span, index) {
        let pairRegex = /<span class="gapfilling-span (.*?)">(.*?)<\/span>/
        pairRegex.test(span)
        newFormItem.push({ id: null, itemUuid: RegExp.$1, prefix: RegExp.$2, content: '', score: '0' })
      })

      newFormItem.forEach(function (item) {
        _this.form.items.some((oldItem, index) => {
          if (oldItem.itemUuid === item.itemUuid) {
            item.content = oldItem.content
            item.id = oldItem.id
            item.score = oldItem.score
            return true
          }
        })
      })
      _this.form.items = newFormItem
      return true
    },
    editorReady (instance) {
      this.richEditor.instance = instance
      let currentContent = this.richEditor.object[this.richEditor.parameterName]
      this.richEditor.instance.setContent(currentContent)
      // 光标定位到Ueditor
      this.richEditor.instance.focus(true)
      this.getisScreenOff2(this.isScreenOff2)
    },
    inputClick (object, parameterName, questionType) {
      if (questionType === 4) {
        // console.log(parameterName)
        // const index = parseInt(parameterName.match(/\d+/)[0]) - 1
        this.index = parameterName
        this.getisScreenOff2(this.isScreenOff2)
      }
      this.richEditor.object = object
      this.richEditor.parameterName = parameterName
      // this.form.correct = parameterName
      this.richEditor.dialogVisible = true
    },

    inputClick5 (object, parameterName) {
      this.richEditor.object = object
      this.richEditor.parameterName = parameterName
      this.richEditor.dialogVisible = true
      this.getisScreenOff2(this.isScreenOff2)
    }
  }
}
</script>
