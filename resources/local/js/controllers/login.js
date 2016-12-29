/**
 * Created by danial on 9/6/16.
 */
_login = angular.module('login', ['ngRoute']);
_login.config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: function($scope, $http, $timeout, $location) {
            $scope.setActive('login');
            $scope.HeaderName('ورود');
            $scope.body = 'fade-handel';
            $scope.header = 'fade-handel';
            $scope.user = {};
            $scope.onsubmit = function() {
                $http({
                        method: 'POST',
                        url: '/login',
                        data: $scope.user //forms user object
                    })
                    .then(function(data) {
                        if (data.data.status == true) {
                            $scope.set_permissions(data.permissions);
                            toastr.success("خوش آمدید.", "ثبت");
                            $http({
                                url: '/get_menu',
                                type: 'GET'
                            }).then(function(alldata) {
                                $scope.set_menu(alldata.data);
                                $location.path('/');
                            }, function(err) {
                                toastr.error("اشکال داخلی سرور", "خطا");
                            });
                        } else if (data.status == false) {
                            toastr.error("نام کاربری یا رمز عبور اشتباه است.", "خطا");
                        }
                    }, function(err) {
                        toastr.error("اشکال داخلی سرور", "خطا");
                    })
            };
            $scope.onforgot = function() {
                $http({
                    url: '/forget_password',
                    type: 'post',
                    data: {
                        email: $scope.forget_email
                    }
                }).then(function(res) {
                    toastr.succes('لینک بازیابی اطلاعات با موفقیت به ایمیل شما ارسال شد.')
                }, function(err) {

                });
            };
        }
    });
});
