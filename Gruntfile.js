
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    },
    watch: {
      options: {
        livereload: true,
      },
      grunt: {
        files: ['Gruntfile.js'],
        options:{
          livereload: true
        }
      },
      html: {
        files: ['**/*.html'],
        options:{
          livereload: true
        }
      },
      sass: {
        files: '**/*.scss',
        tasks: ['sass:dist'],
        options:{
          livereload: true
        }
      },
    },  
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('serve', [ 'connect', 'watch', 'sass:dist' ]);

};