var changeuser = angular.module('changeuser',['ngRoute']);
changeuser.config(function($routeProvider){
    $routeProvider.when('/changeuser',{
        templateUrl: 'views/changeuser.html',
        controller : function($scope,$http){
          $scope.HeaderName('تغییر اطلاعات کاربری');
          $scope.body = 'fade-handel';
          $scope.header = 'fade-handel';
          $http({
            url:'/changeuser',
            data: {
              type:"get"
            },
            method:'POST'
          }).success(function(res){
              $scope.user_data = res;
          }).error(function(err){
            toastr.error( "اشکال داخلی سرور","خطا");
          });
        }

    });
})
