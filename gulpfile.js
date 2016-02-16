var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('vet', function () {
	return gulp
		.src([
			'./etc/*.js',
			'./*.js'
		])
		.pipe(jscs())
		.pipe(jshint());
})