(function(ng) {
  var dice = ng.module('dice', []);
  dice.controller('DiceController', [
    '$scope', '$http', '$window',
    function($scope, $http) {
      function _roll(param) {
        $http.get('/api/roll' + (param ? '/' + param : '')).success(function(data) {
          ng.extend($scope, data);
        });
      };

      _roll();

      $scope.reRoll = function(param) {
        _roll(param);
      };

      $scope.vcsReRoll = function() {
        if (!$scope.vcsChecked) {
          $scope.reRoll('vcs');
        }
      };
    }
  ]);
}(angular));
