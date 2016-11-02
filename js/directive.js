angular.module('compareApp.directives', [])

.directive('imageRestDir',function(CONSTANTS,$http,responseDataFactory,$location){
	 //define the directive object
   var directive = {};
   
   //restrict = E, signifies that directive is Element directive
   directive.restrict = 'E';
   
   //template replaces the complete element with its text. 
   directive.templateUrl = "templates/imageRestHtml.html";
   
  // scope is used to distinguish each student element based on criteria.
   directive.scope = {
      image : "@",
      collection : "@",
      cityId : "=",
      subAreaId : "="
   }
   
      //linkFunction is linked with each element with scope to get the element specific data.
      directive.link = function($scope, element, attributes) {

      	$scope.modelObj ={};
	$scope.modelObj.addClassToImg = false;
	$scope.modelObj.expandImage = function () {
		$scope.modelObj.addClassToImg = true;
	}
	$scope.modelObj.compressImage = function () {
		$scope.modelObj.addClassToImg = false;
	}
 $scope.boxClickFunc = function(){
              var foodTypeConst =attributes.collection.split(' ').join('_').toUpperCase();
             var foodTypeCode = CONSTANTS[foodTypeConst];
             //alert(attributes.subarea);
             $scope.url = 'data/'+attributes.city+attributes.subarea+foodTypeCode+'.json';
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

   }
   directive.controller = function ($scope, $element, $attrs) {
           
        }
   return directive;

}).directive('searchGuiFilterDir',function(responseDataFactory){

     //define the directive object
   var directive = {};
   
   //restrict = E, signifies that directive is Element directive
   directive.restrict = 'E';
   
   //template replaces the complete element with its text. 
   directive.templateUrl = "templates/sortTableGUI.html";
   
  // scope is used to distinguish each student element based on criteria.
   directive.scope = {
   }
   
      //linkFunction is linked with each element with scope to get the element specific data.
      directive.link = function($scope, element, attributes) {
          

   }
   directive.controller = function ($scope, $element, $attrs) {
               
              
        }
   return directive;
})