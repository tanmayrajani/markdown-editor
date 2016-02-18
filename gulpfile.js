var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs'),
	Server = require('karma').Server;

gulp.task('vet', function () {
	return gulp.src([
			'./etc/*.js',
			'./*.js'
		])
		.pipe(jscs())
		.pipe(jshint());
});

gulp.task('test', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js'
	}, done).start();
});