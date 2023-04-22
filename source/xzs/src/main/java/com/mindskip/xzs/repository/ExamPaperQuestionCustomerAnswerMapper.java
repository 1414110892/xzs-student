package com.mindskip.xzs.repository;

import com.mindskip.xzs.domain.ExamPaperQuestionCustomerAnswer;
import com.mindskip.xzs.domain.other.ExamPaperAnswerUpdate;
import com.mindskip.xzs.domain.other.KeyValue;
import com.mindskip.xzs.viewmodel.student.question.answer.QuestionPageStudentRequestVM;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

@Mapper
public interface ExamPaperQuestionCustomerAnswerMapper extends BaseMapper<ExamPaperQuestionCustomerAnswer> {

    List<ExamPaperQuestionCustomerAnswer> selectListByPaperAnswerId(Integer id);

    List<ExamPaperQuestionCustomerAnswer> studentPage(QuestionPageStudentRequestVM requestVM);

    int insertList(List<ExamPaperQuestionCustomerAnswer> list);

    Integer selectAllCount();

    List<KeyValue> selectCountByDate(@Param("startTime") Date startTime, @Param("endTime") Date endTime);

    int updateScore(List<ExamPaperAnswerUpdate> examPaperAnswerUpdates);

    Integer selectQuestionsTrueById(Integer id);

    Integer selectQuestionCntById(Integer id);

    List<Integer> selectQuestionById(Integer id);

    int selectTrueScore(Integer integer);

    int selectOrignScore(Integer integer);


    Integer selectAnswerCntByPaperId(Integer id);

    List<ExamPaperQuestionCustomerAnswer> selectListByExamPaperId(Integer id);

    Integer selectAllDoRightByItemOrder(Integer itemOrder, Integer id);

    Integer selectAllDoWrongByItemOrder(Integer itemOrder, Integer id);
}
