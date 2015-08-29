module.exports = function (grunt) {

    require('time-grunt')(grunt);
    var path = require('path');

    var config = {

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // [DIRS]
        dirs: {
            app: 'app',
            src: {
                root: '',
                stylesheets: 'src/stylesheets',
                javascript: 'src/javascript',
                images: 'src/images',
                partials: 'src/partials'
            },
            dest: {
                root: 'assets',
                stylesheets: 'assets/stylesheets',
                javascript: 'assets/javascript',
                images: 'assets/images',
                partials: 'assets/partials'
            },
            dest_generated: {
                root: 'assets',
                stylesheets: 'assets/stylesheets',
                javascript: 'assets/javascript',
                images: 'assets/images',
                sprites: 'assets/images/@',
                sprites_http: '../images/@',
                partials: 'assets/partials'
            },
            vendor: 'vendor',
            public: '',
            public_vendor: 'assets/vendor'
        },

        // [JAVASCRIPT]
        javascript: {
            files: {

                // [VENDOR]
                '<%= dirs.dest_generated.javascript %>/site.vendor.js': [

                    // jQuery
                    '<%= dirs.public_vendor %>/jquery/dist/jquery.js',

                    // Bootstrap
                    // '<%= dirs.public_vendor %>/bootstrap-sass/assets/javascripts/bootstrap/button.js',
                    // '<%= dirs.public_vendor %>/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
                    // '<%= dirs.public_vendor %>/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
                    // '<%= dirs.public_vendor %>/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
                    // '<%= dirs.public_vendor %>/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
                    // '<%= dirs.public_vendor %>/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
                    // '<%= dirs.public_vendor %>/bootstrap-sass/assets/javascripts/bootstrap/affix.js',

                    // Modernizr
                    //'<%= dirs.public_vendor %>/modernizr/modernizr.js',
                ],

                '<%= dirs.dest_generated.javascript %>/site.js': [
                    '<%= dirs.src.javascript %>/site.js',
                ]
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: false,
                mangle: false,
                compress: {
                    warnings: true
                },
                beautify: false,
                wrap: false,
                exportAll: true,
                preserveComments: 'some'
            },
            dist: {
                options: {
                    sourceMap: false,
                    mangle: false,
                    beautify: false
                },
                files: '<%= javascript.files %>'
            },
            dev: {
                options: {
                    sourceMap: false,
                    mangle: false,
                    beautify: false
                },
                files: '<%= javascript.files %>'
            }
        },

        compass: {
            options: {
                force: true
            },
            dist: {
                options: {
                    environment: 'production',
                    outputStyle: 'compressed',
                    sassDir: '<%= dirs.src.stylesheets %>',
                    cssDir: '<%= dirs.dest_generated.stylesheets %>',
                    imagesDir: 'assets/images',
                    generatedImagesDir: 'assets/images/@',
                    httpGeneratedImagesPath: '<%= dirs.dest_generated.sprites_http %>'
                }
            },
            dev: {
                options: {
                    environment: 'development',
                    outputStyle: 'expanded',
                    sourcemap: true,
                    debugInfo: false,
                    sassDir: '<%= dirs.src.stylesheets %>',
                    cssDir: '<%= dirs.dest_generated.stylesheets %>',
                    imagesDir: 'assets/images',
                    generatedImagesDir: 'assets/images/@',
                    httpGeneratedImagesPath: '<%= dirs.dest_generated.sprites_http %>'
                }
            }
        },

        autoprefixer: {
            dist: {
                expand: true,
                flatten: true,
                src: '<%= dirs.dest_generated.stylesheets %>/**/*.css',
                dest: '<%= dirs.dest_generated.stylesheets %>'
            }
        },

        imagemin: {
            assets: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [
                        { removeViewBox: false },
                        { removeEmptyAttrs: true },
                        { removeXMLProcInst: false },
                        { removeComments: true },
                        { removeMetaData: true },
                        { removeTitle: false },
                        { removeDesc: false },
                        { removeUselessDefs: false },
                        { removeEditorsNSData: true },
                        { removeHiddenElems: false },
                        { removeEmptyText: true },
                        { removeEmptyContainers: true },
                        { cleanupIDs: true },
                        { mergePaths: false },
                        { convertStyleToAttrs: false }
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.images %>',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: '<%= dirs.dest.images %>'
                }]
            }
        },

        clean: {
            base: [
                '<%= dirs.dest_generated.stylesheets %>/*',
                '<%= dirs.dest_generated.javascript %>/*',
                '<%= dirs.dest_generated.partials %>/*'
            ],
            images: ['<%= dirs.dest_generated.images %>/*']
        },

        // [WATCH]
        watch: {
            options: {
                livereload: true,
                spawn: false
            },

            css: {
                options: {
                    livereload: true
                },
                files: '<%= compass.dev.options.cssDir %>/**/*.css'
            },

            compass: {
                options: {
                    livereload: true
                },
                files: '<%= compass.dev.options.sassDir %>/**/*.scss',
                tasks: ['compass:dev', 'autoprefixer']
            },

            javascript: {
                options: {
                    spawn: true
                },
                files: '<%= dirs.src.javascript %>/**/*.js',
                tasks: ['newer:jshint:theme', 'newer:uglify:dev']
            },

            views: {
                files: '<%= dirs.src.root %>**/*.htm',
                tasks: ['exec:artisan_cache_clear']
            },

            images: {
                files: '<%= dirs.src.images %>/**/*.{png,jpg,gif,svg}',
                options: {
                    event: ['all'],
                    spawn: true
                },
                tasks: ['newer:imagemin']
            }

        },

        copy: {
            assets: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/fonts/',
                        src: ['**'],
                        dest: 'assets/fonts/'
                    }
                ]
            }
        },

        exec: {
            npm_install: 'npm install',
            compass_install: 'gem install compass',
            bower_install: 'bower install',
            artisan_cache_clear: {
                cwd: path.join(process.cwd(), '/../../'),
                cmd: 'php artisan cache:clear'
            }
        },

        availabletasks: {
            all: {},
            user: {
                options: {
                    showTasks: ['user']
                }
            }
        },

        notify: {
            options: {
                enabled: false
            },
            build_finish: {
                options: {
                    message: 'Build finished'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            grunt: {
                src: ['Gruntfile.js']
            },
            theme: {
                src: ['<%= dirs.src.javascript %>/**/*.js']
            }
        }

    };

    //---

    grunt.config.init(config);

    //---

    grunt.loadNpmTasks('grunt-available-tasks');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-newer');

    //---

    grunt.registerTask('debug', 'Debug task.', function () {
        console.log(JSON.stringify(env, null, 2));
        console.log(JSON.stringify(config, null, 2));
        console.log(JSON.stringify(process.env, null, 2));
    });

    //---

    grunt.registerTask('tasks', ['availabletasks']);
    grunt.registerTask('default', ['tasks']);
    grunt.registerTask('vendor_install', ['exec:npm_install', 'exec:bower_install'/*, 'exec:compass_install'*/]);

    // [BUILD]
    grunt.registerTask('build', [
        'vendor_install',
        'jshint:theme',
        'clean:base', 'clean:images',
        'copy:assets',
        'imagemin',
        'uglify:dist',
        'build_css'
    ]);
    grunt.registerTask('build_css', ['compass:dist', 'autoprefixer']);
    grunt.registerTask('build_img', ['clean:images', 'imagemin']);

    // dev
    grunt.registerTask('build_dev', [
        'jshint:theme',
        'clean:base', 'clean:images',
        'copy:assets',
        'imagemin',
        'uglify:dev',
        'compass:dev',
        'autoprefixer'
    ]);
    grunt.registerTask('build_dev_watch',
        ['build_dev', 'exec:artisan_cache_clear', 'watch']
    );

}
