angular.module('compareApp.directives', [])

.directive('imageRestDir',function(){
	 //define the directive object
   var directive = {};
   
   //restrict = E, signifies that directive is Element directive
   directive.restrict = 'E';
   
   //template replaces the complete element with its text. 
   directive.templateUrl = "templates/imageRestHtml.html";
   
  // scope is used to distinguish each student element based on criteria.
   directive.scope = {
      image : "@"
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
      
   }
   return directive;

})