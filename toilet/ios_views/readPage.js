import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

//阅读模块
class readPage extends Component {

    render() {
        return (
            <View>
                <Text style={styles.text}>阅读</Text>
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    text: {
        fontSize:60,
        color: 'red',
        margin: 50,
        textAlign:'center'
    }
});

module.exports = readPage;