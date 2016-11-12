//初始化全局样式
var locationIcon = "<div class='location-bg'><img src='./image/geolocation.png'></div>";
var isiPhone = navigator.userAgent.toLocaleLowerCase().match(/iPhone/i);
var walking = null;
//地图初始化
var map = new AMap.Map('container', {
    resizeEnable: true,
    zoom: 15
});
//toolbar控件
map.plugin(["AMap.ToolBar"], function () {
    //加载工具条
    var tool = new AMap.ToolBar();
    map.addControl(tool);
});

//比例尺控件
map.plugin(["AMap.Scale"], function () {
    var scale = new AMap.Scale();
    map.addControl(scale);
});

//定位控件
map.plugin('AMap.Geolocation', function () {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonDom: locationIcon     //定位样式修改
    });
    map.addControl(geolocation);
    //页面打开默认调用定位功能
    geolocation.getCurrentPosition();
    //回调函数
    AMap.event.addListener(geolocation, 'complete', function (data) {
        map.clearMap();
        if (data.info === "SUCCESS" && data.type === "complete") {
            var position = data.position;
            searchNearBy([position.lng, position.lat]);
        } else {
            alert("调用地图定位失败");
        }
    });
    AMap.event.addListener(geolocation, 'error', function () {
        alert("定位失败，请开启定位服务：设置 -> 隐私 -> 定位服务 -> 小明找厕所 -> 使用定位期间打开");
    });
});

//路径规划,使用服务组件
walking = new AMap.Riding({
    map: map
});

/**
 * 周边搜索服务
 * @param center 传入的当前定位的经纬度
 * TODO 1.点击marker展示详细信息，2.进行路线规划
 */
function searchNearBy(center) {
    //周边搜索服务
    AMap.service(["AMap.PlaceSearch"], function () {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
            pageSize: 20,
            pageIndex: 1,
            extensions: 'base',
            type: '200300|200300|200302|200303'
        });
        //周边搜索
        placeSearch.searchNearBy("厕所", center, 4000, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                var pois = result.poiList.pois;
                pois.forEach(function (poi) {
                    //显示标注的点
                    var divStr = '<div class="makerStyle">' + poi.distance + '米</div>';
                    //详细信息的弹框
                    var info = [
                        '<div class="infoWindow"><div class="info_title">卫生间</div>',
                        '<div class="info_name">名称: ' + poi.name + '</div>',
                        '<div class="info_dis">距您: ' + '<span class="dis_span">' + poi.distance + '米</span>' + '</div>',
                        '<div class="info_address">地址: ' + poi.address + '</div>',
                        '<div class="info_type">类型: ' + (poi.type || '卫生间') + '</div>',
                        '<div class="info_arrow"></div>'].join("");
                    //由于iphone点击比较慢，所以特殊处理
                    if (isiPhone && isiPhone.length) {
                        info += '<div class="info_close" ontouchstart="_closeInfoWindow()">×</div></div>';
                    } else {
                        info += '<div class="info_close" onclick="_closeInfoWindow()">×</div></div>';
                    }
                    //创建marker图标
                    var marker = new AMap.Marker({
                        position: poi.location,
                        title: poi['name'],
                        map: map,
                        content: divStr,
                        offset: new AMap.Pixel(10, -25)
                    });
                    //由于iphone点击比较慢，所以特殊处理，对marker进行事件监听
                    if (isiPhone && isiPhone.length) {
                        AMap.event.addListener(marker, 'touchstart', function () {
                            _showInfoWindow(info, poi, center);
                        });
                    } else {
                        AMap.event.addListener(marker, 'click', function () {
                            _showInfoWindow(info, poi, center);
                        });
                    }
                });
                //改变显示级别
                map.setZoom(16);
            } else {
                alert("该地点没有查询到相关数据");
            }
        });
    });
}

/**
 * 显示点击的窗体信息
 * @param info 窗体html结构
 * @param poi 当前服务位置
 * @param center 定位中心店
 * @private
 */
function _showInfoWindow(info, poi, center) {
    //创建窗体对象
    var infowindow = new AMap.InfoWindow({
        content: info,
        offset: new AMap.Pixel(40, -35),
        isCustom: true
    });
    //打开窗体
    infowindow.open(map, poi.location);
    //步行路径规划
    walking.clear();
    //开始位置
    var start = new AMap.LngLat(center[0], center[1]);
    //结束位置
    var end = poi.location;
    //路径规划
    walking.search(start, end);
}

//关闭弹框
function _closeInfoWindow() {
    map.clearInfoWindow();
}

//屏蔽默操作
document.querySelector('a.amap-logo').onclick = function () {
    return false;
};