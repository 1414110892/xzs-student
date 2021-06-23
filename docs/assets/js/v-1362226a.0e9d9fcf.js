(self.webpackChunkxzs_docs=self.webpackChunkxzs_docs||[]).push([[909],{5785:(n,s,e)=>{"use strict";e.r(s),e.d(s,{data:()=>a});const a={key:"v-1362226a",path:"/guide/student.html",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[],filePathRelative:"guide/student.md",git:{updatedTime:1624351352e3,contributors:[{name:"mindskip",email:"mindskip@qq.com",commits:1}]}}},2007:(n,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>u});const a=(0,e(6252).uE)('<h4 id="登录-api-user-login"><a class="header-anchor" href="#登录-api-user-login">#</a> 登录 （/api/user/login）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;userName&quot;: &quot;student&quot;,  //用户名\n    &quot;password&quot;: &quot;&quot;,  //密码\n    &quot;remember&quot;: false  //下次自动登录\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n        &quot;userName&quot;: &quot;student&quot;,  //用户名\n        &quot;imagePath&quot;: &quot;&quot;,  //头像\n    }\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="首页-api-student-dashboard-index"><a class="header-anchor" href="#首页-api-student-dashboard-index">#</a> 首页 （/api/student/dashboard/index）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;fixedPaper&quot;: [  //固定试卷\n        {\n            &quot;id&quot;: 2399,  //试卷Id\n            &quot;name&quot;: &quot;test33333&quot;,  //试卷名称\n            &quot;limitStartTime&quot;: null,  //考试开始时间\n            &quot;limitEndTime&quot;: null     //考试结束时间\n        }\n    ],\n    &quot;timeLimitPaper&quot;: []    //时段试卷\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="任务中心-api-student-dashboard-task"><a class="header-anchor" href="#任务中心-api-student-dashboard-task">#</a> 任务中心 （/api/student/dashboard/task）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[\n        {\n            &quot;id&quot;: 9,  //任务id\n            &quot;title&quot;: &quot;2021-04-25作业&quot;,  //任务标题\n            &quot;paperItems&quot;: [\n                {\n                    &quot;examPaperId&quot;: 181,   //任务试卷id\n                    &quot;examPaperName&quot;: &quot;第一次出卷&quot;,  //任务试卷名称\n                    &quot;examPaperAnswerId&quot;: 579,  //答卷id\n                    &quot;status&quot;: 2  //答卷状态\n                }\n            ]\n        }\n    ]\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="未读消息数量-api-student-user-message-unreadcount"><a class="header-anchor" href="#未读消息数量-api-student-user-message-unreadcount">#</a> 未读消息数量 （/api/student/user/message/unreadCount）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: 0  //未读消息数量\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="学科列表-api-student-education-subject-list"><a class="header-anchor" href="#学科列表-api-student-education-subject-list">#</a> 学科列表 （/api/student/education/subject/list）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: [\n        {\n            &quot;id&quot;: &quot;18&quot;,  //学科id\n            &quot;name&quot;: &quot;英语&quot;  //学科名称\n        }\n    ]\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="试卷列表-api-student-exam-paper-pagelist"><a class="header-anchor" href="#试卷列表-api-student-exam-paper-pagelist">#</a> 试卷列表 （/api/student/exam/paper/pageList）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;paperType&quot;: 1, //试卷类型\n    &quot;subjectId&quot;: 158, //学科id\n    &quot;pageIndex&quot;: 1, //页数\n    &quot;pageSize&quot;: 10  //每页条数\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: {\n        &quot;total&quot;: 1,\n        &quot;list&quot;: [\n            {\n                &quot;id&quot;: 2520,  //试卷id\n                &quot;name&quot;: &quot;生理卫生&quot;,  //试卷名称\n                &quot;questionCount&quot;: 1,  //题目数\n                &quot;score&quot;: 20,  //试卷分数\n                &quot;createTime&quot;: &quot;2021-05-31 13:34:49&quot;, //创建时间\n                &quot;createUser&quot;: 2,   //创建人\n                &quot;subjectId&quot;: 158,  //学科\n                &quot;subjectName&quot;: &quot;英语&quot;,  //学科\n                &quot;paperType&quot;: 1,   //试卷类型\n                &quot;frameTextContentId&quot;: 9016  //试卷内容\n            }\n        ]\n    }\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h4 id="考试记录-api-student-exampaper-answer-pagelist"><a class="header-anchor" href="#考试记录-api-student-exampaper-answer-pagelist">#</a> 考试记录 （/api/student/exampaper/answer/pageList）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;pageIndex&quot;: 1, //页码\n    &quot;pageSize&quot;: 10  //每页条数\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: {\n        &quot;total&quot;: 6204,\n        &quot;list&quot;: [\n            {\n                &quot;id&quot;: 6534,  //试卷id\n                &quot;createTime&quot;: &quot;2021-06-01 17:56:38&quot;,  //创建时间\n                &quot;userScore&quot;: &quot;0&quot;,  //考试分数\n                &quot;subjectName&quot;: &quot;数学&quot;,  //考试学科\n                &quot;subjectId&quot;: 129, //学科id\n                &quot;questionCount&quot;: 1,  //题目数量\n                &quot;questionCorrect&quot;: 0,  //题目正确数\n                &quot;paperScore&quot;: &quot;3&quot;,  //试卷总分\n                &quot;doTime&quot;: &quot;4 秒&quot;,  //耗时\n                &quot;paperType&quot;: 7,  //试卷类型\n                &quot;systemScore&quot;: &quot;0&quot;,  //系统批改得分\n                &quot;status&quot;: 2,   //试卷状态\n                &quot;paperName&quot;: &quot;智能训练试卷 - 1845&quot;,  //试卷名称\n                &quot;userName&quot;: null  //用户名\n            }\n        ]\n    }\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h4 id="错题本-api-student-question-answer-page"><a class="header-anchor" href="#错题本-api-student-question-answer-page">#</a> 错题本 （/api/student/question/answer/page）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;pageIndex&quot;: 1, //页码\n    &quot;pageSize&quot;: 10  //每页条数\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: {\n        &quot;total&quot;: 17002,\n        &quot;list&quot;: [\n            {\n                &quot;id&quot;: 24928,   //题目id\n                &quot;questionType&quot;: 1,  //题型\n                &quot;createTime&quot;: &quot;2021-06-02 16:07:11&quot;,  //创建时间\n                &quot;subjectName&quot;: &quot;语文&quot;,  //学科\n                &quot;shortTitle&quot;: &quot;666&quot;  //题干\n            }\n        ]\n    }\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h4 id="答题详情-api-student-question-answer-select-25067"><a class="header-anchor" href="#答题详情-api-student-question-answer-select-25067">#</a> 答题详情 （/api/student/question/answer/select/25067）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;pageIndex&quot;: 1, //页码\n    &quot;pageSize&quot;: 10  //每页条数\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: {\n        &quot;questionVM&quot;: {\n            &quot;id&quot;: 507,    //题目id\n            &quot;questionType&quot;: 1,   //题目类型\n            &quot;subjectId&quot;: 46,  //学科id\n            &quot;title&quot;: &quot;111&quot;,   //题干\n            &quot;gradeLevel&quot;: 12,    //年级\n            &quot;items&quot;: [        //选项\n                {\n                    &quot;prefix&quot;: &quot;A&quot;,  //选项\n                    &quot;content&quot;: &quot;A&quot;,  //选项内容\n                    &quot;score&quot;: null    //选项分数\n                }\n            ],\n            &quot;analyze&quot;: &quot;D&quot;,     //解析\n            &quot;correctArray&quot;: null,  //标答\n            &quot;correct&quot;: &quot;D&quot;,   //标答\n            &quot;score&quot;: &quot;2&quot;,  //分数\n            &quot;difficult&quot;: 3,  //难度\n            &quot;itemOrder&quot;: null  //排序\n        },\n        &quot;questionAnswerVM&quot;: {   //用户答案\n            &quot;id&quot;: 25067,  \n            &quot;questionId&quot;: 507,  //题目id\n            &quot;doRight&quot;: false,   //是否正确\n            &quot;content&quot;: &quot;A&quot;,   //用户答案\n            &quot;itemOrder&quot;: 2,   //排序\n            &quot;contentArray&quot;: null,   //用户答案\n            &quot;score&quot;: &quot;0&quot;,  //得分\n            &quot;questionScore&quot;: &quot;2&quot;  //题目分数\n        }\n    }\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h4 id="用户动态-api-student-user-log"><a class="header-anchor" href="#用户动态-api-student-user-log">#</a> 用户动态 （/api/student/user/log）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: [\n        {\n            &quot;id&quot;: 1812,  \n            &quot;userId&quot;: 1,  //用户id\n            &quot;userName&quot;: &quot;student&quot;,  //用户名\n            &quot;realName&quot;: &quot;Test&quot;,  //用户真实姓名\n            &quot;content&quot;: &quot;student 登录了学多多考试系统&quot;,  //动态内容\n            &quot;createTime&quot;: &quot;2021-06-08 17:12:50&quot;  //创建时间\n        }\n    ]\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="当前用户信息-api-student-user-current"><a class="header-anchor" href="#当前用户信息-api-student-user-current">#</a> 当前用户信息 （/api/student/user/current）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: {\n        &quot;id&quot;: 1,\n        &quot;userUuid&quot;: &quot;d2d29da2-dcb3-4013-b874-727626236f47&quot;,\n        &quot;userName&quot;: &quot;student&quot;,  //用户名\n        &quot;realName&quot;: &quot;Test&quot;,  //真实姓名\n        &quot;age&quot;: 18,   //年龄\n        &quot;role&quot;: 1,   //角色\n        &quot;sex&quot;: 1,  //性别\n        &quot;birthDay&quot;: &quot;2019-09-01 00:00:00&quot;,  //生日\n        &quot;phone&quot;: &quot;158800882&quot;,  //手机号\n        &quot;lastActiveTime&quot;: &quot;&quot;,\n        &quot;createTime&quot;: &quot;2019-09-07 18:55:02&quot;,\n        &quot;modifyTime&quot;: &quot;2021-06-09 17:04:31&quot;,\n        &quot;status&quot;: 1,  //状态\n        &quot;userLevel&quot;: 1,   //年级\n        &quot;classes&quot;: &quot;1班&quot;,  //用户班级\n        &quot;imagePath&quot;: &quot;&quot;  //用户头像\n    }\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h4 id="修改用户信息-api-student-user-update"><a class="header-anchor" href="#修改用户信息-api-student-user-update">#</a> 修改用户信息 （/api/student/user/update）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;id&quot;: 1,\n    &quot;userUuid&quot;: &quot;d2d29da2-dcb3-4013-b874-727626236f47&quot;,\n    &quot;userName&quot;: &quot;student&quot;,  //用户名\n    &quot;realName&quot;: &quot;Test&quot;,  //真实姓名\n    &quot;age&quot;: 18,   //年龄\n    &quot;role&quot;: 1,   //角色\n    &quot;sex&quot;: 1,  //性别\n    &quot;birthDay&quot;: &quot;2019-09-01 00:00:00&quot;,  //生日\n    &quot;phone&quot;: &quot;158800882&quot;,  //手机号\n    &quot;lastActiveTime&quot;: &quot;&quot;,\n    &quot;createTime&quot;: &quot;2019-09-07 18:55:02&quot;,\n    &quot;modifyTime&quot;: &quot;2021-06-09 17:04:31&quot;,\n    &quot;status&quot;: 1,  //状态\n    &quot;userLevel&quot;: 1,   //年级\n    &quot;classes&quot;: &quot;1班&quot;,  //用户班级\n    &quot;imagePath&quot;: &quot;&quot;  //用户头像\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: null\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="消息列表-api-student-user-message-page"><a class="header-anchor" href="#消息列表-api-student-user-message-page">#</a> 消息列表 （/api/student/user/message/page）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;pageIndex&quot;: 1, //页码\n    &quot;pageSize&quot;: 10  //每页条数\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: {\n        &quot;total&quot;: 5,\n        &quot;list&quot;: [\n            {\n                &quot;id&quot;: 11,\n                &quot;title&quot;: &quot;rwerw&quot;,   //消息标题\n                &quot;messageId&quot;: 10,\n                &quot;content&quot;: &quot;sfsdf&quot;,  //消息内容\n                &quot;readed&quot;: true, //是否已读\n                &quot;createTime&quot;: &quot;2021-06-11 16:32:40&quot;,   //创建时间\n                &quot;sendUserName&quot;: &quot;admin&quot;  //发送人\n            }\n        ]\n    }\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h4 id="消息标记已读-api-student-user-message-read-14"><a class="header-anchor" href="#消息标记已读-api-student-user-message-read-14">#</a> 消息标记已读 （/api/student/user/message/read/14）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: null\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="登出-api-user-logout"><a class="header-anchor" href="#登出-api-user-logout">#</a> 登出 （/api/user/logout）</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    &quot;code&quot;: 1,\n    &quot;message&quot;: &quot;成功&quot;,\n    &quot;response&quot;: null\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>',45),u={render:function(n,s){return a}}}}]);