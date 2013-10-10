module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/shims/*.js', 'js/head/*.js'],
        dest: 'js/head.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd/mm/yyyy") %> */\n'
      },
      dist: {
        files: {
          'js/head-min.js': ['js/head.js']
        }
      }
    },
    cssmin: {
    compress: {
      files: {
        "css/core-min.css": ["css/core.css"]
      }
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('minify', ['concat', 'uglify', 'cssmin']);

};