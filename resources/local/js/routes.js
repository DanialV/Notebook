/**
 * Created by danial on 9/5/16.
 */
myapp = angular.module('sadjad118', ['root','add_phone','login','enroll','favorite','user_management','logs']);
myapp.config(function($routeProvider) {
    $routeProvider.otherwise({templateUrl: 'error'})
});
myapp.controller("body_controller",function($scope,$http){
    $scope.toaster = toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2500",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    $http({
      url:'/get_menu',
      type:'GET'
    }).success(function(alldata){
      $scope.menu = alldata.data
      $scope.user_session = alldata.username
      $scope.version = alldata.version
      console.log(version)
    }).error(function(err){
      toastr.error( "اشکال داخلی سرور","خطا");
    });
    $scope.setActive = function(type){
        $scope.loginActive = '';
        $scope.enrollActive = '';
        $scope.addphoneActive = '';
        $scope.favoriteActive = '';
        $scope.usermanagementActive = '';
        $scope.logsActive = '';
        $scope[type+'Active'] = 'active';
    };
    $scope.condtions = null;
    $scope.stu_url = "http://stu.sadjad.ac.ir";
    $scope.sepehr_url = "http://sepehr.sadjad.ac.ir";
    $scope.pooya_url = "http://pooya.sadjad.ac.ir";
    $scope.Header = "جستجوی شماره تلفن"
    $scope.computer_center = "http://sadjad.ac.ir/IT%20center.aspx";
    $scope.HeaderName = function(name){
        $scope.Header = name;
    };
    $scope.logout = function(){
        window.location = '/logout';
    };

});
