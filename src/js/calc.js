/*
 * 计算模块
 * 文案：您选了15注，共30元，若中奖，奖金：6元至60元，您将盈利-24元至30元
 * @Author: baixiaoming
 * @Date: 2018-10-06 13:56:45
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-06 15:42:47
 */

class Calc {

    /**
     * 排列组合
     * @param {Array} arr 参与组合运算的数组
     * @param {Number} size 组合运算的基数
     */
    static combine(arr, size) {
        let allResult = [];

        (function f(arr, size, result) {
            let len = arr.length;

            if (len < size) return;

            if (len === size) {
                allResult.push([].concat(result, arr))
            } else {
                for (let i = 0; i < len; i++) {
                }
            }
        })(arr, size, []);
    }

    /**
     * 计算注数
     * @param {Number} activeCount 选中号码的个数
     * @param {String} palyType  玩法 R2 - R8
     */
    calcCount(activeCount, palyType) {
        let count = 0; // 默认注数为 0
        const exist = this.palyList.has(palyType); // 判断当前玩法是否在玩法列表中
        const arr = new Array(activeCount).fill('0');

        // 排列组合
        if (exist && palyType.at(0) === 'r') {
            count = Calc.combine(arr, palyType.at(1))
        }

        return count;
    }

    // 计算金额

    // 计算奖金范围

}

export default Calc;
