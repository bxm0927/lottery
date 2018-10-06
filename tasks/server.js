/*
 * 处理服务器的 gulp 构建脚本
 * @Author: baixiaoming
 * @Date: 2018-10-05 19:01:25
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-05 19:14:44
 */

import gulp from 'gulp';
import gulpLiveServer from "gulp-live-server"; // 启动服务器
import args from "./util/args";

gulp.task('server', (cb) => {

    if (!args.watch) return cb();

    // 启动服务器
    var server = gulpLiveServer.new(['--harmony', 'server/bin/www']);
    server.start();

    // 浏览器热更新
    gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], (file) => {
        server.notify.apply(server, [file]); // 通知服务器
    });

    // 服务器热更新
    gulp.watch(['server/routes/**/*.js', 'server/app.js'], (file) => {
        server.start.bind(server)(); // 重启服务器
    });

})
