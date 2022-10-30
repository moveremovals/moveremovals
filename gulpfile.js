let gulp = require('gulp')
let watch = require('gulp-watch')
let batch = require('gulp-batch')
let handlebars = require('gulp-compile-handlebars')
let rename = require('gulp-rename')

gulp.task('build', () => {
    let templateData = {
        siteName: 'Move Removals'
    },
        options = {
            batch: ['./src/partials'],
        }

    return gulp.src('src/index.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'))
})

gulp.task(
    'watch',
    () => watch(
        'src/**/*',
        batch((events, done) => gulp.start('build', done))
    )
)