/*
 *
 * IE 9+ jQuery 1.8.3
 * QQ:109131145
 *
 * */


var _LOOK_INDEX = 0;//设置一个全局变量
(function ($) {
    $.fn.simpleSlide = function (options) {

        //获取当前ID
        var _i = _LOOK_INDEX;

        //获取所有this
        var _THIS = $(this);

        //属性
        var _defaults = {
            "opacity": 0.8,
            "windowAction": "fadeIn",
            "imageAction": "fadeIn",
            "loadingImage": "img/1.gif"

        };
        var _OPTIONS = $.extend(_defaults, options);

        //获取属性
        var _ATTR = _OPTIONS;

        //存储图片地址的数组
        var _ALL_IMG_URL = [];

        var _I = 0;
        //遍历把图片地址存储到数组里
        _THIS.each(function (i) {
            var _OBJ = $(this);
            _OBJ.attr("i") == undefined ? _ALL_IMG_URL[i] = undefined : _ALL_IMG_URL[i] = _OBJ.attr("i");
            if (_OBJ.attr("i") == undefined) {
                _I++;
            }
        });

        //判断图片URL的数量
        if (_I == _THIS.size()) {
            return false;//没有图片则结束函数
        }

        //返回一个非undefined 的 URL
        function _GET_URL() {
            for (var i = 0; i < _ALL_IMG_URL.length; i++) {
                if (_ALL_IMG_URL[i] != undefined) {
                    return i;
                }
            }
        }

        _SET_WINDOWS();//初始化添加元素
        //获取背景元素
        var _LOOK_BACK = $(".LookPicture_Background").eq(_i);

        //设置背景透明度
        _LOOK_BACK.fadeTo(0, _ATTR.opacity);

        //获取主窗口元素
        var _LOOK_OBJ = $("#LookPicture_" + _i);

        //获取上下页按钮元素
        var _LOOK_BEFORE = _LOOK_OBJ.find(".Look_before");
        var _LOOK_NEXT = _LOOK_OBJ.find(".Look_next");


        _THIS.css("cursor", "pointer");

        //点击事件
        _THIS.on("click", function () {
            $(document.body).addClass("none");

            //获取当前的点击元素的索引
            var _IMG_INDEX = _THIS.index($(this));
            //如果当前元素不存在 i 元素 则返回一个一个正确的URL
            _IMG_INDEX = _ALL_IMG_URL[_IMG_INDEX] == undefined ? _GET_URL() : _IMG_INDEX;

            //显示背景
            _LOOK_BACK.addClass("Look_Open");
            //显示主窗体
            _LOOK_OBJ.addClass("Look_Open");
            _LOOK_OBJ.find(".Look_img").removeClass("Look_Show");
            _LOOK_OBJ.find(".Look_img").eq(_IMG_INDEX).addClass("Look_Show");

            _LOADING(_IMG_INDEX);
            //调整尺寸
            _LOOK_SIZE();
        });

        _LOOK_OBJ.bind('mousewheel', function (event, delta) {
            var dir = delta > 0 ? 'Up' : 'Down';
            if(dir=='Up'){
                _LOOK_BEFORE.click();
            }else{
                _LOOK_NEXT.click();
            }
            //console.log(delta);
        });


        //关闭事件
        _LOOK_OBJ.find(".Look_Close").click(function () {
            //关闭背景
            _LOOK_BACK.removeClass("Look_Open");
            //关闭主窗体
            _LOOK_OBJ.removeClass("Look_Open");

            $(document.body).removeClass("none");
        });

        //上一页按钮点击
        _LOOK_BEFORE.click(function () {
            //获取当前显示图片的索引
            var _ID = _LOOK_OBJ.find(".Look_img").index(_LOOK_OBJ.find(".Look_Show"));
            _GET_ZQ_ID(_ID, 0);
        });

        //下一页按钮点击
        _LOOK_NEXT.click(function () {
            //获取当前显示图片的索引
            var _ID = _LOOK_OBJ.find(".Look_img").index(_LOOK_OBJ.find(".Look_Show"));
            _GET_ZQ_ID(_ID, 1);
        });

        function _GET_ZQ_ID(id, num) {
            //1 加
            if (num == "1") {
                id++;
                if (id >= _ALL_IMG_URL.length) {
                    id = 0;
                }
                _LOOK_OBJ.find(".Look_img").removeClass("Look_Show");
                _LOOK_OBJ.find(".Look_img").eq(id).addClass("Look_Show");
            } else {
                id--;
                if (id < 0) {
                    id = _ALL_IMG_URL.length - 1;
                }
                _LOOK_OBJ.find(".Look_img").removeClass("Look_Show");
                _LOOK_OBJ.find(".Look_img").eq(id).addClass("Look_Show");
            }
            _LOADING(id);
            _LOOK_SIZE();
        }

        function _LOADING(i) {
            var _showImg = _LOOK_OBJ.find(".Look_img").eq(i);
            var src = _showImg.attr('src');
            var iSrc = _showImg.attr('iSrc');
            src == _ATTR.loadingImage ? _LOADING_IMAGE(_showImg, iSrc) : !!0;
            _LOOK_SIZE();
        }

        function _LOADING_IMAGE(Img, src) {
            var img = new Image();
            $(img).load(function () {
                Img.attr('src', src);
                _LOOK_SIZE();
            }).error(function () {
                console.log(src, ' - Url Error')
            }).attr("src", src);
        }

        //设置窗口
        function _SET_WINDOWS() {
            //添加背景
            $(document.body).append("<div class='LookPicture_Background'></div>");
            //添加主窗口
            $(document.body).append('<div class="LookPicture animated ' + _ATTR.windowAction + '" id="LookPicture_' + _i + '"></div>');
            //添加关闭按钮
            $("#LookPicture_" + _i).append('<span class="Look_Close"></span>');
            //循环添加图片
            for (var i = 0; i < _ALL_IMG_URL.length; i++) {
                $("#LookPicture_" + _i).append('<img alt="No (i) attribute or URL error" class="Look_img animated ' + _ATTR.imageAction + '" src="' + _ATTR.loadingImage + '" iSrc="' + _ALL_IMG_URL[i] + '"/>');
            }
            //添加上一页按钮
            $("#LookPicture_" + _i).append('<span class="Look_before"></span>');
            //添加下一页按钮
            $("#LookPicture_" + _i).append('<span class="Look_next"></span>');
        }

        //累加++
        _LOOK_INDEX++;
    };
})(jQuery);

//全局函数
function _LOOK_SIZE() {
    $(".Look_Show").each(function (i) {
        var _wi = $(this).width();
        var _he = $(this).height();
        $(this).css({
            "margin-top": -(_he / 2) + "px",
            "margin-left": -(_wi / 2) + "px"
        });
    });
}

$(window).resize(function () {
    _LOOK_SIZE();
});

$(function () {
    //初始化
    _LOOK_SIZE();
});




/* 滚轮封装 */


(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
            ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.9',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        },

        getLineHeight: function(elem) {
            return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));