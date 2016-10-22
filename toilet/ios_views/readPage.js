import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
//工具类
import Uitls from '../common/utils'

//导入自定义组件
import Category from './read/category';
import List from './read/list';
import Recommend from './read/recommend';
import Search from './read/search';
import Topic from './read/topic';


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
class readPage extends Component {

    constructor() {
        super();
        //默认不显示 ScrollView
        this.state = {
            isShow: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Search/>
                <Hr/>
                {
                    this.state.isShow ?
                        <ScrollView style={styles.view}>
                            <Topic/>
                            <Recommend/>
                            <Category/>
                            <Recommend/>
                        </ScrollView >
                        :
                        <Text>没有数据显示</Text>
                }
            </View>
        );
    }

    //组件加载完毕时候调用 TODO fatch数据
    componentDidMount() {
        this.setState({
            isShow: true
        })

    }

}

//样式表
const styles = StyleSheet.create({
    container: {
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
    }
});

module.exports = readPage;