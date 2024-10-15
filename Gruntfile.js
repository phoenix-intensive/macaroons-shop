module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/style.css': 'src/styles/style.less'
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/style.min.css': ['dist/style.css']
                }
            }
        },
        clean: ['dist/style.css', "dist/style.css.map"],
        watch: {
            css: {
                files: 'src/styles/*.less',
                tasks: ['default'],
                options: {
                    livereload: true,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'clean']);

};
