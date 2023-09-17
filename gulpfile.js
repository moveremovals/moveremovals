const gulp = require('gulp')
const handlebars = require('gulp-compile-handlebars')
const rename = require('gulp-rename')
const webp = require('gulp-webp')
const cleanCSS = require('gulp-clean-css');
const destDir = 'docs'

const imgWebp = done =>
    gulp.src(['src/images/*.jpg', 'src/images/*.png'])
    .pipe(webp())
    .pipe(gulp.dest(destDir + '/images'))
    .on('end', done)

const img = done =>
    gulp.src(['src/images/*.jpg', 'src/images/*.png', 'src/images/*.svg'])
    .pipe(gulp.dest(destDir + '/images'))
    .on('end', done)

const html = done =>
    gulp.src('src/*.hbs')
    .pipe(
            handlebars(
                {
                    version: Date.now(),
                    siteName: 'Move Removals',
                    loading: 'lazy',
                    phoneNumber: '07540894348',
                    email: 'enquiries@move-removals.co.uk',
                    navItems: {
                        '/': 'Home',
                        '/ResidentialMove': 'Residential Move',
                        '/CommercialMove': 'Commercial Move',
                        '/PackWrapDismantling': 'Pack&nbsp;/&nbsp;Wrap&nbsp;& Dismantling',
                        '/Storage' : 'Storage',
                        '/Quote': 'Online Quote',
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
    .pipe(gulp.dest(destDir))
    .on('end', done)

const css = done =>
    gulp.src('src/*.css')
    .pipe(cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`)
        console.log(`${details.name}: ${details.stats.minifiedSize}`)
    }))
    .pipe(gulp.dest(destDir))
    .on('end', done)

const scripts = done =>
    gulp.src(['src/scripts/*.js'])
    .pipe(gulp.dest(destDir + '/scripts'))

const watchHbs = done => gulp.watch(['src/*.hbs', 'src/**/*.hbs'], html)

const watchCss = done => gulp.watch(['src/*.css'], css)

const watchScripts = done => gulp.watch(['src/scripts/*.js'], scripts)

exports.build = gulp.parallel(html, css, img, imgWebp, scripts)

exports.watch = gulp.parallel(watchHbs, watchCss, watchScripts)