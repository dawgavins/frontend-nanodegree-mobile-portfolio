//////////
/// Gruntfile for optimizing and testing p% of the Udacity Front-End Nanodegree.
//////////
'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);


  // Load the uglify plug-in - we will use this to minify js files.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the cssmin plug-in - we will use this to minify css files
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Load the imagemin plug-in - we will use this to compress the image files
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Register task for pagespeed test 
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 9292;

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

  grunt.initConfig({

    // Grunt configuration for minimizing HTML file size 
    minifyHtml: {
      options: {
        cdata: true
      },
      dist: {
        files: 
        {
          'dist/index.html': 'index.html',
          'dist/project-2048.html': 'project-2048.html',
          'dist/project-mobile.html': 'project-mobile.html',
          'dist/project-webperf.html': 'project-webperf.html',
          'dist/views/pizza.html': "views/pizza.html"
        }
      }
    },

    // Grunt uglify configuration for minimizing javascript file size 
    uglify: {
      my_target: {
        files: {
          'dist/js/perfmatters.js': ['js/perfmatters.js'],
          'dist/views/js/main.js': ['views/js/main.js']
        }
      }
    },

    // Grunt cssmin configuration for minimizing CSS file size 
    cssmin: {
      target: {
        files: {
          'dist/css/print.css': ['css/print.css'],
          'dist/css/style.css': ['css/style.css'],
          'dist/views/css/style.css': ['views/css/style.css'],
          'dist/views/css/bootstrap-grid.css': ['views/css/bootstrap-grid.css'] 
        }
      }
    },

      // Grunt page speed configuration
    pagespeed: {
      options: {
        nokey: true,
        locale: "en_US",
        threshold: 40
      },
      local: {
        options: {
          strategy: "desktop"
        }
      },
      mobile: {
        options: {
          strategy: "mobile"
        }
      }
    },

    imagemin: {  
      //static: {
      //  files: {
      //    "views/images/min/pizzeria.jpg" : "views/images/pizzeria.jpg"
      //  }
      //},
      dynamic: {    
        options: {                       // Target options
          optimizationLevel: 3,
          //use: [mozjpeg()]
        },                     // Another target
        files: [
          {
            expand: true,                  // Enable dynamic expansion
            cwd: 'img/',                   // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'dist/img/'               // Destination path prefix
          },
          {
            expand: true,                 // Enable dynamic expansion
            cwd: 'views/images/',          // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'dist/views/images/'      // Destination path prefix
          }
        ]
      }    
    }

  });

  // Register general minify task for reducing size of all possible files
  grunt.registerTask('minify', 'Minify/compress CSS, JavaScript and Image files', function() {
      grunt.task.run('minifyHtml');
      grunt.task.run('cssmin');
      grunt.task.run('uglify');
      grunt.task.run('imagemin');
  });

  // Register default tasks
  grunt.registerTask('default', ['psi-ngrok']);
}
