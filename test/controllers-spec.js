describe('dice : DiceController', function() {
  var DiceController,
      scope,
      $httpBackend;

  beforeEach(module('dice'));
  beforeEach(inject(function($injector, $rootScope, $controller) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/api/roll').respond(200, {
      "db": "FileMaker Pro",
      "backEnd": "PHP/Zend",
      "frontEnd": "ExtJS",
      "vcs": "Perforce"
    });
    $httpBackend.when('GET', '/api/roll/db')
        .respond(200, { "db": "MongoDB" });
    $httpBackend.when('GET', '/api/roll/backEnd')
        .respond(200, { "backEnd": "Node.js/Express" });
    $httpBackend.when('GET', '/api/roll/frontEnd')
        .respond(200, { "frontEnd": "AngularJS" });
    $httpBackend.when('GET', '/api/roll/vcs')
        .respond(200, { "vcs": "Git" });

    scope = $rootScope.$new();

    DiceController = $controller('DiceController', { $scope:scope });
  }));

  describe('reRoll(param)', function() {
    function doRoll(v) {
      scope.reRoll(v);
      $httpBackend.flush();
    }

    it('delivers a new db value when reRoll("db") is called', function() {
      doRoll('db');
      expect(scope.db).toBe('MongoDB');
    });

    it('delivers a new backEnd value when reRoll("backEnd") is called', function() {
      doRoll('backEnd');
      expect(scope.backEnd).toBe('Node.js/Express');
    });

    it('delivers a new frontEnd value when reRoll("frontEnd") is called', function() {
      doRoll('frontEnd');
      expect(scope.frontEnd).toBe('AngularJS');
    });

    it('delivers a new vcs value when reRoll("vcs") is called', function() {
      doRoll('vcs');
      expect(scope.vcs).toBe('Git');
    });

    it('delivers a new set of values when reRoll() is called with no args', function() {
      doRoll();
      expect(scope.db).toBe('FileMaker Pro');
      expect(scope.backEnd).toBe('PHP/Zend');
      expect(scope.frontEnd).toBe('ExtJS');
      expect(scope.vcs).toBe('Perforce');
    });
  });

  describe('vcsReRoll()', function() {
    beforeEach(function() {
      spyOn(scope, 'reRoll');
    });

    it('calls scope.reRoll() when scope.vcsChecked is toggled to false', function() {
      scope.vcsChecked = false;
      scope.vcsReRoll();
      expect(scope.reRoll).toHaveBeenCalled();
    });

    it('does not call scope.reRoll() when scope.vcsChecked is toggled to true', function() {
      scope.vcsChecked = true;
      scope.vcsReRoll();
      expect(scope.reRoll).not.toHaveBeenCalled();
    });
  });
});