var error = angular.module('error',['ngRoute']);
error.config(function($routeProvider){
  $routeProvider.when('/error',{
    templateUrl:'views/error.html'
  });
});
