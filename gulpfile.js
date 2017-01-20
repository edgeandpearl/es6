const gulp = require('gulp');
const remember = require('gulp-remember');
const path = require('path');
// const browserify = require("browserify");
// const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();


/**
 * определяет тсип сборки
 * нужно передать параметр NODE_ENV (прописан в package.json)
 * @type {boolean}
 */
global.isDevelopment = process.env.NODE_ENV == 'development' || !process.env.NODE_ENV;
/**
 * функция загрузки тасков
 * @param taskName {string} название таска
 * @param path {string} путь к таску
 * @param options {object} настройки сборки
 */
function lazyRequireTasks(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, (callback) => {
        let task = require(path).call(this, options);
        return task(callback);
    });
}

const paths = {
    js: {
        src: ['./js/classes/site.js', './js/classes/main_page.js'],
        dest: './js/'
    },
    libsJS: {
        src: ['./js/libs/jquery.js','./js/libs/**/*.js'],
        dest: './js/'
    },
    less: {
        src: ['./css/*.less', '!./css/mixins.less', '!./css/reset.less'],
        dest: './css/'
    },

    cssLibs: {
        src: ['./js/libs/*.css', '!js/libs.js'],
        dest: './js/libs/'
    },
    img: {
        src: ['./images/**/*.{svg,png,jpg,jpeg}'],
        dest: './images/'
    },
    exclude: ['!node_modules/**/*.*', '!gulpfile.js', '!gulp_tasks/**/*.*', '!**/*.css']
};

//TODO: _? ускорить сборку картинок(проверка дерикторий remember)
//TODO: _? дописать спрайт

/**
 * LESS
 */
lazyRequireTasks('less', './gulp_tasks/less.js', {
    src: paths.less.src,
    dest: paths.less.dest
});
/**
 * сборка css библиотек
 */
lazyRequireTasks('cssLibs', './gulp_tasks/css.js', {
    src: paths.cssLibs.src,
    dest: paths.cssLibs.dest
});
/**
 * сборка JS
 */
lazyRequireTasks('js', './gulp_tasks/js.js', {
    src: paths.js.src,
    dest: paths.js.dest,
    libs: false
});
/**
 * сборка библиотек
 */
lazyRequireTasks('jsLibs', './gulp_tasks/js.js', {
    src: paths.libsJS.src,
    dest: paths.libsJS.dest,
    libs: true
});
/**
 * минификация изображений
 * IMAGES
 */
lazyRequireTasks('imagemin', './gulp_tasks/imagemin.js', {
    src: paths.img.src,
    dest: paths.img.dest
});
/**
 * удаление папки
 */
lazyRequireTasks('clean', './gulp_tasks/clean.js', {
    path: './build/'
});
/**
 * копирование
 */
gulp.task('copy', () => {
    return gulp.src('', {since: gulp.lastRun('copy')})
        .pipe(gulp.dest(''))
});

//TODO: live reload
if(global.isDevelopment) {
    gulp.task('server', function () {
        browserSync.init({
            server: './'
        });

        browserSync.watch(['./css/*.css', './js/script.min.js']).on('change', browserSync.reload);
        browserSync.stream();
    });
}

/**
 * сборка проекта
 */
gulp.task('build', gulp.parallel('less', 'cssLibs', 'js', 'jsLibs', 'imagemin'));
/**
 * отслеживание изменения в файлах
 */
gulp.task('watch', () => {
    gulp.watch(paths.js.src, gulp.series(['js']))
        .on('unlink', function (filepath) {
            remember.forget('js', path.resolve(filepath));
        });
    gulp.watch(paths.libsJS.src, gulp.series(['jsLibs']));
    gulp.watch(paths.less.src, gulp.series(['less']));
});

/**
 * запуск gulp
 */
if(global.isDevelopment) {
    gulp.task('default', gulp.series(['build', gulp.parallel('watch', 'server')]));
} else {
    gulp.task('default', gulp.series(['build']));
}