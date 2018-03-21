var app = angular.module('myapp',[]);
app.controller('clientController',function ($scope,$http) {
        $scope.doSearch = function () {
            $http({
                method: 'get',
                url: 'client.json',
                headers: {'Content-Type': 'text/html;charset=UTF-8'}
            }).success(function success(response) {
                console.log(response)
                // alert(response.data.getElementsByName("clients"));
                $scope.client = response;
            });
        }
    }
);

