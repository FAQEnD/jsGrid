(function() {
    angular.module('myApp', []).controller('gridCtrl', function($scope, $http) {
    	$http.get('users/users.json').success(function(data){
    		$scope.users = data;
    	});
	})
}());