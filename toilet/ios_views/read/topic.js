import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import Uitls from '../../common/utils'

//阅读模块
class topic extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text_title}>推荐专题</Text>
                </View>
                <View style={styles.view_img}>
                    <View style={[styles.view_item,styles.view_item_left]}>
                        <Image
                            style={styles.text_img}
                            resizeMode="cover"
                            source={{uri:"http://img04.meituncdn.com/group1/M00/C0/BA/wKgyOlcLlPuAc67MAAA_RkDApWQ109_340.jpg"}}/>
                    </View>
                    <View style={[styles.view_item,styles.view_item_right]}>
                        <Image
                            style={styles.text_img}
                            resizeMode="cover"
                            source={{uri:"http://img04.meituncdn.com/group1/M00/C0/BA/wKgyOlcLlPuAc67MAAA_RkDApWQ109_340.jpg"}}/>
                    </View>
                </View>
                <View>
                    <Text style={styles.text_more}>查看更多同期专题 &gt;</Text>
                </View>
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: -20
    },
    text_title: {
        fontSize: 14,
        color: '#5e5e5e',
        marginBottom: 10
    },
    text_more: {
        fontSize: 13,
        color: "#ccc",
        marginTop: 10,
        marginBottom: 10
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
        flex: 1
    },
    view_item_left: {
        marginRight: 5
    },
    view_item_right: {
        marginLeft: 5
    }
});

module.exports = topic;
