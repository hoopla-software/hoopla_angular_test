'use strict';

angular.module('hooplaAngularTest')
  .controller('indivMetricsCtrl', function($scope, $timeout, Metric, Globals) {
    $scope.metric = Globals.title;
    $scope.cancel = cancel;
    $scope.submit = submit;
    $scope.users = (state.indivMetrics.length > 0 && state.title === Globals.title) ? state : Globals;
    $scope.editItem = editItem;
    $scope.ifNoValueCreateValue = ifNoValueCreateValue;
    $scope.editing = false;
    $scope.user = null;

    $timeout(function() {
      noValueSetChecker();
    }, 250);

    Array.prototype.diff = function(a) {
      return this.filter(function(i) {
        return a.indexOf(i) < 0;
      });
    };

    function ifNoValueCreateValue(userObj, inputValue) {
      if(userObj.value !== null) {
        $scope.editing = null;
        return;
      }
      userObj.metric = Globals.indivMetrics[0].metric.href + '/values';
      Metric.createMetricValue(userObj, inputValue).then(function(response) {
        $timeout(function() {
          userObj.value = response.data.value;
          Globals.indivMetrics.forEach(function(personObj) {
            if (userObj.name === personObj.name) {
              personObj.value = response.data.value;
              state = jQuery.extend(true, {}, Globals);
            }
          });
        });
      });
      $scope.editing = null;
    }

    function editItem(user, $index) {
      $scope.editing = $index + 'z';
      $scope.user = user;
    }

    function cancel() {
      $scope.editing = null;
    }

    function submit(user, value) {
      if (!value) {
        $scope.editing = null;
      } else {
        user.value = parseInt(value);
        Metric.test(user).then(function(response) {
          for (var i = 0; i < Globals.names.length; i++) {
            if (Globals.names[i].href === response.data.owner.href) {
              response.data.name = Globals.names[i].name;
            }
          }
          $timeout(function() {
            user.value = response.data.value;
            Globals.indivMetrics.forEach(function(personObj) {
              if (user.name === personObj.name) {
                personObj.value = response.data.value;
                state = jQuery.extend(true, {}, Globals);
              }
            });
          });
          $scope.editing = null;
        });
      }
    }

    function noValueSetChecker() {
      var metricNameHolder = [];
      for (var x = 0; x < Globals.indivMetrics.length; x++) {
        metricNameHolder.push(Globals.indivMetrics[x].name);
      }
      var nameHolder = Globals.names.map(function(indiv) {
        if (indiv.name.indexOf(Globals.indivMetrics) === -1) {
          return indiv.name;
        }
      });
      var noValueUserMetrics = nameHolder.diff(metricNameHolder);
      for (var i = 0; i < noValueUserMetrics.length; i++) {
        for (var j = 0; j < Globals.names.length; j++) {
          if (Globals.names[j].name === noValueUserMetrics[i]) {
            Globals.indivMetrics.push({
              'name': noValueUserMetrics[i],
              'value': null,
              'href': Globals.names[j].href
            });
          }
        }
        $scope.$apply();
      }
    }
  });
