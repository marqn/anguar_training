var app = angular.module('demo', ['ngRoute']);



app.config(function($routeProvider){
    $routeProvider
      .when('/',{
          templateUrl:"pages/contact.html"
      })
      .when('/index',{
          templateUrl: 'pages/index.html'
      })
      .when('/test',{
          template: '<h1>Test</h1><a href="#/">Back</a>'
      })
      .when('/add-contact',{
          templateUrl: 'pages/add-contact.html'
      })
      .otherwise({
        template: '<h1>Not Found</h1>'
      });
});



app.controller('indexCtrl', function ($scope) {
  $scope.test = 'indexCtrl corp.';
});

app.controller('addCtrl', function ($scope) {
  $scope.test = 'addCtrl corp.';
});

app.controller('contactCtrl', function($scope) {
  $scope.test = 'contactCtrl corp.';
});

app.controller('AppCtrl' , function($scope)
{
  $scope.test = 'mqn corps.';
});
