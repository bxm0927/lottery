/*
 * Gulp 默认任务，使用 `gulp` 命令运行该任务
 * 关联所有 tasks, 设置 gulp task 的顺序
 * @Author: baixiaoming
 * @Date: 2018-10-05 19:37:08
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-06 08:44:01
 */

import gulp from "gulp";
import gulpSequence from "gulp-sequence"; // 设置 gulp task 的顺序

// borwser 要在 server 之前执行
// server 一定要放在最后执行
gulp.task('default', gulpSequence('clean', 'styles', 'pages', 'scripts', ['browser', 'server']));
