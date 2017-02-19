var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var htmlmin = require('gulp-htmlmin');
var watch = require('gulp-watch');
var size = require('gulp-size');
var ngAnnotate = require('gulp-ng-annotate');
var cleanCSS = require('gulp-clean-css');
var dep = require('./gulp_config_dep.json');
var app = require('./gulp_config_app.json');
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('build_dep_css', function() {
    var stream = gulp.src(dep.dep_css)
        .pipe(size({
            showFiles: true
        }))
        .pipe(cleanCSS({
            keepSpecialComments: 0
        }))
        .pipe(concat('dep.css'))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest('Client/public/css/'));
    return stream;
});
gulp.task('build_app_css', function() {
    var stream = gulp.src(app.app_css)
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
    var stream = gulp.src(dep.dep_js)
        .pipe(size({
            showFiles: true
        }))
        .pipe(ngAnnotate())
        .pipe(uglify({}).on('error', function(err) {
            console.log(err);
        }))
        .pipe(concat('dep.js'))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest('Client/public/js/'));
    return stream;
});
gulp.task('build_app_js', function() {
    var stream = gulp.src(app.app_js)
        .pipe(size({
            showFiles: true
        }))
        .pipe(ngAnnotate())
        .pipe(uglify({}).on('error', function(err) {
            console.log(err);
        }))
        .pipe(concat('app.js'))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest('Client/public/js/'));
    return stream;
});
gulp.task('build_dep', [
    'build_dep_css',
    'build_dep_js'
], function() {});
gulp.task('build_app', [
    'build_app_css',
    'build_app_js'
], function() {});
gulp.task('watch', function() {
    gulp.watch('resources/local/js/controllers/*.*', ['build_app']);
    gulp.watch('resources/local/js/*.*', ['build_app']);
    gulp.watch('resources/local/css/*.*', ['build_app']);

});
