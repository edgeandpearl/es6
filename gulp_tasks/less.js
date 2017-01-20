/**
 * LESS
 */

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {
    return function () {
        return combiner(
            gulp.src(options.src, {since: gulp.lastRun('less')}),
            $.less(),
            $.if(global.isDevelopment, $.sourcemaps.init()),
            $.autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                ],
                flexbox: true
            }),
            $.csso(),
            $.if(global.isDevelopment, $.sourcemaps.write()),
            gulp.dest(options.dest)
        ).on('error', $.notify.onError());
    }
};