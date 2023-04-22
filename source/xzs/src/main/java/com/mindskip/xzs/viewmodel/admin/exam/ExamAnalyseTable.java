package com.mindskip.xzs.viewmodel.admin.exam;

/**
 * @Author：ycx
 * @Date：2023/4/21 10:56
 * @Filename：examAnalyseTable
 */
public class ExamAnalyseTable {
    private String examName;
    private String totalScore;
    private String realName;
    private Integer rank;
    private Integer maxScore;

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public String getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(String totalScore) {
        this.totalScore = totalScore;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public Integer getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(Integer maxScore) {
        this.maxScore = maxScore;
    }
}
