$(function () {
    "use strict";
    //初始化方法
    function _init() {
        //注册新增事件
        $('#addinfo_btn').on('click', _save);
        //图片预览
        $(".show-img a").simpleSlide();
    }

    //具体的执行方法
    function _save() {
        var type = _getQueryString();
        if (!type) {
            return;
        }
        var title = $('#title').val();
        var url = $('#url').val();
        var img = $('#img').val();
        //组装数据信息
        var obj = {
            type: type,
            title: title,
            url: url,
            img: img
        };
        //添加请求
        $.ajax({
            type: 'POST',
            url: '/data/write',
            data: obj,
            dataType: 'json',
            async: false
        }).done(function (data) {
            if (data.status) {
                window.location.reload();
            } else {
                Messager.alert({Msg: "数据添加有问题"});
            }
        }).fail(function () {
            Messager.alert({Msg: "数据添加有问题"});
        });
    }

    //获取地址栏信息，判断修改的资源类型
    function _getQueryString() {
        var href = window.location.href;
        var type = href.substr(href.lastIndexOf("/") + 1, href.length);
        return type;
    }

    //默认调用
    _init();
});