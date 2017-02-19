//TODO: post should work after server logs finised
logs = angular.module('logs', ['ngRoute', 'http_engine']);
logs.config(function($routeProvider) {
    $routeProvider.when('/logs', {
        templateUrl: 'views/logs.html',
        controller: function($scope, http) {
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
            http.get('/logs', {}, function(err, res) {
                if (err) {
                    return toastr.error("اشکال داخلی سرور", "خطا");
                }
                $scope.info = res.info;
                $scope.error = res.Error;
                $scope.view_logs = res.info;
                $scope.type = 'success';

            });
            $scope.error_fun = function() {
                $scope.view_logs = $scope.error;
                $scope.type = 'danger';
            }
            $scope.info_fun = function() {
                $scope.view_logs = $scope.info;
                $scope.type = 'success';
            }

        }
    })
});
