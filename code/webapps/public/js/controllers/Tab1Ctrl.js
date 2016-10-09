angular.module('Tab1Ctrl', []).controller('Tab1Controller', function($scope) {

	$scope.tagline = 'Nothing beats a pocket protector!';

	$scope.$on('$routeChangeSuccess', function($event, next, current){
    	
    		console.log('tab 1 loaded')
    

  });

});