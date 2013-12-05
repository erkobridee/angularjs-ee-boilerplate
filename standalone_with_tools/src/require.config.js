require({

  // libraries dependencies with fallback
  paths: {

    jquery: [
      'vendor/jquery/1.10.2/jquery.min'
    ],

    bootstrap: [
      'vendor/bootstrap/3.0.2/js/bootstrap.min'
    ],

    angular: [
      'vendor/angular.js/1.2.1/angular.min'
    ],

    angular_route: [
      'vendor/angular.js/1.2.1/angular-route.min'
    ],

    angular_resource: [
      'vendor/angular.js/1.2.1/angular-resource.min'
    ],

    angular_animate: [
      'vendor/angular.js/1.2.1/angular-animate.min'
    ],

    ngProgress: [
      'vendor/ngProgress/1.0.3/ngProgress.min'
    ],

    toaster: [
      'vendor/toaster/0.3.0/toaster'
    ]

  },

  // define js scripts dependencies
  shim: {

    'bootstrap': {
      deps: ['jquery']
    },

    'angular': {
      deps: ['bootstrap']
    },

    'angular_route': {
      deps: ['angular']
    },

    'angular_resource': {
      deps: ['angular']
    },

    'angular_animate': {
      deps: ['angular']
    },

    'ngProgress': {
      deps: ['angular']
    },

    'toaster': {
      deps:['angular_animate']
    },


    // require mock dependencies
    'require.mock.config': {
      deps: ['global']
    },
    
    // app require config dependencies
    'app/require.config': {
      deps: [                
        'require.mock.config', // call require mock config
        
        'global',
        'app/bookmarks/require.config'        
      ]
    }
  }

},

['require'], function(require) {

  console.debug('project require.js config');

  // start
  require([
    'shared/components/progressbar/loading/require.config',
    'shared/components/input/utils/require.config',
    'shared/components/pagination/require.config',
    
    'app/require.config'
  ]);

});