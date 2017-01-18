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
        $(".updateHandler").bind("click", _update);
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

    //修改方法，显示弹窗
    function _update() {
        var $updatePanel = $("#update-panel");
        //获取删除数据的id
        var id = $(this).attr("data-refId");
        var type = _getQueryString();
        //根据id查询数据信息
        $.get("/data/findById/" + type + "/" + id).done(function (json) {
            var obj = json.data;
            //数据回现
            for (var item in obj) {
                $("#update-" + item).val(obj[item]);
            }
            //单独添加类型数据
            $("#update-type").val(type);
            //显示弹窗
            $updatePanel.modal({
                backdrop: 'static',
                keyboard: false
            });
            //绑定事件
            $("#update-btn").unbind("click").bind("click", _updateHandler);
        });
    }

    //具体执行修改的方法
    function _updateHandler() {
        var $updatePanel = $("#update-panel");
        //数组组装
        var obj = {
            id: $("#update-id").val(),
            type: $("#update-type").val(),
            title: $("#update-title").val(),
            img: $("#update-img").val(),
            url: $("#update-url").val()
        };
        //TODO 数据校验
        //请求后台
        $.post({
            url: "/data/update",
            type: 'POST',
            data: obj,
            dataType: 'json'
        }).done(function (json) {
            if (json.status === 1) {
                window.location.reload();
            }
        }).fail(function () {
            swal("数据添加有问题");
        });
    }

    //获取地址栏信息，判断修改的资源类型
    function _getQueryString() {
        var href = window.location.href;
        var types = href.split("edit/")[1];
        return types.substr(0, types.lastIndexOf("/"));
    }

    //默认调用
    _init();
});