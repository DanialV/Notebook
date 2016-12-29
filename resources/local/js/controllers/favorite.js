/**
 * Created by danial on 9/20/16.
 */
_favorite = angular.module('favorite', ['ngRoute','http_engine']);
_favorite.config(function($routeProvider) {
    $routeProvider.when('/favorite', {
        templateUrl: 'views/favorite.html',
        controller: function($scope, http,$location) {
            if ($scope.permissions.indexOf('favorite_list') == -1) {
                $scope.error.error_status = 403;
                $scope.error.error_message = "اجازه دسترسی به صفحه مورد نظر را ندارید!";
                return $location.path('/error');
            }
            $scope.setActive('favorite');
            $scope.HeaderName('شماره های علاقمند');
            $scope.body = 'fade-handel';
            $scope.header = 'fade-handel';
            http.post('/favorite',{type: "get_data"},function(err,data){
              if(err){
                return toastr.error("اشکال داخلی سرور", "خطا");
              }
              $scope.favoriteData = data;
            });
            $scope.on_delete = function(result) {
                http.post('/delfavorite',result,function(err,data){
                  if(err){
                    return toastr.error("اشکال داخلی سرور", "خطا");
                  }
                  //Todo:data shouldn't be null :|
                  var index = $scope.favoriteData.indexOf(result);
                  $scope.favoriteData.splice(index, 1);
                  toastr["warning"]("شماره تلفن از لیست مورد علاقه حذف شد.", "حذف");
                });
            }

        }
    });
});
