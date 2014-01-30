angular.module('mock.Users', []).factory('Users', function() {
    var Users = { };
    Users.query = function(query, response) {
        Users.respondWith = function(emails) {
            response(emails);
            // Comment out the following line is still working
            Users.respondWith = undefined;
        };
    };
    return Users;
});
