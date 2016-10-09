angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';	
	$scope.$on('$routeChangeSuccess', function(){
    //Here your view content is fully loaded !!
    console.log('home screen loaded')
    starthome();
    
  });
});