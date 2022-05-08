module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build_folder: 'build' 
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
          dest: 'build/css'
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'source/images',
            src: '**/*.{png,jpg,gif}',
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

  grunt.registerTask('build', ['clean', 'uglify','imagemin', 'cssmin']);
};

