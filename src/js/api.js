/*
 * 接口模块
 * @Author: baixiaoming
 * @Date: 2018-10-06 13:56:45
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-06 21:16:53
 */

import $ from 'jquery'; // 使用 jquery-ajax，后期可以改为 axios

class API {

    // 期号

    // 倒计时截止日期

    // 销售状态
    getState(issue) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "/get/state",
                data: {
                    issue
                },
                dataType: "json",
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
    }

    /**
     * 获取开奖号码
     * @param {String} issue 当前期号
     */
    getOpenCode(issue) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "/get/opencode",
                data: {
                    issue
                },
                dataType: "json",
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
    }

    /**
     * 获取遗漏号码数据
     * 业务知识：这个号码有多少期没有开出了
     * @param {String} issue 当前期号
     */
    getOmit(issue) {
        let self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "/get/omit",
                data: {
                    issue
                },
                dataType: "json",
                success(response) {
                    self.setOmit.call(response.data); // 设置遗漏号码数据
                    resolve.call(self, response);
                },
                error(err) {
                    reject.call(err);
                }
            });
        });
    }

}


export default API;
