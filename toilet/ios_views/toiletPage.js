import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

//卫生间模块
class toiletPage extends Component {

    render() {
        return (
            <View>
                <Text style={styles.text}>卫生间</Text>
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    text: {
        fontSize:60,
        color: '#000',
        margin: 50,
        textAlign:'center'
    }
});

module.exports = toiletPage;