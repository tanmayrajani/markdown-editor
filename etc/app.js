var myApp = angular.module('myApp',[]);
myApp.factory('Data',function () {
    return {message: ""}
});

function FirstCtrl($scope,Data){
    $scope.data = Data;
}

function SecondCtrl($scope,$location,Data){
    $scope.data = Data;
    $scope.location = $location;
    $scope.markdwn = function () {
        var $http = angular.injector(["ng"]).get("$http");
        $http.post('http://api.github.com/markdown/raw?access_token=' + $scope.location.$$absUrl.substring($scope.location.$$absUrl.indexOf("=")+1), $scope.data.message , {headers:{'Content-Type':'text/plain'}}).then(function(res){
            $scope.data.dddd = res.data;
            console.log($scope.data.dddd);
            //return Data.dddd;
        });
        return $scope.data.dddd;
    }
}

// Following directive has been pasted from SO answer
//TODO: Understand how this works
myApp.directive('bindHtmlUnsafe', function( $compile ) {
    return function( $scope, $element, $attrs ) {

        var compile = function( newHTML ) { // Create re-useable compile function
            newHTML = $compile(newHTML)($scope); // Compile html
            $element.html('').append(newHTML); // Clear and append it
        };

        var htmlName = $attrs.bindHtmlUnsafe; // Get the name of the variable
                                              // Where the HTML is stored

        $scope.$watch(htmlName, function( newHTML ) { // Watch for changes to
            // the HTML
            if(!newHTML) return;
            compile(newHTML);   // Compile it
        });

    };
});