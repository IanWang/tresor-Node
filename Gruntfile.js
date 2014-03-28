var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    jshint: {
      files: [
        'app.js',
        'public/js/app/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /app\/templates\//
        },
        files: {
          'build/templates.js': 'app/templates/**/*.hbs'
        }
      }
    },
    // not ready yet!
    concat: {
      libs: {
        src: [
          'vendor/js/libs/jquery-2.0.3.min.js',
          'vendor/js/libs/createUsersInLocalStorage.js',
          'vendor/js/libs/handlebars-1.0.0.js',
          'vendor/js/libs/ember-1.1.2.js',
          'vendor/js/libs/ember-data-1.0.0-beta.3.js',
          'vendor/js/libs/localstorage_adapter.js',
          'vendor/js/libs/moment.min.js'
        ],
        dest: 'vendor/js/libs.js'
      },
      app: {
        src: 'vendor/js/app/**/*.js',
        dest: 'vendor/js/app.js'
      }
    },

    watch: {
      files: [
        'app.js',
        'public/js/**/*.js'
      ],
      emberTemplates: {
        files: 'app/templates/**/*.hbs',
        tasks: ['emberTemplates']
      }
    },

    bower: {
      install: {
        options: {
          copy: false,
          verbose: true
        }
      }
    }

    /*
    connect: {
      server: {
        options: {
          port: 3000,
          base: path.join(__dirname, '..')
        }
      }
    }
    */
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task(s).
  grunt.registerTask('default', ['emberTemplates', 'bower', 'watch']);
};
