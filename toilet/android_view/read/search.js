import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    AlertIOS
} from 'react-native';
/*第三方组件*/

//公共组件
import Uitls from '../../common/utils';
//list组件
import List from '../../ios_views/read/list';
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
        //判断数据是否为空
        if (!text) {
            AlertIOS.alert('提示', '你尚未输入搜索的信息');
            return;
        }
        let url = 'http://123.57.39.116:3000/data/read?type=it';
        //路由跳转
        this.state.navigator.push({
            component: List,
            barTintColor: "#fff",
            title: "搜索",
            passProps: {url: url}//路由传递数据
        });
    }

}

//样式表
const styles = StyleSheet.create({
    search_input: {
        height: 60,
        borderWidth: Uitls.pixel,
        borderColor: "#EEE",
        paddingLeft: 5,
        borderRadius: 3,
        fontSize: 15
    },
    container: {
        paddingLeft: 10,
        paddingRight: 10
    }
});

module.exports = search;
