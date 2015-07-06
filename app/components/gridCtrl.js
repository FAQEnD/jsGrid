(function() {


	function calculateAge(birthDate)
	{
		var date = new Date();
		date.setTime(Date.parse(birthDate));
		var userAge = (Date.now() - date)/(1000*60*60*24*365);
		userAge = parseInt(userAge);
		return userAge;
	}

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
	]

    angular.module('myApp', []).controller('gridCtrl', function($scope, $http) {
    	$http.get('http://localhost:2403/users').success(function(data){
    		$scope.users = data;
    		for(var i = 0; i < data.length; i++)
    		{
    			if(data[i]["birthDate"] == undefined) continue;
	    		$scope.users[i].age = calculateAge(data[i]["birthDate"]);;
    		}
    	});

    	$scope.addUser = function(user){
			$http.post('http://localhost:2403/users', {
				login:user.login,
				password:user.password,
				birthDate:user.birthDate,
				registrationDate:user.registrationDate,
			}).success(function(user){
				if(user.birthDate != undefined)
					user.age = calculateAge(user.birthDate);
				$scope.users.push(user);
				console.log($scope.userData.password);
			});
		}

		$scope.removeUser = function(id){
			$http.delete('http://localhost:2403/users/'+id).success(function(user){
				for(var i = 0; i < $scope.users.length; i++)
				{
					if($scope.users[i].id == id)
					{
						$scope.users.splice(i, 1);
						break;
					}
				}
			});
		}

		$scope.updateUser = function(user){
			console.log($scope);

		}

	})

}());