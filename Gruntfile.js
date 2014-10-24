module.exports = function(grunt) {

  grunt.initConfig({

    bower: {
      dist: {
        options: {
          targetDir: './dist/lib'
        }
      }
    },

    clean: {
      bower: {
        src: ['./components']
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/scripts/*.js']
    },

    copy: {
      scripts: {
        expand: true,
        cwd: 'src/scripts/',
        src: '*.js',
        dest: 'dist/scripts',
        flatten: true,
        filter: 'isFile'
      },
      images: {
        expand: true,
        cwd: 'src/images/',
        src: '**',
        dest: 'dist/images',
        flatten: true,
        filter: 'isFile'
      }
    },

    jade: {
      dist: {
        files: {
          'dist/index.html': 'src/index.jade'
        }
      }
    },

    sass: {
      process: {
        files: {
          'src/styles/temp/main.css': 'src/styles/main.scss'
        }
      },
      bootstrap: {
        files: {
          'dist/lib/bootstrap/bootstrap.css': 'src/bootstrap/stylesheets/bootstrap.scss'
        }
      }
    },

    autoprefixer: {
      dist: {
        src: 'src/styles/temp/main.css',
        dest: 'dist/styles/main.css'
      }
    },

    connect: {
      server: {
        options: {
          port: 6666,
          base: 'dist',
          livereload: true
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      templates: {
        files: ['src/*.jade','src/templates/*.jade'],
        tasks: ['jade'],
      },
      userStyles: {
        files: ['src/styles/main.scss'],
        tasks: ['sass:process','autoprefixer']
      },
      bootstrapStyles: {
        files: ['src/bootstrap/stylesheets/bootstrap/**'],
        tasks: ['sass:bootstrap']
      },
      scripts: {
        files: ['src/scripts/*.js'],
        tasks: ['jshint','copy:scripts']
      }
    },

  });

  // Load the plugin that provides the 'uglify' task.
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('build', ['bower','jshint','jade','sass','autoprefixer','copy','clean']);
  grunt.registerTask('serve', ['connect','watch']);

};
