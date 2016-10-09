angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController',
		})

		.when('/tab1', {
			templateUrl: 'views/tab1.html',
			controller: 'Tab1Controller',
		})

		.when('/tab2', {
			templateUrl: 'views/tab2.html',
			controller: 'Tab2Controller',
		});

	$locationProvider.html5Mode(true);

}]);