var myApp = angular.module('myApp',[]);
myApp.factory('Data',function () {
    return {message: ""}
});

myApp.filter('play',function (Data) {
    return function (text) {
        // code goes here
        return text;
    }
})

function FirstCtrl($scope,Data){
    $scope.data = Data;
}

function SecondCtrl($scope,Data){
    $scope.data = Data;
}