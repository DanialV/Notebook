/**
 * Created by danial on 9/8/16.
 */
_enroll = angular.module('enroll', ['ngRoute']);
_enroll.config(function($routeProvider) {
    $routeProvider.when('/enroll', {
        templateUrl: 'views/enroll.html',
        controller: function($scope, $http) {
            $scope.setActive('enroll');
            $scope.HeaderName('ثبت نام');
            $scope.body = 'fade-handel';
            $scope.header = 'fade-handel';
            $scope.user = {};
            $scope.onsubmit = function() {
                $http({
                    method: 'POST',
                    url: '/enroll',
                    data: $scope.user //forms user object
                }).then(function(data) {
                    if (data == "ok") {
                        toastr.success("اطلاعات کاربر با موفقیت ثبت شد.", "ثبت");
                        $scope.user.name = "";
                        $scope.user.last_name = "";
                        $scope.user.username = "";
                        $scope.user.email = "";
                        $scope.user.password = "";
                    } else if (data == "duplicate_username") {
                        toastr.error("نام کاربر در سیستم موجود است.", "خطا");
                    } else if (data == "duplicate_email")
                        toastr.error("پست الکرونیکی در سیستم موجود است", "خطا");
                }, function(err) {
                    toastr.error("اشکال داخلی سرور", "خطا");
                });
            }
        }
    })
});
