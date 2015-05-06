'use strict';
module.exports = function (grunt) {

    var npmDependencies = require('./package.json').devDependencies;
    var hasSass = npmDependencies['grunt-contrib-sass'] !== undefined;

    grunt.initConfig({
        // Dirs
        dirs: {
            src: "src"
        },
        // Watches for changes and runs tasks
        watch: {
            sass: {
                files: ['scss/**/*.scss'],
                tasks: (hasSass) ? ['sass:dev', 'autoprefixer'] : null
            },
            js: {
                files: ['js/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            php: {
                files: ['**/*.php'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['**/*.html', '!<%= dirs.src %>/**/*.html'],
                options: {
                    livereload: true
                }
            },
            css : {
				files : ['css/**/*.css'],
				options : {
					livereload : true
				}
			},
            dot: {
                files: ['<%= dirs.src %>/**/*.dot.html', '<%= dirs.src %>/**/*.md'],
                tasks: ['stencil:main'],
                options: {
                    livereload: true
                }
            }
        },
        // JsHint your javascript
        jshint: {
            all: ['js/*.js', 'js/plugins/*.js', '!js/vendor/**/*.js', '!js/*.min.js'],
            options: {
                browser: true,
                curly: false,
                eqeqeq: false,
                eqnull: true,
                expr: true,
                immed: true,
                newcap: true,
                noarg: true,
                smarttabs: true,
                sub: true,
                undef: false
            }
        },
        // Dev and production build for sass
        sass: {
            production: {
                files: [
                    {
                        src: ['**/*.scss', '!**/_*.scss'],
                        cwd: 'scss',
                        dest: 'css',
                        ext: '.css',
                        expand: true
                    }
                ],
                options: {
                    style: 'compressed'
                }
            },
            dev: {
                files: [
                    {
                        src: ['**/*.scss', '!**/_*.scss'],
                        cwd: 'scss',
                        dest: 'css',
                        ext: '.css',
                        expand: true
                    }
                ],
                options: {
                    style: 'expanded'
                }
            }
        },
        // Autoprefixer setup
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 10'],
                map: {
                    inline: false
                }
            },
            files: {
                src: 'css/style.css'
            }
        },
        concat: {
            options: {
                //separator: ';',
            },
            dist: {
                src: ['js/plugins/*.js'],
                dest: 'js/bundle.js',
            },
        },
        uglify: {
            production: {
              files: {
                'js/bundle.min.js': ['js/bundle.js']
              }
            }
        },
        // Image min
        imagemin: {
            production: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/images',
                        src: '**/*.{png,jpg,jpeg}',
                        dest: 'assets/images'
                    }
                ]
            }
        },
        // SVG min
        svgmin: {
            production: {
                files: [
                    {
                        expand: true,
                        cwd: 'images',
                        src: '**/*.svg',
                        dest: 'images'
                    }
                ]
            }
        },

        // Stencil HTML assembler
        stencil: {
            main: {
                options: {
                    partials: '<%= dirs.src %>/partials',
                    templates: '<%= dirs.src %>/templates',
                    dot_template_settings: { strip: false }
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.src %>/pages/',
                        src: '**/*.dot.html',
                        dest: '.',
                        ext: '.html',
                        flatten: false
                    }
                ]
            }
        }

    });

    // Default task
    grunt.registerTask('default', ['watch']);

    // Build task
    grunt.registerTask('build', function () {
        var arr = ['jshint', 'concat', 'uglify:production'];

        if (hasSass) {
            arr.push('sass:production');
            arr.push('autoprefixer');
        }

        arr.push('imagemin:production', 'svgmin:production');

        grunt.task.run(arr);
    });

    // Template Setup Task
    grunt.registerTask('setup', function () {
        var arr = [];

        if (hasSass) {
            arr.push['sass:dev'];
        }

        arr.push('bower-install');

        grunt.task.run(arr);
    });

    // Load up tasks
    if (hasSass) {
        grunt.loadNpmTasks('grunt-contrib-sass');
    }

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-stencil');

    // Run bower install
    grunt.registerTask('bower-install', function () {
        var done = this.async();
        var bower = require('bower').commands;
        bower.install().on('end', function (data) {
            done();
        }).on('data', function (data) {
            console.log(data);
        }).on('error', function (err) {
            console.error(err);
            done();
        });
    });
};
