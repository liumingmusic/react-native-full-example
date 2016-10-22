import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

import Uitls from '../../common/utils'

//阅读模块
class search extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.search_input} placeholder="搜索" placeholderTextColor="#5e6877"/>
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    search_input: {
        height: 35,
        borderWidth: Uitls.pixel,
        borderColor: "#EEE",
        paddingLeft: 5,
        borderRadius: 3,
        fontSize: 15
    },
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20
    }
});

module.exports = search;
