/**
 * 实例：使用 Decorator 函数实现前端日志埋点
 * @param {*} target 修改的类
 * @param {*} name 修改的类的属性
 * @param {*} descriptor 该属性的描述对象
 */
let logBurying = (type) => {
    return (target, name, descriptor) => {
        let originMethod = descriptor.value; // 原始函数体

        descriptor.value = (...args) => {
            originMethod.apply(target, args);
            console.info(`logBurying ${type}`); // 模拟埋点
        }
    }
}

class AD {
    @logBurying("show")
    show() {
        console.log("show");
    }

    @logBurying("click")
    click() {
        console.log("click");
    }
}

let t = new AD();

t.show(); // show, logBurying show
t.click(); // click, logBurying click
