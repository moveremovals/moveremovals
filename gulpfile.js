const gulp = require('gulp')
const handlebars = require('gulp-compile-handlebars')
const rename = require('gulp-rename')
const webp = require('gulp-webp')
const cleanCSS = require('gulp-clean-css');

const imgWebp = done =>
    gulp.src(['src/images/*.jpg', 'src/images/*.png'])
    .pipe(webp())
    .pipe(gulp.dest('dist/images'))
    .on('end', done)

const img = done =>
    gulp.src(['src/images/*.jpg', 'src/images/*.png'])
    .pipe(gulp.dest('dist/images'))
    .on('end', done)

const html = done =>
    gulp.src('src/*.hbs')
    .pipe(
            handlebars(
                {
                    siteName: 'Move Removals',
                    navItems: {
                        '/': 'About',
                        '/CommercialServices': 'Commercial Services',
                        '/CourierServices': 'Courier Services',
                        '/Quote': 'Get a Quote',
                        '/Contact': 'Contact Us',

                    }
                },
                {
                    batch: ['src/partials'],
                    helpers: {
                        if_eq: (a, b, opts) => a == b ? opts.fn(this) : opts.inverse(this)
                    }
                }
            )
        )
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('dist'))
    .on('end', done)

const css = done =>
    gulp.src('src/*.css')
    .pipe(cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`)
        console.log(`${details.name}: ${details.stats.minifiedSize}`)
    }))
    .pipe(gulp.dest('dist'))
    .on('end', done)

exports.build = gulp.parallel(html, css, img, imgWebp)