angular.module('resource', ['ngResource'])
  .factory('Users', function ($resource) {
    // If there is port number in the url, e.g. http://localhost:8080
    // Because of bug in AngularJS, see http://stackoverflow.com/questions/18758918/cors-with-angular-js-resource-and-servicestack-servies
    // Port number need be escaped,in one of two ways:
    // var Users = $resource('http://localhost\\:8080/users');
    // var Users = $resource('http://localhost:8080\:8080/users');
    var Users = $resource('https://api.mongolab.com/api/1/databases/ascrum/collections/users/:id', {
      apiKey:'4fb51e55e4b02e56a67b0b66',
      id:'@_id.$oid'
    });

    Users.prototype.getFullName = function() {
      return this.firstName + ' ' + this.lastName;
    };

    return Users;
  })
  .controller('ResourceCtrl', function ($scope, Users) {

    $scope.users = Users.query({}, function(users){
      console.log($scope.users.length);
    });

    $scope.remove = function (user) {
      Users['delete']({}, user);
      //user.$delete();
    };

    $scope.add = function () {
      var user = new Users({
        name:'Superhero'
      });
      user.$save();
    };

    $scope.add = function () {
      var user = {
        name:'Superhero'
      };
      Users.save(user);
    };

  });