((ng) => {
  const dice = ng.module('dice', []);
  dice.controller('DiceController', [
    '$scope', '$http', '$window',
    ($scope, $http) => {
      const _roll = (param) => {
        $http.get(`/api/roll${param ? `/${param}` : ''}`).success((data) => {
          ng.extend($scope, data);
        });
      };

      _roll();

      $scope.reRoll = (param) => _roll(param);

      $scope.vcsReRoll = () => {
        if (!$scope.vcsChecked) {
          $scope.reRoll('vcs');
        }
      };
    }
  ]);
})(angular);
