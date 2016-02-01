'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		htmlhint: {
			templates:{
				options:{
					'attr-lower-case':true,
					'attr-value-not-empty':true
				},
				src: ['./*.html','./etc/*.html']
			}
		}
	});

	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.registerTask('default',['htmlhint']);
}