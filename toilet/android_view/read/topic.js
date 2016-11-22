import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';

import Uitls from '../../common/utils';
import TWebView from '../twebview.js';


//推荐专题组件
class topic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    render() {
        var views = [];
        var data = this.state.data;
        for (var i in data) {
            views.push(
                <TouchableOpacity
                    style={[styles.view_item,styles.view_item_left]}
                    key={i}
                    onPress={this._showDetail.bind(this,data[i].url,data[i].title)}>
                    <Image
                        style={styles.text_img}
                        resizeMode="cover"
                        source={{uri:data[i].img}}/>
                </TouchableOpacity >
            )
        }
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text_title}></Text>
                </View>
                <View style={styles.view_img}>
                    {views}
                </View>
                <View>
                    <Text style={styles.text_more}>查看更多同期专题 &gt;</Text>
                </View>
            </View>
        );
    }

    //进入详情页面
    _showDetail(url, name) {
        //路由跳转
        this.props.navigator.push({
            component: TWebView,
            title: name,
            barTintColor: "#fff",
            interactivePopGestureEnabled: true,
            passProps: {url: url}//路由传递数据
        });
    }

}

//样式表
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    text_title: {
        fontSize: 14,
        color: '#5e5e5e',
        marginBottom: 10
    },
    text_more: {
        fontSize: 13,
        color: "#ccc",
        marginTop: 10
    },
    text_img: {
        height: 80,
        width: (Uitls.size.width - 30) / 2,
        borderRadius: 3
    },
    view_img: {
        flexDirection: 'row'
    },
    view_item: {
        flex: 1,
        alignItems: "center"
    },
    view_item_left: {
        marginRight: 5
    },
    view_item_right: {
        marginLeft: 5
    }
});

module.exports = topic;
