module.exports = function(grunt){
  grunt.initConfig({
    jshint: {
      files: [ "*.js", "assets/js/*.js", "assets/js/**/*.js", "config/**/*.js" ],
      options: {
        esnext: true,
        globals: {
          jQuery: true 
        }
      }
    },
    sass: {
      dist: {
        files: {
          'assets/css/style.css' : 'assets/css/style.scss'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['css']
      },
      scripts:{
        files: [ "*.js", "assets/js/**/*.js" ],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('css', ['sass']);
  grunt.registerTask("default", ["jshint", "css"]);
};
