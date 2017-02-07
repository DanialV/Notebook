/**
 * Created by danial on 9/5/16.
 */
myapp = angular.module('sadjad118', ['http_engine', 'error', 'root', 'add_phone', 'login', 'enroll', 'favorite', 'user_management', 'logs']);
myapp.config(function($routeProvider, $qProvider) {
    $routeProvider.otherwise({
        templateUrl: 'views/404.html'
    });
    $qProvider.errorOnUnhandledRejections(false);
});
myapp.controller("body_controller", function($scope, $location, http) {
    $scope.error = {};
    $scope.set_permissions = function(permissions) {
        $scope.permissions = permissions;
    }
    $scope.set_menu = function(alldata) {
        $scope.menu = alldata.data
        console.log($scope.menu);
        $scope.user_session = alldata.username
        $scope.set_permissions(alldata.premissions);
    }
    $scope.toaster = toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2500",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    http.get('/get_menu', {}, function(err, data) {
        if (err) {
            return toastr.error("اشکال داخلی سرور", "خطا");
        }
        $scope.set_menu(data);
        $scope.version = data.version
    });
    $scope.setActive = function(type) {
        $scope.loginActive = '';
        $scope.enrollActive = '';
        $scope.addphoneActive = '';
        $scope.favoriteActive = '';
        $scope.usermanagementActive = '';
        $scope.logsActive = '';
        $scope[type + 'Active'] = 'active';
    };
    $scope.condtions = null;
    $scope.stu_url = "http://stu.sadjad.ac.ir";
    $scope.sepehr_url = "http://sepehr.sadjad.ac.ir";
    $scope.pooya_url = "http://pooya.sadjad.ac.ir";
    $scope.Header = "جستجوی شماره تلفن"
    $scope.computer_center = "http://sadjad.ac.ir/IT%20center.aspx";
    $scope.HeaderName = function(name) {
        $scope.Header = name;
    };
    $scope.logout = function() {
        http.get('/logout', {}, function(err, data) {
            if (err) {
                return toastr.error("اشکال داخلی سرور", "خطا");
            }
            $scope.set_permissions([]);
            http.get('/get_menu', {}, function(err, data) {
                if (err) {
                    return toastr.error("اشکال داخلی سرور", "خطا");
                }
                $scope.set_menu(data)
                window.location = '/';
            });
        });
    };

});
