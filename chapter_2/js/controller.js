var app = angular.module('demo', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap']);

app.directive('gravatar', function () {
    return {
        restrict: 'AE',
        template:'<img ng-src="{{img}}" class="{{class}}">',
        replace: true,
        link: function (scope, elem, attrs) {
            var md5 = function (s) {
                return s;
            }
            var size = (attrs.size) ? attrs.size : 64;
            scope.img = 'http://gravatar.com/avatar/'+md5(attrs.email)+'?s='+size;
            scope.class = attrs.class;
        }
    };
});

app.directive('editable', function () {
    return {
        restrict: 'AE',
        templateUrl: '../pages/editable.html',
        scope: {
            value: '=editable',
            field: '@fieldType'
        },
        controller: function ($scope) {
            $scope.editor = {
                showing: false,
                value: $scope.value
            };

            $scope.toggleEditor = function () {
                $scope.editor.showing = !$scope.editor.showing;
            };

            $scope.field = ($scope.field) ? $scope.field : 'text';

            $scope.save = function () {
                $scope.value = $scope.editor.value;
                $scope.toggleEditor();
            };
        }
    };
});

app.filter('pharagraph', function () {
    return function (input) {
        return (input) ? input.replace(/\n/g, '<br />') : input;
    }
});

app.factory('contacts', function contactsFactory() {
    var contacts = [
        {
            name: 'Stefan Matuła',
            phone: '01234543210',
            address: 'al. Inna 12\nKrzyżówkowo\n11-111',
            email: 'steve228uk@gmail.com',
            website: 'stefanautorski.to',
            notes: 'uwaga 1'
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

    return {
        get: function () {
            return contacts;
        },
        find: function (index) {
            return contacts[index];
        },
        create: function(contact) {
            contacts.push(contact);
        },
        destroy: function (index) {
            contacts.splice(index, 1);
        }
    };
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/contact/:id', {
            controller: 'contactCtrl',
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
            controller: 'addCtrl',
            templateUrl: 'pages/add-contact.html'
        })
        .otherwise({
            template: '<h1>Not Found</h1>'
        });
});


app.controller('indexCtrl', function ($scope, contacts) {

    $scope.contacts = contacts.get();

    $scope.delete = function (index) {
        contacts.destroy(index);
    };

});

app.controller('addCtrl', function ($scope, contacts) {
    $scope.test = 'addCtrl corp.';

    $scope.submit = function() {
        contacts.create($scope.contact);
        $scope.contact = null;
        $scope.added = true;
    };
});

app.controller('contactCtrl', function ($scope, $routeParams, contacts) {

    $scope.contact = contacts.find($routeParams.id);
});
app.controller('AppCtrl', function ($scope, $location) {
    $scope.test = 'mqn corps.';

    $scope.startSearch = function () {
        $location.patch('/');
    };

    $scope.pageClass = function(path) {
        return (path == $location.path()) ? 'active' : '';
    };


});

app.controller('demoCtrl', function ($scope) {
    $scope.modal = {
        title: 'Modal Title',
        content: 'Modal content'
    };

    $scope.tooltip = {
        title: 'Podpowiedź'
    };

    $scope.popover = {
        title: 'Tytuł',
        content: 'Treść okienka'
    };
    
    $scope.alert = {
        title: 'Tytuł',
        content: 'Treść ostrzeżenia',
        type: 'success'
    };
});
