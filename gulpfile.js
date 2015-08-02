var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify');


gulp.task('lint', function() {
  gulp.src('./app/components/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/components/gridCtrl.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});