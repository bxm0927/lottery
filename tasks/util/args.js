/*
 * 识别命令行参数的 gulp 构建脚本
 * @Author: baixiaoming
 * @Date: 2018-09-30 10:08:55
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-05 21:34:28
 */

import yargs from "yargs"; // 识别命令行参数

const args = yargs

    .option('production', {
        boolean: true,
        default: false,
        describe: '区分开发环境和生产环境'
    })

    // gulp --watch
    // 监听文件改动
    .option('watch', {
        boolean: true,
        default: false,
        describe: '监听文件改动'
    })


    .option('verbose', {
        boolean: true,
        default: false,
        describe: '显示命令行详细日志'

    })

    .option('sourcemaps', {
        describe: '启动 sourcemap'
    })

    .option('port', {
        string: true,
        default: 8080,
        describe: '服务器端口'
    })

    .argv

export default args;
