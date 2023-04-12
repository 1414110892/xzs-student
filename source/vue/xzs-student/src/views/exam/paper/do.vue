<template>
  <div>
<!--    <el-button @Click="enterFullScreen()">全屏</el-button>-->
<!--    <el-button @Click="exitFullScreen()">退出全屏</el-button>-->
<!--    <h1 align="center">注意：考生不允许切屏，检测到切屏则会自动交卷，考生请勿操作，否则按零分处置！！</h1>-->
      <video ref="videoElement" class="video" autoplay></video>
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
                                :answer="answer.answerItems[questionItem.itemOrder-1]"/>
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
    <el-dialog title="提示" :visible.sync="isScreenOff" width="480px" class="commonDialog multi clickLight" center :close-on-click-modal="false">
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

<script>
import { mapState, mapGetters } from 'vuex'
import { formatSeconds } from '@/utils'
import QuestionEdit from '../components/QuestionEdit'
import examPaperApi from '@/api/examPaper'
import examPaperAnswerApi from '@/api/examPaperAnswer'
import io from 'socket.io-client'

export default {
  components: { QuestionEdit },
  data () {
    return {
      websocket: null,
      localStream: null,
      pc: new RTCPeerConnection(),
      isFullScreen: false,
      isScreenOff: false,
      form: {},
      formLoading: false,
      answer: {
        questionId: null,
        doTime: 0,
        answerItems: []
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
        _this.form = re.response
        _this.remainTime = re.response.suggestTime * 60
        _this.initAnswer()
        _this.timeReduce()
        _this.formLoading = false
      })
    }
  },
  mounted () {
    // 在组件挂载后执行的代码
    // this.initWebsocket()
    this.initWebRTC()

    // eslint-disable-next-line no-undef
    // this.enterFullScreen()
    window.addEventListener('blur', this.handleScreenOff)
    // this.enterFullScreen()
  },
  beforeDestroy () {
    window.removeEventListener('blur', this.handleScreenOff)
    window.clearInterval(this.timer)
  },
  methods: {
    // 组件中的方法
    initWebsocket () {
      // 初始化WebSocket连接
      this.websocket = io('http://localhost:8000')

      this.websocket.on('connect', () => {
        console.log('WebSocket连接已打开')
      })

      this.websocket.on('message', (data) => {
        console.log('收到WebSocket消息：', data)
      })

      this.websocket.on('error', (error) => {
        console.error('WebSocket连接错误：', error)
      })

      this.websocket.on('disconnect', () => {
        console.warn('WebSocket连接已关闭')
      })
    },
    initWebRTC () {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.localStream = stream
          this.$refs.videoElement.srcObject = stream
        })
        .catch(error => {
          console.log(error)
        })
      // 初始化WebRTC连接
      // 创建ICE服务器
      const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }

      // 创建RTCPeerConnection对象
      this.peerConnection = new RTCPeerConnection(configuration)

      // 添加本地媒体流到RTCPeerConnection中
      // this.localStream.getTracks().forEach((track) => {
      //   this.peerConnection.addTrack(track, this.localStream)
      // })

      // 监听candidate事件，并发送candidate到对端
      this.peerConnection.addEventListener('icecandidate', (event) => {
        if (event.candidate) {
          console.log('发送ICE candidate到对端：', event.candidate)
          this.sendIceCandidate(event.candidate)
        }
      })

      // 监听track事件，并将远端媒体流绑定到HTML的video标签上
      this.peerConnection.addEventListener('track', (event) => {
        console.log('收到远端媒体流：', event.streams[0])
        this.remoteStream = event.streams[0]
        this.$refs.remoteVideoElement.srcObject = this.remoteStream
      })
    },

    // sendIceCandidate (candidate) {
    //   if (ws.readyState === WebSocket.OPEN) {
    //     // 将ICE candidate转换为JSON字符串形式，并发送到对端
    //     ws.send(JSON.stringify({
    //       type: 'icecandidate',
    //       candidate: candidate.toJSON()
    //     }))
    //     console.log('发送ICE candidate到对端：', candidate)
    //   } else {
    //     console.warn('WebSocket连接未打开，无法发送消息')
    //   }
    // },
    sendLocalStream () {
      // 将本地视频流发送到后端Java服务器
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
      this.isScreenOff = true
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
