/**
 * Created by danial on 7/27/16.
 */
var core = (function(){
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    function core_function(){
        main_page();
        load_login();
        add_phone();

    }
    function load_login() {
        $("#sign_in").click(function(a){
            $("#content_header").removeClass("fade-handel");
            $("#content_body").removeClass("fade-handel");
            $.ajax({
                url:'/login',
                type: 'GET',
                success : function(html){
                    $("#content_body").addClass("fade-handel");
                    $("#content_body").html(html);
                    $("#content_header").addClass("fade-handel");
                    $("#content_header").html("ورود");
                }
            });
        });
    }
    function main_page() {
        $("#main_page").click(function(a){
            $("#content_header").removeClass("fade-handel");
            $("#content_body").removeClass("fade-handel");
            $.ajax({
                url:'/',
                type: 'GET',
                success : function(html){
                    $("#content_body").addClass("fade-handel");
                    $("#content_body").html(html);
                    $("#content_header").addClass("fade-handel");
                    $("#content_header").html("لیست تماس های ضروری");
                }
            });
        });
    }
    function add_phone() {
        $("#add_phone").click(function(a){
            $("#content_header").removeClass("fade-handel");
            $("#content_body").removeClass("fade-handel");
            $.ajax({
                url:'/add_phone',
                type: 'GET',
                success : function(html){
                    $("#content_body").addClass("fade-handel");
                    $("#content_body").html(html);
                    $("#content_header").addClass("fade-handel");
                    $("#content_header").html("اضافه کردن شماره تلفن");
                    save_phone_data();
                }
            });
        });
    }
    function save_phone_data() {
        var all_request = null;
        if(all_request != null)all_request.abort();
        $("#add_phone_data").validate({
            submitHandler: function() {
                var _data = $("#add_phone_data").serializeObject();
                all_request = $.ajax({
                    url : '/add_phone',
                    type : 'POST',
                    data : _data,
                    success : function(ok){
                        if(ok == true){
                            toastr.success("Waiting for admin approval",":)");
                        }
                        else toastr.error("اطلاعات صحیح نمی باشد.","خطا");
                    },
                    error : function(err){
                        if(err.status == 500)
                            toastr.error( "اشکال داخلی سرور","خطا");
                    }

                });
            },
            errorClass:"errors",
            errorPlacement: function (error, element){
                return false;
            },
            highlight: function(element, errorClass) {
                $(element).parent().addClass("has-error");
                $(element).fadeOut(function() {
                    $(element).fadeIn();
                });

            },
            unhighlight: function(element) { // <-- fires when element is valid
                $(element).parent().removeClass("has-error").addClass('has-success');
            }
        });
    }
    return{
        _core: core_function
    };
})();
$(document).ready(function(){
    core._core();
});