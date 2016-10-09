angular.module('Tab2Ctrl', []).controller('Tab2Controller', function($scope) {

	$scope.tagline = 'The square root of life is pi!';	

	$scope.$on('$routeChangeSuccess', function(){
    //Here your view content is fully loaded !!
    console.log('Tab 2 loaded')
  });

});