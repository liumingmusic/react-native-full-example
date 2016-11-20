import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    Alert
} from 'react-native';

//webView组件
class TWebView extends Component {

    constructor(props) {
        //父子之间传递参数
        super(props);
        this.state = {
            url: this.props.url,
            isError: false,
            isMargin: this.props.isMargin
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isError ?
                        <View style={styles.errorInfo}>
                            <Text style={styles.text}>网络出现问题...</Text>
                        </View>
                        :
                        <WebView
                            startInLoadingState={true}
                            onError={this._showError.bind(this)}
                            source={{uri:this.state.url}}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={true}
                            scalesPageToFit={true}
                            style={{marginTop: this.state.isMargin || -20}}/>
                }
            </View>
        )
    }

    //webview加载失败
    _showError() {
        //设置状态值
        this.setState({
            isError: true
        });
    }

}

//样式表
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    errorInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: '600'
    }
});

module.exports = TWebView;