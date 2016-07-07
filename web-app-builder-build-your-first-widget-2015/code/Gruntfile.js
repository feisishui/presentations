module.exports = function(grunt) {

  // replace these with your own paths
  var appDir = 'arcgis-web-appbuilder-1.1\\server\\apps\\2';
  var stemappDir = 'arcgis-web-appbuilder-1.1\\client\\stemapp';

  grunt.initConfig({
    watch: {
      main: {
        files: ['src/**'],
        tasks: ['sync'],
        options: {
          spawn: false
        }
      }
    },

    sync: {
      main: {
        files: [{
          cwd: 'src',
          src: ['**'],
          dest: appDir
        }, {
          cwd: 'src',
          src: ['**'],
          dest: stemappDir
        }],
        verbose: true // Display log messages when copying files
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask('default', ['sync', 'watch']);
};