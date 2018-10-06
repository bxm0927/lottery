class Test {
    constructor() {
        this.msg = 'hello world'
    }
}

let test = new Test();

document.body.innerHTML = test.msg;
