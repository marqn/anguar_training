var app = angular.module('demo', ['ngRoute']);

app.factory('demoService', function demoServiceFactory() {
    return '123cba!!!';
});

app.factory('anotherService', function anotherServiceFactory(demoService) {
    return demoService;
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "pages/contact.html"
        })
        .when('/index', {
            controller: 'indexCtrl',
            templateUrl: 'pages/index.html'
        })
        .when('/test', {
            template: '<h1>Test</h1><a href="#/">Back</a>'
        })
        .when('/add-contact', {
            templateUrl: 'pages/add-contact.html'
        })
        .otherwise({
            template: '<h1>Not Found</h1>'
        });
});


app.controller('indexCtrl', function ($scope, anotherService) {

    $scope.demo = anotherService;
    
    $scope.contacts = [
        {
            name: 'Stefan Autorski',
            phone: '01234543210',
            address: 'al. Inna 12\nKrzyżówkowo\n11-111',
            email: 'steve228uk@gmail.com',
            website: 'stefanautorski.to',
            notes: ''
        },
        {
            name: 'Janko Walski',
            phone: '0123456789',
            address: "ul. Zagadkowa 123\nSzarada Duża\n10-010 Polska",
            email: 'janko@walski.com',
            website: 'http://janko-walski.info',
            notes: 'Kilka słów na temat Janko.'
        }
    ];
});

app.controller('addCtrl', function ($scope) {
    $scope.test = 'addCtrl corp.';
});

app.controller('contactCtrl', function ($scope) {
    $scope.test = 'contactCtrl corp.';
});

app.controller('AppCtrl', function ($scope) {
    $scope.test = 'mqn corps.';
});
