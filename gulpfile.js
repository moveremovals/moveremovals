const gulp = require('gulp')
const handlebars = require('gulp-compile-handlebars')
const rename = require('gulp-rename')
const webp = require('gulp-webp')
const cleanCSS = require('gulp-clean-css');

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
                    helpers: {
                        if_eq: (a, b, opts) => a == b ? opts.fn(this) : opts.inverse(this)
                    }
                }
            )
        )
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('/var/www/html/dist'))
    .on('end', done)

const css = done =>
    gulp.src('/var/www/html/src/*.css')
    .pipe(cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`)
        console.log(`${details.name}: ${details.stats.minifiedSize}`)
    }))
    .pipe(gulp.dest('/var/www/html/dist'))
    .on('end', done)

exports.build = gulp.parallel(html, css, img, imgWebp)