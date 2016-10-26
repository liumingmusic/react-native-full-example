//初始化全局样式
var locationIcon = "<div class='location-bg'><img src='./image/geolocation.png'></div>";
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
        map.setZoom(16);
        //TODO 拿到是当前的经纬度，天气服务是提供城市名或者城市编码
        showWeather([data.position.lng, data.position.lat]);
    });
    AMap.event.addListener(geolocation, 'error', function () {
        alert('定位失败，请在手机上开启定位:设置->隐私->定位服务->找厕所->使用应用期间');
    });
});

//显示天气信息
var showWeather = function (center) {
    var marker = new AMap.Marker({
        position: center,
        map: map,
        content: '<div class="loc_circle"></div><img class="loc_img" src="loc.png" style="width:16px;"/>'
    });
    //使用逆地理编码，获取当前的城市编码信息
    AMap.service('AMap.Geocoder', function () {
        var geo = new AMap.Geocoder();
        geo.getAddress(center, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                //获取天气信息
                var district = result.regeocode.addressComponent.district;
                AMap.service('AMap.Weather', function () {
                    var weather = new AMap.Weather();
                    weather.getLive(district, function (err, result) {
                        if (err) {
                            return;
                        }
                        document.querySelector('#weather_pro').innerHTML = result.province;
                        document.querySelector('#weather_city').innerHTML = result.city;
                        document.querySelector('#weather_weather').innerHTML = result.weather;
                        document.querySelector('#weather_wind').innerHTML = result.windDirection;
                        document.querySelector('#weather_temp').innerHTML = result.temperature;
                        document.querySelector('#weather_time').innerHTML = result.reportTime;
                    });
                });
            }
        });
    });
};