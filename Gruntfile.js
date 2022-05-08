module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build_folder: 'build' 
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'source',
          src: ['favicon.ico', 'index.html', 'sounds/**'],
          dest: 'build'
        }]
      }
    },
    cssmin: {
      options: {
        report: 'min'
      },
      target: {
        files: [{
          expand: true,
          cwd: 'source/styles',
          src: '**/*.css',
          dest: 'build/styles'
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'source/images',
          src: '**/*.{png,jpg,gif,svg}',
          dest: 'build/images'
        }]
      }
    },
    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: 'source/scripts',
          src: '**/*.js',
          dest: 'build/scripts'
        }]
      }
    }
  });



  // Load configured tasks here
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['clean', 'copy', 'uglify','imagemin', 'cssmin']);
};

