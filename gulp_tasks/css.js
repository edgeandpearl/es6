/**
 * cssLibs
 */

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {
    return function () {
        return combiner(
            gulp.src(options.src, { sinde: gulp.lastRun('cssLibs') }),
            $.concat('libs.css'),
            $.csso(),
            gulp.dest(options.dest)
        );
    }
};