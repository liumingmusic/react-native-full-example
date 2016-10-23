import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

//工具类
import Uitls from '../../common/utils'

//分类组件
class category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    render() {
        var view_top = [];
        var view_bottom = [];
        var data = this.state.data;
        for (var i in data) {
            let view = (
                <View style={styles.cat_item} key={i}>
                    <Text style={styles.cat_title}>{data[i].text}</Text>
                </View>
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
