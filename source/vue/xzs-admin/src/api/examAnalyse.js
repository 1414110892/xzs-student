import { post } from '@/utils/request'

export default {
  getExamAnalyse: id => post('/api/admin/exam/paper/pageExamAnalyse/' + id),
  taskExamPage: query => post('/api/admin/exam/paper/taskExamPage', query),
  edit: query => post('/api/admin/exam/paper/edit', query),
  select: id => post('/api/admin/exam/paper/select/' + id),
  deletePaper: id => post('/api/admin/exam/paper/delete/' + id)
}
