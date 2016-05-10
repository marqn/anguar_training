angular.module('demo', ['ngRoute']).filter('truncate', function () {
    return function (input, limit) {
        return (input.length > limit) ? input.substr(0, limit) + '...' : input;
    };
}).config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/',
        {
            controller: "indexCtrl",
            templateUrl: "../index.html"
        })
        .when('/add-contact',
        {
            controller:'addCtrl',
            templateUrl:'../add.html'
        })
        .when('contact/:id',
        {
            controller: 'contactCtrl',
            templateUrl: '../contact.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}).controller("AppCtrl", function ($scope) {
    $scope.clickHandler = function () {
        $scope.styler = !$scope.styler;
    };

    $scope.contacts = [
        {
            name: 'Marcin Matuła',
            phone: '518102118',
            email: 'marqnpl@gmail.com',
            money: '1501'
        },
        {
            name: 'Milena Trela',
            phone: '504304617',
            email: 'trelisko@gmail.com',
            money: '278501'
        }
    ];

    $scope.styleDemo = function () {
        if (!$scope.styler) {
            return;
        }
        return {
            background: 'red',
            fontWeight: 'bold'
        };
    }
}).controller('indexCtrl', function ($scope) {

}).controller('addCtrl', function ($scope) {

}).controller('contactCtrl', function($scope, $routeParams) {
    console.log($routeParams)
});
