describe('pagination directive', function () {
    var $scope, element, lis;
    beforeEach(module('directives'));
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        $scope.numPages = 5;
        $scope.currentPage = 3;
        element = $compile('<pagination num-pages="numPages" current-page="currentPage"></pagination>')($scope);
        $scope.$digest();
        lis = function () {
            return element.find('li');
        };
    }));

    it('has the number of the page as text in each page item',
        function () {
            for (var i = 1; i <= $scope.numPages; i++) {
                expect(lis().eq(i).text().trim()).toEqual('' + i);
            }
        });

    it('sets the current-page to be active', function () {
        var currentPageItem = lis().eq($scope.currentPage);
        expect(currentPageItem.hasClass('active')).toBe(true);
    });

    it('disables "next" if current-page is num-pages', function () {
        $scope.currentPage = 5;
        $scope.$digest();
        var nextPageItem = lis().eq(-1);
        expect(nextPageItem.hasClass('disabled')).toBe(true);
    });

    it('disables "previous" if current-page is 1', function () {
        $scope.currentPage = 1;
        $scope.$digest();
        var prePageItem = lis().eq(0);
        expect(prePageItem.hasClass('disabled')).toBe(true);
    });

    it('changes currentPage if a page link is clicked', function () {
        var page2 = lis().eq(2).find('a').eq(0);
        page2.trigger('click');
        $scope.$digest();
        expect($scope.currentPage).toBe(2);
    });

    it('does not change the current page on "next" click if already at last page', function () {
        var next = lis().eq(-1).find('a');
        $scope.currentPage = 5;
        $scope.$digest();
        next.click();
        $scope.$digest();
        expect($scope.currentPage).toBe(5);
    });

    it('changes the number of items when numPages changes', function () {
        $scope.numPages = 8;
        $scope.$digest();
        expect(lis().length).toBe(10);
        expect(lis().eq(0).text().trim()).toBe('Previous');
        expect(lis().eq(-1).text().trim()).toBe('Next');
    });
});