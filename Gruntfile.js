/*jshint indent:4 */

'use strict';

var connect = require('grunt-contrib-connect/node_modules/connect');

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        // Project settings
        config: {
            app: 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                    '<%= config.app %>/scripts/**/*.js'
                ],
                tasks: ['browserify:main'],
                options: {
                    spawn: false
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0'
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dist %>'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            upload: '.tmp/.upload',
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*'
            ]
        },
        sass: {
            options: {
                loadPath: ['bower_components/'],
                sourceMap: false,
                quiet: true
            },
            dist: {
                files: {
                    '.tmp/styles/main.css': '<%= config.app %>/styles/main.scss',
                    '.tmp/styles/oldie.css': '<%= config.app %>/styles/oldie.scss'
                }
            }
        },

        browserify: {
            main: {
                src: ['<%= config.app %>/scripts/main.js', '<%= config.app %>/scripts/vendor/tipuedrop/tipuedrop.js'],
                dest: '.tmp/scripts/main-bundle.js',
                options: {
                    watch: true,
                    debug: true,
                    transform: ['debowerify'],
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version'],
                map: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        px_to_rem: {
            options: {
                base: 10,
                fallback: true // set to false when Opera Mini supports rem units
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        uglify: {
            options: {
                preserveComments: 'some'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/images/*.{jpg,png}',
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/styles/fonts/**/*.{eot,woff,ttf}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: ['<%= config.app %>/index.html']
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                dirs: ['<%= config.dist %>']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         '<%= config.dist %>/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%= config.app %>/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: false,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/*.{png,jpg,webp,gif}',
                        '{,*/}*.html',
                        'styles/fonts/**/*.{eot,woff,ttf}'
                    ]
                }]
            },
            upload: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: ['**/*'],
                    dest: '.tmp/.upload',
                    dot: true
                }],
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            images: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/images',
                dest: '.tmp/images/',
                src: '{,*/}*.{jpg,png}'
            }
        },
        concurrent: {
            server: [
                'browserify:main',
                'sass',
                'copy:images',
                'copy:styles'
            ],
            dist: [
                'browserify:main',
                'sass',
                'copy:images',
                'copy:styles'
            ]
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            // 'autoprefixer',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'px_to_rem',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
};
