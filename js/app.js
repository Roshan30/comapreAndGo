angular.
  module('compareApp',['ui.router','compareApp.controllers','ngSanitize','ui.select','compareApp.directives','comapreApp.services','comapreApp.constants'])
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
    }).state('compare', {
      url: "/compare",
      templateUrl: "templates/compareHtml.html",
      controller: 'compareHtmlCtrl'
    }).state('contact', {
      url: "/contact",
      templateUrl: "templates/contact.html",
      controller: 'contactCtrl'
    }).state('feedback', {
      url: "/feedback",
      templateUrl: "templates/feedback.html",
      controller: 'feedbackCtrl'
    })
    
})
//   .constant('CONSTANTS',{
//   'BAR':'1',
//   'DINING_REATAURANTS':'2',
//   'CAFE':'3',
//   'CLUBS/DISCS':'4',
//   'LOUNGES/SPORTS_BAR':'5',
//   'TRENDING_PLACES':'6'
// })