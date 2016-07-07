angular.
  module('compareApp',['ui.router','compareApp.controllers','ngSanitize','ui.select','compareApp.directives','comapreApp.services'])
  .config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/homepage");
  //
  // Now set up the states
  $stateProvider
    .state('homepage', {
      url: "/homepage",
      templateUrl: "templates/homepage.html",
      controller: 'homepageCtrl'
    });
    
});