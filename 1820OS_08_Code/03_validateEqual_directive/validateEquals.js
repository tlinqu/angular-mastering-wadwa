angular.module('directives', [])

    .directive('validateEquals', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                function validateEqual(myValue) {
                    var valid = (myValue === scope.$eval(attrs.validateEquals));
                    ngModelCtrl.$setValidity('equal', valid);
                    return valid ? myValue : undefined;
                }

                ngModelCtrl.$parsers.push(validateEqual);
                ngModelCtrl.$formatters.push(validateEqual);
                scope.$watch(attrs.validateEquals, function () {
                    ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                });
            }
        };
    });