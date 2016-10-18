import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';
//引用自定义组件
import TWebView from './twebview'

//卫生间模块
class toiletPage extends Component {

    render() {
        //请求路径
        var cmapUri = "http://www.baidu.com";
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