angular.module('compareApp.controllers', [])

.controller('homepageCtrl', function($scope,$http, $interval,$timeout,GeolocationService ) {
        //       $scope.makeCall = function () {
        //             console.log($scope.mySelectCity+$scope.mySelectSubZone +$scope.mySelectEstablishment )        
        //             if($scope.mySelectCity!='Pune'){
        //                   $scope.norecordsShow = true;

        //             }else{
        //                   $scope.norecordsShow = false;

        //             if($scope.mySelectSubZone!=''){
        //               $scope.url = 'https://developers.zomato.com/api/v2.1/search?entity_id=3207&entity_type=subzone&establishment_type=7&sort=cost&order=asc';
        //             }else{
        //               $scope.url = 'https://developers.zomato.com/api/v2.1/search?entity_id=3207&entity_type=subzone&establishment_type=7&sort=cost&order=asc';
        //             }

        //                           $http({
        //                     method: 'GET',
        //                     url: $scope.url
        //                   }).then(function successCallback(response) {
        //                     $scope.data = response.data.restaurants;
        //                       console.log($scope.data)
        //                     }, function errorCallback(response) {
                              
        //               });

        //           }


        //       }
         var currCity = GeolocationService().then(function (position) {
                	curLat = position.coords.latitude;
                	curLong = position.coords.longitude;
			var geocodeAPIcall = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+curLat+','+curLong+'+&key=AIzaSyAA5F_ufjifzw6LQ8OPjEuGqbsYU4mrAbs';                
                return $http.get(geocodeAPIcall);
            }, function (error) {
                //$rootScope.$apply(function() {
                 console.log(error);
               // });
           }).then(function(resp){
           	var currentLocation={};
           	//console.log(resp.data.results[0].address_components[5].long_name);
           		 for (var ac = 0; ac < resp.data.results[0].address_components.length; ac++)
						    {
						        var component = resp.data.results[0].address_components[ac];

						        switch(component.types[0])
						        {
						            case 'locality':
						                currentLocation['city'] = component.long_name;
						                break;
						            case 'administrative_area_level_1':
						                currentLocation['state'] = component.long_name;
						                break;
						            case 'country':
						                currentLocation['country'] = component.long_name;
						                break;
						        }
						    };
						    console.log(currentLocation['city']);
                $scope.city.selected = {name:currentLocation['city']};
				    return currentLocation['city'];

           },function(error){
           	return 'NoData';
           });

        $scope.city={};
        $scope.cities=[
			        {name: 'Mumbai'},
				    {name: 'Pune'},
				    {name: 'Hyderabad'},
				    {name: 'Surat'}
        ];
         $scope.typeFood_place={};
        $scope.typesCuisines=[
			        {name: 'Bars'},
				    {name: 'Buffet'},
				    {name: 'Desert'},
				    {name: 'Chinese'}
        ];
          $scope.subArea={};
        $scope.subAreas=[
			        {name: 'Wakad'},
				    {name: 'Viman Nagar'},
				    {name: 'Koregaon Park'},
				    {name: 'Shivaji Nagar'}
        ];
  var imgArr = ['https://storage.googleapis.com/zgt-chp-images/Pescado-halfsize.jpg','https://storage.googleapis.com/zgt-chp-images/twisted_root20.jpg','https://storage.googleapis.com/zgt-chp-images/La_Loggia-4.jpg','https://storage.googleapis.com/zgt-chp-images/JaysCheesesteak-4.jpg'];
          var elem = angular.element(document.querySelector('div.backstretch'));            
            elem.find('img').attr('src',imgArr[0]);
            var imgCnt=0;
            var updateImage = function () {
                      
                      if (imgCnt==4) {
                        imgCnt = 0;
                      }
                      elem.find('img').attr('src',imgArr[imgCnt]);
                    imgCnt++;                        

                  }
              
           $interval(updateImage, 3000);


//for image to scale on hover

$scope.img1 = 'css/images/lounge1.jpg';
$scope.modelObj ={};
	$scope.modelObj.addClassToImg = false;
	$scope.modelObj.expandImage = function () {
		$scope.modelObj.addClassToImg = true;
	}
	$scope.modelObj.compressImage = function () {
		$scope.modelObj.addClassToImg = false;
	}
        })