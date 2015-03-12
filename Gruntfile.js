/**
 * Grunt script for building pgbotgraph
 *
 * Copyright (c) 2014 Matthew Radcliffe
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    clean: {
      dist: ["dist"]
    },

    copy: {
      dist: {
        files: [
          {expand: true, src: ['src/pgbotgraph.js'], dest: 'dist/'},
        ]
      }
    },

    uglify: {
      options: {
        mangle: false,
        compress: true,
        sourceMap: true,
        preserveComments: 'some'
      },
      dist: {
        files: {
          'dist/pgbotgraph.min.js': ['src/pgbotgraph.js']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // By default, clean and build.
  grunt.registerTask('default', ['clean', 'copy', 'uglify']);

};
