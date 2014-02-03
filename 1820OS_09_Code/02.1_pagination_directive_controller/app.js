var app = angular.module('myApp', ['directives', 'pagination.tpl.html'])
    .controller('myCtrl', function ($scope) {
        $scope.tasks = {pageCount:5, currentPage:2};
    });
