var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var htmlmin = require('gulp-htmlmin');
var watch = require('gulp-watch');
var size = require('gulp-size');
var ngAnnotate = require('gulp-ng-annotate');
var cleanCSS = require('gulp-clean-css');
var paths = require('./gulp-config.json');
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('build_dep_css', function() {
   var stream = gulp.src(paths.dep_css)
      .pipe(size({
         showFiles: true
      }))
      .pipe(cleanCSS({
         keepSpecialComments: 0
      }))
      .pipe(concat('app.css'))
      .pipe(size({
         showFiles: true
      }))
      .pipe(gulp.dest('Client/public/css/'));
   return stream;
});
gulp.task('build_dep_js', function() {
   var stream = gulp.src(paths.dep_js)
      .pipe(size({
         showFiles: true
      }))
      .pipe(ngAnnotate())
      .pipe(uglify({
      }).on('error', function(err) {
         console.log(err);
      }))
      .pipe(concat('app.js'))
      .pipe(size({
         showFiles: true
      }))
      .pipe(gulp.dest('Client/public/js/'));
   return stream;
});
gulp.task('build', [
    'build_dep_css',
    'build_dep_js'
  ], function() {});

gulp.task('watch', function(){
    gulp.watch('resources/local/js/controllers/*.*', ['build']);
    gulp.watch('resources/local/js/*.*', ['build']);
    gulp.watch('resources/local/css/*.*', ['build']);

});
