angular.module('demo', []).controller("AppCtrl", function ($scope)
{

    $scope.clickHandler = function() {
        $scope.styler = !$scope.styler;
    };

    $scope.contacts = [
        {
            name: 'Marcin Matuła',
            phone:'518102118',
            email:'marqnpl@gmail.com',
            money:'1501'
        },
        {
            name: 'Milena Trela',
            phone:'504304617',
            email:'trelisko@gmail.com',
            money:'278501'
        }
    ];

    $scope.styleDemo = function()
    {
        if(!$scope.styler){
            return;
        }
        return {
            background: 'red',
            fontWeight:'bold'
        };
    }
});
