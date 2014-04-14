describe("alert", function () {
    var scope, element;

    beforeEach(module('alert-directive'));
    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope;

        element = $compile("<alert type='\"info\"' close='closeHandler()'>Some Message</alert>")(scope);
        // $digest call is required, because 'info' value is set on the scope in the above element
        // Also notice that in the directive isolated scope: type:'='.
        // And close:'&', it doesn't require scope.$digest().
        scope.$digest();

        //element = $compile("<alert type='type' close='closeHandler()'>Some Message</alert>")(scope);
    }));

    it("should set the correct CSS class", function () {
        //scope.type='info';
        //scope.$digest();
        expect(element.hasClass('alert-info')).toBe(true);
    });
    it("should transclude the body text", function () {
        expect(element.find('div').text()).toBe('Some Message');
    });
    it("should fire callback when closed", function () {
        scope.closeHandler = jasmine.createSpy();
        element.find('button')[0].click();
        expect(scope.closeHandler).toHaveBeenCalled();
    });
});