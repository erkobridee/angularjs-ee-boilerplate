module.exports = (function() {

  var path          = require('path'),
      pkg           = require('../package'),
      karmaConfigs  = require('./karma.config');

  //---

  var config = {};

  //---

  config.root = './';

  //---

  config.paths = {
    src       : 'src',
    build     : '.temp',
    dist      : 'dist',
    reports   : 'tests_out'
  };

  //---

  config.karma = karmaConfigs;

  config.protractor = {
    configFile : 'tools/protractor.config.js',
    tests : {
      all : 'src/**/e2e/**/*.js',
      suites : [
        {name: 'home', files: ['src/app/home/**/tests/e2e/*.spec.js']},
        {name: 'about', files: ['src/app/about/**/tests/e2e/*.spec.js']},
        {name: 'help', files: ['src/app/help/**/tests/e2e/*.spec.js']},
        {name: 'bookmarks', files: ['src/app/bookmarks/**/tests/e2e/*.spec.js']}
      ]
    }
  };

  //---

  config.packages = [
    './package.json'
  ];

  //---

  var bannerTitle = pkg.title || pkg.name;

  config.banner =
    '/*!\n' +
    ' * ' + bannerTitle + '\n' +
    ' * ' + pkg.description + '\n' +
    ' * @license ' + pkg.license + '\n' +
    ' * v' + pkg.version + '\n' +
    ' */\n';

  //---

  config.js = {

    project: {
      lint       : [
        config.paths.src + '/**/*.js',
        '!' + config.paths.src + '/vendor/**/*.js'
      ],
      watch      : [
        config.paths.src + '/**/*.js',
        '!' + config.paths.src + '/vendor/**/*.js',
        '!' + config.paths.src + '/{app,shared}/*{,*/**}/tests/**/*.js'
      ],
      copy2build : [
        config.paths.src + '/**/*.js',
        '!' + config.paths.src + '/require.unit.load.js',
        '!' + config.paths.src + '/vendor/**/*.js',
        '!' + config.paths.src + '/{app,shared}/*{,*/**}/tests/**/*.js'
      ]
    },

    tools: [
      'gulpfile.js',
      'tools/**/*.js',
      '!tools/lib/generate/templates/**/*'
    ]

  };

  //---

  var stylefilename = 'app';

  config.styles = {
    sass: {
      main    : config.paths.src + '/scss/' + stylefilename + '.scss',
      project : config.paths.src + '/{app,scss,shared}/**/*.scss'
    },
    less: {
      main    : config.paths.src + '/less/' + stylefilename + '.less',
      project : config.paths.src + '/{app,less,shared}/**/*.less'
    }
  };

  //---

  config.autoprefixer = {
    browsers: [
      'last 2 versions', 'last 4 Android versions'
    ]
  };

  //---

  config.html = {
    index: config.paths.src + '/index.html',
    files: config.paths.src + '/**/*.html'
  };

  config.htmlmin = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  };

  config.html2js = {
    filename: 'templatesCache.js',
    moduleName: 'templatesCache',
    src: [
      config.paths.src + '/app/**/*.html',
      config.paths.src + '/shared/**/*.html'
    ],
    dest: path.join( config.paths.build, 'app', 'main' )
  };

  //---

  // config.require_deps = 'require.deps.config.js';
  config.require_deps = 'require.config.js';
  config.require = {
    name: 'ng.app',
    // config: path.join(config.paths.src, 'require.config.js'),
    // build: path.join(config.paths.build, 'require.config.js')
    config: path.join(config.paths.src, config.require_deps),
    build: path.join(config.paths.build, config.require_deps)
  };

  //---

  config.webserver = {
    port: 1337,

    // https://github.com/nodejitsu/node-http-proxy#options
    // https://github.com/chimurai/http-proxy-middleware#http-proxy-options
    proxies: [
      {
        host: 'localhost',
        port: 9000,
        context: 'rest'
      }
    ]
  };

  //---

  return config;

})();
