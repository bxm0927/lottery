/*
 * 定时器模块
 * @Author: baixiaoming
 * @Date: 2018-10-06 13:56:45
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-06 15:00:25
 */

class Timer {
    /**
     * 倒计时
     * @param {Date} endTime 截止时间
     * @param {Function} updateCb 倒计时更新回调
     * @param {Function} endCb 倒计时结束回调
     */
    countdown(endTime, updateCb, endCb) {
        const nowTime = new Date().getTime(); // 当前时间即开始时间
        const endTime = new Date(endTime); // 结束时间
        const self = this;

        if (nowTime > endTime) {
            endCb.call(self);
        } else {
            let diff = endTime - nowTime; // 时间差
            const dataArr = [];
            const px_d = 1000 * 60 * 60 * 24; // 一天的毫秒数
            const px_h = 1000 * 60 * 60; // 一小时的毫秒数
            const px_m = 1000 * 60; // 一分钟的毫秒数
            const px_s = 1000; // 一秒的毫秒数

            let d = Math.floor(diff / px_d);
            let h = Math.floor((diff - d * px_d) / px_h);
            let m = Math.floor((diff - d * px_d - h * px_h) / px_m);
            let s = Math.floor((diff - d * px_d - h * px_h - m * px_m) / px_s);

            if (d > 0) dataArr.push(`<em>${d}天</em>`)
            if (dataArr.length || h > 0) dataArr.push(`<em>${h}小时</em>`)
            if (dataArr.length || m > 0) dataArr.push(`<em>${m}分钟</em>`)
            if (dataArr.length || s > 0) dataArr.push(`<em>${s}秒</em>`)

            diff = dataArr.join('');
            updateCb.call(self, diff);

            // 轮询
            setTimeout(() => {
                countdown(endTime, updateCb, endCb)
            }, 1000);
        }
    }
}

export default Timer;
