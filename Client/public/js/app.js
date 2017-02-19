myapp=angular.module("sadjad118",["http_engine","error","root","add_phone","login","enroll","favorite","user_management","logs"]),myapp.config(["$routeProvider","$qProvider",function(e,t){e.otherwise({templateUrl:"views/404.html"}),t.errorOnUnhandledRejections(!1)}]),myapp.controller("body_controller",["$scope","$location","http",function(e,t,n){e.error={},e.set_permissions=function(t){return"undefined"==typeof t?e.permissions=[]:void(e.permissions=t)},e.set_menu=function(t){e.menu=t.data,e.user_session=t.username,e.set_permissions(t.premissions)},e.toaster=toastr.options={closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,positionClass:"toast-bottom-right",preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",timeOut:"2500",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"},n.get("/get_menu",{},function(t,n){return t?toastr.error("اشکال داخلی سرور","خطا"):(e.set_menu(n),void(e.version=n.version))}),e.setActive=function(t){e.menu_icon=t},e.condtions=null,e.stu_url="http://stu.sadjad.ac.ir",e.sepehr_url="http://sepehr.sadjad.ac.ir",e.pooya_url="http://pooya.sadjad.ac.ir",e.Header="جستجوی شماره تلفن",e.computer_center="http://sadjad.ac.ir/IT%20center.aspx",e.HeaderName=function(t){e.Header=t},e.logout=function(){n.get("/logout",{},function(t,o){return t?toastr.error("اشکال داخلی سرور","خطا"):(e.set_permissions([]),void n.get("/get_menu",{},function(t,n){return t?toastr.error("اشکال داخلی سرور","خطا"):(e.set_menu(n),void(window.location="/"))}))})},e.external_link=[],n.get("/external_link",{},function(t,n){return t?(console.log(t),toastr.error("اشکال داخلی سرور","خطا")):void(e.external_link=n)}),e.deleteLink=function(t){n.post("/delete_link",t,function(n,o){return n?(console.log(n),toastr.error("اشکال داخلی سرور","خطا")):(toastr.warning("اطلاعات لینک با موفقیت حذف شد."),void e.external_link.splice(e.external_link.indexOf(t),1))})},e.link_submit=function(){n.post("/external_link",e.link,function(t,n){return t?(console.log(t),toastr.error("اشکال داخلی سرور","خطا")):(document.getElementById("close").click(),toastr.success("اطلاعات لینک با موفقیت ذخیره شد."),e.external_link.push(JSON.parse(JSON.stringify(e.link))),void(e.link={}))})}}]);
angular.module("http_engine",["ngRoute"]).service("http",["$http",function(n){this.post=function(t,u,l){n({url:t,method:"POST",data:u}).then(function(n){l(null,n.data)},function(n){l(n,null)})},this.get=function(t,u,l){u=={}&&(u=null),n({url:t,method:"GET",data:u}).then(function(n){l(null,n.data)},function(n){l(n,null)})},this.delete=function(t,u,l){u=={}&&(u=null),n({url:t+"?"+data,method:"DELETE"}).then(function(n){l(null,n.data)},function(n){l(n,null)})}}]);
_login=angular.module("login",["ngRoute","http_engine"]),_login.config(["$routeProvider",function(t){t.when("/login",{templateUrl:"views/login.html",controller:["$scope","http","$timeout","$location",function(t,o,e,n){t.setActive("fa fa-sign-in"),t.HeaderName("ورود"),t.body="fade-handel",t.header="fade-handel",t.user={},t.onsubmit=function(){o.post("/login",t.user,function(e,r){return e?toastr.error("اشکال داخلی سرور","خطا"):void(1==r.status?(t.set_permissions(r.permissions),toastr.success("خوش آمدید.","ثبت"),o.get("/get_menu",{},function(o,e){return o?toastr.error("اشکال داخلی سرور","خطا"):(t.set_menu(e),void n.path("/"))})):0==r.status&&toastr.error("نام کاربری یا رمز عبور اشتباه است.","خطا"))})},t.onforgot=function(){o.post("/forget_password",t.forget_email,function(t,o){return t?0:void toastr.succes("لینک بازیابی اطلاعات با موفقیت به ایمیل شما ارسال شد.")})}}]})}]);
_root=angular.module("root",["ngRoute","angularSpinner","angular-bind-html-compile","http_engine"]),_root.config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/main_content.html",controller:["$scope","http","usSpinnerService",function(e,t,n){e.setActive("fa fa-search"),e.HeaderName("جستجوی شماره تلفن"),e.body="fade-handel",e.header="fade-handel",e._data={},e._data.search="",e.query=[],e.edit_form={},e._edit_form={},e.delete_row=!0,n.stop("spinner"),t.get("/main_content",{},function(t,n){return t?toastr.error("اشکال داخلی سرور","خطا"):void(null!=n&&(n.permissions.indexOf("phone_number")!=-1&&(e.phone_number=!0),n.permissions.indexOf("favorite_list")!=-1&&(e.favorite="<a href='' ng-click='onfavorite(result)'><span class='glyphicon glyphicon-plus' aria-hidden='true' style='color: #ff7224;text-shadow: 1px 1px 1px #ccc;font-size: 1.5em;right: 10px;'></span></a>"),n.permissions.indexOf("edit_phone")!=-1&&(e.edit_buttom="<button type='button' class='btn btn-warning btn-sm' ng-click='onedit(result)' data-toggle='modal' data-target='#myModal'>ویرایش</button>"),n.permissions.indexOf("delete_phone")!=-1&&(e.delete_buttom="<button type='button' class='btn btn-danger btn-sm' ng-click='ondelete(result)'>حذف</button>")))}),e.onsubmit=function(){e.delete_row=!0,n.stop("spinner"),"undefined"!=typeof e._data.search&&(n.spin("spinner"),t.post("/",e._data,function(t,r){return t?(n.stop("spinner"),toastr.error("اشکال داخلی سرور","خطا")):(n.stop("spinner"),void(e.query=r))}))},e.onedit=function(t){e._edit_form=t,e.edit_form.name=t.name,e.edit_form.departmenet=t.departmenet,e.edit_form.phone_number=t.phone_number,e.edit_form.inside_phone_number=t.inside_phone_number,e.edit_form.email=t.email,e.edit_form.room_number=t.room_number,e.edit_form.finder=t._id},e.sendedit=function(){t.post("/editnumber",e.edit_form,function(t,n){if(t)return toastr.error("اشکال داخلی سرور","خطا");var r=e.query.indexOf(e._edit_form);e.query[r].name=e.edit_form.name,e.query[r].departmenet=e.edit_form.departmenet,e.query[r].phone_number=e.edit_form.phone_number,e.query[r].inside_phone_number=e.edit_form.inside_phone_number,e.query[r].email=e.edit_form.email,e.query[r].room_number=e.edit_form.room_number,document.getElementById("close").click(),toastr.info("تغییرات با موفقیت ثبت شد.","ویرایش")})},e.ondelete=function(n){t.post("/deletenumber",n,function(t,r){if(t)return toastr.error("اشکال داخلی سرور","خطا");var o=e.query.indexOf(n);e.query.splice(o,1),toastr.warning("شماره تلفن با موفقیت حذف شد.","حذف")})},e.onfavorite=function(e){var n=e._id,r={id:n,type:"add"};t.post("/favorite",r,function(e,t){return e?toastr.error("اشکال داخلی سرور","خطا"):void(t?toastr.info("شماره تلفن در لیست مورد علاقه ذخیره شد.","ثبت"):toastr.error("این شماره در لیست شما قرار دارد.","خطا"))})}}]})}]);
var error=angular.module("error",["ngRoute"]);error.config(["$routeProvider",function(r){r.when("/error",{templateUrl:"views/error.html"})}]);
_add_phone=angular.module("add_phone",["ngRoute","http_engine"]),_add_phone.config(["$routeProvider",function(e){e.when("/add_phone",{templateUrl:"views/add_phone.html",controller:["$scope","http","$location",function(e,r,o){return e.permissions.indexOf("add_phone")==-1?(e.error.error_status=403,e.error.error_message="اجازه دسترسی به صفحه مورد نظر را ندارید!",o.path("/error")):(e.setActive("fa fa-phone-square"),e.HeaderName("اضافه کردن شماره تلفن"),e.body="fade-handel",e.header="fade-handel",e.user={},void(e.onsubmit=function(){r.post("/add_phone",e.user,function(r,o){return r?403==r.status?toastr.error("دسترسی غیر مجاز","خطا"):toastr.error("اشکال داخلی سرور","خطا"):void("ok"==o?(toastr.success("اطلاعات کاربر با موفقیت ثبت شد.","ثبت"),e.user.name="",e.user.departmenet="",e.user.phone_number="",e.user.inside_phone_number="",e.user.email="",e.user.room_number=""):"duplicate_name"==o?toastr.error("نام کاربر در سیستم موجود است.","خطا"):"duplicate_number"==o?toastr.error("شماره تلفن در سیستم موجود است.","خطا"):"duplicate_inside_number"==o&&toastr.error("شماره داخلی در سیستم موجود است.","خطا"))})}))}]})}]);
_enroll=angular.module("enroll",["ngRoute","http_engine"]),_enroll.config(["$routeProvider",function(e){e.when("/enroll",{templateUrl:"views/enroll.html",controller:["$scope","http",function(e,r){e.setActive("fa fa-user-plus"),e.HeaderName("ثبت نام"),e.body="fade-handel",e.header="fade-handel",e.user={},e.onsubmit=function(){r.post("/enroll",e.user,function(r,o){return r?toastr.error("اشکال داخلی سرور","خطا"):void("ok"==o?(toastr.success("اطلاعات کاربر با موفقیت ثبت شد.","ثبت"),e.user.name="",e.user.last_name="",e.user.username="",e.user.email="",e.user.password=""):"duplicate_username"==o?toastr.error("نام کاربر در سیستم موجود است.","خطا"):"duplicate_email"==o&&toastr.error("پست الکرونیکی در سیستم موجود است","خطا"))})}}]})}]);
_favorite=angular.module("favorite",["ngRoute","http_engine"]),_favorite.config(["$routeProvider",function(e){e.when("/favorite",{templateUrl:"views/favorite.html",controller:["$scope","http","$location",function(e,r,t){return e.permissions.indexOf("favorite_list")==-1?(e.error.error_status=403,e.error.error_message="اجازه دسترسی به صفحه مورد نظر را ندارید!",t.path("/error")):(e.setActive("fa fa-heart"),e.HeaderName("شماره های علاقمند"),e.body="fade-handel",e.header="fade-handel",r.post("/favorite",{type:"get_data"},function(r,t){return r?toastr.error("اشکال داخلی سرور","خطا"):void(e.favoriteData=t)}),void(e.on_delete=function(t){r.post("/delfavorite",t,function(r,o){if(r)return toastr.error("اشکال داخلی سرور","خطا");var a=e.favoriteData.indexOf(t);e.favoriteData.splice(a,1),toastr.warning("شماره تلفن از لیست مورد علاقه حذف شد.","حذف")})}))}]})}]);
var user_management=angular.module("user_management",["ngRoute","http_engine"]);user_management.config(["$routeProvider",function(e){e.when("/user_management",{templateUrl:"views/user_management.html",controller:["$scope","http","$location",function(e,r,s){return e.permissions.indexOf("edit_user")==-1&&e.permissions.indexOf("delete_user")==-1?(e.error.error_status=403,e.error.error_message="اجازه دسترسی به صفحه مورد نظر را ندارید!",s.path("/error")):(e.setActive("fa fa-users"),e.HeaderName("مدیریت کاربران"),e.body="fade-handel",e.header="fade-handel",e.user_data={},e.edit_user={},e._edit_user={},r.get("/user_management",{},function(r,s){return r?toastr.error("اشکال داخلی سرور","خطا"):(e.user_data=s.user_info,void(e.permission_title=s.permission_title))}),e.on_change=function(r){e._edit_user=r,e.edit_user.first_name=r.first_name,e.edit_user.last_name=r.last_name,e.edit_user.username=r.username,e.edit_user.pervious_username=r.username,e.edit_user.email=r.email,e.edit_user.password="",e.edit_user.permissions=r.permissions,e.edit_user.repeat_password="",e.edit_user._id=r._id},e.password_check=function(){""==e.edit_user.password&&""==e.edit_user.repeat_password?e.password_validation="":e.edit_user.password==e.edit_user.repeat_password?e.password_validation="has-success":e.password_validation="has-error"},e.sendedit=function(){e.edit_user.password!=e.edit_user.repeat_password?toastr.error("رمز عبور و تکرار رمز عبور صحیح وارد نشده اند.","خطا"):r.post("/edit_user",e.edit_user,function(r,s){if(r)return 403==r.status?toastr.error("دسترسی غیر مجاز","خطا"):toastr.error("اشکال داخلی سرور","خطا");if("ok"==s){var t=e.user_data.indexOf(e._edit_user);e.user_data[t].first_name=e.edit_user.first_name,e.user_data[t].last_name=e.edit_user.last_name,e.user_data[t].email=e.edit_user.email,e.user_data[t].role=e.edit_user.role,e.user_data[t].username=e.edit_user.username,e.user_data[t].permissions=e.edit_user.permissions,toastr.info("تغییرات با موفقیت ثبت شد.","ویرایش")}else"FError"==s?toastr.error("اطلاعات وارد شده قابل قبول نمی باشد.","خطا"):"UError"==s?toastr.error("نام کاربری در سیستم موجود است.","خطا"):"PError"==s&&toastr.error("رمز عبور مطابقت ندارد.","خطا")})},void(e.delete_user=function(s){r.post("/deluser",s,function(r,t){if(r)return 403==r.status?toastr.error("دسترسی غیر مجاز","خطا"):toastr.error("اشکال داخلی سرور","خطا");if("ok"==t){var a=e.user_data.indexOf(s);e.user_data.splice(a,1),toastr.warning("کاربر با موفقیت حذف شد.","حذف")}})}))}]})}]);
logs=angular.module("logs",["ngRoute","http_engine"]),logs.config(["$routeProvider",function(e){e.when("/logs",{templateUrl:"views/logs.html",controller:["$scope","http",function(e,o){return e.permissions.indexOf("system_logs")==-1?(e.error.error_status=403,e.error.error_message="اجازه دسترسی به صفحه مورد نظر را ندارید!",$location.path("/error")):(e.setActive("fa fa-cogs"),e.HeaderName("لاگ های سرور"),e.body="fade-handel",e.header="fade-handel",e.logs="",o.get("/logs",{},function(o,r){return o?toastr.error("اشکال داخلی سرور","خطا"):(e.info=r.info,e.error=r.Error,e.view_logs=r.info,void(e.type="success"))}),e.error_fun=function(){e.view_logs=e.error,e.type="danger"},void(e.info_fun=function(){e.view_logs=e.info,e.type="success"}))}]})}]);