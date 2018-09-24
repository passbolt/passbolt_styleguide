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
				'src/css/**'
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
      theme_anew: {
        expand: true,
        flatten: true,
        cwd: "src/less/themes/anew",
        src: "*.less",
        dest: "src/css/themes/anew",
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
		},
		shell: {
			'publish': {
				options: {
					stdout: true
				},
				command: [
					'git commit -am \'<%= pkg.version %>\'',
					'git tag -a <%= pkg.version %> -m \'<%= pkg.version %>\'',
					'git push origin <%= pkg.version %>',
					'git push',
					'npm publish'
				].join('&& ')
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
      theme_anew: {
        expand: true,
        cwd: 'src/css/themes/anew',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/themes/anew',
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
      }
		},
    header: {
      anew: {
        options: {
          text: banner
        },
        expand: true,
        cwd: 'build/css/themes/anew',
        src: ['*.css', '*.min.css'],
        dest: 'build/css/themes/anew',
        ext: '.min.css'
      },
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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-header');
	grunt.loadNpmTasks('grunt-shell');

	// ========================================================================
	// Register Tasks

	// Tag and publish the styleguide
	grunt.registerTask('styleguide-publish', [ 'shell:publish']);
	grunt.registerTask('publish', [ 'shell:publish']);

	// 'grunt' will check code quality, and if no errors,
	// compile LESS to CSS, and minify and concatonate all JS and CSS
	grunt.registerTask('default', [ 'clean:all', 'less', 'cssmin', 'header']);
  grunt.registerTask('css', [ 'clean:css', 'less']);
};
