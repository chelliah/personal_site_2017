"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var liveReload = require('gulp-livereload');

liveReload({start: true})


gulp.task('reload', function(){
  gulp.src('index.html')
      .pipe(liveReload());
})
//compile sass files
gulp.task('styles', function(){
    gulp.src('styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles/'))
        .pipe(liveReload());
});

gulp.task('watch', function(){
    liveReload.listen();
    gulp.watch('styles/**/*.scss', ['styles', 'reload']);
});


gulp.task('default', ['styles', 'reload']);
