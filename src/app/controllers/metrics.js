'use strict';

angular.module('hooplaAngularTest')
  .controller('MetricsCtrl', function ($scope, $window, Metric, Globals) {
    var metrics = [];
    $scope.redirect = redirect;
    $scope.grabNames = grabNames;

    Metric.index().then(
      function metricIndexSuccess(response) {
        $scope.metrics = response.data;
        response.data.forEach( function(metric) {
          metrics.push(metric.name);
        });
      },
      function metricIndexError(response) {
        console.log('ERROR FETCHING METRIC INDEX', response);
      }
    );

    function redirect(metric) {
      Globals.title = metric.name;
      Globals.indivMetrics = [];
      Metric.specific(metric.links[0].href).then(
        function metricIndividualSuccess(response) {
          Globals.indivMetrics = response.data;
          Globals.indivMetrics.map(function(person) {
          for(var i = 0; i < Globals.names.length; i++) {
            if(Globals.names[i].href === person.owner.href) {
              person.name = Globals.names[i].name;
            }
          }
          });
        });
    }

    function grabNames() {
      Metric.specific('https://api.hoopla.net/users').then(function(response) {
        var listOfNames = response.data;
        Globals.names = [];
        listOfNames.forEach(function(person) {
          var name = person.first_name + ' ' + person.last_name;
          var link = person.href;
          Globals.names.push({name: name, href: link});
        });

      Globals.indivMetrics.map(function(person) {
        for(var i = 0; i < Globals.names.length; i++) {
          if((person.owner !== undefined) && (Globals.names[i].href === person.owner.href)) {
            person.name = Globals.names[i].name;
          }
        }
        });
      });
    }
  });
