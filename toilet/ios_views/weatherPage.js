import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

//工具类
import Uitls from '../common/utils';
//引用自定义组件
import TWebView from './twebview';

//天气模块
class weatherPage extends Component {

    render() {
        //const url = "http://localhost:63342/toiletApp/toilet/html/weather.html";
        const url = 'http://123.57.39.116:3000/html/weather.html';
        return (
            <View style={styles.container}>
                <TWebView url={url}/>
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

module.exports = weatherPage;