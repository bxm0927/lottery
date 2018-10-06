/*
 * 处理 ejs 模版文件的 gulp 构建脚本
 * @Author: baixiaoming
 * @Date: 2018-10-05 18:03:36
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-05 18:57:16
 */

import gulp from "gulp";
import gulpIf from "gulp-if";
import gulpLivereload from "gulp-livereload";
import args from "./util/args";

gulp.task('pages', () => {

    return gulp.src('src/**/*.ejs')

        // 把文件原封不动的拷贝到 serve
        .pipe(gulp.dest('server'))

        // 热更新
        .pipe(gulpIf(args.watch, gulpLivereload()))

})
