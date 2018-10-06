/*
 * 文件监听，浏览器热更新
 * @Author: baixiaoming
 * @Date: 2018-10-05 19:13:38
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-05 19:27:00
 */

import gulp from 'gulp';
import args from "./util/args";

gulp.task('browser', (cb) => {

    if (!args.watch) return cb();

    gulp.watch('src/**/*.js', ['scripts']); // 监听 js 文件，热更新
    gulp.watch('src/**/*.ejs', ['pages']); // 监听 ejs 文件，热更新
    gulp.watch('src/**/*.css', ['styles']); // 监听 css 文件，热更新

})
