const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

gulp.task('sass', function () { // Создаем таск "sass"
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', function () {
    gulp.watch('app/sass/**/*.scss', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));