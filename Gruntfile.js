
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

		cssmin: {
			add_banner: {
				options: {
					banner: '<%= uglify.options.banner %>'
				},
				files: [{
					src: 'public/css/popup_window.css',
					dest: "public/build/css/popup_window.css"
				}, {
					src: 'public/css/user.css',
					dest: "public/build/css/user.css"
				}, { 
					src: 'public/css/window.css',
					dest: "public/build/css/window.css"
				}]
		 	}
		},

		clean: [
			"public/build/js/*.js",
			"public/build/css/popup_window.css",
			"public/build/css/user.css",
			"public/build/css/window.css",
		],

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
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['clean', 'uglify', 'cssmin']);

};

