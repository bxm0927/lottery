/*
 * 清空 server 中编译后的文件
 * @Author: baixiaoming
 * @Date: 2018-10-05 19:24:07
 * @Last Modified by: baixiaoming
 * @Last Modified time: 2018-10-05 21:12:30
 */

import gulp from 'gulp';
import del from "del"; // 删除文件

gulp.task('clean', (cb) => {

    return del(['server/public', 'server/views']);

})
