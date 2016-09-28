/**
 * Created by danial on 9/6/16.
 */
var gulp = require("gulp");
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsFiles = 'Client/public/local/js/*.js';
var    jsDest = '.';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(uglify('script.js'))
        .pipe(gulp.dest(jsDest));
});