const gulp = require('gulp')
const gulpIf = require('gulp-if')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

let buildPhase = true

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('build/js/'))
    .pipe(gulpIf(!buildPhase, browserSync.stream()))
})

gulp.task('sass', function () {
  return gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/susy/sass']
    }))
    .pipe(postcss([ precss, autoprefixer ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css/'))
    .pipe(gulpIf(!buildPhase, browserSync.stream()))
})

gulp.task('static', function () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(gulpIf(!buildPhase, browserSync.stream()))
})

gulp.task('build', ['js', 'sass', 'static'], function () {
  buildPhase = false
})

// Static server
gulp.task('serve', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  })

  gulp.watch('src/js/*.js', ['js'])
  gulp.watch('src/sass/**/*', ['sass'])
  gulp.watch('src/index.html', ['static'])
})
