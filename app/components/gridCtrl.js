(function() {

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
    	$http.get('users/users.json').success(function(data){
    		$scope.users = data;
    	});
	})
}());