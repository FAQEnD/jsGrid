(function() {
    angular.module('myApp', []).controller('gridCtrl', function($scope) {
		$scope.users = [
			{
				name:'Anton', 
				login:'FAQ', 
				password:'3215had1', 
				birthDate:'20/06/1995', 
				registrationDate:'01/05/2015', 
				age:10
			},
			{
				name:'Jeka', 
				login:'Ites', 
				password:'fkak321a', 
				birthDate:'05/01/1996', 
				registrationDate:'01/01/2015', 
				age:10
			}
		];
	})
}());