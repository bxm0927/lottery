/*
 * 定时器模块
 * @Author: baixiaoming
 * @Date: 2018-10-06 13:56:45
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-06 21:34:31
 */

class Timer {
    /**
     * 倒计时
     * @param {Date} endTime 截止时间
     * @param {Function} updateCb 倒计时更新回调
     * @param {Function} endCb 倒计时结束回调
     */
    // countdown(endTime, updateCb, endCb) {
    //     const nowTime = new Date().getTime(); // 当前时间即开始时间
    //     endTime = new Date(endTime); // 结束时间

    //     if (nowTime > endTime) {
    //         endCb.call(this);
    //     } else {
    //         let diff = endTime - nowTime; // 时间差
    //         const dataArr = [];
    //         const px_d = 1000 * 60 * 60 * 24; // 一天的毫秒数
    //         const px_h = 1000 * 60 * 60; // 一小时的毫秒数
    //         const px_m = 1000 * 60; // 一分钟的毫秒数
    //         const px_s = 1000; // 一秒的毫秒数

    //         let d = Math.floor(diff / px_d);
    //         let h = Math.floor((diff - d * px_d) / px_h);
    //         let m = Math.floor((diff - d * px_d - h * px_h) / px_m);
    //         let s = Math.floor((diff - d * px_d - h * px_h - m * px_m) / px_s);

    //         if (d > 0) dataArr.push(`<em>${d}天</em>`)
    //         if (dataArr.length || h > 0) dataArr.push(`<em>${h}小时</em>`)
    //         if (dataArr.length || m > 0) dataArr.push(`<em>${m}分钟</em>`)
    //         if (dataArr.length || s > 0) dataArr.push(`<em>${s}秒</em>`)

    //         diff = dataArr.join('');
    //         updateCb.call(this, diff);

    //         // 轮询
    //         setTimeout(() => {
    //             countdown(endTime, updateCb, endCb)
    //         }, 1000);
    //     }
    // }
    countDown(end, update, handle) {
        // now 1498917683022
        // end 1498917826710
        const now = new Date().getTime();
        const self = this;

        if (now - end > 0) {
            handle.call(self);
        } else {
            let last_time = end - now; // 剩余时间

            const d_to_ms = 24 * 60 * 60 * 1000;
            const h_to_ms = 60 * 60 * 1000;
            const m_to_ms = 60 * 1000;
            const s_to_ms = 1000;

            let d = Math.floor(last_time / d_to_ms);
            let h = Math.floor((last_time - d * d_to_ms) / h_to_ms);
            let m = Math.floor((last_time - d * d_to_ms - h * h_to_ms) / m_to_ms);
            let s = Math.floor((last_time - d * d_to_ms - h * h_to_ms - m * m_to_ms) / s_to_ms);

            let arr = [];
            if (d > 0) arr.push(`${d}天`);
            if (h > 0 || arr.length > 0) arr.push(`${h}小时`);
            if (m > 0 || arr.length > 0) arr.push(`${m}分钟`);
            if (s > 0 || arr.length > 0) arr.push(`${s}秒`);

            self.last_time = arr.join('');
            update.call(self, arr.join(''));

            setTimeout(function () {
                self.countDown(end, update, handle);
            }, 1000);
        }
    }
}

export default Timer;
