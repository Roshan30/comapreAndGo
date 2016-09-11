angular.module('compareApp.controllers', [])

.controller('homepageCtrl', function($scope, $http, $interval, $timeout, GeolocationService, responseDataFactory,$location) {
   $scope.cityId = '0';
$scope.subAreaId = '0';
$scope.typeFoodId ='0';



  $scope.makeCall = function() {
    // console.log($scope.city.selected)
    // console.log($scope.typeFood_place.selected);
    // console.log($scope.subArea.selected);
   

//console.log($scope.cityId);
    $scope.url = 'data/'+$scope.cityId.toString() +$scope.subAreaId.toString()+ $scope.typeFoodId.toString()+'.json';
    console.log($scope.url);

      $http({
        method: 'GET',
        url: $scope.url
      }).then(function successCallback(response) {
        responseDataFactory.resultArr = response.data.restaurants;
        $location.path('/compare');
      }, function errorCallback(response) {
        console.log(response)
      });

    }


  

  var currCity = GeolocationService().then(function(position) {
    curLat = position.coords.latitude;
    curLong = position.coords.longitude;
    var geocodeAPIcall = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + curLat + ',' + curLong + '+&key=AIzaSyAA5F_ufjifzw6LQ8OPjEuGqbsYU4mrAbs';
    return $http.get(geocodeAPIcall);
  }, function(error) {
    //$rootScope.$apply(function() {
    console.log(error);
    // });
  }).then(function(resp) {
    var currentLocation = {};
    console.log(resp);
    for (var ac = 0; ac < resp.data.results[0].address_components.length; ac++) {
      var component = resp.data.results[0].address_components[ac];

      switch (component.types[0]) {
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
    $scope.city.selected = {
      name: currentLocation['city']
    };
    $scope.city.selected = {name:'Pune',code:'1'};
    return currentLocation['city'];

  }, function(error) {
    return 'NoData';
  });

  $scope.city = {};
  $scope.cities = [
  //{
   // name: 'Mumbai'
  //}, 
  {
    name: 'Pune',
    code: '1'
  }
  //,{
  //   name: 'Hyderabad'
  // }, {
  //   name: 'Surat'
  //}
  ];
  $scope.typeFood_place = {};
  $scope.typesCuisines = [{
    name: 'Bars',
    code: '1'
  }, {
    name: 'Dining Restaurants',
    code: '2'
  }, {
    name: 'Cafes',
    code: '3'
  }, {
    name: 'Club',
    code: '4'
  },
   {
    name: 'Lounge',
    code: '5'
  }];
  $scope.subArea = {};
  $scope.subAreas = [{
    name: 'Wakad',
    code: '1'
  }, {
    name: 'Viman Nagar',
    code: '2'
  }, {
    name: 'Koregaon Park',
    code: '3'
  }, {
    name: 'Kalyani Nagar',
    code: '4'
  }];
$scope.$watch('city.selected', function(newVal , oldVal) {
               $scope.cityId = newVal ? newVal.code: '0';
            });
$scope.$watch('subArea.selected', function(newVal , oldVal) {
               $scope.subAreaId =  newVal ? newVal.code: '0';
            });
$scope.$watch('typeFood_place.selected', function(newVal , oldVal) {
               $scope.typeFoodId =  newVal ? newVal.code: '0';
            });
//   $scope.cityId = $scope.city.selected ? $scope.city.selected.code : '0';
// $scope.subAreaId = $scope.subArea.selected ? $scope.subArea.selected.code : '0';
// $scope.typeFoodId = $scope.typeFood_place.selected ? $scope.typeFood_place.selected.code : '0';

  var imgArr = ['https://storage.googleapis.com/zgt-chp-images/Pescado-halfsize.jpg', 'https://storage.googleapis.com/zgt-chp-images/twisted_root20.jpg', 'https://storage.googleapis.com/zgt-chp-images/La_Loggia-4.jpg', 'https://storage.googleapis.com/zgt-chp-images/JaysCheesesteak-4.jpg'];
  var elem = angular.element(document.querySelector('div.backstretch'));
  elem.find('img').attr('src', imgArr[0]);
  var imgCnt = 0;
  var updateImage = function() {

    if (imgCnt == 4) {
      imgCnt = 0;
    }
    elem.find('img').attr('src', imgArr[imgCnt]);
    imgCnt++;

  }

  $interval(updateImage, 3000);


  //for image to scale on hover

  $scope.img1 = 'css/images/lounge1.jpg';
  $scope.modelObj = {};
  $scope.modelObj.addClassToImg = false;
  $scope.modelObj.expandImage = function() {
    $scope.modelObj.addClassToImg = true;
  }
  $scope.modelObj.compressImage = function() {
    $scope.modelObj.addClassToImg = false;
  }
})
.controller('compareHtmlCtrl',function($scope,responseDataFactory){
      $scope.tableDataFlag = false;
      $scope.dataArr = responseDataFactory.resultArr;
      $scope.model={};
       // console.log($scope.dataArr)
                  $scope.hoverIn = function($event){
                        this.hoverEdit = true;
                    };

                    $scope.hoverOut = function($event){
                      if((angular.element($event.target).find('input').hasClass('ng-empty'))){
                        this.hoverEdit = false;
                      }
                    };
      
$scope.tableArr1={};
$scope.tableArr2={};  
$scope.tableArr3={};
$scope.stateChanged = function($event,selectedArr){
  var checkbox = $event.target;

    var action = (checkbox.checked ? 'add' : 'remove');

          if (action =='add') {

               if (Object.keys($scope.tableArr1).length== 0) {
                      $scope.tableDataFlag = true;
                 angular.copy(selectedArr,$scope.tableArr1);
                 $scope.tableArr1.checkboxId = angular.element(checkbox).attr('id');
               }  else if(Object.keys($scope.tableArr2).length == 0){
                 angular.copy(selectedArr,$scope.tableArr2);
                $scope.tableArr2.checkboxId = angular.element(checkbox).attr('id');

              }else if(Object.keys($scope.tableArr3).length == 0){
                 angular.copy(selectedArr,$scope.tableArr3);
                 $scope.tableArr3.checkboxId = angular.element(checkbox).attr('id');

              }else{
                  $scope.model[angular.element(checkbox).attr('id')]=false;
                  alert('only 3 at a time');  
              }
          } else {
              if (angular.element(checkbox).attr('id') == $scope.tableArr1.checkboxId) {
                  angular.copy($scope.tableArr2,$scope.tableArr1);
                  angular.copy($scope.tableArr3,$scope.tableArr2);
                  $scope.tableArr3={};

              } else if (angular.element(checkbox).attr('id') == $scope.tableArr2.checkboxId) {
                  angular.copy($scope.tableArr3,$scope.tableArr2);
                  $scope.tableArr3={};
                
              }
              else if (angular.element(checkbox).attr('id') == $scope.tableArr3.checkboxId) {
                  $scope.tableArr3 = {};
              }
          }
}

})
.controller('contactCtrl',function($scope){


})
.controller('feedbackCtrl',function($scope){
angular.element('#modal-feedback').modal('show');

});