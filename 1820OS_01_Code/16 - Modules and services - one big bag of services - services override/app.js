// If 'dieselEngine' is defined in root module i.e. app module, it will be used;
// Here dieselEngine are defined in the two modules which have same distance with root module.
// Since cars module is after engines module in ['engines', 'cars'], the dieselEngine in the cars module will be used.
angular.module('app', ['engines', 'cars'])
  .controller('AppCtrl', function ($scope, car) {
    car.start();
  });

angular.module('cars', [])
  .factory('car', function ($log, dieselEngine) {
    return {
      start: function() {
        $log.info('Starting ' + dieselEngine.type);
      }
    };
  })

  .factory('dieselEngine', function () {
    return {
      type: 'custom diesel'
    };
  });

angular.module('engines', [])
  .factory('dieselEngine', function () {
    return {
      type: 'diesel'
    };
  });




