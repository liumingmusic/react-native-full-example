import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Navigator,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

//工具类
import Uitls from '../common/utils'

//导入自定义组件
import Category from '../android_view/read/category';
import List from '../android_view/read/list';
import Recommend from '../android_view/read/recommend';
import Search from '../android_view/read/search';
import Topic from '../android_view/read/topic';

//hr组件，画出一条线
class Hr extends Component {
    render() {
        "use strict";
        return (
            <View>
                <Text style={styles.hr}></Text>
            </View>
        )
    }
}

//阅读模块
class readView extends Component {

    constructor() {
        super();
        //默认不显示 ScrollView
        this.state = {
            isShow: false,
            refreshing: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isShow ?
                        <ScrollView
                            style={styles.scrollView}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    title="数据在加载中..."
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }>
                            <Topic data={this.state.recommendTopic} navigator={this.props.navigator}/>
                            <Hr/>
                            <Recommend name="热门推荐" data={this.state.hotTopic} navigator={this.props.navigator}/>
                            <Hr/>
                            <Category data={this.state.category} navigator={this.props.navigator}/>
                            <Hr/>
                            <Recommend name="轻松一刻" data={this.state.other} navigator={this.props.navigator}/>
                            <Text style={{height:30}}></Text>
                        </ScrollView >
                        :
                        (<ActivityIndicator
                            animating={true}
                            style={[{height: 80}]}
                            size="large"
                            />)
                }
            </View>
        );
    }

    //下拉刷新
    _onRefresh() {
        var that = this;
        that.setState({refreshing: true});
        setTimeout(function () {
            that._fetchData();
        }, 3000)

    }

    _fetchData(callback) {
        var that = this;
        var url = "http://123.57.39.116:3000/data/read?type=config";
        Uitls.ajax(url, function (data) {
            if (data.status === 1) {
                let obj = data.data;
                that.setState({
                    isShow: true,
                    recommendTopic: obj.recommendTopic,
                    hotTopic: obj.hotTopic,
                    category: obj.category,
                    other: obj.other,
                    refreshing: false
                });
            } else {
                alert('服务异常,正在紧急修复,请耐心等待1');
            }
        }, function (err) {
            alert('服务异常,正在紧急修复,请耐心等待2');
        })
    }

    //组件加载完毕时候调用 TODO fatch数据
    componentDidMount() {
        this._fetchData();
    }
}

//nav 组件，包裹在readview里面，对全部的信息进行路径导航
class readPage extends Component {
    render() {

        var NavigationBarRouteMapper = {
            LeftButton: function (route, navigator, index, navState) {
                if (index > 0) {
                    return (
                        <View style={[styles.navContainer,styles.touch]}>
                            <TouchableOpacity
                                underlayColor='transparent'
                                onPress={() => {if (index > 0) {navigator.pop()}}}>
                                <Text style={styles.leftNavButtonText}>
                                    返回
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }
            },
            RightButton: function (route, navigator, index, navState) {
                //index大于0，表明当前页面可以查看
                if (index > 0) {
                    return (
                        <View style={[styles.navContainer,styles.touch]}>
                            <TouchableOpacity
                                onPress={() => route.onPress()}>
                                <Text style={styles.rightNavButtonText}>
                                    分享
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            },
            Title: function (route, navigator, index, navState) {
                var title = route.title || "阅读";
                return (
                    <View style={[styles.navContainer,styles.navTitle]}>
                        <Text style={styles.title} numberOfLines={1}>
                            {title}
                        </Text>
                    </View>
                );
            }
        };

        return (
            <Navigator
                style={{flex:1}}
                initialRoute={{component: readView}}
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                      routeMapper={NavigationBarRouteMapper}
                      style={styles.navContainer}
                   />
                }/>
        );
    }

    /**
     * 使用动态页面加载
     * @param route 路由
     * @param navigator 导航器
     * @returns {XML} 页面
     */
    renderScene(route, navigator) {
        var url = route.passProps ? route.passProps.url : "";
        var isMargin = route.passProps ? route.passProps.isMargin : "";
        //主要作用是传参数
        return <route.component navigator={navigator} url={url} isMargin={isMargin}/>;
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
    container: {
        flex: 1,
        marginTop: 55
    },
    scrollView: {
        flex: 1
    },
    text: {
        fontSize: 60,
        color: 'red',
        textAlign: 'center'
    },
    hr: {
        borderColor: "#EEE",
        borderWidth: Uitls.pixel,
        marginTop: 10,
        marginBottom: 10,
        height: Uitls.pixel
    },
    /*导航栏样式控制*/
    // 页面框架
    navContainer: {
        flex: 1,
        backgroundColor: '#007aff',
        height: 55
    },
    touch: {
        flex: 1,
        width: 65
    },
    leftNavButtonText: {
        flex: 1,
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 15
    },
    rightNavButtonText: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: "center",
        paddingTop: 15
    },
    navTitle: {
        marginRight: 72,
        /*动态计算中间区域的宽度*/
        width: Uitls.size.width - 145
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 19,
        paddingTop: 15
    }
});

module.exports = readPage;