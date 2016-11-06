$(function () {
    $('#btn').on('click', function () {
        var username = $('#username').val();
        var password = $('#password').val();
        var loginInfo = $(".login-info");
        //必填验证
        if (!username || !password) {
            loginInfo.removeClass("hidden").text("用户名或密码必须填写，不能为空！");
            username.focus();
            return;
        }
        //组装数据
        var obj = {
            username: username,
            password: password
        };
        //登录请求
        $.ajax({
            type: 'POST',
            url: '/data/login',
            dataType: 'json',
            data: obj
        }).done(function (data) {
            if (data.status) {
                window.location.href = '/';
            } else {
                loginInfo.removeClass("hidden").text("用户名或密码不正确，请重新登录！");
            }
        }).fail(function () {
            loginInfo.removeClass("hidden").text("系统出现异常，稍后重试！");
        });
    });
});
