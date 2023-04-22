<template>
  <div class="app-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="people" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              总人数
            </div>
            <count-to :start-val="0" :end-val="peopleCnt" :duration="3600" class="card-panel-num" v-loading="loading"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="myAnswerPeople" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              答题人数
            </div>
            <count-to :start-val="0" :end-val="answerPeopleCnt" :duration="3200" class="card-panel-num" v-loading="loading"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="echarts-line">
      <div id="container" style="width: 100%;height:400px;"></div>
    </el-row>
    <div id="container2" style="height: 400px"></div>
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="examName" label="考试名称" />
      <el-table-column prop="totalScore" label="总分/及格分数"/>
      <el-table-column prop="realName" label="学生姓名" />
      <el-table-column prop="rank" label="考试排名"/>
      <el-table-column prop="maxScore" label="最好成绩"/>
    </el-table>
  </div>
</template>

<script>

import { mapGetters, mapState, mapActions } from 'vuex'
import * as echarts from '_echarts@5.4.1@echarts'
import dashboardApi from '@/api/dashboard'
import resize from '../../dashboard/components/mixins/resize'
import CountTo from '_vue-count-to@1.0.13@vue-count-to'
import examAnalyseApi from '@/api/examAnalyse'
export default {
  mixins: [resize],
  components: {
    CountTo
  },
  data () {
    return {
      tableData: [],
      loading: false,
      total: 0,
      echartsExamAnalyse: null,
      echartsExamAnalyse2: null,
      peopleCnt: 0,
      answerPeopleCnt: 0,
      id: null
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.echartsExamAnalyse = echarts.init(document.getElementById('container'), null, {
      renderer: 'canvas',
      useDirtyRect: false
    })
    this.echartsExamAnalyse2 = echarts.init(document.getElementById('container2'), null, {
      renderer: 'canvas',
      useDirtyRect: false
    })
    let _this = this
    dashboardApi.echartsExamAnalyse(this.id).then(re => {
      // eslint-disable-next-line no-unused-vars
      let response = re.response
      this.answerPeopleCnt = response.answerPeopleCnt
      this.peopleCnt = response.peopleCnt
      this.tableData = response.list
      _this.echartsExamAnalyse.setOption(this.option('试卷分析', response.paperName, response.examContent))
      _this.echartsExamAnalyse2.setOption(this.option2(response.xdata, response.ydata))
      this.loading = false
    })
  },
  created () {
    this.id = this.$route.query.id
  },
  methods: {
    search () {
      examAnalyseApi.getExamAnalyse(this.id).then(data => {
        const re = data.response
        this.tableData = re.list
      })
    },
    option (title, paperName, value) {
      return {
        title: {
          text: title,
          subtext: paperName,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: value,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    option2 (xdata, ydata) {
      return {
        title: {
          text: '各个题目正确率',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: xdata
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: ydata,
            type: 'bar',
            barWidth: 30,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    },

    ...mapActions('exam', { initSubject: 'initSubject' }),
    ...mapActions('tagsView', { delCurrentView: 'delCurrentView' })
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
    }),
    ...mapState('exam', { subjects: state => state.subjects })
  }
}
</script>

<style lang="scss">
  .exampaper-item-box {
    .q-title {
      margin: 0px 5px 0px 5px;
    }
    .q-item-content {
    }
  }

  .echarts-line{
    background:#fff;
    padding:16px 16px 0;
    margin-bottom:32px;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
