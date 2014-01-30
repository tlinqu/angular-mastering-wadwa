describe('uniqueEmail directive', function () {
    var $scope, querySpy, Users, testInput;
    beforeEach(module('directives'));
    beforeEach(module('mock.Users'));
    beforeEach(inject(function ($compile, $rootScope, _Users_) {
        $scope = $rootScope;
        Users = _Users_;
        querySpy = spyOn(Users, 'query').andCallThrough();

        element = $compile('<form name="testForm">\
            <input name="testInput"\
        ng-model="model.testValue" unique-email>\
            </form>')($scope);

        $scope.model = {};
        testInput = $scope.testForm.testInput;
    }));

    it('should call Users.query when the view changes', function () {
        testInput.$setViewValue('different');
        expect(Users.query).toHaveBeenCalled();
    });

    it('should set model to invalid if the Users.query response contains users', function () {
        testInput.$setViewValue('different');
        Users.respondWith(['someUser']);
        expect(testInput.$valid).toBe(false);
    });

    it('should set model to valid if the Users.query response contains no users', function () {
        testInput.$setViewValue('different');
        Users.respondWith([]);
        expect(testInput.$valid).toBe(true);
    });

    it('should not call Users.query if the view changes to be the same as the original model', function () {
        $scope.model.testValue = 'admin@abc.com';
        $scope.$digest();
        testInput.$setViewValue('admin@abc.com');
        expect(Users.query).not.toHaveBeenCalled();
        testInput.$setViewValue('other@abc.com');
        expect(Users.query).toHaveBeenCalled();
        querySpy.reset();
        testInput.$setViewValue('admin@abc.com');
        expect(Users.query).not.toHaveBeenCalled();
        $scope.model.testValue = 'other@abc.com';
        $scope.$digest();
        testInput.$setViewValue('admin@abc.com');
        expect(Users.query).toHaveBeenCalled();
    });
});

