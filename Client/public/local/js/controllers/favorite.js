/**
 * Created by danial on 9/20/16.
 */
_favorite = angular.module('favorite',['ngRoute']);
_favorite.config(function($routeProvider){
    $routeProvider.when('/favorite',{
       templateUrl:'favorite',
       controller : function($scope){
           $scope.test = kos;
           $scope.setActive('favorite');
           $scope.HeaderName('شماره های علاقمند');
           $scope.body = 'fade-handel';
           $scope.header = 'fade-handel';
           console.log($scope.test);
           $scope.ondelete = function(index){
               console.log(index);
           }

       }
   });
});