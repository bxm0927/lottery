var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// 期号 issue、销售状态 state、截止时间 end_time
var makeIssue = function () {
    var date = new Date();
    var first_issue_date = new Date(); // 每天的第一期
    first_issue_date.setHours(9);
    first_issue_date.setMinutes(10);
    first_issue_date.setSeconds(0);
    var end_issue_date = new Date(first_issue_date.getTime() + 77 * 10 * 60 * 1000); // 每天的最后一期
    var cur_issue, end_time, state;

    // 正常销售
    if (date.getTime() - first_issue_date.getTime() > 0 && date.getTime() - end_issue_date.getTime() < 0) {
        // cur_issue_date 当前期号
        var cur_issue_date = new Date();
        cur_issue_date.setHours(9);
        cur_issue_date.setMinutes(0);
        cur_issue_date.setSeconds(0);

        var minus_time = date.getTime() - cur_issue_date.getTime();
        var h = Math.ceil(minus_time / 1000 / 60 / 10);
        var end_date = new Date(cur_issue_date.getTime() + 1000 * 60 * 10 * h);
        end_time = end_date.getTime();
        cur_issue = [end_date.getFullYear(), ('0' + (end_date.getMonth() + 1)).slice(-2), ('0' + end_date.getDate()).slice(-2), ('0' + h).slice(-2)].join('');
    } else {
        // 今天销售已截止
        first_issue_date.setDate(first_issue_date.getDate() + 1);
        end_time = first_issue_date.getTime();
        cur_issue = [first_issue_date.getFullYear(), ('0' + (first_issue_date.getMonth() + 1)).slice(-2), ('0' + first_issue_date.getDate()).slice(-2), '01'].join('');
    }

    var cur_date = new Date();
    if (end_time - cur_date.getTime() > 1000 * 60 * 2) {
        state = '正在销售';
    } else {
        state = '开奖中';
    }
    return {
        issue: cur_issue,
        state,
        end_time
    };
};

// 遗漏
router.get('/get/omit', function (req, res, next) {
    res.json(mockjs.mock({
        'data|11': [/[1-9]{1,3}|0/],
        'issue': /[1-9]{8}/
    }));
});

// 开奖号码
router.get('/get/opencode', function (req, res, next) {
    var issue = makeIssue().issue;
    var data = mockjs.mock({
        'data': [/[1-3]/, /[4-5]/, /[6-7]/, /[8-9]/, /1[0-1]/]
    }).data;
    res.json({
        issue: issue,
        data: data
    });
});

// 销售状态
router.get('/get/state', function (req, res, next) {
    var state = makeIssue();
    res.json(state);
});

module.exports = router;
