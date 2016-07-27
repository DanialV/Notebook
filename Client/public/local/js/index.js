/**
 * Created by danial on 7/25/16.
 */
$(document).ready(function(){
    $(function(){
        $(".dropdown").hover(
            function() {
                $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
                $(this).toggleClass('open');
                $('b', this).toggleClass("caret caret-up");
            },
            function() {
                $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
                $(this).toggleClass('open');
                $('b', this).toggleClass("caret caret-up");
            });
    });
    var map =
        [
            "&\#1632;","&\#1633;","&\#1634;","&\#1635;","&\#1636;",
            "&\#1637;","&\#1638;","&\#1639;","&\#1640;","&\#1641;"
        ]

    document.body.innerHTML =
        document.body.innerHTML.replace(
            /\d(?=[^<>]*(<|$))/g,
            function($0) { return map[$0] }
        );
});