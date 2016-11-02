$(function () {
    "use strict";
    //初始化方法
    function _init() {
        //注册新增事件
        $('#addinfo_btn').on('click', _save);
        //图片预览
        $(".show-img a").simpleSlide();
        //编辑、删除按钮绑定事件
        $(".deleteHandler").bind("click", _delete);
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
            dataType: 'json'
        }).done(function (data) {
            if (data.status) {
                window.location.reload();
            } else {
                swal("数据添加有问题")
            }
        }).fail(function () {
            swal("数据添加有问题")
        });
    }

    //删除数据信息
    function _delete() {
        //获取删除数据的id
        var id = $(this).attr("data-refId");
        //组装数据
        var obj = {
            id: id,
            type: _getQueryString()
        };
        //TODO ajax请求删除数据，还要提示用户确定是否删除，之后再重新加载数据
        swal({
                title: "你确定删除数据吗?",
                text: "删除的数据将不可恢复",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "取消",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "删除",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            },
            function () {
                _deleteHandler(obj);
            }
        );
    }

    //删除执行的具体方法， 单独提取出来，就是不让其嵌套太深
    function _deleteHandler(obj) {
        //添加请求
        $.ajax({
            type: 'POST',
            url: '/data/delete',
            data: obj,
            dataType: 'json'
        }).done(function (data) {
            if (data.status) {
                window.location.reload();
            } else {
                swal("数据删除成功")
            }
        }).fail(function () {
            swal("数据删除失败")
        });
    }

    //获取地址栏信息，判断修改的资源类型
    function _getQueryString() {
        var href = window.location.href;
        return href.substr(href.lastIndexOf("/") + 1, href.length);
    }

    //默认调用
    _init();
});