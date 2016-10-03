'use strict';

////
// You can learn all about the Hoopla API at https://developer.hoopla.net/
////
var state = {
  indivMetrics: []
};

angular.module('hooplaAngularTest.models')
  .factory('Globals', function() {
    var service = {
      indivMetrics: [],
      title: '',
      names: []
    };
    // The Hoopla API root returns a set of useful top-level API URLs.
    // Use those URLs rather than assembling your own URLs.
    return service;
  });
