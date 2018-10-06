/*
 * 计算模块
 * 文案：您选了15注，共30元，若中奖，奖金：6元至60元，您将盈利-24元至30元
 * @Author: baixiaoming
 * @Date: 2018-10-06 13:56:45
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-06 21:40:12
 */

class Calc {

    /**
     * 排列组合
     * @param {Array} arr 参与组合运算的数组，如：[01, 02, 03, 04]
     * @param {Number} size 组合运算的基数，如：3
     */
    static combine(arr, size) {
        let allResult = []; // 保存最后各种组合的结果

        (function f(arr, size, result) {
            let len = arr.length;

            if (len < size) return;
            if (len === size) {
                allResult.push([].concat(result, arr)); // [01, 02, 03]
            } else {
                // 不断增加新的数组
                for (let i = 0; i < len; i++) {
                    let newResult = [].concat(result); // 保存上次运行结果
                    newResult.push(arr[i]);

                    if (size === 1) {
                        allResult.push(newResult);
                    } else {
                        let newArr = [].concat(arr);
                        newArr.splice(0, i + 1); // 重点！截取数组片段
                        f(newArr, size - 1, newResult); // 递归
                    }
                }
            }
        })(arr, size, []); // result 初始为 []

        return allResult;
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

    /**
     * 计算奖金范围
     * @param  {Number} activeCount 当前选中的号码的个数
     * @param  {string} type   当前选中的玩法类型，如：r3(任三)
     * @return {array}        奖金范围 [min, max]
     */
    calcBonus(activeCount, type) {
        const self = this;
        let play = type.split(''); // 玩法，['r', '3']
        let arr = new Array(play[1] * 1).fill(0);
        let min, max;

        if (play[0] === 'r') {
            let min_active = activeCount - 6; // 最小命中数，如任8的最小命中数是2
            let max_active = Math.min(activeCount, 5); // 最大命中数

            if (min_active > 0) {
                if (min_active - play[1] >= 0) {
                    arr = new Array(min_active).fill(0);
                    min = Calc.combine(arr, play[1]).length;
                } else {
                    // 任 6 7 8
                    if (play[1] - 5 > 0 && activeCount - play[1] >= 0) {
                        arr = new Array(activeCount - 5).fill(0);
                        min = Calc.combine(arr, play[1] - 5).length;
                    } else {
                        min = activeCount - play[1] > -1 ? 1 : 0;
                    }
                }
            } else {
                min = activeCount - play[1] > -1 ? 1 : 0;
            }

            if (play[1] - 5 > 0) {
                if (activeCount - play[1] >= 0) {
                    arr = new Array(activeCount - 5).fill(0);
                    min = Calc.combine(arr, play[1] - 5).length;
                } else {
                    max = 0;
                }
            } else if (play[1] - 5 < 0) {
                arr = new Array(Math.min(activeCount, 5)).fill(0);
                max = Calc.combine(arr, play[1]).length;
            } else {
                max = 1;
            }
        }

        return [min, max].map((item) => {
            return item * self.palyList.get(type).bonus;
        });
    }

}

export default Calc;
