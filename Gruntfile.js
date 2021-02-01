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
		},
		shell: {
		  // 'bundle-reports': {
		  //   command: [
		  //     'webpack --entry ./src/js/reports/index.js --output-path ./src/react-appjs/lib/ --output-filename reports.js'
      //     ].join('&& ')
      // },
			'publish': {
				options: {
					stdout: true
				},
				command: [
					'git commit -S -am \'<%= pkg.version %>\'',
					'git tag -a <%= pkg.version %> -m \'<%= pkg.version %>\'',
					'git push origin <%= pkg.version %>',
					'git push',
					'npm publish'
				].join('&& ')
			},
      'copy-demo-css': {
        options: {
          stdout: true
        },
        command: [
          // 'rm -f ./demo/react-appjs/public/css/themes/default/api_reports.css',
          // 'rm -f ./demo/react-appjs/public/css/themes/midgar/api_reports.css',
          // 'rm -f ./demo/react-appjs/public/css/themes/default/api_main.css',
          // 'rm -f ./demo/react-appjs/public/css/themes/midgar/api_main.css',
          // 'cp ./src/css/themes/default/api_reports.css ./demo/react-appjs/public/css/themes/default/.',
          // 'cp ./src/css/themes/midgar/api_reports.css ./demo/react-appjs/public/css/themes/midgar/.',
          // 'cp ./src/css/themes/default/api_main.css ./demo/react-appjs/public/css/themes/default/.',
          // 'cp ./src/css/themes/midgar/api_main.css ./demo/react-appjs/public/css/themes/midgar/.',

          'rm -f ./demo/api-app/public/css/themes/default/*.css',
          'rm -f ./demo/api-app/public/css/themes/midgar/*.css',
          'cp ./src/css/themes/default/api_main.css ./demo/api-app/public/css/themes/default/.',
          'cp ./src/css/themes/midgar/api_main.css ./demo/api-app/public/css/themes/midgar/.',
          'cp ./src/css/themes/default/api_authentication.css ./demo/api-app/public/css/themes/default/.',

          'rm -f ./demo/ext-app/public/css/themes/default/*.css',
          'rm -f ./demo/ext-app/public/css/themes/midgar/*.css',
          'cp ./src/css/themes/default/ext_app.css ./demo/ext-app/public/css/themes/default/.',
          'cp ./src/css/themes/midgar/ext_app.css ./demo/ext-app/public/css/themes/midgar/.',
          'cp ./src/css/themes/default/ext_authentication.css ./demo/ext-app/public/css/themes/default/.',
          'cp ./src/css/themes/midgar/ext_authentication.css ./demo/ext-app/public/css/themes/midgar/.'
        ].join('&& ')
      },
      'copy-demo-lang': {
        options: {
          stdout: true
        },
        command: [
          'rm -rf ./demo/ext-app/public/locales/*',
          'cp -R ./src/locales/ ./demo/ext-app/public/locales/.',
        ].join('&& ')
      },
      'build-apps': {
        command: [
          'npm run build'
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
            cwd: 'demo/ext-app/public/',
            src: ['locales'],
            dest: 'build'
          },
        ]
      },
    },
    i18next: {
      translate: {
        src: 'src/**/*.{js,html}',
        dest: 'src',
        options: {
          lngs: ['en-US'],
          func: {
            list: ['this.props.t', 'this.translate'], // function use to parse and find new translation
            extensions: ['.js', '.jsx']
          },
          trans: {
            component: 'Trans',
            i18nKey: 'i18nKey',
            defaultsKey: 'defaults',
            extensions: ['.js', '.jsx'],
            fallbackKey: true
          },
          nsSeparator: false,
          keySeparator: false,
          defaultNs: 'common',
          resource: {
            loadPath: 'src/locales/{{lng}}/{{ns}}.json',
            savePath: 'locales/{{lng}}/{{ns}}.json'
          },
          removeUnusedKeys: true,
          sort: true,
          debug: false,
        }
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
				tasks: ['css', 'shell:copy-demo-css']
			},
      lang: {
        files: [
          'src/locales/**/*.json'
        ],
        tasks: ['lang', 'shell:copy-demo-lang']
      }
		}
	});

	// ========================================================================
	// Initialise

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-symlink');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-header');
	grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('i18next-scanner');

	// ========================================================================
	// Register Tasks

	// Tag and publish the styleguide
	grunt.registerTask('styleguide-publish', [ 'shell:publish']);
	grunt.registerTask('publish', [ 'shell:publish']);

  // grunt.registerTask('bundle-reports', [ 'shell:bundle-reports']);

	// 'grunt' will check code quality, and if no errors,
	// compile LESS to CSS, and minify and concatonate all JS and CSS
	grunt.registerTask('default', [ 'clean:all', 'less', 'cssmin', 'header', 'symlink', 'shell:copy-demo-css', 'shell:copy-demo-lang', 'shell:build-apps']);
  grunt.registerTask('css', [ 'clean:css', 'less']);
  grunt.registerTask('lang', ['shell:copy-demo-lang']);
  grunt.registerTask('translate', ['i18next']);
};
