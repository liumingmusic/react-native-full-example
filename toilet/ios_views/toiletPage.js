import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';
//引用自定义组件
import TWebView from './twebview';

//卫生间模块
class toiletPage extends Component {

    render() {
        //单独的页面，专门处理地图相关操作
        //var cmapUri = "http://127.0.0.1:63342/toiletApp/toilet/html/nearby.html";
        var cmapUri = "http://123.57.39.116:3000/html/nearby.html";
        return (
            <View style={styles.container}>
                <TWebView url={cmapUri}/>
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = toiletPage;