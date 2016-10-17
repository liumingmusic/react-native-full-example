import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

//设置模块
class settingPage extends Component {

    render() {
        return (
            <View>
                <Text style={styles.text}>设置</Text>
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    text: {
        fontSize:60,
        color: 'pink',
        margin: 50,
        textAlign:'center'
    }
});

module.exports = settingPage;