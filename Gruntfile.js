
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['**/*'],
      tasks: ['sass', 'connect:server'],
      options: {
        livereload: true,
      },    
    },
    connect: {
      server: {
        options: {
          base: 'www/',
          keepalive: true
        }
      }
    },
    sass: { 
      dist: {
        options: { 
          style: 'expanded'
        },
        files: [{ 
          expand: true,
          cwd: 'assets/styles/',
          src: ['*.scss'],
          dest: '../client/styles/',
          ext: '.css',
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['sass', 'connect']);

};