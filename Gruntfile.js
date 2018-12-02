module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
        //aqui começa a configuração do gruntfile, existem inumeras funcionalidades que podemos utilizar no grunt, que ajudam a otimizar o programa
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
      //concat serve para concatenar os arquivos do projeto, no caso js, é muito bom utilizar em uma pai node.js
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
  
     //aqui eu dou load nas tasks do grunt
     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-ng-annotate'); 
 
     //aqui eu chamo as tasks defaults do programa
     grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify']);
}