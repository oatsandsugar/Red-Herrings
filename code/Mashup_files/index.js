var app = angular.module('myApp', []);

/*https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&name=Lobster%20Sushi&key=AIzaSyAs_FeMib3H2O7X5MgKmgVQKmh2xZR8ZwU
*/
/*https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAs_FeMib3H2O7X5MgKmgVQKmh2xZR8ZwU&placeid=ChIJa49ezjCuEmsR01VlxuWaTEg
*/
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.controller('myCtrl', function($scope, $http) {

    $scope.reviews = [];

    /*$http.get('businesses.json').success(function(data) {
       $scope.list_businesses = data;
    });*/

    $scope.list_businesses = ["Big Drop New York City", "40/40 Club", "Spadium", "Lobster Sushi Corp.", "Saffron", "Leverage Agency", "Hippo Trading Corp.", "THE CITY  BAKERY", "Kawa Sushi", "MTA"];

    $scope.getplaceid = function(name) {
        $http({
            method: "GET",
            url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"+
            "location=40.716760,-73.889053&radius=20000&name="+name
            +"&key=AIzaSyAs_FeMib3H2O7X5MgKmgVQKmh2xZR8ZwU"
        }).then(function Success(response){
            //console.log(response.results);
            $scope.getreviews(response.data.results[0].place_id);
        }, function Error(response) {
            console.log("Error in getting placeid");
        })
    };

    $scope.getreviews = function(placeid) {
        //placeid = 'ChIJa49ezjCuEmsR01VlxuWaTEg'
        $http({
            method: "GET",
            url: "https://maps.googleapis.com/maps/api/place/details/json?"+
            "key=AIzaSyAs_FeMib3H2O7X5MgKmgVQKmh2xZR8ZwU&placeid="+ placeid 
        }).then(function Success(response) {
            result = response.data.result;
            if (result.reviews && result.rating) {
                var rev = [];
                for (var i = result.reviews.length - 1; i >= 0; i--) {
                    rev.push(result.reviews[i].text);
                }
                var details = {
                    'name': result.name,
                    'latlong': result.geometry.location,
                    'rating': result.rating,
                    'reviews': rev
                };
                $scope.reviews.push(details);
            }
            else {
                var details = {
                    'name': result.name,
                    'latlong': result.geometry.location,
                    'rating': 0,
                    'reviews': {}
                };
                $scope.reviews.push(details);
            }
            console.log($scope.reviews);
        }, function Error(response) {
            console.log("Error in getting reviews");
        });
    };

    for (var i = $scope.list_businesses.length - 1; i >= 0; i--) {
        $scope.getplaceid($scope.list_businesses[i]);
    };

    var url = 'data:text/json;charset=utf8,' + encodeURIComponent($scope.reviews);
    window.open(url, '_blank');
    window.focus();
});