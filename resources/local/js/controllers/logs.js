//TODO: post should work after server logs finised
logs = angular.module('logs', ['ngRoute', 'http_engine']);
logs.config(function($routeProvider) {
    $routeProvider.when('/logs', {
        templateUrl: 'views/logs.html',
        controller: function($scope, $http, $location) {
            if ($scope.permissions.indexOf('system_logs') == -1) {
                $scope.error.error_status = 403;
                $scope.error.error_message = "اجازه دسترسی به صفحه مورد نظر را ندارید!";
                return $location.path('/error');
            }
            $scope.setActive('fa fa-cogs');
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
