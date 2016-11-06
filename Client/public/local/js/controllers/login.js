/**
 * Created by danial on 9/6/16.
 */
_login = angular.module('login',['ngRoute']);
_login.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login'
        ,controller:function ($scope,$http,$timeout) {
            $scope.setActive('login');
            $scope.HeaderName('ورود');
            $scope.body = 'fade-handel';
            $scope.header = 'fade-handel';
            $scope.user = {};
            $scope.onsubmit = function(){
                $http({
                    method  : 'POST',
                    url     : '/login',
                    data    : $scope.user//forms user object
                })
                    .success(function(data) {
                        if(data == true){
                            toastr.success("خوش آمدید.","ثبت");
                            $timeout(function () {
                                window.location.replace("/");
                            }, 500);
                        }
                        else if (data == "duplicate_username") {
                            toastr.error("نام کاربری یا رمز عبور اشتباه است.","خطا");
                        }
                    })
                    .error(function(err){

                        toastr.error( "اشکال داخلی سرور","خطا");
                    })
            };
        }});
});
