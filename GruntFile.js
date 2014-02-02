module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      /* compile all files and modules we want to roll up into our head.js file here */
      head: {
        src: ['js/shims/*.js', 'js/head/*.js'],
        dest: 'js/head.js'
      },

      /* compile all files and modules we want to roll up into our site.js file here */
      site: {
        src: [
          'js/vendor/require.js',
          'js/require/require-config.js',

          'js/vendor/fastclick.js',
          'js/vendor/lodash.custom.js',

          'js/require/callfn.js',
          'js/core.js'
        ],
        dest:'js/site.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd/mm/yyyy") %> */\n'
      },
      head: {
        files: {
          'js/head-min.js': ['js/head.js']
        }
      },
      site: {
        files:{
          'js/site-min.js': ['js/site.js']
        }
      }
    },
    less: {
      development: {
        paths: ['css/less'],
        files: {
          "css/core.css": ["css/less/core.less"]
        }
      }
    },
    cssmin: {
    compress: {
      files: {
        "css/core-min.css": ["css/core.css"]
      }
    }
  },

  'lodash': {
  'target': {
    // output location
    'dest': 'js/vendor/lodash.custom.js'
  },
  'options': {
    'exports': ['amd'],
    'include': ['each', 'extend', 'difference']
    }
  },

 match_media: {
    mobile: {
      options: {
        width: '1280px'   
      },
      files: {
        'css/ie8.css': ['css/core.css']
      }
    }
  },

  watch: {
    scripts: {
      files: ['js/head/*.js', 'js/shims/*.js', 'js/modules/*.js', 'js/require/*.js', 'js/vendor/*.js'],
      tasks: ['minify'],
      options: {
        spawn: false,
      },
    },

    css: {
      files: ['css/less/**/*.less', 'css/less/*.less'],
      tasks: ['less-watch', 'match_media']
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-lodash');
  grunt.loadNpmTasks('grunt-match-media');

  grunt.registerTask('minify', ['concat', 'uglify', 'cssmin']);
  grunt.registerTask('less-watch', ['less']);

};
