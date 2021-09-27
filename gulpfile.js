var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

function css_style(done) {

    gulp.src('./sass/**/*.sass') //выбираем файл который выбираем
        .pipe(sourcemaps.init()) //включаем читабельность кода
        .pipe(sass({
            errorLogToConsole: true, //поиск ошибок
            outputStyle: 'compressed' //минификация
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'], //адаптация под браузеры
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./')) // './' означает что выбираем туже самую дерикторию
        .pipe(gulp.dest('./css/')) //место сохранения нового файла
        .pipe(browserSync.stream());

    done();
}

function sync(done) {
    browserSync.init({ // init запуск
        server: {
            baseDir: "./" //директория для отслеживания
        },
        port: 7777
    })
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}

gulp.task('babel', () =>
    gulp.src('src/app.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
);

function watchTask() {
    gulp.watch("./sass/**/*", css_style); // означает, /** все папки и /* все файлы
    gulp.watch("./**/*.html", browserReload);
    gulp.watch("./**/*.php", browserReload);
    gulp.watch("./**/*.js", browserReload);
    gulp.watch(`src/app.js`, gulp.series('babel'));
}

gulp.task('default', gulp.parallel(sync, watchTask));