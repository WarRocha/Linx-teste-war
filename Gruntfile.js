module.exports = function(grunt) {
    var config, 
    name, 
    pkg, 
    errorHandler,
    taskArray, 
    taskName, 
    tasks, 
    verbose, 
    _results;

    pkg = grunt.file.readJSON('package.json');
    verbose = grunt.option('verbose');

    errorHandler = function(err, req, res, next) {
        var errString, _ref, _ref1;
        errString = (_ref = (_ref1 = err.code) != null ? _ref1.red : void 0) != null ? _ref : err.toString().red;
        return grunt.log.warn(errString, req.url.yellow);
    };

    config = {
        clean: {
            main: ['build']
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'src/assets/style/',
                    cssDir: 'build/assets/css/',
                    imagesDir: 'src/assets/img/',
                    environment: 'production',
                    sourcemap: false
                }
            }
        },
        csscss: {
            options: {
                colorize: true,
                verbose: true,
                outputJson: false,
                minMatch: 5
            },
            dist: {
                src: ['src/assets/style/**/*.scss']
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/js/',
                    src: ['**/*.js', ],
                    dest: 'build/assets/js/',
                    ext: '.js'
                }]
            }
        },
        imagemin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/assets/img'
                }]
            }
        },
        sprite: {
            all: {
                src: 'src/assets/img/sprite/*.png',
                destImg: 'build/assets/img/linx-sprite-default.png',
                destCSS: 'src/assets/style/_linx-sprite.scss',
                cssFormat: 'scss',
                spriteName: 'all',
                padding: 2,
                imgOpts: { quality: 100 },
                imgPath: (function() {
                    return + '/linx-sprite-default.png?' + Math.random();
                }())
            },

        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/assets',
                        src: '**/*.html',
                        dest: 'build/assets'
                    }
                ]
            }
        },

        watch: {
            options: {
                livereload: 1337
            },
            compass: {
                files: ['src/assets/style/**/*.scss'],
                tasks: ['compass']
            },
            images: {
                files: ['src/assets/img/**/*.{png,jpg,gif}'],
                tasks: ['sprite', 'imagemin']
            },
            css: {
                files: ['build/css/**/*.css']
            },
            js: {
                files: ["src/assets/js/**/*.js"],
                tasks: ["uglify"]
            },
            main: {
                files: ['src/assets/**/*.html'],
                tasks: ['copy']
            }
        },
       
          connect: {
            main: {
                options: {
                    port: 8000,
                    hostname: '*',
                    open: {
                        target: 'http://localhost:8000/build/assets/html/site/index.html'
                    }
                }
            },
          }
    };

    tasks = {
        build: ['clean', 'uglify', 'sprite', 'compass', 'imagemin', 'copy', 'serve'],
        "default": ['build', 'watch','connect:main:keepalive']
    };


    grunt.initConfig(config);
    for (name in pkg.devDependencies) {
        if (name.slice(0, 6) === 'grunt-') {
            grunt.loadNpmTasks(name);
        }
    }

    _results = [];
    for (taskName in tasks) {
        taskArray = tasks[taskName];
        _results.push(grunt.registerTask(taskName, taskArray));
    }
    return _results;

};