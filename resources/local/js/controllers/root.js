/**
 * Created by danial on 9/6/16.
 */
//TODO: All logs should change add info logs and error logs
//PLANNING: permissions should change add premission for  see just phone number
_root = angular.module('root',['ngRoute','angularSpinner','angular-bind-html-compile']);
_root.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main_content.html'
        ,controller:function ($scope,$http,usSpinnerService) {
            console.log("check");
            $scope.setActive('');
            $scope.HeaderName('جستجوی شماره تلفن');
            $scope.body = 'fade-handel';
            $scope.header = 'fade-handel';
            $scope._data = {};
            $scope._data.search = "";
            $scope.query = [];
            $scope.edit_form = {};
            $scope._edit_form = {};
            $scope.delete_row = true;
            usSpinnerService.stop('spinner');
            $http({
              url:'/main_content',
              method:'GET'
            }).success(function(data){
                if(data != null){
                  if(data.permissions.indexOf('phone_number') != -1)$scope.phone_number = true;
                  if(data.permissions.indexOf('favorite_list') != -1)
                    $scope.favorite = "<a href='' ng-click='onfavorite(result)'><span class='glyphicon glyphicon-plus' aria-hidden='true' style='color: #ff7224;text-shadow: 1px 1px 1px #ccc;font-size: 1.5em;right: 10px;'></span></a>"
                  if(data.permissions.indexOf('edit_phone') != -1)
                    $scope.edit_buttom = "<button type='button' class='btn btn-warning btn-sm' ng-click='onedit(result)' data-toggle='modal' data-target='#myModal'>ویرایش</button>"
                  if(data.permissions.indexOf('delete_phone') != -1)
                    $scope.delete_buttom="<button type='button' class='btn btn-danger btn-sm' ng-click='ondelete(result)'>حذف</button>"
                }

            }).error(function(err){

            });
            $scope.onsubmit = function(){
                $scope.delete_row = true;
                usSpinnerService.stop('spinner');
                if(typeof $scope._data.search != 'undefined'){
                    usSpinnerService.spin('spinner');
                    $http({
                        method:'POST',
                        url:'/',
                        data:$scope._data
                    }).success(function(data){
                        usSpinnerService.stop('spinner');
                        $scope.query = data;
                    }).error(function(err){
                        usSpinnerService.stop('spinner');
                        toastr.error( "اشکال داخلی سرور","خطا");
                    });
                }
            };
            $scope.onedit = function(specific_user){
                $scope._edit_form = specific_user;
                $scope.edit_form.name = specific_user.name;
                $scope.edit_form.departmenet = specific_user.departmenet;
                $scope.edit_form.phone_number = specific_user.phone_number;
                $scope.edit_form.inside_phone_number = specific_user.inside_phone_number;
                $scope.edit_form.email = specific_user.email;
                $scope.edit_form.room_number = specific_user.room_number;
                $scope.edit_form.finder = specific_user._id;
            };
            $scope.sendedit = function(){
                $http({
                    method : 'post',
                    url:'/editnumber',
                    data : $scope.edit_form
                }).success(function(){
                    var index = $scope.query.indexOf($scope._edit_form);
                    $scope.query[index].name = $scope.edit_form.name;
                    $scope.query[index].departmenet = $scope.edit_form.departmenet;
                    $scope.query[index].phone_number = $scope.edit_form.phone_number;
                    $scope.query[index].inside_phone_number = $scope.edit_form.inside_phone_number;
                    $scope.query[index].email = $scope.edit_form.email;
                    $scope.query[index].room_number = $scope.edit_form.room_number;
                    document.getElementById("close").click();
                    toastr["info"]("تغییرات با موفقیت ثبت شد.","ویرایش");

                }).error(function(err){
                    toastr.error( "اشکال داخلی سرور","خطا");
                }) ;
            };
            $scope.ondelete = function (result) {
                $http({
                    method:'POST',
                    url:'/deletenumber',
                    data:result
                }).success(function(){
                    var index = $scope.query.indexOf(result);
                    $scope.query.splice(index,1);
                    toastr["warning"]("شماره تلفن با موفقیت حذف شد.","حذف");
                }).error(function(){
                    toastr.error( "اشکال داخلی سرور","خطا");
                });
            };
            $scope.onfavorite = function(result){
                var id = result._id;
                $http({
                    url: '/favorite',
                    method: 'post',
                    data: {id: id,
                        type : "add"
                    }
                }).success(function(ok){
                    if(ok)
                        toastr["info"]("شماره تلفن در لیست مورد علاقه ذخیره شد.","ثبت");
                    else
                        toastr.error( "این شماره در لیست شما قرار دارد.","خطا");
                }).error(function(){
                    toastr.error( "اشکال داخلی سرور","خطا");
                });
            };
        }});
});
