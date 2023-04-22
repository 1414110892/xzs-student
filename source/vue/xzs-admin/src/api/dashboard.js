import { post } from '@/utils/request'

export default {
  index: () => post('/api/admin/dashboard/index'),

  index2: () => post('/api/admin/dashboard/index2'),

  echartsExamAnalyse: (id) => post('/api/admin/dashboard/echartsExamAnalyse/' + id)
}
