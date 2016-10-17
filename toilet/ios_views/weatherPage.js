import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

//天气模块
class weatherPage extends Component {

    render() {
        return (
            <View>
                <Text style={styles.text}>天气</Text>
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    text: {
        fontSize:60,
        color: 'blue',
        margin: 50,
        textAlign:'center'
    }
});

module.exports = weatherPage;