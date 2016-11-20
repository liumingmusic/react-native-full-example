import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';

//工具类
import Uitls from '../common/utils';
//详情模块
import About from '../ios_views/setting/about';
import Help from '../ios_views/setting/help';
import Detail from '../ios_views/setting/detail';

//设置模块
class settingView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={styles.image_view}>
                    <Image style={styles.icon} source={{uri:'http://ogxr430c8.bkt.clouddn.com/logo.png'}} esizeMode="contain"/>
                    <Text style={styles.version}>V1.0.0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.text_view,styles.text_margin]}
                    onPress={this._showDetail.bind(this, About, "功能介绍", "Right")}>
                    <Text style={styles.text}>功能介绍</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.text_view]}
                    onPress={this._showDetail.bind(this, Help, "帮助中心", "Right")}>
                    <Text style={styles.text}>帮助中心</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.text_view]}
                    onPress={this._showDetail.bind(this, Detail, "服务条款", "Right")}>
                    <Text style={styles.text}>服务条款</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.text_view,styles.text_view_bottom]}
                    onPress={this._showAuthor}>
                    <Text style={styles.text}>关于</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    //显示详情
    _showDetail(module, title, type) {
        //路由跳转
        this.props.navigator.push({
            component: module,
            title: title,
            barTintColor: '#fff',
            type: type
        });
    }

    //显示邮箱信息
    _showAuthor() {
        Alert.alert('邮箱地址', 'liuming_music@163.com');
    }

}

class settingPage extends Component {

    render() {
        return (
            <Navigator
                style={{flex:1}}
                initialRoute={{component: settingView}}
                configureScene={this.configureScene}
                renderScene={this.renderScene}/>
        );
    }

    /**
     * 使用动态页面加载
     * @param route 路由
     * @param navigator 导航器
     * @returns {XML} 页面
     */
    renderScene(route, navigator) {
        return <route.component navigator={navigator}/>;
    }

    /**
     * 配置场景动画
     * @param route 路由
     * @param routeStack 路由栈
     * @returns {*} 动画
     */
    configureScene(route, routeStack) {
        if (route.type == 'Bottom') {
            return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
        }
        return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
    }

}

//样式表
const styles = StyleSheet.create({
    navContainer: {
        flex: 1
    },
    leftNavButtonText: {},
    rightNavButtonText: {},
    container: {
        paddingLeft: 0,
        paddingRight: 0
    },
    image_view: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    text_view: {
        borderTopWidth: Uitls.pixel,
        borderTopColor: "#ccc",
        height: 40,
        justifyContent: "center",
        paddingLeft: 20
    },
    text_margin: {
        marginTop: 30
    },
    text_view_bottom: {
        borderBottomWidth: Uitls.pixel,
        borderBottomColor: "#ccc"
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        color: "#666666"
    },
    version: {
        color: "#666666"
    },
    icon: {
        width: 88,
        height: 100
    }

});

module.exports = settingPage;