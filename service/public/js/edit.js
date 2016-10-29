$(function () {
    "use strict";
    //初始化方法
    function _init() {
        //注册新增事件
        $('.addinfo_btn').on('click', _save);
        //图片预览
        $(".show-img a").simpleSlide();
    }

    //具体的执行方法
    function _save() {
        var type = _getQueryString('type');
        if (!type) {
            return;
        }
        var title = $('#title').val();
        var url = $('#url').val();
        var img = $('#img').val();
        var obj = {
            type: type,
            title: title,
            url: url,
            img: img
        };

        $.ajax({
            type: 'POST',
            url: '/data/write',
            data: obj,
            dataType: 'json',
            success: function (data) {
                if (data.status) {
                    alert('添加数据成功');
                    window.location.reload();
                } else {
                    alert('添加失败');
                }
            },
            error: function () {
                alert('添加失败');
            }
        });
    }

    //获取地址栏信息，判断修改的资源类型
    function _getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    //默认调用
    _init();
});