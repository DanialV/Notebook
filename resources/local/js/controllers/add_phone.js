/**
 * Created by danial on 9/6/16.
 */
_add_phone = angular.module('add_phone',['ngRoute']);
_add_phone.config(function ($routeProvider) {
    $routeProvider.when('/add_phone',{
            templateUrl: 'views/add_phone.html',
            controller:function($scope,$http,$location){
                if($scope.permissions.indexOf('add_phone') == -1){
                  $scope.error.error_status = 403;
                  $scope.error.error_message = "اجازه دسترسی به صفحه مورد نظر را ندارید!";
                  return $location.path('/error');
                }
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
                    }).success(function(data) {
                            if(data == "ok"){
                                toastr.success("اطلاعات کاربر با موفقیت ثبت شد.","ثبت");
                                $scope.user.name = "";
                                $scope.user.departmenet = "";
                                $scope.user.phone_number = "";
                                $scope.user.inside_phone_number = "";
                                $scope.user.email = "";
                                $scope.user.room_number = "";
                            }
                            else if (data == "duplicate_name") {
                                toastr.error("نام کاربر در سیستم موجود است.","خطا");

                            } else if(data == "duplicate_number") {
                                toastr.error("شماره تلفن در سیستم موجود است.","خطا");
                            }
                            else if(data == "duplicate_inside_number"){
                                toastr.error("شماره داخلی در سیستم موجود است.","خطا");
                            }
                        }).error(function(err){
                            if(err.status == 403){
                              toastr.error( "دسترسی غیر مجاز","خطا");
                            }
                            else toastr.error( "اشکال داخلی سرور","خطا");
                        });
                };
            }});
});
