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
        if(data.code==0)
        {
            console.log(data.data.token);
            account_login(data.data.token,data.data.user_name);
            window.location.href = "index.html";
        }
        else
        {
            $(".alert-danger").show();
            setTimeout(function(){
                $(".alert-danger").fadeOut();
            },2000);
        }
    });
    // window.location.href = "index.html";
}

var account_login = function(token,username)
{
    var loginTime = (new Date()).getTime(),
    max_login_time = CQ.variable.MAX_LOGIN_TIME,
    secret = CQ.variable.SECRET,
    iv = secret;
    localStorage.setItem('user', CryptoJS.AES.encrypt([token,loginTime,max_login_time].join('#'),secret,{
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }));
    localStorage.setItem('username',username);
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