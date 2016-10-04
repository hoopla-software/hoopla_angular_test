'use strict';

angular.module('hooplaAngularTest.models', ['ngResource']);
angular.module('hooplaAngularTest', ['hooplaAngularTest.models','ngAnimate', 'LocalStorageModule', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .constant('Constants', {
    // visit https://app.hoopla.net/configuration/settings to provision a Client ID and Secret.
    'CLIENT_ID'     : '1147a8af-9393-4471-a0d9-956051ad010f',
    'CLIENT_SECRET' : 'EXe+Ddk3XExZd7vH91ty2WINIze9hJ3Lc5qyZ8vHQnc=',
    'API_PREFIX'    : 'https://api.hoopla.net'
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('metrics', {
        url: '/',
        templateUrl: 'app/views/metrics.html',
        controller: 'MetricsCtrl'
      })

      .state('indivMetrics', {
        url: '/indivMetrics',
        templateUrl: 'app/views/indivMetrics.html',
        controller: 'indivMetricsCtrl'
      });

    $urlRouterProvider.otherwise('/');
  });
