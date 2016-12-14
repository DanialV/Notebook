/**
 * Created by danial on 9/20/16.
 */
_favorite = angular.module('favorite',['ngRoute']);
_favorite.config(function($routeProvider){
    $routeProvider.when('/favorite',{
       templateUrl:'views/favorite.html',
       controller : function($scope,$http){
           $scope.setActive('favorite');
           $scope.HeaderName('شماره های علاقمند');
           $scope.body = 'fade-handel';
           $scope.header = 'fade-handel';
           $http({
               url:'/favorite',
               method  : 'POST',
               data : {type : "get_data"}
           }).success(function(data){
              // console.log(data);
               $scope.favoriteData = data;
           }).error(function(){
               toastr.error( "اشکال داخلی سرور","خطا");
           });
           $scope.on_delete = function (result) {
               $http({
                   url:'/delfavorite',
                   method  : 'POST',
                   data : result
               }).success(function(){
                   var index = $scope.favoriteData.indexOf(result);
                   $scope.favoriteData.splice(index,1);
                   toastr["warning"]("شماره تلفن از لیست مورد علاقه حذف شد.","حذف");

               }).error(function(){
                   toastr.error( "اشکال داخلی سرور","خطا");
               });
           }

       }
   });
});
