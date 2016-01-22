var myApp = angular.module('myApp',[]);
myApp.factory('Data',function ($window) {
    return {message: $window.localStorage['stuff']}
});

function FirstCtrl($scope,$window,Data){
    $scope.data = Data;
    $scope.$watch(
        "data.message",
        function (newval,oldval){
            $window.localStorage['stuff'] = newval;
        })
}

function SecondCtrl($scope,$location,$element,$compile,Data){
    $scope.data = Data;
    $scope.location = $location;
    $scope.compile = function( newHTML ) {
        newHTML = $compile(newHTML)($scope);
        $element.html('').append(newHTML);
    };

    $scope.$watch("data.message", function (newval, oldval) {
        var $http = angular.injector(["ng"]).get("$http");
        $http.post('http://api.github.com/markdown/raw?access_token=' + $scope.location.$$absUrl.substring($scope.location.$$absUrl.indexOf("=")+1),
                newval,
                {headers:{'Content-Type':'text/plain'}})
            .then(function(res){
                $scope.data.dddd = res.data;
                //console.log($scope.data.dddd);
                if(!$scope.data.dddd) return;
                $scope.compile($scope.data.dddd);
            });
    })
}
