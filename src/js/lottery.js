/*
 * 入口文件
 * @Author: baixiaoming
 * @Date: 2018-10-06 14:02:55
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-06 21:26:29
 */

import 'babel-polyfill';
import $ from "jquery";
import _ from "lodash";

import Base from './base';
import Api from './api';
import Calc from './calc';
import Timer from './timer';

/**
 * 深拷贝
 */
const copyProperties = function (target, source) {
    // Reflect.ownKeys()方法返回target对象自己的属性键的数组。
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            // 获取指定对象的自身属性描述符
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
};

/**
 * 类的多重继承
 */
const mix = function (...rest) {
    class Mix { }
    for (let item of rest) {
        copyProperties(Mix, item);
        copyProperties(Mix.prototype, item.prototype);
    }
    return Mix;
};

class Lottery extends mix(Base, Api, Calc, Timer) {
    // name 用于标识彩种
    // cname 彩种名称
    // issue 期号
    // state 销售状态
    constructor(name = 'syy', cname = '11选5', issue = '**', state = '**') {
        super();
        this.name = name;
        this.cname = cname;
        this.issue = issue;
        this.state = state;

        this.omit = new Map(); // 遗漏
        this.palyList = new Map(); // 玩法列表
        this.number = new Set(); // 初始化1~11号码
        this.open_code = new Set(); // 开奖号码
        this.open_code_list = new Map();
        this.el = '';
        this.issue_el = '#curr_issue'; // 期号选择器
        this.state_el = '.state_el'; // 状态选择器
        this.countdown_el = '#countdown'; // 倒计时选择器
        this.cart_el = '.codelist'; // 购物车选择器
        this.omit_el = ''; // 遗漏选择器
        this.cur_play = 'r5'; // 当前玩法选择器

        this.initPalyList(); // 初始化各玩法的说明
        this.initNumber(); // 初始化1~11号码

        this.updateState(); // 各种更新
        this.initEvent(); // 初始化事件
    }

    /**
     * 各种更新
     */
    updateState() {
        let self = this;
        this.getState().then(function (res) {
            self.issue = res.issue;
            self.end_time = res.end_time;
            self.state = res.state;

            // 更新当前期号
            $(self.issue_el).text(res.issue);

            // 更新倒计时
            self.countDown(res.end_time, function (time) {
                $(self.countdown_el).text(time);
            }, function () {
                setTimeout(function () {
                    self.updateState();
                    self.getOmit(this.issue).then(function (res) {
                        // body...
                    });
                    self.getOpenNumber(this.issue).then(function (res) {
                        // body...
                    });
                }, 500);
            });
        });
    }

    /**
     * 初始化事件
     */
    initEvent() {
        $('#plays').on('click', 'li', this.changePlayNav.bind(this)); // 玩法切换
        $('.boll-list').on('click', '.btn-boll', this.toggleCodeActive.bind(this)); // 号码的选中
        $('#confirm_sel_code').on('click', this.addCode.bind(this)); // 添加号码
        $('.dxjo').on('click', 'li', this.assistHandle.bind(this)); // 清空
        $('.qkmethod').on('click', '.btn-middle', this.getRandomCode.bind(this)); // 随机号码
    }
}

export default Lottery;
