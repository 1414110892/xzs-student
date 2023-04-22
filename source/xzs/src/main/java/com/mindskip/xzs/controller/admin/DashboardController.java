package com.mindskip.xzs.controller.admin;

import com.mindskip.xzs.base.BaseApiController;
import com.mindskip.xzs.base.RestResponse;
import com.mindskip.xzs.domain.ExamPaper;
import com.mindskip.xzs.domain.User;
import com.mindskip.xzs.service.*;
import com.mindskip.xzs.utility.DateTimeUtil;
import com.mindskip.xzs.viewmodel.admin.dashboard.IndexVM;
import com.mindskip.xzs.viewmodel.admin.exam.ExamAnalyseTable;
import com.mindskip.xzs.viewmodel.admin.exam.ExamAnalyseVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController("AdminDashboardController")
@RequestMapping(value = "/api/admin/dashboard")
public class DashboardController extends BaseApiController {

    private final ExamPaperService examPaperService;
    private final QuestionService questionService;
    private final ExamPaperAnswerService examPaperAnswerService;
    private final ExamPaperQuestionCustomerAnswerService examPaperQuestionCustomerAnswerService;
    private final UserEventLogService userEventLogService;
    private final UserService userService;

    @Autowired
    public DashboardController(ExamPaperService examPaperService, QuestionService questionService, ExamPaperAnswerService examPaperAnswerService, ExamPaperQuestionCustomerAnswerService examPaperQuestionCustomerAnswerService, UserEventLogService userEventLogService,UserService userService) {
        this.examPaperService = examPaperService;
        this.questionService = questionService;
        this.examPaperAnswerService = examPaperAnswerService;
        this.examPaperQuestionCustomerAnswerService = examPaperQuestionCustomerAnswerService;
        this.userEventLogService = userEventLogService;
        this.userService = userService;
    }

    @RequestMapping(value = "/index", method = RequestMethod.POST)
    public RestResponse<IndexVM> Index() {
        IndexVM vm = new IndexVM();

        Integer examPaperCount = examPaperService.selectAllCount();
        Integer questionCount = questionService.selectAllCount();
        Integer doExamPaperCount = examPaperAnswerService.selectAllCount();
        Integer doQuestionCount = examPaperQuestionCustomerAnswerService.selectAllCount();

        vm.setExamPaperCount(examPaperCount);
        vm.setQuestionCount(questionCount);
        vm.setDoExamPaperCount(doExamPaperCount);
        vm.setDoQuestionCount(doQuestionCount);

        List<Integer> mothDayUserActionValue = userEventLogService.selectMothCount();
        List<Integer> mothDayDoExamQuestionValue = examPaperQuestionCustomerAnswerService.selectMothCount();
        vm.setMothDayUserActionValue(mothDayUserActionValue);
        vm.setMothDayDoExamQuestionValue(mothDayDoExamQuestionValue);

        vm.setMothDayText(DateTimeUtil.MothDay());
        return RestResponse.ok(vm);
    }

    //绘制出每条题目错误的百分比
    @RequestMapping(value = "/index2", method = RequestMethod.POST)
    public RestResponse<IndexVM> Index2() {
        IndexVM vm = new IndexVM();
        List<Integer> integers = questionService.selectAllQuestionsId();
        List<Double> examQuestionProp = new ArrayList<>();
        for (Integer integer : integers) {
            Integer cnt = examPaperQuestionCustomerAnswerService.selectQuestionCntById(integer);
            Integer trueCnt = examPaperQuestionCustomerAnswerService.selectQuestionsTrueById(integer);
            if(cnt == 0){
                examQuestionProp.add((double)0);
            }else{
                double x = 1.0*trueCnt/cnt;
                examQuestionProp.add(x);
            }
        }
        vm.setExamQuestionId(integers);
        vm.setExamQuestionTrue(examQuestionProp);
        return RestResponse.ok(vm);
    }

    //分析每张试卷的题目
    @RequestMapping(value = "/echartsExamAnalyse/{id}", method = RequestMethod.POST)
    public RestResponse<ExamAnalyseVM> echartsExamAnalyse(@PathVariable Integer id) {
        ExamAnalyseVM vm = new ExamAnalyseVM();
        //饼图
        List<Map<String, String>> maps = examPaperQuestionCustomerAnswerService.selectQuestionById(id);
        ExamPaper examPaper = examPaperService.selectById(id);
        Integer integer = userService.selectAllCount();
        //成绩排名的table
        Integer answerPeople = examPaperQuestionCustomerAnswerService.selectAnswerCntByPaperId(id);
        //该张试卷每一题的正确率
        List<Map<String,Double>> listMap = examPaperQuestionCustomerAnswerService.selectListByExamPaperId(id);
        List<String> xdata = new ArrayList<>();
        List<Double> ydata = new ArrayList<>();
        for (Map<String, Double> stringDoubleMap : listMap) {
            String key = stringDoubleMap.keySet().iterator().next();
            xdata.add(key);
            ydata.add(stringDoubleMap.get(key));
        }
        vm.setPeopleCnt(integer);
        vm.setAnswerPeopleCnt(answerPeople);
        vm.setPaperName(examPaper.getName());
        vm.setExamContent(maps);
        vm.setXdata(xdata);
        vm.setYdata(ydata);

        List<ExamAnalyseTable> examAnalyse = examPaperAnswerService.selectAnalyse(id);
        vm.setList(examAnalyse);
        return RestResponse.ok(vm);
    }

}
