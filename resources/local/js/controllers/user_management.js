/**
 * Created by danial on 9/20/16.
 */
var user_management = angular.module('user_management', ['ngRoute', 'http_engine']);
user_management.config(function($routeProvider) {
    $routeProvider.when('/user_management', {
        templateUrl: 'views/user_management.html',
        controller: function($scope, http, $location) {
            if ($scope.permissions.indexOf('edit_user') == -1 && $scope.permissions.indexOf('delete_user') == -1) {
                $scope.error.error_status = 403;
                $scope.error.error_message = "اجازه دسترسی به صفحه مورد نظر را ندارید!";
                return $location.path('/error');
            }
            $scope.setActive('fa fa-users');
            $scope.HeaderName('مدیریت کاربران');
            $scope.body = 'fade-handel';
            $scope.header = 'fade-handel';
            $scope.user_data = {};
            $scope.edit_user = {};
            $scope._edit_user = {};
            http.get('/user_management', {}, function(err, data) {
                if (err) {
                    return toastr.error("اشکال داخلی سرور", "خطا");
                }
                $scope.user_data = data.user_info;
                $scope.permission_title = data.permission_title;
            });
            $scope.on_change = function(result) {
                $scope._edit_user = result;

                $scope.edit_user.first_name = result.first_name;
                $scope.edit_user.last_name = result.last_name;
                $scope.edit_user.username = result.username;
                $scope.edit_user.pervious_username = result.username;
                $scope.edit_user.email = result.email;
                $scope.edit_user.password = '';
                $scope.edit_user.permissions = result.permissions;
                $scope.edit_user.repeat_password = '';
                $scope.edit_user._id = result._id;
            }
            $scope.password_check = function() {
                if ($scope.edit_user.password == '' && $scope.edit_user.repeat_password == '') {
                    $scope.password_validation = '';
                } else {
                    if ($scope.edit_user.password == $scope.edit_user.repeat_password) {
                        $scope.password_validation = "has-success";
                    } else {
                        $scope.password_validation = "has-error";
                    }
                }
            }
            $scope.sendedit = function() {
                if ($scope.edit_user.password != $scope.edit_user.repeat_password) {
                    toastr.error("رمز عبور و تکرار رمز عبور صحیح وارد نشده اند.", 'خطا');
                } else {
                    http.post('/edit_user', $scope.edit_user, function(err, data) {
                        if (err) {
                            if (err.status == 403) {
                                return toastr.error("دسترسی غیر مجاز", "خطا");
                            }
                            return toastr.error("اشکال داخلی سرور", "خطا");
                        }
                        if (data == "ok") {
                            var index = $scope.user_data.indexOf($scope._edit_user);
                            $scope.user_data[index].first_name = $scope.edit_user.first_name;
                            $scope.user_data[index].last_name = $scope.edit_user.last_name;
                            $scope.user_data[index].email = $scope.edit_user.email;
                            $scope.user_data[index].role = $scope.edit_user.role;
                            $scope.user_data[index].username = $scope.edit_user.username;
                            $scope.user_data[index].permissions = $scope.edit_user.permissions;
                            toastr["info"]("تغییرات با موفقیت ثبت شد.", "ویرایش");
                        } else if (data == "FError") toastr.error("اطلاعات وارد شده قابل قبول نمی باشد.", 'خطا');
                        else if (data == "UError") toastr.error("نام کاربری در سیستم موجود است.", 'خطا');
                        else if (data == "PError") toastr.error("رمز عبور مطابقت ندارد.", 'خطا');
                    });
                }
            }
            $scope.delete_user = function(result) {
                http.post('/deluser', result, function(err, data) {
                    if (err) {
                        if (err.status == 403) {
                            return toastr.error("دسترسی غیر مجاز", "خطا");
                        }
                        return toastr.error("اشکال داخلی سرور", "خطا");
                    }
                    if (data == "ok") {
                        var index = $scope.user_data.indexOf(result);
                        $scope.user_data.splice(index, 1);
                        toastr["warning"]("کاربر با موفقیت حذف شد.", "حذف");
                    }
                });
            }

        }
    });
});
