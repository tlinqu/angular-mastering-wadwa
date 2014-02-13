angular.module('httpbasics', [])

    // See this link: http://better-inter.net/enabling-cors-in-angular-js/
    /*
     With AngularJS it was a little more tricky, mainly because information is spread all over the web. Beside the fact that I was trying to implement a service using ngResource to communicate with the API, the following did enable AngularJS to send its requests with the appropriate CORS headers globally for the whole app:
     Just setting useXDomain to true is not enough. AJAX request are also send with the X-Requested-With header, which indicate them as being AJAX. Removing the header is necessary, so the server is not rejecting the incoming request.
     */

    // See this link http://thibaultdenizet.com/tutorial/cors-with-angular-js-and-sinatra/
    /*
     Well, first we told the $http module that we were going to send requests to another domain. We also removed the header used by the browser/server to identify our call as XmlHTTPRequest. Then, we enabled CORS on the server by specifying the available HTTP methods and the allowed origins (in our case, any origin *).

     You probably noticed that we added a new route on our server :

     options '/movie' do

     This is part of the Cross-Origin Resource Sharing specification. Before sending a request to another domain, a call with the HTTP method OPTIONS will be fired. The response to this call will determine if CORS is available or not. This response must contain the allowed origins and the available HTTP methods

     Security notice

     In a production environment, you should not accept any origin of course, you should specify the allowed domain names like this :

     headers 'Access-Control-Allow-Origin' => 'http://localhost:9000, http://localhost:8000'
     You should also keep the default Sinatra protection enabled. However, you may have to disable the http origin security to make CORS calls work with Sinatra.

     set :protection, except: :http_origin
     */

    // See this link http://stackoverflow.com/questions/17756550/angularjs-cors-issues
    /*
     The 'X-Request-With' header is no longer present by default as of Angular 1.2, which might explain why you don't need to use it. –  Holf Dec 24 '13 at 13:52
    */

    // See this link http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource-w
    /*
     When you are using postman they are not restricted by this policy. Quoted from Cross-Origin XMLHttpRequest:

     Regular web pages can use the XMLHttpRequest object to send and receive data from remote servers, but they're limited by the same origin policy. Extensions aren't so limited. An extension can talk to remote servers outside of its origin, as long as it first requests cross-origin permissions.
     */

    // See this link http://www.html5rocks.com/en/tutorials/cors/
    .config(['$httpProvider', function ($httpProvider) {
        // Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        // Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ])

    .controller('HttpBasicsCtrl', function ($scope, $http) {

        $scope.corsQuery = function () {
            // The following url doesn't need $httpProvider oonfigure
            /*$http.get('https://api.mongolab.com/api/1/databases/ascrum/collections/users', {
             params:{
             apiKey:'4fb51e55e4b02e56a67b0b66'
             }})*/
            // But the following one need $httpProvider oonfigure
            // The first request is 502, but he 2nd request will return result
            $http.get('http://jsonp.jit.su/?url=http://jsonview.com/example.json')
                .success(function (data, status, headers, config) {
                    $scope.data = data;
                }).error(function (data, status, headers, config) {
                    throw new Error('Something went wrong...');
                });
        };
    });