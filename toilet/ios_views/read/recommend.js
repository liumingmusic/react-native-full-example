import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

//工具类
import Uitls from '../../common/utils'

//推荐组件
class recommend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            name: props.name
        }
    }

    render() {
        var view_top = [];
        var view_bottom = [];
        var data = this.state.data;
        for (var i in data) {
            let view = (
                <View style={[styles.img_item]} key={i}>
                    <Image style={[styles.img,styles.img_item_shadow]}
                           resizeMode="cover"
                           source={{uri:data[i].img}}/>
                    <Text style={styles.img_title} numberOfLines={2}>{data[i].title}</Text>
                </View>
            );
            if (i < 4) {
                view_top.push(view);
            } else {
                view_bottom.push(view);
            }
        }
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text_title}>{this.state.name}</Text>
                </View>
                <View style={styles.img_view}>
                    {view_top}
                </View>
                <View style={styles.img_view}>
                    {view_bottom}
                </View>
                <View>
                    <Text style={styles.text_more}>查看全部 &gt;</Text>
                </View>
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    img_view: {
        flexDirection: "row"
    },
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    img_item: {
        flex: 1,
        height: 160,
        alignItems: "center",
        width: (Uitls.size.width - 40) / 4
    },
    img_item_shadow: {
        shadowOpacity: 1,
        shadowColor: "red",
        shadowOffset: {width: 1 * Uitls.pixel, height: 1 * Uitls.pixel}
    },
    img: {
        height: 120,
        width: (Uitls.size.width - 40) / 4,
        borderRadius: 3
    },
    text_title: {
        fontSize: 14,
        color: '#5e5e5e',
        marginBottom: 10
    },
    text_more: {
        fontSize: 13,
        color: "#ccc"
    },
    img_title: {
        textAlign: "left",
        marginTop: 8,
        color: "#5e5e5e",
        fontSize: 11,
        width: (Uitls.size.width - 40) / 4
    }
});

module.exports = recommend;
