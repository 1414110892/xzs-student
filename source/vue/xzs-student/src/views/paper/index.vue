<template>
  <div style="margin-top: 10px" class="app-contain">
    <el-tabs tab-position="left"  v-model="tabId"  @tab-click="subjectChange" >
      <el-tab-pane :label="item.name"  :key="item.id" :name="item.id" v-for="item in subjectList" style="margin-left: 20px;" >
        <el-row  style="float: right">
          <el-radio-group v-model="queryParam.paperType" size="mini" @change="paperTypeChange" >
            <el-radio v-for="item in paperTypeEnum" size="mini" :key="item.key" :label="item.key">{{item.value}}</el-radio>
          </el-radio-group>
        </el-row>
        <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row style="width: 100%">
          <el-table-column prop="id" label="序号" width="90px"/>
          <el-table-column prop="name" label="名称"  />
          <el-table-column align="right">
            <template slot-scope="{row}">
              <router-link target="_blank" :to="{path:'/do',query:{id:row.id}}">
                <el-button  type="text" size="small">开始答题</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :background="false" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
                    @pagination="search" style="margin-top: 20px"/>
      </el-tab-pane>
    </el-tabs>

<!--    <video autoplay style="position: absolute;left: 1%;display: none;"></video>-->
<!--    <canvas id="myCanvas" style="position: absolute;left: 50%;"></canvas>-->
<!--    <form id="pic" action="/face/picture"  enctype="multipart/form-data">-->
<!--      <input type="text" id="name" style="position:  absolute;left: 30%;top: 15%" placeholder="请填入您的账号">-->
<!--      <input type="file" name="file"  style="position: absolute;left: 30%;top: 35%" >-->
<!--      <button type="button" style="position: absolute;left: 30%;top: 45%" onclick="uploadPic()">图片上传</button>-->
<!--    </form>-->
    <!-- <button id="capture" style="position: absolute;left: 30%;top: 25%">拍照上传</button> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import examPaperApi from '@/api/examPaper'
import subjectApi from '@/api/subject'
import $ from 'jquery'
function uploadPic () {
  var formData = new FormData($('#pic')[0])
  $.ajax({
    url: '/face/picture', /* 这是处理文件上传的servlet */
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function (returndata) {
      alert(returndata.message)
    },
    error: function (returndata) {
      alert(returndata)
    }
  })
}
function hasUserMedia () { // 判断是否支持调用设备api，因为浏览器不同所以判断方式不同哦
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
}
// if (hasUserMedia()) {
//   // alert(navigator.mozGetUserMedia)
//   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
//   var video = document.querySelector('video')
//   var canvas = document.querySelector('canvas')
//   var streaming = false
//   navigator.getUserMedia({
//     video: true, // 开启视频
//     audio: false// 先关闭音频，因为会有回响，以后两台电脑通信不会有响声
//   }, function (stream) { // 将视频流交给video
//     video.src = window.URL.createObjectURL(stream)
//     streaming = true
//   }, function (err) {
//     console.log('capturing', err)
//   })
//   document.querySelector('#capture').addEventListener('click', function (event) {
//     if (streaming) {
//       // alert(video.clientHeight)
//       // canvas.width = video.clientWidth;
//       // canvas.height= video.clientHeight;
//       canvas.width = 800
//       canvas.height = 800
//       var context = canvas.getContext('2d')
//       imgString = canvas.toDataURL('image/png')
//       context.drawImage(video, 20, 20)
//
//       var info = {
//         name: $('#name').val(),
//         imgString: canvas.toDataURL('image/png')
//       }
//
//       $.post('/face/photograph', info, function (data) {
//         alert(data.message)
//       }, 'json')
//     }
//   })
// } else {
//   alert('浏览器暂不支持')
// }
export default {
  components: { Pagination },
  data () {
    return {
      queryParam: {
        paperType: 1,
        subjectId: 0,
        pageIndex: 1,
        pageSize: 10
      },
      tabId: '',
      listLoading: true,
      subjectList: [],
      tableData: [],
      total: 0
    }
  },
  created () {
    this.initSubject()
  },
  methods: {
    initSubject () {
      let _this = this
      subjectApi.list().then(re => {
        _this.subjectList = re.response
        let subjectId = _this.subjectList[0].id
        _this.queryParam.subjectId = subjectId
        _this.tabId = subjectId.toString()
        _this.search()
      })
    },
    search () {
      this.listLoading = true
      examPaperApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },
    paperTypeChange (val) {
      this.search()
    },
    subjectChange (tab, event) {
      this.queryParam.subjectId = Number(this.tabId)
      this.search()
    }
  },
  computed: {
    ...mapState('enumItem', {
      paperTypeEnum: state => state.exam.examPaper.paperTypeEnum
    })
  }
}
</script>
