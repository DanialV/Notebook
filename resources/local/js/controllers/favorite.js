/**
 * Created by danial on 9/20/16.
 */
_favorite = angular.module('favorite', ['ngRoute']);
_favorite.config(function($routeProvider) {
    $routeProvider.when('/favorite', {
        templateUrl: 'views/favorite.html',
        controller: function($scope, $http,$location) {
            if ($scope.permissions.indexOf('favorite_list') == -1) {
                $scope.error.error_status = 403;
                $scope.error.error_message = "اجازه دسترسی به صفحه مورد نظر را ندارید!";
                return $location.path('/error');
            }
            $scope.setActive('favorite');
            $scope.HeaderName('شماره های علاقمند');
            $scope.body = 'fade-handel';
            $scope.header = 'fade-handel';
            $http({
                url: '/favorite',
                method: 'POST',
                data: {
                    type: "get_data"
                }
            }).then(function(data) {
                // console.log(data);
                $scope.favoriteData = data;
            },function() {
                toastr.error("اشکال داخلی سرور", "خطا");
            });
            $scope.on_delete = function(result) {
                $http({
                    url: '/delfavorite',
                    method: 'POST',
                    data: result
                }).then(function() {
                    var index = $scope.favoriteData.indexOf(result);
                    $scope.favoriteData.splice(index, 1);
                    toastr["warning"]("شماره تلفن از لیست مورد علاقه حذف شد.", "حذف");

                },function() {
                    toastr.error("اشکال داخلی سرور", "خطا");
                });
            }

        }
    });
});
