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
        load_login();
    }
    function load_login() {
        $("#sign_in").click(function(a){
            $.ajax({
                url:'/login',
                type: 'GET',
                success : function(login_html){
                    $("#content_body").addClass("fade-handel");
                    $("#content_body").html(login_html);
                    $("#content_header").addClass("fade-handel");
                    $("#content_header").html("ورود");
                }

            });
        });

    }
    return{
        _core: core_function
    };
})();
$(document).ready(function(){
    core._core();
});