module.exports = function (grunt) {
  // ========================================================================
  // Configure task options
  grunt.initConfig({
    shell: {
      "build-apps": {
        command: ["npm run build"].join(" && "),
      },
    },
  });

  // ========================================================================
  // Initialise

  grunt.loadNpmTasks("grunt-shell");

  // ========================================================================
  // Register Tasks

  // grunt.registerTask('bundle-reports', [ 'shell:bundle-reports']);

  // 'grunt' will check code quality, and if no errors,
  // compile LESS to CSS, and minify and concatonate all JS and CSS
  grunt.registerTask("default", ["shell:build-apps"]);
};
