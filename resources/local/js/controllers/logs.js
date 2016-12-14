//TODO: post should work after server logs finised
logs = angular.module('logs',['ngRoute']);
logs.config(function($routeProvider){
  $routeProvider.when('/logs',{
    templateUrl:'views/logs.html',
    controller: function($scope,$http){
      $scope.setActive('logs');
      $scope.HeaderName('لاگ های سرور');
      $scope.body = 'fade-handel';
      $scope.header = 'fade-handel';
      $scope.logs = "";
      // $http({
      //   url:'/logs',
      //   method:'POST'
      // }).success(function(result){
      //   $scope.logs = result;
      // }).error(function(err){
      //   toastr.error( "اشکال داخلی سرور","خطا");
      // });
    }
  })
});
