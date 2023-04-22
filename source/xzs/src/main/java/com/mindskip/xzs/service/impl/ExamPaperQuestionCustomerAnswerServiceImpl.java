package com.mindskip.xzs.service.impl;

import com.mindskip.xzs.domain.ExamPaperQuestionCustomerAnswer;
import com.mindskip.xzs.domain.other.ExamPaperAnswerUpdate;
import com.mindskip.xzs.domain.other.KeyValue;
import com.mindskip.xzs.domain.TextContent;
import com.mindskip.xzs.domain.enums.QuestionTypeEnum;
import com.mindskip.xzs.repository.ExamPaperQuestionCustomerAnswerMapper;
import com.mindskip.xzs.service.ExamPaperQuestionCustomerAnswerService;
import com.mindskip.xzs.service.TextContentService;
import com.mindskip.xzs.utility.DateTimeUtil;
import com.mindskip.xzs.utility.ExamUtil;
import com.mindskip.xzs.utility.JsonUtil;
import com.mindskip.xzs.viewmodel.student.exam.ExamPaperSubmitItemVM;
import com.mindskip.xzs.viewmodel.student.question.answer.QuestionPageStudentRequestVM;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class ExamPaperQuestionCustomerAnswerServiceImpl extends BaseServiceImpl<ExamPaperQuestionCustomerAnswer> implements ExamPaperQuestionCustomerAnswerService {

    private final ExamPaperQuestionCustomerAnswerMapper examPaperQuestionCustomerAnswerMapper;
    private final TextContentService textContentService;

    @Autowired
    public ExamPaperQuestionCustomerAnswerServiceImpl(ExamPaperQuestionCustomerAnswerMapper examPaperQuestionCustomerAnswerMapper, TextContentService textContentService) {
        super(examPaperQuestionCustomerAnswerMapper);
        this.examPaperQuestionCustomerAnswerMapper = examPaperQuestionCustomerAnswerMapper;
        this.textContentService = textContentService;
    }


    @Override
    public PageInfo<ExamPaperQuestionCustomerAnswer> studentPage(QuestionPageStudentRequestVM requestVM) {
        return PageHelper.startPage(requestVM.getPageIndex(), requestVM.getPageSize(), "id desc").doSelectPageInfo(() ->
                examPaperQuestionCustomerAnswerMapper.studentPage(requestVM)
        );
    }

    @Override
    public List<ExamPaperQuestionCustomerAnswer> selectListByPaperAnswerId(Integer id) {
        return examPaperQuestionCustomerAnswerMapper.selectListByPaperAnswerId(id);
    }


    @Override
    public void insertList(List<ExamPaperQuestionCustomerAnswer> examPaperQuestionCustomerAnswers) {
        examPaperQuestionCustomerAnswerMapper.insertList(examPaperQuestionCustomerAnswers);
    }

    @Override
    public ExamPaperSubmitItemVM examPaperQuestionCustomerAnswerToVM(ExamPaperQuestionCustomerAnswer qa) {
        ExamPaperSubmitItemVM examPaperSubmitItemVM = new ExamPaperSubmitItemVM();
        examPaperSubmitItemVM.setId(qa.getId());
        examPaperSubmitItemVM.setQuestionId(qa.getQuestionId());
        examPaperSubmitItemVM.setDoRight(qa.getDoRight());
        examPaperSubmitItemVM.setItemOrder(qa.getItemOrder());
        examPaperSubmitItemVM.setQuestionScore(ExamUtil.scoreToVM(qa.getQuestionScore()));
        examPaperSubmitItemVM.setScore(ExamUtil.scoreToVM(qa.getCustomerScore()));
        setSpecialToVM(examPaperSubmitItemVM, qa);
        return examPaperSubmitItemVM;
    }

    @Override
    public Integer selectAllCount() {
        return examPaperQuestionCustomerAnswerMapper.selectAllCount();
    }

    @Override
    public Integer selectQuestionsTrueById(Integer id) {

        return examPaperQuestionCustomerAnswerMapper.selectQuestionsTrueById(id);
    }

    @Override
    public Integer selectQuestionCntById(Integer id) {
        return examPaperQuestionCustomerAnswerMapper.selectQuestionCntById(id);
    }

    @Override
    public List<Integer> selectMothCount() {
        Date startTime = DateTimeUtil.getMonthStartDay();
        Date endTime = DateTimeUtil.getMonthEndDay();
        List<KeyValue> mouthCount = examPaperQuestionCustomerAnswerMapper.selectCountByDate(startTime, endTime);
        List<String> mothStartToNowFormat = DateTimeUtil.MothStartToNowFormat();
        return mothStartToNowFormat.stream().map(md -> {
            KeyValue keyValue = mouthCount.stream().filter(kv -> kv.getName().equals(md)).findAny().orElse(null);
            return null == keyValue ? 0 : keyValue.getValue();
        }).collect(Collectors.toList());
    }

    @Override
    public int updateScore(List<ExamPaperAnswerUpdate> examPaperAnswerUpdates) {
        return examPaperQuestionCustomerAnswerMapper.updateScore(examPaperAnswerUpdates);
    }

    @Override
    public List<Map<String, String>> selectQuestionById(Integer id) {
        List<Integer> examQuestionType = examPaperQuestionCustomerAnswerMapper.selectQuestionById(id);
        int score1=0,score2=0,score3=0,score4=0,score5=0;
        int sscore1=0,sscore2=0,sscore3=0,sscore4=0,sscore5=0;
        double s1=0.0,s2=0.0,s3=0.0,s4=0.0,s5=0.0;
        List<Map<String, String>> data = new ArrayList<>();
        Set<Integer> set = new LinkedHashSet<>(examQuestionType); // 将List转换成LinkedHashSet
        List<Integer> newList = new ArrayList<>(set); // 将LinkedHashSet转换成List
        for (Integer integer : newList) {
            if(integer == 1){
                score1 = examPaperQuestionCustomerAnswerMapper.selectTrueScore(integer);
                sscore1 = examPaperQuestionCustomerAnswerMapper.selectOrignScore(integer);
            }else if(integer == 2){
                score2 = examPaperQuestionCustomerAnswerMapper.selectTrueScore(integer);
                sscore2 = examPaperQuestionCustomerAnswerMapper.selectOrignScore(integer);
            }else if(integer == 3){
                score3 = examPaperQuestionCustomerAnswerMapper.selectTrueScore(integer);
                sscore3 = examPaperQuestionCustomerAnswerMapper.selectOrignScore(integer);
            }else if(integer == 4){
                score4 = examPaperQuestionCustomerAnswerMapper.selectTrueScore(integer);
                sscore4 = examPaperQuestionCustomerAnswerMapper.selectOrignScore(integer);
            }else if(integer == 5){
                score5 = examPaperQuestionCustomerAnswerMapper.selectTrueScore(integer);
                sscore5 = examPaperQuestionCustomerAnswerMapper.selectOrignScore(integer);
            }

        }
        if(sscore1==0){
            s1=0.0;
        }else{
            s1 = ((1.0*score1) / sscore1);
        }
        if(sscore2==0){
            s2=0.0;
        }else{
            s2 = ((1.0*score2) / sscore2);
        }
        if(sscore3==0){
            s3=0.0;
        }else{
            s3 = ((1.0*score3) / sscore3);
        }if(sscore4==0){
            s4=0.0;
        }else{
            s4 = ((1.0*score4) / sscore4);
        }if(sscore5==0){
            s5=0.0;
        }else{
            s5 = ((1.0*score5) / sscore5);
        }
        Map<String, String> map1 = new HashMap<>();
        map1.put("value", s1+"");
        map1.put("name", "单选题正确率");
        data.add(map1);

        Map<String, String> map2 = new HashMap<>();
        map2.put("value", s2+"");
        map2.put("name", "多选题正确率");
        data.add(map2);

        Map<String, String> map3 = new HashMap<>();
        map3.put("value", s3+"");
        map3.put("name", "判断题正确率");
        data.add(map3);

        Map<String, String> map4 = new HashMap<>();
        map4.put("value", s4+"");
        map4.put("name", "填空题正确率");
        data.add(map4);

        Map<String, String> map5 = new HashMap<>();
        map5.put("value", s5+"");
        map5.put("name", "简答题正确率");
        data.add(map5);

        return data;
    }

    @Override
    public Integer selectAnswerCntByPaperId(Integer id) {
        Integer integer = examPaperQuestionCustomerAnswerMapper.selectAnswerCntByPaperId(id);
        return integer;
    }

    @Override
    public List<Map<String, Double>> selectListByExamPaperId(Integer id) {
        List<ExamPaperQuestionCustomerAnswer> examPaperQuestionCustomerAnswers = examPaperQuestionCustomerAnswerMapper.selectListByExamPaperId(id);
        List<ExamPaperQuestionCustomerAnswer> distinctExamPaperQuestionCustomerAnswers = examPaperQuestionCustomerAnswers.stream()
                .filter(distinctByKey(ExamPaperQuestionCustomerAnswer::getItemOrder))
                .collect(Collectors.toList());
        List<Map<String, Double>> mapList = new ArrayList<>();
        for (ExamPaperQuestionCustomerAnswer examPaperQuestionCustomerAnswer : distinctExamPaperQuestionCustomerAnswers) {
            Map<String,Double> map = new LinkedHashMap<>();
            Integer itemOrder = examPaperQuestionCustomerAnswer.getItemOrder();
            Integer right = examPaperQuestionCustomerAnswerMapper.selectAllDoRightByItemOrder(itemOrder,id);
            Integer wrong = examPaperQuestionCustomerAnswerMapper.selectAllDoWrongByItemOrder(itemOrder,id);
            map.put(itemOrder+"",1.0*right/(right+wrong));
            mapList.add(map);
        }
        return mapList;
    }

    public static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor) {
        Map<Object, Boolean> seen = new ConcurrentHashMap<>();
        return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }

    private void setSpecialToVM(ExamPaperSubmitItemVM examPaperSubmitItemVM, ExamPaperQuestionCustomerAnswer examPaperQuestionCustomerAnswer) {
        QuestionTypeEnum questionTypeEnum = QuestionTypeEnum.fromCode(examPaperQuestionCustomerAnswer.getQuestionType());
        switch (questionTypeEnum) {
            case MultipleChoice:
                examPaperSubmitItemVM.setContent(examPaperQuestionCustomerAnswer.getAnswer());
                examPaperSubmitItemVM.setContentArray(ExamUtil.contentToArray(examPaperQuestionCustomerAnswer.getAnswer()));
                break;
            case GapFilling:
                TextContent textContent = textContentService.selectById(examPaperQuestionCustomerAnswer.getTextContentId());
                List<String> correctAnswer = JsonUtil.toJsonListObject(textContent.getContent(), String.class);
                examPaperSubmitItemVM.setContentArray(correctAnswer);
                break;
            default:
                if (QuestionTypeEnum.needSaveTextContent(examPaperQuestionCustomerAnswer.getQuestionType())) {
                    TextContent content = textContentService.selectById(examPaperQuestionCustomerAnswer.getTextContentId());
                    examPaperSubmitItemVM.setContent(content.getContent());
                } else {
                    examPaperSubmitItemVM.setContent(examPaperQuestionCustomerAnswer.getAnswer());
                }
                break;
        }
    }
}
