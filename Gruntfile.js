module.exports = function (grunt) {
  // ========================================================================
  // Configure task options

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    shell: {
      "build-apps": {
        command: ["npm run build"].join(" && "),
      },
      "clean-all": {
        command: ["npm run build:clean:all"].join(" && "),
      },
      externalize: {
        command: ["npm run i18n:externalize"].join(" && "),
      },
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
            cwd: "src",
            src: ["locales"],
            dest: "build",
          },
        ],
      },
    },
  });

  // ========================================================================
  // Initialise

  grunt.loadNpmTasks("grunt-contrib-symlink");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-shell");

  // ========================================================================
  // Register Tasks

  // grunt.registerTask('bundle-reports', [ 'shell:bundle-reports']);

  // 'grunt' will check code quality, and if no errors,
  // compile LESS to CSS, and minify and concatonate all JS and CSS
  grunt.registerTask("default", ["shell:clean-all", "shell:build-apps", "externalize-locale-string", "symlink"]);
  grunt.registerTask("externalize-locale-string", ["shell:externalize"]);
};
