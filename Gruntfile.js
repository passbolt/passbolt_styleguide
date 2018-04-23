module.exports = function(grunt) {

	// ========================================================================
	// Configure task options

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			css: [
				'build/css/*',
				'src/css/*',
			]
		},
		less: {
			public: {
				expand: true,
				flatten: true,
				cwd: "src/less/",
				src: "*.less",
				dest: "src/css/",
				ext: ".css"
			},
      theme_default_api: {
        expand: true,
        flatten: true,
        cwd: "src/less/themes/default/api",
        src: "*.less",
        dest: "src/css/themes/default/api",
        ext: ".css"
      },
      theme_default_webext: {
        expand: true,
        flatten: true,
        cwd: "src/less/themes/default/webext",
        src: "**.less",
        dest: "src/css/themes/default/webext",
        ext: ".css"
      },
      theme_midgar_api: {
        expand: true,
        flatten: true,
        cwd: "src/less/themes/midgar/api",
        src: "*.less",
        dest: "src/css/themes/midgar/api",
        ext: ".css"
      },
      theme_midgar_webext: {
        expand: true,
        flatten: true,
        cwd: "src/less/themes/midgar/webext",
        src: "**.less",
        dest: "src/css/themes/midgar/webext",
        ext: ".css"
      }
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
				].join('&&')
			}
		},
		cssmin: {
			options: {
				banner: '/**!\n'+
						' * @name\t\t<%= pkg.name %>\n'+
						' * @version\t\tv<%= pkg.version %>\n' +
						' * @date\t\t<%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' * @copyright\t<%= pkg.copyright %>\n' +
						' * @source\t\t<%= pkg.repository %>\n'+
						' * @license\t\t<%= pkg.license %>\n */\n',
				footer: '/* @license-end */'
			},
			public: {
				expand: true,
				cwd: 'src/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'build/css/',
				ext: '.min.css'
			},
      theme_default_api: {
        expand: true,
        cwd: 'src/css/themes/default/api',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/themes/default/api',
        ext: '.min.css'
      },
      theme_default_webext: {
        expand: true,
        cwd: 'src/css/themes/default/webext',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/themes/default/webext',
        ext: '.min.css'
      },
      theme_midgar_api: {
        expand: true,
        cwd: 'src/css/themes/midgar/api',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/themes/midgar/api',
        ext: '.min.css'
      },
      theme_midgar_webext: {
        expand: true,
        cwd: 'src/css/themes/midgar/webext',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/themes/midgar/webext',
        ext: '.min.css'
      }
		},
		watch: {
			less: {
				files: [
					'Gruntfile.js',
					'package.json',
					'src/less/*.less',
					'src/less/**/*.less'],
				tasks: ['css'],
				options: {
					spawn: false
				}
			}
		}
	});

	// ========================================================================
	// Initialise

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-lesslint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');

	// ========================================================================
	// Register Tasks

	// Run 'grunt css' to compile LESS into CSS, combine and minify
	grunt.registerTask('css', ['clean:css', 'less', 'cssmin']);

	// Tag and publish the styleguide
	grunt.registerTask('styleguide-publish', [ 'shell:publish']);
	grunt.registerTask('publish', [ 'shell:publish']);

	// 'grunt' will check code quality, and if no errors,
	// compile LESS to CSS, and minify and concatonate all JS and CSS
	grunt.registerTask('default', [ 'clean', 'less', 'cssmin']);

	// 'grunt' will check code quality, and if no errors,
	// compile LESS to CSS, and minify and concatonate all JS and CSS
	grunt.registerTask('default', [ 'clean', 'less', 'cssmin']);

};
