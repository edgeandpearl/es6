/**
 * Минимизация изображений
 */

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {
    return function () {
        return combiner(
            gulp.src(options.src),
            $.remember(options.dest),
            $.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}]
            }),
            gulp.dest(options.dest)
        ).on('error', $.notify.onError());
    };
};