import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

//工具类
import Uitls from '../../common/utils';

//推荐组件
class Help extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.text}></Text>
                <Text style={styles.text}>Q: 该APP是开发者是公司团队还是独立开发者</Text>
                <Text style={styles.text}>A: 独立开发者</Text>
                <Text style={styles.text}>Q: 该APP使用的场景是什么?</Text>
                <Text style={styles.text}>A: 当身处陌生环境,又出现内急的情况,可使用该APP找倒附近的厕所.</Text>
                <Text style={styles.text}>Q: 数据的来源是什么?</Text>
                <Text style={styles.text}>A: 该APP的数据来源主要是高德地图提供的数据服务.</Text>
                <Text style={styles.text}>Q: 能否保证数据的准确性?</Text>
                <Text style={styles.text}>A: 高德地图提供的数据服务是相对很精准的,但是不包括用户手机GPS定位不准的情况.</Text>
                <Text style={styles.text}>Q: 其他</Text>
                <Text style={styles.text}>A: 如有其他问题,可发送邮件到wlhmyit@126.com .</Text>
                <Text style={styles.text}>......</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff",
        marginTop: 55
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 15,
        marginLeft: 10,
        marginTop: 3
    }
});

module.exports = Help;