module.exports = function(grunt) {

  var banner = '/**!\n'+
    ' * @name\t\t<%= pkg.name %>\n'+
    ' * @version\t\tv<%= pkg.version %>\n' +
    ' * @date\t\t<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    ' * @copyright\t<%= pkg.copyright %>\n' +
    ' * @source\t\t<%= pkg.repository %>\n'+
    ' * @license\t\t<%= pkg.license %>\n */';

	// ========================================================================
	// Configure task options

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			all: [
				'build/css/*',
				'src/css/**',
			],
      css: [
        'src/css/**'
      ]
		},
		less: {
      options: {
        javascriptEnabled: true
      },
			public: {
				expand: true,
				flatten: true,
				cwd: "src/less/",
				src: "*.less",
				dest: "src/css/",
				ext: ".css"
			},
      theme_default: {
        expand: true,
        flatten: true,
        cwd: "src/less/themes/default",
        src: "*.less",
        dest: "src/css/themes/default",
        ext: ".css"
      },
      theme_midgar: {
        expand: true,
        flatten: true,
        cwd: "src/less/themes/midgar",
        src: "*.less",
        dest: "src/css/themes/midgar",
        ext: ".css"
      },
      theme_solarized_light: {
        expand: true,
        flatten: true,
        cwd: "src/less/themes/solarized_light",
        src: "*.less",
        dest: "src/css/themes/solarized_light",
        ext: ".css"
      },
      theme_solarized_dark: {
        expand: true,
        flatten: true,
        cwd: "src/less/themes/solarized_dark",
        src: "*.less",
        dest: "src/css/themes/solarized_dark",
        ext: ".css"
      }
		},
		shell: {
      'build-apps': {
        command: [
          'npm run build'
        ].join(' && ')
      },
      'externalize': {
        command: [
          'npm run i18n:externalize'
        ].join(' && ')
      }
		},
		cssmin: {
			public: {
				expand: true,
				cwd: 'src/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'build/css/',
				ext: '.min.css'
			},
      theme_default: {
        expand: true,
        cwd: 'src/css/themes/default',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/themes/default',
        ext: '.min.css'
      },
      theme_midgar: {
        expand: true,
        cwd: 'src/css/themes/midgar',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/themes/midgar',
        ext: '.min.css'
      },
      theme_solarized_light: {
        expand: true,
        cwd: 'src/css/themes/solarized_light',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/themes/solarized_light',
        ext: '.min.css'
      },
      theme_solarized_dark: {
        expand: true,
        cwd: 'src/css/themes/solarized_dark',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/themes/solarized_dark',
        ext: '.min.css'
      }
		},
    header: {
      public: {
        options: {
          text: banner
        },
        expand: true,
        cwd: 'build/css',
        src: ['*.css', '*.min.css'],
        dest: 'build/css',
        ext: '.min.css'
      },
      default: {
        options: {
          text: banner
        },
        expand: true,
        cwd: 'build/css/themes/default',
        src: ['*.min.css'],
        dest: 'build/css/themes/default',
        ext: '.min.css'
      },
      midgar: {
        options: {
          text: banner
        },
        expand: true,
        cwd: 'build/css/themes/midgar',
        src: ['*.min.css'],
        dest: 'build/css/themes/midgar',
        ext: '.min.css'
      }
    },
    symlink: {
      options: {
        // Enable overwrite to delete symlinks before recreating them
        overwrite: true,
      },
      expanded: {
        files: [
          {
            expand: true,
            overwrite: true,
            cwd: 'src',
            src: ['locales'],
            dest: 'build'
          },
        ]
      },
    },
    watch: {
      less: {
        files: [
          'Gruntfile.js',
          'package.json',
          'src/less/*.less',
          'src/less/**/*.less'
        ],
        tasks: ['css']
      }
    }
  });

	// ========================================================================
	// Initialise

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-symlink');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-header');
  grunt.loadNpmTasks('grunt-shell');

	// ========================================================================
	// Register Tasks

  // grunt.registerTask('bundle-reports', [ 'shell:bundle-reports']);

	// 'grunt' will check code quality, and if no errors,
	// compile LESS to CSS, and minify and concatonate all JS and CSS
  grunt.registerTask('default', ['clean:all', 'less', 'cssmin', 'header', 'shell:build-apps', 'externalize-locale-string', 'symlink']);
  grunt.registerTask('css', [ 'clean:css', 'less', 'cssmin']);
  grunt.registerTask('externalize-locale-string', ['shell:externalize']);

  // Tasks to add the custom theme in the less and watch config
  grunt.registerTask('custom_theme', 'Add the custom theme in less task', function() {
    grunt.config.data.less.theme_custom = {
      expand: true,
      flatten: true,
      cwd: "src/less/themes/custom",
      src: "*.less",
      dest: "src/css/themes/custom",
      ext: ".css"
    };
  });
  grunt.registerTask('custom_theme_watch', 'Add the custom theme in less task', function() {
    grunt.config.data.watch = {
      less: {
        files: [
          'src/less/*.less',
          'src/less/**/*.less'
        ],
        tasks: ['build_custom_theme']
      }
    };
  });
  grunt.registerTask('build_custom_theme', ['custom_theme', 'less']);
  grunt.registerTask('watch_custom_theme', ['custom_theme_watch', 'watch']);
};
