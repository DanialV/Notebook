/**
 * Created by danial on 9/20/16.
 */
var user_management = angular.module('user_management',['ngRoute']);
user_management.config(function($routeProvider){
  $routeProvider.when('/user_management',{
    templateUrl:'views/user_management.html',
    controller:function($scope,$http){
      $scope.setActive('usermanagement');
      $scope.HeaderName('مدیریت کاربران');
      $scope.body = 'fade-handel';
      $scope.header = 'fade-handel';
      $scope.user_data = {};
      $scope.edit_user = {};
      $scope._edit_user = {};
      $http({
        url:'/user_management',
        method:'POST',
        data:{}
      }).success(function(res){
        $scope.user_data = res;

      }).error(function(err){
        toastr.error( "اشکال داخلی سرور","خطا");
      });
      $scope.on_change = function(result){
        $scope._edit_user = result;
        $scope.edit_user.first_name = result.first_name;
        $scope.edit_user.last_name = result.last_name;
        $scope.edit_user.username = result.username;
        $scope.edit_user.pervious_username = result.username;
        $scope.edit_user.email = result.email;
        $scope.edit_user.password = '';
        $scope.edit_user.role = result.role.toString();
        $scope.edit_user.repeat_password = '';
        $scope.edit_user._id = result._id;
      }
      $scope.password_check = function(){
        if($scope.edit_user.password == '' && $scope.edit_user.repeat_password == ''){
          $scope.password_validation = '';
        }
        else{
          if($scope.edit_user.password == $scope.edit_user.repeat_password){
            $scope.password_validation = "has-success";
          }
          else{
            $scope.password_validation = "has-error";
          }
        }
      }
      $scope.sendedit = function(){
        if($scope.edit_user.password != $scope.edit_user.repeat_password){
          toastr.error( "رمز عبور و تکرار رمز عبور صحیح وارد نشده اند.",'خطا');
        }
        else{
          $http({
            url:'/edit_user',
            method:'POST',
            data : $scope.edit_user
          }).success(function(res){
              if(res == "ok"){
                var index = $scope.user_data.indexOf($scope._edit_user);
                $scope.user_data[index].first_name = $scope.edit_user.first_name;
                $scope.user_data[index].last_name = $scope.edit_user.last_name;
                $scope.user_data[index].email = $scope.edit_user.email;
                $scope.user_data[index].role = $scope.edit_user.role;
                $scope.user_data[index].username = $scope.edit_user.username;
                toastr["info"]("تغییرات با موفقیت ثبت شد.","ویرایش");
              }
              else if(res == "FError")   toastr.error( "اطلاعات وارد شده قابل قبول نمی باشد.",'خطا');
              else if(res == "UError")   toastr.error( "نام کاربری در سیستم موجود است.",'خطا');
              else if(res == "PError")   toastr.error( "رمز عبور مطابقت ندارد.",'خطا');

          }).error(function(err){
            toastr.error( "اشکال داخلی سرور","خطا");
          });
        }
      }
      $scope.delete_user = function(result){
        $http({
          url:'/deluser',
          method:'POST',
          data:result
        }).success(function(res){
          if(res == "ok"){
            var index = $scope.user_data.indexOf(result);
            $scope.user_data.splice(index,1);
            toastr["warning"]("کاربر با موفقیت حذف شد.","حذف");
          }
        }).error(function(err){
          toastr.error( "اشکال داخلی سرور","خطا");
        });
      }

    }
  });
});
