//Подключаем модули gulp
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

const styleFiles = [
    './src/css/main.scss',
    './src/css/media.scss'
]

const jsFiles = [
    './src/js/lib.js',
    './src/js/main.js'
 ]

//Таск для обработки CSS
gulp.task('styles', () => {
    return gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('style.css'))
    //Добавить префиксы
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    //Минификация CSS
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(sourcemaps.write('./'))

    // Выходная папка для стилей
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

//Таск на скрипты JS
gulp.task('scripts', () => {
    return gulp.src(jsFiles)

    //Объединение файлов в один
    .pipe(concat('script.js'))
    //Минификация JS
    .pipe(uglify({
        toplevel: true
    }))
    // Выходная папка для скриптов
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

// Удалить всё в указанной папке
gulp.task('del', () => {
    return del(['build/*'])
});

gulp.task('img-compress', ()=> {
    return gulp.src('./src/img/**')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('./build/img/'))
});

//Просматривать файлы
gulp.task('watch', () => {
    browserSync.init({
       server: {
           baseDir: "./"
       }
   });
   //Следить за добавлением img
   gulp.watch('./src/img/**', gulp.series('img-compress'))
   //Следить за CSS файлами
   gulp.watch('./src/css/**/*.scss', gulp.series('styles'))
   //Следить за JS файлами
   gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
   //При изменении HTML запустить синхронизацию
   gulp.watch("./*.html").on('change', browserSync.reload);
});

//Таск по умолчанию, запуск del, styles, scripts и watch

gulp.task('default', gulp.series(gulp.parallel('styles', 'scripts', 'img-compress'), 'watch'));