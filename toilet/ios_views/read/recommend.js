import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

//工具类
import Uitls from '../../common/utils'

//阅读模块
class recommend extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text_title}>热门推荐</Text>
                </View>
                <View style={styles.img_view}>
                    <View style={[styles.img_item]}>
                        <Image style={[styles.img,styles.img_item_shadow]} resizeMode="cover" source={{uri:"http://image87.360doc.com/DownloadImg/2015/08/0100/56645096_7.jpg"}}/>
                        <Text style={styles.img_title} numberOfLines={2}>标题信息标题信息标题信息标题信息标题信息标题信息</Text>
                    </View>
                    <View style={[styles.img_item]}>
                        <Image style={[styles.img,styles.img_item_shadow]} resizeMode="cover" source={{uri:"http://image87.360doc.com/DownloadImg/2015/08/0100/56645096_7.jpg"}}/>
                        <Text style={styles.img_title} numberOfLines={2}>标题信息</Text>
                    </View>
                    <View style={[styles.img_item]}>
                        <Image style={[styles.img,styles.img_item_shadow]} resizeMode="cover" source={{uri:"http://image87.360doc.com/DownloadImg/2015/08/0100/56645096_7.jpg"}}/>
                        <Text style={styles.img_title} numberOfLines={2}>标题信息</Text>
                    </View>
                    <View style={[styles.img_item]}>
                        <Image style={[styles.img,styles.img_item_shadow]} resizeMode="cover" source={{uri:"http://image87.360doc.com/DownloadImg/2015/08/0100/56645096_7.jpg"}}/>
                        <Text style={styles.img_title} numberOfLines={2}>标题信息</Text>
                    </View>
                </View>
                <View style={styles.img_view}>
                    <View style={[styles.img_item]}>
                        <Image style={[styles.img,styles.img_item_shadow]} resizeMode="cover" source={{uri:"http://image87.360doc.com/DownloadImg/2015/08/0100/56645096_7.jpg"}}/>
                        <Text style={styles.img_title} numberOfLines={2}>标题信息</Text>
                    </View>
                    <View style={[styles.img_item]}>
                        <Image style={[styles.img,styles.img_item_shadow]} resizeMode="cover" source={{uri:"http://image87.360doc.com/DownloadImg/2015/08/0100/56645096_7.jpg"}}/>
                        <Text style={styles.img_title} numberOfLines={2}>标题信息</Text>
                    </View>
                    <View style={[styles.img_item]}>
                        <Image style={[styles.img,styles.img_item_shadow]} resizeMode="cover" source={{uri:"http://image87.360doc.com/DownloadImg/2015/08/0100/56645096_7.jpg"}}/>
                        <Text style={styles.img_title} numberOfLines={2}>标题信息</Text>
                    </View>
                    <View style={[styles.img_item]}>
                        <Image style={[styles.img,styles.img_item_shadow]} resizeMode="cover" source={{uri:"http://image87.360doc.com/DownloadImg/2015/08/0100/56645096_7.jpg"}}/>
                        <Text style={styles.img_title} numberOfLines={2}>标题信息</Text>
                    </View>
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
