package com.mindskip.xzs.viewmodel.admin.exam;



import java.util.List;
import java.util.Map;


public class ExamAnalyseVM {
    private String paperName;
    private Integer peopleCnt;
    private Integer answerPeopleCnt;
    private List<Double> examQuestionTrue;
    private List<Map<String,String>> examContent;
    private List<ExamAnalyseTable> list;
    private List<String> xdata;
    private List<Double> ydata;

    public List<String> getXdata() {
        return xdata;
    }

    public void setXdata(List<String> xdata) {
        this.xdata = xdata;
    }

    public List<Double> getYdata() {
        return ydata;
    }

    public void setYdata(List<Double> ydata) {
        this.ydata = ydata;
    }

    public List<ExamAnalyseTable> getList() {
        return list;
    }

    public void setList(List<ExamAnalyseTable> list) {
        this.list = list;
    }

    public Integer getPeopleCnt() {
        return peopleCnt;
    }

    public void setPeopleCnt(Integer peopleCnt) {
        this.peopleCnt = peopleCnt;
    }

    public Integer getAnswerPeopleCnt() {
        return answerPeopleCnt;
    }

    public void setAnswerPeopleCnt(Integer answerPeopleCnt) {
        this.answerPeopleCnt = answerPeopleCnt;
    }



    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public List<Double> getExamQuestionTrue() {
        return examQuestionTrue;
    }

    public void setExamQuestionTrue(List<Double> examQuestionTrue) {
        this.examQuestionTrue = examQuestionTrue;
    }

    public List<Map<String, String>> getExamContent() {
        return examContent;
    }

    public void setExamContent(List<Map<String, String>> examContent) {
        this.examContent = examContent;
    }
}
