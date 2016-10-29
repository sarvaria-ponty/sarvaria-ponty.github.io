module.exports = function(grunt) {
    grunt.initConfig({
        pkg:    grunt.file.readJSON('package.json'),
        banner: '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed MIT\n' +
                ' */\n',
    
        // Cleaing build folder
        
        clean: {
            build: {
                src: [ 'build/**/*' ]
            }
        },

        // Copy project files

        copy: {
            client_locale: {
                expand:     true,
                cwd:        'locale',
                src:        '**',
                dest:       'build/locale'
            }
        },

        // Including JS and CSS
        
        inline: {
            main: {
                src: [ 'build/client/*.html' ]
            }
        },

        // Compressing HTML files
        
        htmlcompressor: {
            main: {
                options: {
                    type:                       'html',
                    'remove-intertag-spaces':   true,
                    'compress-js':              true,
                    'compress-css':             true,
                    'js-compressor':            'closure'
                },
                
                files: [{
                    expand:         true,
                    cwd:            'build/client',
                    src:            ['**/*.html'],
                    dest:           'build/client'
                }]
            },
            post: {
                options: {
                    type:                       'html',
                    'remove-intertag-spaces':   true,
                    'compress-js':              true,
                    'compress-css':             true,
                    'js-compressor':            'closure'
                },
                
                files: [{
                    expand:         true,
                    cwd:            'build/client',
                    src:            ['index.html'],
                    dest:           'build/client'
                }]
            }
        },

        // Vulcanize source code

        vulcanize: {
            default: {
                options: {
                    abspath:        '.',
                    inlineScripts:  true,
                    inlineCss:      true,
                    stripComments:  true
                },
                files: {
                    'build/index.html': 'index.html'
                }
            }
        },

        // Replacing wrong URLs

        replace: {
            final: {
                src:    'build/client/index.html',
                dest:   'build/client/index.html',
                replacements: [{
                    from:   'build/client/',
                    to:     ''
                }]
            }
        },

        // Removing comments

        comments: {
            main: {
                options: {
                    singleline: true,
                    multiline:  true
                },
                src: [ 'build/client/*.html' ]
            }
        },
        
        ftpPut: {
            options: {
                host: 'waws-prod-am2-091.ftp.azurewebsites.windows.net',
                user: 'tandaserver\tandaftp',
                pass: 'TandaFTP123'
            },
            upload: {
                files: {
                    '.': 'build/index.html'
                }
            }
        }
    });

    // Loading grunt plugins
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-stripcomments');
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-htmlcompressor');
    grunt.loadNpmTasks('grunt-vulcanize');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-ftp');

    // Setting the default tasks
    
    //grunt.registerTask('default', ['clean:build', 'copy', 'mkdir', 'inline', 'htmlcompressor:main', 'vulcanize', 'replace', 'comments', 'htmlcompressor:post', 'clean:vulcanize_clean']);
    grunt.registerTask('default', ['clean:build', 'copy', 'vulcanize']);
};
