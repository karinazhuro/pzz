// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const browserSync = require('browser-sync');
//
// gulp.task('sass', function () { // Создаем таск "scss"
//     return gulp.src('app/scss/**/*.scss') // Берем источник
//         .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-scss
//         .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
//         .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
// });
//
// gulp.task('browser-sync', function () { // Создаем таск browser-sync
//     browserSync({ // Выполняем browser Sync
//         server: { // Определяем параметры сервера
//             baseDir: 'app' // Директория для сервера - app
//         },
//         notify: false // Отключаем уведомления
//     });
// });
//
// gulp.task('watch', function () {
//     gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
// });
//
// gulp.task('default', gulp.parallel('sass',   'browser-sync', 'watch'));

const gulp = require("gulp");
const scss = require("gulp-sass");
const browserSync = require("browser-sync");

gulp.task('compile', function(){
    return gulp.src("app/scss/**/*.scss")
        .pipe(scss())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task("watch", function(done) {
    browserSync.init({
        server:'app/'
    });

    gulp.watch("app/scss/**/*.scss", gulp.series('compile'));
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('compile', 'watch'));