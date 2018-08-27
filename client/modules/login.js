"use strict";
function login() {
    var username = $("#username").val(),
        password = $("#password").val();
    console.log(username);
    console.log(password);
    // if(username === "yuqing" && password === "yuqing") {
    //     window.location.href = "index.html";
    // }else {
    //     var info = { 
    //             title: "您好!",
    //             text: "账号或者密码错误！请重试",
    //             image: "",
    //             sticky: false,
    //             time: "",
    //             class_name: ""
    //     };
    //     $.gritter.add(info);
    // }
    if (username === '') {
        notify_warning("提示", "<span style='font-size: large;'>请输入用户名</span>", "stack_bar_top");
        return;
    }
    if (password === '') {
        notify_warning("提示", "<span style='font-size: large;'>请输入密码</span>", "stack_bar_top");
        return;
    }
    $.post(CQ.variable.RESTFUL_URL+"/log_in",{"user_account":username,"user_pwd":password_encode(password)},function(data, status){
        // data=JSON.parse(data);
        console.log(data);
        var userPermissions = {1:['1','4'],2:['1','2'],3:['1','3','5']};
        if(data.success)
        {
            if(data.data.status)
            {
                console.log(data.data.token);
                var userinfo = {};
                userinfo.username = username;
                userinfo.token = data.data.token;
                userinfo.loginTime = (new Date()).getTime();
                userinfo.maxLoginTime = data.data.max_time||CQ.variable.MAX_LOGIN_TIME;
                // userinfo.permissionList = [];
                userinfo.permissionList = userPermissions[data.data.user_authority]||[];
                console.log(userinfo); 
                account_login(userinfo);
                if(data.data.user_authority == 3)
                {
                    window.location.href = "index.html";
                }
                else
                {
                    window.location.href = "index.html";
                }
            }
            else
            {
                $(".alert-danger").show();
                setTimeout(function(){
                    $(".alert-danger").fadeOut();
                },2000);
            }
        }
    });
    // window.location.href = "index.html";
}

var account_login = function(userinfo)
{
    // var loginTime = (new Date()).getTime(),
    // max_login_time = CQ.variable.MAX_LOGIN_TIME,
    var secret = CQ.variable.SECRET,
    iv = secret;
    localStorage.setItem('user', CryptoJS.AES.encrypt(JSON.stringify(userinfo),secret,{
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString());
}

var password_encode = function(pwd)
{
    var secret = CQ.variable.SECRET,
    secret_arr = secret.split(''),
    hash = CryptoJS.SHA256(pwd+secret).toString().split(''),
    char_index = c=>c-'a';
    secret_arr.forEach(c=>{
        if(hash[char_index(c)])
        {
            hash[char_index(c)] = c;
        }
    });
    return hash.join('');
}