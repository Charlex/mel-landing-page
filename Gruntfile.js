
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true,
      },
      grunt: {
        files: ['GruntFile.js'],
        options:{
          livereload: true
        }
      },
      sass: {
        files: ['www/assets/scss/**/*.scss'],
        tasks: ['sass'],
        options:{
          livereload: true
        }
      },
    },
    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '*',
          keepalive: true,
          base: 'www/'

        }
      }
    },
    sass: { 
      dist: {
        options: {
          debugInfo:  true,
          style: 'expanded'
        },
        files: [{ 
          expand: true,
          cwd: 'www/assets/scss',
          src: ['**/*.scss'],
          dest: 'www/assets/css/',
          ext: '.css',
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', [ 'sass', 'connect', 'watch', ]);

};