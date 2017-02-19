var changeuser = angular.module('changeuser',['ngRoute','http_engine']);
changeuser.config(function($routeProvider){
    $routeProvider.when('/changeuser',{
        templateUrl: 'views/changeuser.html',
        controller : function($scope,http){
          $scope.HeaderName('تغییر اطلاعات کاربری');
          $scope.body = 'fade-handel';
          $scope.header = 'fade-handel';
          http.get('/changeuser',{},function(err,data){
              if(err){
                return toastr.error( "اشکال داخلی سرور","خطا");
              }
              $scope.user_data = data;
          });
        }

    });
})
