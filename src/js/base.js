/*
 * 彩票基本模块
 * @Author: baixiaoming
 * @Date: 2018-10-06 13:56:45
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-06 21:53:11
 */

import $ from "jquery";

class Base {
    /**
     * 玩法列表，初始化各玩法的说明
     * palyList 是一个 Map 数据结构，Map 支持级联操作
     * name: 玩法名称; bonus: 单住中奖奖金; tip: 文案
     */
    initPalyList() {
        this.palyList
            .set('r2', {
                name: '任二',
                bonus: 6,
                tip: '从01~11中任选两个或多个号码，所选中号码与开奖号码任意两个号码相同，即中奖<strong class="red">6</strong>元',
            })
            .set('r3', {
                name: '任三',
                bonus: 19,
                tip: '从01~11中任选三个或多个号码，所选中号码与开奖号码任意三个号码相同，即中奖<strong class="red">19</strong>元',
            })
            .set('r4', {
                name: '任四',
                bonus: 78,
                tip: '从01~11中任选四个或多个号码，所选中号码与开奖号码任意四个号码相同，即中奖<strong class="red">78</strong>元',
            })
            .set('r5', {
                name: '任五',
                bonus: 540,
                tip: '从01~11中任选五个或多个号码，所选中号码与开奖号码号码相同，即中奖<strong class="red">540</strong>元',
            })
            .set('r6', {
                name: '任六',
                bonus: 90,
                tip: '从01~11中任选六个或多个号码，所选中号码与开奖号码五个号码相同，即中奖<strong class="red">90</strong>元',
            })
            .set('r7', {
                name: '任七',
                bonus: 26,
                tip: '从01~11中任选七个或多个号码，所选中号码与开奖号码五个号码相同，即中奖<strong class="red">26</strong>元',
            })
            .set('r8', {
                name: '任八',
                bonus: 9,
                tip: '从01~11中任选八个或多个号码，所选中号码与开奖号码五个号码相同，即中奖<strong class="red">9</strong>元',
            });
    }

    /**
     * 初始化号码 1~11
     * number 是一个 Set 数据结构
     */
    initNumber() {
        for (let i = 0; i < 12; i++) {
            this.number.add(('' + i).padStart(2, '0'));
        }
    }

    /**
     * 设置遗漏数据
     * @param {Map} omit 遗漏数据的 Map 集合
     */
    setOmit(omit) {
        // 逻辑：先清空，再重新赋值
        let self = this;
        self.omit.clear();

        for (let [key, value] of omit.entries()) {
            self.omit.set(key, value);
        }

        // 反映到 DOM 上
        $(self.omit_el).each(function (index, el) {
            $(el).text(self.omit.get(key));
        });
    }

    /**
     * 设置开奖数据
     * @param {Map} openCode 开奖数据的 Set 集合
     */
    setOpenCode(code) {
        // 逻辑：先清空，再重新赋值
        let self = this;
        self.openCode.clear();

        for (let item of openCode.values()) {
            self.openCode.add(item);
        }

        // 调用接口
        if (self.updateOpenCode) {
            self.updateOpenCode.call(self, code);
        }
    }

    /**
     * 号码选中与取消
     */
    toggleCodeActive(e) {
        let $cur = $(e.currentTarget);
        $cur.toggleClass('btn-boll-active');

        this.getCount();
    }

    /**
     * 切换玩法
     */
    changePlayNav(e) {
        let $cur = $(e.currentTarget);
        $cur.addClass('active').siblings().removeClass('active'); // 选中的 active，没选中的去掉 active

        this.cur_play = $cur.attr('desc').toLocaleLowerCase(); // 获取玩法字符串，并转为小写
        $('#zx_sm span').html(this.palyList.get(this.cur_play).tip); // 更新 DOM
        $('.boll-list .btn-boll').removeClass('btn-boll-sctive'); // 切换玩法后要把上次选中的号码重置

        this.getCount();
    }

    /**
     * 操作区：全 大 小 奇 偶 清除
     */
    assistHandle(e) {
        e.preventDefault();
        let $cur = $(e.currentTarget);
        let index = $cur.index();

        // 清除
        $('.boll-list .btn-boll').removeClass('btn-boll-sctive');

        // 全选
        if (index === 0) {
            $('.boll-list .btn-boll').addClass('btn-boll-sctive');
        }

        // 大
        if (index === 1) {
            $('.boll-list .btn-boll').each(function (index, el) {
                if (el.textContent > 6) {
                    $(el).addClass('btn-boll-sctive');
                }
            });
        }

        // 小
        if (index === 2) {
            $('.boll-list .btn-boll').each(function (index, el) {
                if (el.textContent < 6) {
                    $(el).addClass('btn-boll-sctive');
                }
            });
        }

        // 奇
        if (index === 3) {
            $('.boll-list .btn-boll').each(function (index, el) {
                if (el.textContent % 2 === 1) {
                    $(el).addClass('btn-boll-sctive');
                }
            });
        }

        // 偶
        if (index === 4) {
            $('.boll-list .btn-boll').each(function (index, el) {
                if (el.textContent % 2 === 0) {
                    $(el).addClass('btn-boll-sctive');
                }
            });
        }

        this.getCount();
    }

    /**
     * 获取当前彩票的名称
     */
    getName() {
        return this.name;
    }

    /**
     * 添加号码到购物车
     */
    addCode() {
        // 拿到当前选中的号码
        let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
        let active = $active ? $active.length : 0;
        let count = this.calcCount(active, this.cur_play);

        if (count) {
            this.addCodeItem($active.join(' '), this.cur_play, this.palyList.get(this.cur_play).name, count);
        }
    }

    /**
    * 添加单次号码到购物车
    * @param {[type]} code     01 02 03 04 05
    * @param {[type]} type     r5
    * @param {[type]} typeName 任五
    * @param {[type]} count    1
    */
    addCodeItem(code, type, typeName, count) {
        const tpl = `
        <li codes="${type} | ${code}" bonus="${count * 2}" count="${count}">
            <div class="code">
                <b>${typeName}${count > 1 ? '复式' : '单式'}</b>
                <b class="em">${code}</b>
                [${count}注，<em class="code-list-money">${count * 2}</em>元]
            </div>
        </li>`;

        $(this.cart_el).append(tpl);

        this.getTotal(); // 计算购物车总金额
    }

    /**
     * 计算金额
     * 文案：您选了1注，共2元
     */
    getCount() {
        let active = $('.boll-list .btn-boll-active').length;
        let count = this.calcCount(active, this.cur_play); // 当前选中的注数
        let range = this.calcBonus(active, this.cur_play); // 计算奖金范围
        let money = count * 2;
        let win1 = range[0] - money; // 最小盈利
        let win2 = range[1] - money; // 最大盈利
        let c1 = (win1 < 0 && win2 < 0) ? Math.abs(win1) : win1;
        let c2 = (win1 < 0 && win2 < 0) ? Math.abs(win2) : win2;
        let tpl;

        if (count === 0) {
            tpl = `您选了<b class="red">${count}</b>注，共${count * 2}元`;
        } else if (range[0] === range[1]) {
            tpl = `
            您选了<b class="red">${count}</b>注，共${count * 2}元，
            <em>若中奖，奖金：<strong class="red">${range[0]}</strong>元，
            您将${win1 >= 0 ? '盈利' : '亏损'}
            <strong class="${win1 >= 0 ? 'red' : 'green'}">${Math.abs(win1)}</strong>元</em>`;
        } else {
            tpl = `
            您选了<b class="red">${count}</b>注，共${count * 2}元，
            <em>若中奖，奖金：<strong class="red">${range[0]}</strong>元至<strong class="red">${range[1]}</strong>元，
            您将${(win1 >= 0 && win2 >= 0) ? '盈利' : '亏损'}
            <strong class="${win2 >= 0 ? 'red' : 'green'}">${c1}</strong>元</em>至
            <strong class="${win2 >= 0 ? 'red' : 'green'}">${c2}</strong>元`;
        }

        $('.sel_info').html(tpl);
    }

    /**
     * 计算购物车总金额
     */
    getTotal() {
        let count = 0;
        $('.codelist li').each(function (index, el) {
            count += $(el).attr('count') * 1;
        });
        $('#count').text(count);
        $('#money').text(count * 2);
    }

    /**
     * 生成随机数，用于随机选号（机选）
     * @param  {number} num 随机数的个数
     */
    getRandom(num) {
        let arr = [];
        let index;
        let number = Array.from(this.number); // 将 Set 转为 Array

        while (num--) {
            index = Number.parseInt(Math.random() * number.length);
            arr.push(number[index]);
            number.splice(index, 1); // 移除已经push的数，保证每次号码不重复
        }
        return arr.join(' ');
    }

    /**
     * 随机选号（机选）
     */
    getRandomCode(e) {
        e.preventDefault();
        let num = e.currentTarget.getAttribute('count'); // 获取注数
        let type = this.cur_play.match(/\d+/g)[1]; // 获取玩法，如：3

        if (num === '0') {
            $(this.cart_el).html('');
        } else {
            for (let i = 0; i < num; i++) {
                this.addCodeItem(this.getRandom(type), this.cur_play, this.palyList.get(this.cur_play).name, 1);
            }
        }
    }

}

export default Base;
