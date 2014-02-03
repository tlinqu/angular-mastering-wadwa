var app = angular.module('myApp', ['directives'])
    .controller('myCtrl', function ($scope) {
        $scope.tasks = {pageCount:5, currentPage:2};
    });
