/**
 * Created by danial on 9/5/16.
 */
myapp = angular.module('sadjad118', ['error','root', 'add_phone', 'login', 'enroll', 'favorite', 'user_management', 'logs']);
myapp.config(function($routeProvider) {
    $routeProvider.otherwise({
        templateUrl: 'views/404.html'
    });
});
myapp.controller("body_controller", function($scope, $http,$location) {
    $scope.error = {};
    $scope.set_permissions = function(permissions){
      $scope.permissions = permissions;
    }
    $scope.set_menu = function(alldata){
      $scope.menu = alldata.data
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
    $http({
        url: '/get_menu',
        type: 'GET'
    }).then(function(alldata) {
        $scope.set_menu(alldata.data);
        $scope.version = alldata.version
    },function(err) {
        toastr.error("اشکال داخلی سرور", "خطا");
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
        $http({
            url: '/logout',
            method: 'GET',

        }).then(function(res) {
            $scope.set_permissions([]);
            $http({
                url: '/get_menu',
                type: 'GET'
            }).then(function(alldata) {
                $scope.set_menu(alldata.data)
                window.location = '/';
            },function(err) {
                toastr.error("اشکال داخلی سرور", "خطا");
            });
        },function(err) {
            toastr.error("اشکال داخلی سرور", "خطا");
        });
    };

});
