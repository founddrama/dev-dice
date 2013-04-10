var DiceController = ['$scope', '$http', '$window', function($scope, $http, $window) {
  function _roll(param) {
    $http.get('/api/roll' + (param ? '/' + param : '')).success(function(data) {
      for (var d in data) {
        $scope[d] = data[d];
      }
    });
  }

  _roll();

  $scope.reRoll = function($event, param) {
    if ($event !== null) {
      $event.preventDefault();
    }
    _roll(param);
  }

  $scope.vcsReRoll = function($event) {
    if (!$scope.vcsChecked) {
      $scope.reRoll(null, 'vcs');
    }
  }
}];