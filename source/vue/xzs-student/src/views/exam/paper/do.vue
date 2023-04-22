<template>
  <div id="contentDiv">
<!--    <el-button @Click="enterFullScreen()">全屏</el-button>-->
<!--    <el-button @Click="exitFullScreen()">退出全屏</el-button>-->
      <video ref="videoElement" class="video" autoplay></video>
<!--    <video ref="localVideo" class="video" autoplay playsinline></video>-->
<!--    <video ref="remoteVideo" class="video" autoplay playsinline></video>-->
<!--    <el-button v-if="!isaccept" @click="accept">接受</el-button>-->
    <video ref="v1" autoplay playsinline class="video1"></video>
    <video ref="v2" autoplay playsinline class="video2"></video>
    <div class="tips">注意：考生不允许切屏，检测到切屏则会自动交卷，考生请勿操作，否则按零分处置！！</div>
    <div >
      <el-row  class="do-exam-title" >
        <el-col :span="24">
        <span :key="item.itemOrder"  v-for="item in answer.answerItems">
             <el-tag :type="questionCompleted(item.completed)" class="do-exam-title-tag" @click="goAnchor('#question-'+item.itemOrder)">{{item.itemOrder}}</el-tag>
        </span>
          <span class="do-exam-time">
          <label>剩余时间：</label>
          <label>{{formatSeconds(remainTime)}}</label>
        </span>
        </el-col>
      </el-row>

      <el-row  class="do-exam-title-hidden">
        <el-col :span="24">
        <span :key="item.itemOrder"  v-for="item in answer.answerItems">
             <el-tag  class="do-exam-title-tag" >{{item.itemOrder}}</el-tag>
        </span>
          <span class="do-exam-time">
          <label>剩余时间：</label>
        </span>
        </el-col>
      </el-row>
      <el-container  class="app-item-contain">
        <el-header class="align-center">
          <h1>{{form.name}}</h1>
          <div>
            <span class="question-title-padding">试卷总分：{{form.score}}</span>
            <span class="question-title-padding">考试时间：{{form.suggestTime}}分钟</span>
          </div>
        </el-header>
        <el-main>
          <el-form :model="form" ref="form" v-loading="formLoading" label-width="100px">
            <el-row :key="index"  v-for="(titleItem,index) in form.titleItems">
              <h3 class="hhh">{{titleItem.name}}</h3>
              <el-card class="exampaper-item-box" v-if="titleItem.questionItems.length!==0">
                <el-form-item :key="questionItem.itemOrder" :label="questionItem.itemOrder+'.'"
                              v-for="questionItem in titleItem.questionItems"
                              class="exam-question-item" label-width="50px" :id="'question-'+ questionItem.itemOrder">
                  <QuestionEdit :qType="questionItem.questionType" :question="questionItem"
                                :answer="answer.answerItems[questionItem.itemOrder-1]" :getisScreenOff2="getisScreenOff2"/>
                </el-form-item>
              </el-card>
            </el-row>
            <el-row class="do-align-center">
              <el-button type="primary" @click="submitForm">提交</el-button>
<!--              <el-button>取消</el-button>-->
            </el-row>
          </el-form>
        </el-main>
      </el-container>
    </div>
<!--    <div class="exam-screen-off" >-->
<!--      <p>您已离开考试窗口，请勿切屏！</p>-->
<!--    </div>-->
    <el-dialog title="提示" :visible.sync="isScreenOff" width="480px" class="commonDialog multi clickLight" center :close-on-click-modal="false" @close="submitForm">
<!--      <div class="dialogTipsbox" v-if="tips===1">你还有试题未作答，确认要交卷？</div>-->
      <div class="dialogTipsbox">
        您已经切屏，系统会自动提交试卷！！
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="submitForm">我知道了</el-button>
<!--        @click="submitForm"-->
      </span>
    </el-dialog>
  </div>
</template>

<script type="module" lang="js">
import { mapState, mapGetters } from 'vuex'
import { formatSeconds } from '@/utils'
import QuestionEdit from '../components/QuestionEdit'
import examPaperApi from '@/api/examPaper'
import examPaperAnswerApi from '@/api/examPaperAnswer'
// eslint-disable-next-line no-unused-vars
import { websocketStore } from '@/store/websokcet.js'
import socket from '@/utils/websocket.js'
import { ref } from 'vue'

// const { createClient } = require('webrtc-client')
// import { Client } from 'webrtc-client'
// const { createClient } = require('webrtc-client')
// const isaccept = ref(false)
// const web = websocketStore()
let uid = ref('')
let tid = ref('')
const v1 = ref()
const v2 = ref()
const pc = ref(null)
const mystrea = ref()
export default {
  components: { QuestionEdit },
  data () {
    return {
      altKeyPressed: null,
      isaccept: false,
      peer: null,
      remoteStream: null,
      localStream: null,
      pc: new RTCPeerConnection(),
      isFullScreen: false,
      isScreenOff: false,
      isScreenOff2: true,
      form: {},
      formLoading: false,
      answer: {
        questionId: null,
        doTime: 0,
        answerItems: []
      },
      richEditor: {
        dialogVisible: false,
        object: null,
        parameterName: '',
        instance: null
      },
      timer: null,
      remainTime: 0
    }
  },
  created () {
    let id = this.$route.query.id
    let _this = this
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true
      examPaperApi.select(id).then(re => {
        // 打乱题目以及选项

        // const shuffledDeeplyNestedArr = re.response.titleItems
        // const targetArrIndex = 1
        // const shuffledTargetArr = shuffledDeeplyNestedArr[targetArrIndex].map(innerArr => innerArr.sort(() => Math.random() - 0.5))
        // shuffledDeeplyNestedArr[targetArrIndex] = shuffledTargetArr
        //
        // const shuffledArr = shuffledDeeplyNestedArr.sort(() => Math.random() - 0.5)
        // re.response.titleItems = shuffledArr
        // 遍历response中的所有questionItems数组
        re.response.titleItems.forEach(titleItem => {
          // 使用Array.sort()方法和随机排序函数来随机排序questionItems数组中的元素
          titleItem.questionItems.sort(() => Math.random() - 0.5)
          // 遍历questionItems数组中的所有元素
          titleItem.questionItems.forEach(questionItem => {
            // 使用Array.sort()方法和随机排序函数来随机排序items数组中的元素
            questionItem.items.sort(() => Math.random() - 0.5)
          })
        })
        re.response.titleItems.sort(() => Math.random() - 0.5)
        var i = 1
        re.response.titleItems.forEach(titleItem => {
          titleItem.questionItems.forEach(questionItem => {
            questionItem.itemOrder = i++
          })
        })
        _this.form = re.response
        _this.remainTime = re.response.suggestTime * 60
        _this.initAnswer()
        _this.timeReduce()
        _this.formLoading = false
      })
    }
  },
  mounted () {
    // this.loginWebsocket()
    // web.$subscribe((mutations, state) => {
    //   let msg = JSON.parse(state.msg)
    //   switch (msg.type) {
    //     case 4:
    //       this.sxt().then(res => {
    //         socket.send({ uid: uid.value, to: tid.value, type: 5 })
    //       })
    //       break
    //     case 5:
    //       this.sxt().then(res => {
    //         if (pc.value == null) {
    //           this.createPeerConnection()
    //         }
    //
    //         pc.value.createOffer(this.createOfferAndSendMessage, this.handleCreateOfferError)
    //       })
    //       break
    //     case 6:
    //       if (pc.value == null) {
    //         this.createPeerConnection()
    //       }
    //       console.log(msg.message)
    //       pc.value.setRemoteDescription(new RTCSessionDescription(msg.message))
    //       this.doAnswer()
    //       break
    //     case 7:
    //       pc.value.setRemoteDescription(new RTCSessionDescription(msg.message))
    //       break
    //     case 8:
    //
    //       console.log('aaa')
    //       var candidate = new RTCIceCandidate({
    //         sdpMLineIndex: msg.message.sdpMLineIndex,
    //         candidate: msg.message.candidate
    //       })
    //       pc.value.addIceCandidate(candidate)
    //
    //       break
    //   }
    // })
    // this.sxt()
    // 在组件挂载后执行的代码
    // this.initWebsocket()
    this.initWebRTC()
    // document.addEventListener('keydown', this.stopShortCutKey)
    // 下面两个处理alt+table键
    // window.addEventListener('keydown', function (event) {
    //   if (event.keyCode === 18) {
    //     this.altKeyPressed = true
    //   }
    // })
    //
    // window.addEventListener('keyup', function (event) {
    //   if (event.keyCode === 18) {
    //     this.altKeyPressed = false
    //   }
    //   if (this.altKeyPressed && event.keyCode === 9) {
    //     // 处理 Alt + Tab 快捷键逻辑
    //     this.handleScreenOff()
    //   }
    // })

    // this.stopShortCutKey()
    // window.addEventListener('blur', function (event) {
    //   // 排除 UEditor 编辑器
    //   if (/* event.relatedTarget && */ event.relatedTarget.classList.contains('edui')) {
    //     console.log('editor测试')
    //     console.log(event)
    //   } else {
    //     // 处理窗口失去焦点的情况
    //     console.log(event)
    //     this.handleScreenOff()
    //   }
    // }.bind(this))

    window.addEventListener('blur', this.handleScreenOff)
    // window.addEventListener('unload', this.handleScreenOff)
    // document.getElementById('contentDiv').addEventListener('mouseleave', this.handleScreenOff)
    // document.getElementById('contentDiv').addEventListener('mouseleave', this.handleScreenOff)
    // this.enterFullScreen()
  },
  beforeDestroy () {
    window.removeEventListener('blur', this.handleScreenOff)
    window.clearInterval(this.timer)
  },
  methods: {

    getisScreenOff2 (isScreenOff2) {
      this.isScreenOff2 = isScreenOff2
    },

    stopShortCutKey (event) {
      // 屏蔽鼠标右键、Ctrl+n、shift+F10、F5刷新、退格键
      if ((event.altKey) && ((event.keyCode === 37) || (event.keyCode === 39))) {
        alert('不准你使用ALT+方向键前进或后退网页！')
        event.preventDefault()
      }
      if ((event.keyCode === 116) || // 屏蔽 F5 刷新键
        (event.keyCode === 112) || // 屏蔽 F1 刷新键
        (event.ctrlKey && event.keyCode === 82)) { // Ctrl + R
        event.preventDefault()
      }
      if ((event.ctrlKey) && (event.keyCode === 78)) {
        console.log('测试测试测试')
        this.handleScreenOff()
        event.preventDefault() // 屏蔽 Ctrl+n
      }
      if ((event.ctrlKey) && (event.keyCode === 78)) {
        console.log('测试测试测试')
        event.preventDefault() // 屏蔽 Ctrl+n
      }
      if ((event.shiftKey) && (event.keyCode === 121)) { // 屏蔽 shift+F10
        event.preventDefault()
      }
      if (event.target.tagName === 'A' && event.shiftKey) {
        event.preventDefault() // 屏蔽 shift 加鼠标左键新开一网页
      }
      if ((event.altKey) && (event.keyCode === 27)) {
        alert('认真答题！')
      }
    },

    editorReady (instance) {
      this.richEditor.instance = instance
      let currentContent = this.richEditor.object[this.richEditor.parameterName]
      this.richEditor.instance.setContent(currentContent)
      // 光标定位到Ueditor
      this.richEditor.instance.focus(true)
    },

    handleCreateOfferError () {
      console.log('aa')
    },

    createOfferAndSendMessage (sessionDescription) {
      pc.value.setLocalDescription(sessionDescription)
      socket.send({ uid: uid.value, to: tid.value, type: 6, message: sessionDescription })
    },

    doAnswer () {
      if (pc.value == null) {
        this.createPeerConnection()
      }
      pc.value.createAnswer().then(this.createAnswerAndSendMessage, this.handleCreateAnswerError)
    },

    handleCreateAnswerError () {
      console.log('bbb')
    },

    createAnswerAndSendMessage (sessionDescription) {
      pc.value.setLocalDescription(sessionDescription)
      socket.send({ uid: uid.value, to: tid.value, type: 7, message: sessionDescription })
      // ws.value.send(JSON.stringify({type:"4",uid:uid.value,to:rid.value,message:sessionDescription}))
    },

    createPeerConnection () {
      pc.value = new RTCPeerConnection(null)
      pc.value.onicecandidate = this.handleIceCandidate
      pc.value.onaddstream = this.handleRemoteStreamAdded
      for (const trac of mystrea.value.getTracks()) {
        pc.value.addTrack(trac, mystrea.value)
      }
    },

    handleRemoteStreamAdded (event) {
      console.log(event)
      v2.value.srcObject = event.stream
    },

    handleIceCandidate (event) {
      if (event.candidate) {
        socket.send({ uid: uid.value, to: tid.value, type: 8, message: event.candidate })
      }
    },

    // 开启摄像头
    sxt () {
      return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        }).then(function (value) {
          mystrea.value = value
          v1.value.srcObject = value // 自己的流
          // eslint-disable-next-line prefer-promise-reject-errors
        }).then(() => resolve()).catch(() => reject())
      })
    },
    accept () {
      socket.send({ uid: uid.value, to: tid.value, type: 4 })
    },
    loginWebsocket () {
      Promise.resolve().then(function () {
        socket.init()
      })
        .then(function () {
          uid.value = localStorage.getItem('userid')
          if (uid.value === '1') {
            tid.value = '3'
          } else {
            tid.value = '1'
          }
          socket.send({ uid: uid.value, type: 1 })
        }).then(() => {
          socket.send({ uid: uid.value, to: tid.value, type: 3 })
        })
    },
    // async start () {
    //   try {
    //     // 获取本地音视频流
    //     this.localStream = await navigator.mediaDevices.getUserMedia({
    //       video: true
    //       // audio: true
    //     })
    //
    //     // 在本地视频元素中显示本地流
    //     this.$refs.localVideo.srcObject = this.localStream
    //     this.$refs.localVideo.play()
    //
    //     // 创建 WebRTC 客户端
    //     this.peer = createClient()
    //
    //     // 加入房间
    //     this.peer.joinRoom('room1')
    //
    //     // 监听新的远程流
    //     this.peer.on('stream', (stream) => {
    //       this.remoteStream = stream
    //       this.$refs.remoteVideo.srcObject = stream
    //       this.$refs.remoteVideo.play()
    //     })
    //
    //     // 将本地流发布到房间中
    //     this.peer.publish(this.localStream)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    // stop () {
    //   // 停止本地音视频流
    //   if (this.localStream) {
    //     this.localStream.getTracks().forEach((track) => track.stop())
    //   }
    //
    //   // 停止远程音视频流
    //   if (this.remoteStream) {
    //     this.remoteStream.getTracks().forEach((track) => track.stop())
    //   }
    //
    //   // 关闭 WebRTC 客户端
    //   if (this.peer) {
    //     this.peer.close()
    //     this.peer = null
    //   }
    // },
    // webrtc
    initWebRTC () {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.localStream = stream
          this.$refs.videoElement.srcObject = stream
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 进入全屏模式
    enterFullScreen () {
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      }
      this.isFullScreen = true
    },
    // 退出全屏模式
    exitFullScreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
      this.isFullScreen = false
    },
    // 处理窗口切换事件
    handleScreenOff () {
      if (this.isScreenOff2) {
        this.isScreenOff = true
      }
      console.log('看看是多少' + this.isScreenOff2)

      // 可以在这里添加其他逻辑，例如记录考试成绩等
      // 立即中止考试
      // window.location.href = 'about:blank'
      // window.alert('您已离开考试窗口，请勿切屏！')
    },
    formatSeconds (theTime) {
      return formatSeconds(theTime)
    },
    timeReduce () {
      let _this = this
      this.timer = setInterval(function () {
        if (_this.remainTime <= 0) {
          _this.submitForm()
        } else {
          ++_this.answer.doTime
          --_this.remainTime
        }
      }, 1000)
    },
    questionCompleted (completed) {
      return this.enumFormat(this.doCompletedTag, completed)
    },
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' })
    },
    initAnswer () {
      this.answer.id = this.form.id
      let titleItemArray = this.form.titleItems
      for (let tIndex in titleItemArray) {
        let questionArray = titleItemArray[tIndex].questionItems
        for (let qIndex in questionArray) {
          let question = questionArray[qIndex]
          this.answer.answerItems.push({ questionId: question.id, content: null, contentArray: [], completed: false, itemOrder: question.itemOrder })
        }
      }
    },
    submitForm () {
      this.isScreenOff = false
      console.log(this.answer.answerItems)
      let _this = this
      window.clearInterval(_this.timer)
      _this.formLoading = true
      examPaperAnswerApi.answerSubmit(this.answer).then(re => {
        if (re.code === 1) {
          _this.$alert('试卷得分：' + re.response + '分', '考试结果', {
            confirmButtonText: '返回考试记录',
            callback: action => {
              _this.$router.push('/record/index')
            }
          })
        } else {
          _this.$message.error(re.message)
        }
        _this.formLoading = false
      }).catch(e => {
        _this.formLoading = false
      })
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      doCompletedTag: state => state.exam.question.answer.doCompletedTag
    })
  }
}
</script>

<style lang="scss" scoped>
  .align-center {
    text-align: center
  }

  .exam-question-item {
    padding: 10px;

    .el-form-item__label {
      font-size: 15px !important;
    }
  }

  .question-title-padding {
    padding-left: 25px;
    padding-right: 25px;
  }
  .exam-screen-off {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
  }
/*el-card大小*/
  .exampaper-item-box{
    width: 800px;
    margin-left: 200px;
  }

  .video{
    position: fixed;
    top: 100px; /* 设置视频在页面中的相对位置 */
    width: 340px;
    height: 180px;
  }

  .video1{
    position: fixed;
    top: 100px; /* 设置视频在页面中的相对位置 */
    width: 340px;
    height: 180px;
  }

  .video2{
    position: fixed;
    top: 300px; /* 设置视频在页面中的相对位置 */
    width: 340px;
    height: 180px;
  }

  .tips{
    position: fixed;
    top: 330px; /* 设置视频在页面中的相对位置 */
    width: 200px;
    left: 60px;
    font-size: 25px;
    color: red;
  }

  .hhh{
    margin-left: 200px;
  }
</style>
