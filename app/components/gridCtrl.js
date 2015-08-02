'use strict';
(function() {


	function calculateAge(birthDate)
	{
		var date = new Date();
		date.setTime(Date.parse(birthDate));
		var userAge = (Date.now() - date)/(1000*60*60*24*365);
		userAge = parseInt(userAge);
		return userAge;
	}
	function getUserById(scope, id)
	{
		for(var i = 0; i < scope.users.length; i++){
			if(scope.users[i].id == id)
				return i;
		}
	}

	var g_isUpdate = true;
	var g_oldUser = [];

	var dataFormats = 
	[
	    {
	        "Name":"Login",
	        "DataType":"String",
	        "IsRequired":"true"
	    },
	    {
	        "Name":"Password",
	        "DataType":"String",
	        "IsRequired":"false"
	    },
	    {
	        "Name":"BirthDate",
	        "DataType":"Date",
	        "IsRequired":"false"
	    },
	    {
	        "Name":"RegistrationDate",
	        "DataType":"Date",
	        "IsRequired":"false"
	    },
	    {
	        "Name":"Age",
	        "DataType":"Int",
	        "IsRequired":"false",
	        "CalculatedFrom":["BirthDate"],
	        "Calculate":function(birthDate)
	        {
	            var date = new Date();
				date.setTime(Date.parse(birthDate));
				var age = (Date.now() - date)/(1000*60*60*24*365);
				age = parseInt(age);
	        }
	    }
	];
    angular.module('myApp', []).controller('gridCtrl', function($scope, $http) {
    	$http.get('http://localhost:2403/users').success(function(data){
    		$scope.users = data;
    		for(var i = 0; i < data.length; i++)
    		{
    			if(data[i].birthDate === undefined) continue;
	    		$scope.users[i].age = calculateAge(data[i].birthDate);
    		}
    	});

    	$scope.addUser = function(user){
			$http.post('http://localhost:2403/users', {
				login:user.login,
				password:user.password,
				birthDate:user.birthDate,
				registrationDate:user.registrationDate,
			}).success(function(user){
				console.log("User with id "+user.id+" was created");
				if(user.birthDate !== undefined)
					user.age = calculateAge(user.birthDate);
				$scope.users.push(user);
			});
		};

		$scope.removeUser = function(id){
			$http.delete('http://localhost:2403/users/'+id).success(function(user){
				var index = getUserById($scope, id);
				$scope.users.splice(index, 1);
			});
		};

		$scope.updateUser = function(user){
			$http.put('http://localhost:2403/users/'+g_oldUser.id, {
				login:user.login,
				password:user.password,
				birthDate:user.birthDate,
				registrationDate:user.registrationDate,
			}).success(function(user){
				console.log("User with id "+g_oldUser.id+" was updated");
				var index = getUserById($scope, user.id);
				$scope.users[index] = user;
				$scope.users[index].age = calculateAge($scope.users[index].birthDate);
				});
		};

		$scope.checker = function(isUpdate){
			g_isUpdate = isUpdate;
		};

		$scope.show = function(){
			return g_isUpdate;
		};

		$scope.saveUser = function(user){
			g_oldUser = user;
		};

		$scope.fillFields = function(command){
			switch(command){
				case 'update':
					$scope.userData.login = g_oldUser.login;
					$scope.userData.password = g_oldUser.password;
					break;
				case 'create':
					$scope.userData.login = "";
					$scope.userData.password = "";
					break;
			}
		};
	});

}());