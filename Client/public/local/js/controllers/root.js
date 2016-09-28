/**
 * Created by danial on 9/6/16.
 */
_root = angular.module('root',['ngRoute']);
_root.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'main_content'
        ,controller:function ($scope,$http) {
            $scope.setActive('');
            $scope.HeaderName('جستجوی شماره تلفن');
            $scope.body = 'fade-handel';
            $scope.header = 'fade-handel';
            $scope._data = {};
            $scope.query = [];
            $scope.edit_form = {};
            $scope.delete_row = true;
            $scope.onsubmit = function(){
                $scope.delete_row = true;
                if(typeof $scope._data.search != 'undefined'){
                    $scope._data.search = $scope._data.search.replace(/[\\`|=^#!~&;$%@"<>()+/*,]/g, "");
                    $http({
                        method:'POST',
                        url:'/',
                        data:$scope._data
                    }).success(function(data){
                        $scope.query = data;
                    }).error(function(err){
                        toastr.error( "اشکال داخلی سرور","خطا");
                    });
                }
            };
            $scope.onedit = function(specific_user){
                $scope.edit_form.name = specific_user.name;
                $scope.edit_form.departmenet = specific_user.departmenet;
                $scope.edit_form.phone_number = specific_user.phone_number;
                $scope.edit_form.inside_phone_number = specific_user.inside_phone_number;
                $scope.edit_form.finder = specific_user.phone_number;
            };
            $scope.sendedit = function(){
                $http({
                    method : 'post',
                    url:'/editnumber',
                    data : $scope.edit_form
                }).success(function(){
                    toastr.success("ذخیره شد.","ثبت");

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
                    toastr.success("حذف شد.","ثبت");
                    $scope.delete_row = false;

                }).error(function(){
                    toastr.error( "اشکال داخلی سرور","خطا");
                }) ;
            };
            $scope.onfavorite = function(result){
                var phone_number = result.phone_number;
                $http({
                    url: '/favorite',
                    method: 'post',
                    data: {phone_number: phone_number}
                }).success(function(ok){
                    if(ok)
                        toastr.success("ذخیره شد.","ثبت");
                    else
                        toastr.error( "این شماره در لیست شما قرار دارد.","خطا");
                }).error(function(){
                    toastr.error( "اشکال داخلی سرور","خطا");
                });
            };

        }});
});