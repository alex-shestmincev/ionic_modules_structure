var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var del = require('del');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./src/app/**/*.js'],
  html: ['./src/app/**/*.tpl.html'],
};

var buildPath = './www/build';
var buildHtmlPath = './www/build/html';

gulp.task('default', ['sass']);
gulp.task('serve', function(callback) {
  runSequence('build-clean',
    ['sass', 'js', 'html'],
    'watch',
    callback);
});

gulp.task('build-clean', function() {
  return del(buildPath + '/*');
});

gulp.task('sass', function(done) {
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
    .pipe(concat('build.js'))
    .pipe(gulp.dest(buildPath));
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(buildHtmlPath));
});


gulp.task('js-prod', function() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('build.js'))
    .pipe(gulp.dest(buildPath));
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
