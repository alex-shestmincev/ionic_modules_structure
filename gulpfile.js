var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var debug = require('gulp-debug');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var remember = require('gulp-remember');
var cached = require('gulp-cached');
var gulpIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');

var bower = require('bower');
var sh = require('shelljs');
var del = require('del');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
var isProduction = process.env.NODE_ENV === 'production';


var paths = {
  sass: ['./src/app/**/*.scss'],
  js: ['./src/app/**/*.js'],
  html: ['./src/app/**/*.tpl.html'],
};

var buildPath = './www/build';
var buildHtmlPath = './www/build/html';

gulp.task('build', function(callback) {
  runSequence('build-clean', 'sass-ionic',
    ['sass', 'js', 'html'],
    callback);
});
gulp.task('serve', function(callback) {
  runSequence('build-clean', 'sass-ionic',
    ['sass', 'js', 'html'],
    'watch',
    callback);
});

gulp.task('build-clean', function() {
  return del(buildPath + '/*');
});

gulp.task('sass-ionic', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(cached('sass'))
    .pipe(debug())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(remember('sass'))
    .pipe(concat('build.css'))
    .pipe(gulp.dest(buildPath));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(cached('js'))
    .pipe(debug())
    .pipe(remember('js'))
    .pipe(concat('build.js'))
    .pipe(gulp.dest(buildPath));
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(buildHtmlPath));
});


gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
