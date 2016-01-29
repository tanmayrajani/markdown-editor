var myApp = angular.module('myApp',[]);
myApp.factory('myData',function ($window) {
    return {
        message: function () {
	        return $window.localStorage['stuff'];
        }
    }
});

function EditorCtrl($scope,$window,myData){
    $scope.data = myData;
    $scope.$watch('data.message',function (newval){
        $window.localStorage['stuff'] = newval;
    })
}

function MarkdownRenderCtrl($scope,$location,$element,$compile,myData){
    $scope.data = myData;
    $scope.location = $location;
    $scope.compile = function( newHTML ) {
        newHTML = $compile(newHTML)($scope);
        $element.html('').append(newHTML);
    };

    $scope.$watch('data.message', function (newval, oldval) {
        var $http = angular.injector(['ng']).get('$http');
        $http.post('http://api.github.com/markdown/raw?access_token=' + $scope.location.$$absUrl.substring($scope.location.$$absUrl.indexOf('=')+1),
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
