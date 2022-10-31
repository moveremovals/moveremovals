const gulp = require('gulp')
const handlebars = require('gulp-compile-handlebars')
const rename = require('gulp-rename')
const webp = require('gulp-webp');

const imgWebp = done =>
    gulp.src(['/var/www/html/src/images/*.jpg'])
    .pipe(webp())
    .pipe(gulp.dest('/var/www/html/dist/images'))
    .on('end', done)

const img = done =>
    gulp.src(['/var/www/html/src/images/*.jpg'])
    .pipe(gulp.dest('/var/www/html/dist/images'))
    .on('end', done)

const html = done =>
    gulp.src('/var/www/html/src/*.hbs')
    .pipe(
            handlebars(
                {
                    siteName: 'Move Removals'
                },
                {
                    batch: ['/var/www/html/src/partials'],
                }
            )
        )
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('/var/www/html/dist'))
    .on('end', done)

exports.build = gulp.parallel(html, img, imgWebp)