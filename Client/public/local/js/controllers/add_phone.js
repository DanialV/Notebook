/**
 * Created by danial on 9/6/16.
 */
_add_phone = angular.module('add_phone',['ngRoute']);
_add_phone.config(function ($routeProvider) {
    $routeProvider.when('/add_phone',{
            templateUrl: 'add_phone'
            ,controller:function($scope,$http){
                $scope.setActive('addphone');
                $scope.HeaderName('اضافه کردن شماره تلفن');
                $scope.body = 'fade-handel';
                $scope.header = 'fade-handel';
                $scope.user = {};
                $scope.onsubmit = function(){
                    $http({
                        method  : 'POST',
                        url     : '/add_phone',
                        data    : $scope.user//forms user object
                    })
                        .success(function(data) {
                            if(data == "ok"){
                                toastr.success("اطلاعات کاربر با موفقیت ثبت شد.","ثبت");
                                $scope.user.name = "";
                                $scope.user.departmenet = "";
                                $scope.user.phone_number = "";
                                $scope.user.inside_phone_number = "";
                            }
                            else if (data == "duplicate_name") {
                                toastr.error("نام کاربر در سیستم موجود است.","خطا");

                            } else if(data == "duplicate_number") {
                                toastr.error("شماره تلفن در سیستم موجود است.","خطا");
                            }
                            else if(data == "duplicate_inside_number"){
                                toastr.error("شماره داخلی در سیستم موجود است.","خطا");
                            }
                        })
                        .error(function(err){
                            toastr.error( "اشکال داخلی سرور","خطا");
                        })
                    

                };

            }});
});