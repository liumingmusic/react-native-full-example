import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

//公共组件
import Uitls from '../../common/utils'
//list组件
import List from './list'
//搜索组件
class search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigator: props.navigator
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.search_input}
                    placeholder="搜索"
                    onSubmitEditing={(event) => {
                        this._search(event.nativeEvent.text);
                    }}
                    placeholderTextColor="#5e6877"/>
            </View>
        );
    }

    //数据搜索
    _search(text) {
        let url = 'http://123.57.39.116:3000/data/read?type=it';
        //路由跳转
        this.state.navigator.push({
            component: List,
            barTintColor: "#fff",
            passProps: {url: url}//路由传递数据
        });
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
