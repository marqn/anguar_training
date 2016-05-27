// var database = firebase.database();
/*database.ref('/').once('value', function(snapshot) {
    console.log(snapshot.val());
});*/



var app = angular.module('demo', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'firebase']);

app.directive('gravatar', function () {
    return {
        restrict: 'AE',
        template: '<img ng-src="{{img}}" class="{{class}}">',
        replace: true,
        link: function (scope, elem, attrs) {
            var md5 = function (s) {
                return s;
            };
            var size = (attrs.size) ? attrs.size : 64;
            scope.img = 'http://gravatar.com/avatar/' + md5(attrs.email) + '?s=' + size;
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

app.factory('contacts', function contactsFactory($firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://contacts-fdca9.firebaseio.com");
    var contactList = $firebaseArray(ref);

    return {
        get: function () {
            return contactList;
        },
        find: function (index) {
            return contactList[index];
        },
        create: function (contact) {
            contactList.$add(contact).then(function(ref) {
                var id = ref.key();
                contactList.$indexFor(id); // returns location in the array
            });
        },
        destroy: function (index) {
            var item = contactList[index];
            contactList.$remove(item).then(function(ref) {
                ref.key() === item.$id; // true
            });
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


app.controller('indexCtrl', function ($scope, contacts, $alert) {

    var deletionAlert = $alert({
        title: 'Sukces!',
        content: "Kontakt został pomyślnie usunięty",
        type: 'success',
        container: '#alertContainer',
        show: false
    });

    $scope.contacts = contacts.get();

    $scope.delete = function (index) {
        contacts.destroy(index);
        deletionAlert.show();
    };

});

app.controller('addCtrl', function ($scope, contacts, $alert) {

    var alert = $alert({
        title: "Sukces!",
        content: "Kontakt został pomyślnie dodany.",
        type: 'success',
        container: '#alertContainer',
        show: false
    });

    $scope.submit = function () {
        contacts.create($scope.contact, alert);
        $scope.contact = null;
        $scope.added = true;
        alert.show();
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

    $scope.pageClass = function (path) {
        return (path == $location.path()) ? 'active' : '';
    };
});

app.controller('demoCtrl', function ($scope, $alert) {
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

    $scope.alertPosition = {
        title: 'Tytuł osadzonego alerta',
        content: 'Treść ostrzeżenia orem ipsum opta sum',
        type: 'danger'
    };

    var alert = $alert({
        title: 'Nagłówek alerta',
        content: 'tresc jakaś tam',
        type: 'danger',
        container: '#alertContainer',
        show: false
    });
    $scope.showAlert = alert.show;
});
