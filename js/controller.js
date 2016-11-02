angular.module('compareApp.controllers', [])
.controller('landingPageCtrl', function($scope ,$location) {
      $('#fullpage').fullpage({
        // sectionsColor: ['#776fce', '#4BBFC3', '#7BAABE', 'whitesmoke'],
        fitToSection: 'true',
        controlArrows:false
      });
      $scope.goToFoodieSection = function (){
          alert('hii');
        //$location.path('/homepage');
      }
      
})
.controller('homepageCtrl', function($scope, $http, $interval, $timeout, GeolocationService, responseDataFactory,$location) {
   $scope.cityId = '0';
$scope.subAreaId = '0';
$scope.typeFoodId ='0';

$scope.numberSelected = function ($select) {
    // clear search text
    $select.search = '';
};

  $scope.makeCall = function() {
    // console.log($scope.city.selected)
    console.log($scope.typeFood_place.selected);
    var countCalls =0;
     var selectedTypeArr = $scope.typeFood_place.selected;
    responseDataFactory.resultArr = [];
    responseDataFactory.selectedTypeArr = [];
    responseDataFactory.selectedArea='';
    responseDataFactory.selectedCity='';

  //console.log($scope.cityId);
  for (var count = 0; count< selectedTypeArr.length ; count++) {
       $scope.url = 'data/'+$scope.cityId.toString() +$scope.subAreaId.toString()+ selectedTypeArr[count].code.toString()+'.json';
    console.log($scope.url);

      $http({
        method: 'GET',
        url: $scope.url
      }).then(function successCallback(response) {
          countCalls++;
        if(responseDataFactory.resultArr.length==0){
            responseDataFactory.resultArr = response.data.restaurants;

        }else{
            for(var arrLen=0;arrLen<response.data.restaurants.length;arrLen++){
                responseDataFactory.resultArr.push(response.data.restaurants[arrLen])

            }
        }
        console.log(responseDataFactory.resultArr);
        if(countCalls == selectedTypeArr.length){
          responseDataFactory.selectedCity = $scope.cityId.toString();
            responseDataFactory.selectedArea = $scope.subAreaId.toString();
            responseDataFactory.selectedTypeArr = selectedTypeArr;
            $location.path('/compare');
        }
       
      }, function errorCallback(response) {
        console.log(response)
      });
  }
   

    }


  

  var currCity = GeolocationService().then(function(position) {
    curLat = position.coords.latitude;
    curLong = position.coords.longitude;
    var geocodeAPIcall = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + curLat + ',' + curLong + '+&key=AIzaSyAA5F_ufjifzw6LQ8OPjEuGqbsYU4mrAbs';
    return $http.get(geocodeAPIcall);
  }, function(error) {
    console.log(error);
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
.controller('compareHtmlCtrl',function($scope,responseDataFactory,$http,GeolocationService){



     
      $scope.tableDataFlag = false;
      $scope.dataArr = responseDataFactory.resultArr;
      responseDataFactory.resultArr = [];

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

$scope.onSelected = function (selectedItem,indexArr) {
  var checkboxIndex;
  for(var index=0;index<$scope.dataArr.length;index++){
        if(selectedItem.name==$scope.dataArr[index].name){
          checkboxIndex = index;
          $scope.model[''+index]= true;
          $scope.hoverIn(angular.element('#'+index));
          

        }
       
  }
   var selectedArrTemp = 'tableArr'+indexArr;
        $scope[selectedArrTemp]={};
        $scope.stateChanged(angular.element('#'+checkboxIndex),selectedItem);
}

$scope.stateChanged = function($event,selectedArr){
 var checkbox ;
 // var action = (checkbox.checked ? 'add' : 'remove');
if ($event.target) {
        checkbox = $event.target;
         var action = (checkbox.checked ? 'add' : 'remove');
} else {
        console.log(angular.element($event[0]).prop('checked'));
         var action = 'add';
} 
   

          if (action =='add') {
               var source = $scope.currentAddress;
               if (Object.keys($scope.tableArr1).length== 0) {
                      $scope.tableDataFlag = true;
                 angular.copy(selectedArr,$scope.tableArr1);
                 $scope.tableArr1.checkboxId = angular.element(checkbox).attr('id');       
                  //console.log($scope.tableArr1.location.address);
                  var destination1 =$scope.tableArr1.location.address;
                  distanceTimeCalc(source,destination1,$scope.tableArr1)


               }  else if(Object.keys($scope.tableArr2).length == 0){
                 angular.copy(selectedArr,$scope.tableArr2);
                $scope.tableArr2.checkboxId = angular.element(checkbox).attr('id');

                var destination2 =$scope.tableArr2.location.address;
                  distanceTimeCalc(source,destination2,$scope.tableArr2)

              }else if(Object.keys($scope.tableArr3).length == 0){
                 angular.copy(selectedArr,$scope.tableArr3);
                 $scope.tableArr3.checkboxId = angular.element(checkbox).attr('id');

                 var destination3 =$scope.tableArr3.location.address;
                  distanceTimeCalc(source,destination3,$scope.tableArr3)

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

  
  $scope.myInterval = 3000;
   $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.slides = [
    {
      image: 'css/images/cafe.jpg',
       text: '1',
      id: 1
    },
    {
      image: 'css/images/Pub.jpg',
      text: '2',
      id: 2
    },
    {
      image: 'css/images/Restaurant.jpeg',
      text: '3',
      id: 3
    },
    {
      image: 'css/images/lounge1.jpg',
      text: '4',
      id: 4
    }
  ];
var currLocation = GeolocationService().then(function(position) {
    console.log(position)
    var curLat = position.coords.latitude;
    var curLong = position.coords.longitude;
    var geocodeAPIcall = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + curLat + ',' + curLong + '+&key=AIzaSyAA5F_ufjifzw6LQ8OPjEuGqbsYU4mrAbs';
    return $http.get(geocodeAPIcall);
  }, function(error) {
    console.log(error);
  }).then(function(resp) {

    console.log(resp);
    if(resp.data){
      $scope.currentAddress = resp.data.results[0].formatted_address;
      console.log($scope.currentAddress);
      
    }




      //console.log(responseDataFactory.selectedTypeArr);
            $scope.noOfArea = false;
            $scope.type1Flag  = false;
            $scope.type2Flag  = false;
            $scope.type3Flag  = false;
            $scope.type4Flag  = false;
            $scope.type5Flag  = false;

             $scope.model ={};
            $scope.model.area = {};
            $scope.model.type1 = {};
            $scope.model.type2 = {};
            $scope.model.type3 = {};
            $scope.model.type4 = {};
            $scope.model.type5 = {};
           
              for(var i = 0; i< responseDataFactory.selectedTypeArr.length;i++){
                  //alert(responseDataFactory.selectedTypeArr[i].code)
                  var elemCheckCotainer = angular.element('li.filterSubMenu[data-typecode="'+responseDataFactory.selectedTypeArr[i].code+'"] .filterParamsBy');
                 var typeSelectedLength = angular.element(elemCheckCotainer).find('input:not(".removeBtn")').length;

                   for (var j=0;j<typeSelectedLength;j++) {
                          var typeSelected = 'type'+responseDataFactory.selectedTypeArr[i].code;
                          var subType = 'subType'+ (j+1);
                          $scope.model[typeSelected][subType] = true;
                    }
              }

           if(responseDataFactory.selectedArea!='0'){
                  var areaSelected = 'area'+responseDataFactory.selectedArea;
                  $scope.model.area[areaSelected] = true;
                }
            $scope.noOfArea = angular.equals({},$scope.model.area) ? false : true;
            $scope.type1Flag = angular.equals({},$scope.model.type1) ? false : true;
            $scope.type2Flag = angular.equals({},$scope.model.type2) ? false : true;
            $scope.type3Flag = angular.equals({},$scope.model.type3) ? false : true;
            $scope.type4Flag = angular.equals({},$scope.model.type4) ? false : true;
            $scope.type5Flag = angular.equals({},$scope.model.type5) ? false : true;

            $scope.areaSelectedNo = Object.keys($scope.model.area).length;
            $scope.type1SelectedNo = Object.keys($scope.model.type1).length;
            $scope.type2SelectedNo = Object.keys($scope.model.type2).length;
            $scope.type3SelectedNo = Object.keys($scope.model.type3).length;
            $scope.type4SelectedNo = Object.keys($scope.model.type4).length;
            $scope.type5SelectedNo = Object.keys($scope.model.type5).length;


             $scope.modifySeachClickFn = function(){
              responseDataFactory.resultArr = [];
                      $scope.tableArr1={};
                      $scope.tableArr2={};  
                      $scope.tableArr3={};
                      $scope.typeArr = [];

                      //console.log($scope.model.area)

                      $scope.subAreaArr = [];
                      for(var properties in $scope.model.area){
                          $scope.subAreaArr.push(properties[properties.length-1])

                      }alert(Object.keys($scope.model.type1).every(function(k){ return $scope.model.type1[k]==true }));  
                      if(Object.keys($scope.model.type1).length>0 && Object.keys($scope.model.type1).every(function(k){ return $scope.model.type1[k]==true })) $scope.typeArr.push('1');
                       if(Object.keys($scope.model.type2).length>0 && Object.keys($scope.model.type).every(function(k){ return $scope.model.type2[k]==true })) $scope.typeArr.push('2');
                       if(Object.keys($scope.model.type3).length>0 && Object.keys($scope.model.type3).every(function(k){ return $scope.model.type3[k]==true })) $scope.typeArr.push('3');
                       if(Object.keys($scope.model.type4).length>0 && Object.keys($scope.model.type4).every(function(k){ return $scope.model.type4[k]==true })) $scope.typeArr.push('4');
                       if(Object.keys($scope.model.type5).length>0 && Object.keys($scope.model.type5).every(function(k){ return $scope.model.type5[k]==true })) $scope.typeArr.push('5');
                      


                      console.log($scope.typeArr);
                      var countCalls = 0;
                      for (var countArea =0 ;countArea< $scope.subAreaArr.length;countArea++) {
                          
                      
                            for (var count = 0; count< $scope.typeArr.length ; count++) {
                                 $scope.url = 'data/'+responseDataFactory.selectedCity+$scope.subAreaArr[countArea]+ $scope.typeArr[count]+'.json';
                              console.log($scope.url);

                                $http({
                                  method: 'GET',
                                  url: $scope.url
                                }).then(function successCallback(response) {
                                    countCalls++;
                                  if(responseDataFactory.resultArr.length==0){
                                      responseDataFactory.resultArr = response.data.restaurants;

                                  }else{
                                      for(var arrLen=0;arrLen<response.data.restaurants.length;arrLen++){
                                          responseDataFactory.resultArr.push(response.data.restaurants[arrLen])

                                      }
                                  }
                                 // console.log(responseDataFactory.resultArr);
                                  if(countCalls == $scope.typeArr.length){
                                    //responseDataFactory.selectedCity = $scope.cityId.toString();
                                     // responseDataFactory.selectedArea = $scope.subAreaId.toString();
                                     // responseDataFactory.selectedTypeArr = selectedTypeArr;
                                    //  $location.path('/compare');
                                    $scope.dataArr = responseDataFactory.resultArr;
                                    console.log($scope.dataArr.length)
                                  }
                                 
                                }, function errorCallback(response) {
                                  console.log(response)
                                });
                          }
                        }


      }


      $scope.removeAlltype = function(removeTypeModel){
          console.log(removeTypeModel);
          for(var pr in removeTypeModel){
              removeTypeModel[pr]=false;
          }

      }
     $scope.toggleOpenFilter = function(event) {
            if(angular.element(event.currentTarget).hasClass('toggle-closed')){
                    angular.element('li.filterSubMenu.toggle-open').removeClass('toggle-open').addClass('toggle-closed'); 
                    angular.element('li.filterSubMenu a.toggle.toggle-open').removeClass('toggle-open').addClass('toggle-closed');
                    angular.element('li.filterSubMenu div.filterParamsBy.open').toggleClass('open').addClass('closed');
                  }
            angular.element(event.currentTarget).parent('li.filterSubMenu').toggleClass('toggle-closed toggle-open');
            angular.element(event.currentTarget).toggleClass('toggle-closed toggle-open');
            angular.element(event.currentTarget).parent('li.filterSubMenu').find('div.filterParamsBy').toggleClass('closed open');

        }

  });

function distanceTimeCalc(source,destination,arr){

    var service = new google.maps.DistanceMatrixService();
                  service.getDistanceMatrix({
                      origins: [source],
                      destinations: [destination],
                      travelMode: google.maps.TravelMode.DRIVING,
                      unitSystem: google.maps.UnitSystem.METRIC,
                      avoidHighways: false,
                      avoidTolls: false
                  }, function (response, status) {
                      if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                          var distance = response.rows[0].elements[0].distance.text;
                          var duration = response.rows[0].elements[0].duration.text;
                          var dvDistance = document.getElementById("dvDistance");
                         arr.distanceCalc = distance;
                          arr.durationCalc = duration;
               
                      } else {
                          alert("Unable to find the distance via road.");
                      }
                  });
}





})
.controller('contactCtrl',function($scope){


})
.controller('feedbackCtrl',function($scope){
angular.element('#modal-feedback').modal('show');

}).controller('bodyCtrl',function($scope){
  $scope.openFlag = false;
      $scope.openSlider = function () {
          if(!$scope.openFlag){
              $scope.openFlag = true;
          } else{
            $scope.openFlag = false;
          }
      }

      $scope.openSubNav = function(event){
          angular.element(event.target).parent('li').find('ul').addClass('-is-open'); 
      }

});