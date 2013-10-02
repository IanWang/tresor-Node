
module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
						    '<%= grunt.template.today("yyyy-mm-dd") %> */',
				mangle: {
					except: ['bootstrap']
				}
			},
			main: {
				files: [{
					src: 'public/js/create.js',
					dest: "public/build/js/create.js"
				}, {
					src: 'public/js/product.js',
					dest: "public/build/js/product.js"
				}, {
					src: 'public/js/window.js',
					dest: "public/build/js/window.js"
				}, {
					src: 'public/js/user.js',
					dest: "public/build/js/user.js"
				}]
			}
		},

		clean: ["public/build/js/*.js"],

		watch: {
			files: [
				'app.js', 
				'Gruntfile.js', 
 				'public/js/**/*.js'
			],
			tasks: (function() {
				var tasks = ['clean', 'uglify'];
				return tasks;
			})()
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['clean', 'uglify']);

};

