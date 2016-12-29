/**
 * Created by danial on 9/8/16.
 */
_enroll = angular.module('enroll', ['ngRoute','http_engine']);
_enroll.config(function($routeProvider) {
    $routeProvider.when('/enroll', {
        templateUrl: 'views/enroll.html',
        controller: function($scope, http) {
            $scope.setActive('enroll');
            $scope.HeaderName('ثبت نام');
            $scope.body = 'fade-handel';
            $scope.header = 'fade-handel';
            $scope.user = {};
            $scope.onsubmit = function() {
              http.post('/enroll',$scope.user,function(err,data){
                if(err){
                  return toastr.error("اشکال داخلی سرور", "خطا");
                }
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
              });
            }
        }
    })
});
