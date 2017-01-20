/**
 * JS
 */

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;
const eslint = require('gulp-eslint');



module.exports = function (options) {
    if (options.libs) {
        return function () {
            return (combiner(
                gulp.src(options.src),
                $.concat('libs.js'),
                gulp.dest(options.dest)
            ).on('error', $.notify.onError()));
        }
    } else {
        return function () {
            return (combiner(
                gulp.src(options.src, {since: gulp.lastRun('js')}),
                eslint({
                    globals: ['jQuery', '$', 'window', 'console', 'Site', 'Product']
                }),
                eslint.format(),
                eslint.failAfterError(),
                $.babel({
                    presets: ['es2015']
                }),
                $.if(global.isDevelopment, $.sourcemaps.init()),
                $.remember('js'),
                $.concat('script.min.js'),
                $.if(!global.isDevelopment, $.uglify()),
                $.if(global.isDevelopment, $.sourcemaps.write()),
                gulp.dest(options.dest)
            ).on('error', $.notify.onError()));
        }
    }
};