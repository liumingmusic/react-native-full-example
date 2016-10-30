/**
 * @description: 消息提示框
 * @time: 2015-08-10
 * @version 1.1.0
 * @author: 刘明明
 * @use： 目前只有alert show confirm
 *        -------------------------------------------------------------------------------------------------------
 *        1、消息提示框
 *        arrObject = {
 * 			Msg: "content",           //显示给用户看的内容, 如：亲你的邮箱输入有误！
 *          iconImg: "info",          //提示的图标,  默认没有图片(8月8日功能还未实现，你懂的，时间不够)  8月10日已完成 （info 消息  question 问题 error 错误 warning 警告）
 *          title: "提示",             //提示标题,  header上面的内容	
 *          isModal: true,            //模态状态开关  true false
 *          btnOk: "确定",             //确定按钮的默认文字 
 *          btnCancel: "取消",         //取消按钮的默认文字
 *          isHideDate： 		     //设置自动消失的时间 只对 show弹框起作用
 * 		}
 *
 *        Messager.alert(arrObject); //直接放进去即可 [上面只是说明使用的各个属性的配置] 实际使用如下：
 *        Messager.alert({title: '版本版本,进度进度', Msg: '一天就知道打麻将', isModal: false})
 *
 *        -------------------------------------------------------------------------------------------------------
 *        2、确定提示框(用法基本和上面一样,只不过会有一个回调函数,判断用户点击的是确定还是取消)  使用如下：
 *
 *        Messager.confirm({title: '只要结果,不要过程', Msg: '下次是否能修改完bug,时候能按期完成版本,能否...？', iconImg: 'question'}).on(function(flag){
 * 			if(flag){
 * 				点击确定按钮执行的操作
 * 			}esle{
 * 				点击取消钮执执行的操作
 * 			}
 * 		});
 *
 *        -------------------------------------------------------------------------------------------------------
 *        3、自动消失的弹出提示框  isHideDate设置时间  尽量加上 isModal: false 非模态方式
 *        Messager.show({isModal: false, isHideDate: 2000});
 */

;
$(function () {
    window.Messager = function () {
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        /*弹出框的html结构*/
        var alr = $(
            '<div id="messager-dialogue" class="modal fade">'
            + '<div class="modal-dialog modal-sm">'
            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>'
            + '<span class="sr-only">Close</span>'
            + '</button>'
            + '<h5 class="modal-title">'
            + '<i class="fa fa-exclamation-circle"></i> [Title]'
            + '</h5>'
            + '</div>'
            + '<div class="modal-body small">'
            + '<div class="row">'
            + '<div class="col-xs-2">[MessagerIcon]</div>'
            + '<div class="col-xs-10 messageText">[Message]</div>'
            + '</div>'
            + '</div>'
            + '<div class="modal-footer" >'
            + '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>'
            + '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>');
        var ahtml = alr.html();
        /*alert弹出框*/
        var _alert = function (options) {
            alr.html(ahtml);
            alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
            alr.find('.cancel').hide();
            _dialog(options);

            return {
                /*回调函数*/
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        alr.find('.ok').click(function (e) {
                            e.preventDefault();
                            callback(true);
                        });
                    }
                }
            };
        };
        /*confirm弹出框*/
        var _confirm = function (options) {
            alr.html(ahtml);
            alr.find('.ok').removeClass('btn-primary').addClass('btn-danger');
            alr.find('.cancel').show();
            _dialog(options);
            //特殊处理,删除操作，确定变成红色按钮，文字变成删除；
            var text = alr.find("div.messageText");
            if (text.text() === prompt.sureDelete) {
                alr.find(".btn-success").removeClass("btn-success").addClass("btn-danger").text("删除");
            }
            return {
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        alr.find('.ok').click(function (e) {
                            e.preventDefault();
                            callback(true);
                        });
                        alr.find('.cancel').click(function (e) {
                            e.preventDefault();
                            callback(false);
                        });
                    }
                }
            };
        };
        /*自动消失的alert弹出框*/
        var _show = function (options) {
            var imgUrl = "/GDYY/images/icon/";
            alr.html(ahtml);
            alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
            alr.find('.cancel').hide();
            _dialog(options);
            /*判断是否使用默认值，还是用户传入的值*/
            if (options.isHideDate) {
                setTimeout(function () {
                    $("#messager-dialogue").modal("hide")
                }, options.isHideDate);
            } else {
                setTimeout(function () {
                    $("#messager-dialogue").modal("hide")
                }, 3000);
            }
            return {
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        alr.find('.ok').click(function () {
                            callback(true)
                        });
                    }
                }
            };
        };
        var _dialog = function (options) {
            /*默认的参数信息*/
            var ops = {
                Msg: "", /*显示给用户看的内容*/
                iconImg: 'info', /*提示的图标 默认图片是info,只是消息而已*/
                title: "提示", /*提示标题*/
                isModal: false, /*模态状态开关*/
                btnOk: "确定", /*确定按钮的默认文字*/
                btnCancel: "取消", /*取消按钮的默认文字*/
                isHideDate: 3000       /*设置自动消失的时间*/
            };
            /*传入的值，和默认值进行替换*/
            $.extend(ops, options);
            /*替换模板dom结构里面的内容*/
            var html = alr.html().replace(reg, function (node, key) {
                return {
                    Title: ops.title,
                    Message: ops.Msg,
                    BtnOk: ops.btnOk,
                    BtnCancel: ops.btnCancel,
                    MessagerIcon: '<img class="messagerIcon" src="/GDYY/images/icon/' + ops.iconImg + '.png">'
                }[key];
            });
            alr.html(html);
            alr.modal({
                width: 600,
                backdrop: 'static'
            });
            /*模态默认样式清除*/
            $("body").css("padding", 0);
            /*设置模态状态*/
            if (!ops.isModal) {
                $(".modal-backdrop").css("display", "none");
            }
        };
        /*返回给用户进行方法的调用 	可以看成接口*/
        return {
            alert: _alert,
            confirm: _confirm,
            show: _show
        }
    }();
});