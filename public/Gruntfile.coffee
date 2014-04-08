module.exports = (grunt) ->

  config = {}

  config.clean =
    development: [
      'js/build/**/*.js'
    ]

  config.coffee =
    options:
      bare: true
    development:
      files:
        'js/build/app.js': 'js/app/**/*.coffee'

  config.emberTemplates =
    development:
      options:
        templateBasePath: 'js/app/templates'
      files:
        'js/build/templates.js': 'js/app/templates/**/*.hbs'

  config.connect =
    development:
      options:
        port: 3000
        base: __dirname

  config.watch =
    options:
      livereload: true
    hypertext:
      files: 'index.html'
    coffeescript:
      files: 'js/app/**/*.coffee'
      tasks: ['coffee']

  grunt.initConfig config

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-ember-templates'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', 'clean,coffee,emberTemplates,connect,watch'.split ','
