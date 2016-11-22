import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

//工具类
import Uitls from '../../common/utils'
//list组件
import List from './list'

//分类组件
class category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            navigator: props.navigator
        }
    }

    render() {
        var view_top = [];
        var view_bottom = [];
        var data = this.state.data;
        for (var i in data) {
            let view = (
                <TouchableOpacity style={styles.cat_item} key={i} onPress={this._goToList.bind(this, data[i].text)}>
                    <Text style={styles.cat_title}>{data[i].text}</Text>
                </TouchableOpacity>
            );
            if (i < 2) {
                view_top.push(view);
            } else {
                view_bottom.push(view);
            }
        }
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text_title}>分类</Text>
                </View>
                <View style={styles.cat_view}>
                    {view_top}
                </View>
                <View style={styles.cat_view}>
                    {view_bottom}
                </View>
            </View>
        );
    }

    //点击分类，跳转列表组件
    _goToList(name) {
        let type = this._getType(name);
        let url = 'http://123.57.39.116:3000/data/read?type=' + type;
        //路由跳转
        this.state.navigator.push({
            component: List,
            title: name,
            barTintColor: "#fff",
            passProps: {url: url}//路由传递数据
        });
    }

    //判断类别
    _getType(keywords) {
        var type = 'it';
        switch (keywords) {
            case '互联网':
                type = 'it';
                break;
            case '散文':
                type = 'sanwen';
                break;
            case '笑话':
                type = 'cookies';
                break;
            case '管理':
                type = 'manager';
                break;
            default :
                type = 'it';
                break;
        }
        return type;
    }

}

//样式表
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    cat_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5,
        paddingBottom: 5
    },
    cat_item: {
        height: 80,
        width: (Uitls.size.width - 30) / 2,
        borderWidth: 1,
        borderColor: "#F1F1F1",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    text_title: {
        fontSize: 14,
        color: '#5e5e5e',
        marginBottom: 10
    },
    cat_title: {
        fontSize: 17,
        color: "#707070"
    }
});

//redux 全局数据框架状态

module.exports = category;
