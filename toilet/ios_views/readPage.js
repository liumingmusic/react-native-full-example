import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

//导入自定义组件
import Category from './read/category';
import List from './read/list';
import Recommend from './read/recommend';
import Search from './read/search';
import Topic from './read/topic';

//阅读模块
class readPage extends Component {

    render() {
        return (
            <View>
                <Search/>
                <ScrollView>
                    <Topic/>
                    <Recommend/>
                    <Category/>
                    <Recommend/>
                </ScrollView >
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    text: {
        fontSize: 60,
        color: 'red',
        textAlign: 'center'
    }
});

module.exports = readPage;