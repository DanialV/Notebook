/**
 * Created by danial on 9/6/16.
 */
_login = angular.module('login', ['ngRoute', 'http_engine']);
_login.config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: function($scope, http, $timeout, $location) {
            $scope.setActive('fa fa-sign-in');
            $scope.HeaderName('ورود');
            $scope.body = 'fade-handel';
            $scope.header = 'fade-handel';
            $scope.user = {};
            $scope.onsubmit = function() {
                http.post('/login', $scope.user, function(err, data) {
                    if (err) {
                        return toastr.error("اشکال داخلی سرور", "خطا");
                    }
                    if (data.status == true) {
                        $scope.set_permissions(data.permissions);
                        toastr.success("خوش آمدید.", "ثبت");
                        http.get('/get_menu', {}, function(err, data) {
                            if (err) {
                                return toastr.error("اشکال داخلی سرور", "خطا");
                            }
                            $scope.set_menu(data);
                            $location.path('/');
                        });
                    } else if (data.status == false) {
                        toastr.error("نام کاربری یا رمز عبور اشتباه است.", "خطا");
                    }
                });
            };
            $scope.onforgot = function() {
                http.post('/forget_password', $scope.forget_email, function(err, data) {
                    if (err) {
                        //Todo:Handel Error
                        return 0
                    }
                    toastr.succes('لینک بازیابی اطلاعات با موفقیت به ایمیل شما ارسال شد.');
                });
            };
        }
    });
});
