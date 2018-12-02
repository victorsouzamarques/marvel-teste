module.exports = function(grunt) {
  //grunt wrapper function 
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
        //grunt task configuration will go here     
        ngAnnotate: {
          options: {
              singleQuotes: true
          },
          app: {
              files: {
                  './public/min-safe/js/appFactory.js': ['./public/js/appFactory.js'],
                  './public/min-safe/js/FormController.js': ['./public/js/FormController.js'],
                  './public/min-safe/app.js': ['./public/js/app.js']
              }
          }
      },
      concat: {
        js: { //target
            src: ['./public/min-safe/app.js', './public/min-safe/js/*.js'],
            dest: './public/min/app.js'
        }
    },uglify: {
      js: { //target
          src: ['./public/min/app.js'],
          dest: './public/min/app.js'
      }
  }
  });
  
     //load grunt tasks
     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-ng-annotate'); 
 
     //register grunt default task
     grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify']);
}