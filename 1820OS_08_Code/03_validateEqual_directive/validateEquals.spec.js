describe('validateEquals directive', function () {
    var $scope, modelCtrl, modelValue;
    beforeEach(module('directives'));
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;

        element = $compile('<form name="testForm">\
            <input name="testInput"\
        ng-model="model.testValue"\
        validate-equals="model.compareTo">\
            </form>')($scope);

        modelValue = $scope.model = {testValue: 'same', compareTo: 'same'};
        modelCtrl = $scope.testForm.testInput;
    }));

    describe('model value changes', function () {
        it('should be invalid if the model changes', function () {
            modelValue.testValue = 'different';
            $scope.$digest();
            expect(modelCtrl.$valid).toBeFalsy();
            expect(modelCtrl.$viewValue).toBe(undefined);
        });

        it('should be invalid if the reference model changes', function () {
            modelValue.compareTo = 'different';
            $scope.$digest();
            expect(modelCtrl.$valid).toBeFalsy();
            expect(modelCtrl.$viewValue).toBe(undefined);
        });

        it('should be valid if the modelValue changes to be the same as the reference', function () {
            modelValue.compareTo = 'different';
            $scope.$digest();
            expect(modelCtrl.$valid).toBeFalsy();
            modelValue.testValue = 'different';
            $scope.$digest();
            expect(modelCtrl.$valid).toBeTruthy();
            expect(modelCtrl.$viewValue).toBe('different');
        });

        describe('input value changes', function () {
            it('should be invalid if the input value changes', function () {
                modelCtrl.$setViewValue('different');
                expect(modelCtrl.$valid).toBeFalsy();
                expect(modelValue.testValue).toBe(undefined);
            });

            it('should be valid if the input value changes to be the same as the reference', function () {
                modelValue.compareTo = 'different';
                $scope.$digest();
                expect(modelCtrl.$valid).toBeFalsy();
                modelCtrl.$setViewValue('different');
                expect(modelCtrl.$viewValue).toBe('different');
                expect(modelCtrl.$valid).toBeTruthy();
            });
        });
    });
});