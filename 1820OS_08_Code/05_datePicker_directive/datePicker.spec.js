describe('simple use on input element', function() {
    var aDate, element, $rootScope;
    beforeEach(module('directives'));
    beforeEach(inject(function($compile, _$rootScope_) {
        aDate = new Date(2010, 12, 1);
        $rootScope = _$rootScope_;
        element = $compile("<input date-picker ng-model='x'/>")($rootScope);
    }));

    var selectDate = function(element, date) {
        element.datepicker('setDate', date);
        $.datepicker._selectDate(element);
    };

    it('should get the date from the model', function() {
        $rootScope.x = aDate;
        $rootScope.$digest();
        expect(element.datepicker('getDate')).toEqual(aDate);
    });

    it('should put the date in the model', function() {
        $rootScope.$digest();
        selectDate(element, aDate);
        expect($rootScope.x).toEqual(aDate);
    });
});