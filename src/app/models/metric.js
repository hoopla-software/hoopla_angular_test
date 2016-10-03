'use strict';

////
// You can learn all about the Hoopla API at https://developer.hoopla.net/
////

angular.module('hooplaAngularTest.models')
  .factory('Metric', function($http, $q, Root) {
    return {
      index: function index() {
        // find the right value href for the metric index
        var metrics_index_href = null;
        return Root.index().then(
          function rootIndexSuccess(response) {
            response.data.links.forEach(function(link) {
              if (link.rel === 'list_metrics') {
                metrics_index_href = link.href;
              }
            });

            if (!metrics_index_href) {
              // there was a problem finding the URL
              return $q.reject('Cannot get metrics index URL');
            }
            // found the URL, make the request and return the promise
            return $http({
              method: 'GET',
              url: metrics_index_href,
              cache: true
            });
          },
          function rootIndexError(response) {
            return $q.reject(response);
          }
        );
      },
      specific: function specific(href) {
        return $http({
          method: 'GET',
          url: href,
          cache: true
        });
      },

      test: function test(userObj) {
        var input = {};
        Object.assign(input, userObj);
        delete input.name;
        return $http({
          method: 'PUT',
          url: input.href,
          headers: {
            'Content-Type': 'application/vnd.hoopla.metric-value+json'
          },
          data: input,
          cache: true,
        });
      },

      getMetrics: function getMetrics(userObj, value) {

        return $http({
          method: 'POST',
          url: userObj.metric,
          headers: {
            'Content-Type': 'application/vnd.hoopla.metric-value+json'
          },
          data: {
            'owner': {
              'kind': 'user',
              'href': userObj.href
            },
            'value': parseInt(value)
          }
        });
      },

      createMetricValue: function createMetricValue(userObj, value) {

        return $http({
          method: 'POST',
          url: userObj.metric,
          headers: {
            'Content-Type': 'application/vnd.hoopla.metric-value+json'
          },
          data: {
            'owner': {
              'kind': 'user',
              'href': userObj.href
            },
            'value': parseInt(value)
          }
        });
      }
    };
  });
