import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    ScrollView,
    TouchableOpacity
} from 'react-native';

//工具类
import Uitls from '../../common/utils';
import TWebView from '../twebview.js';

//列表组件
class list extends Component {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            url: props.url,
            dataSource: ds.cloneWithRows([])
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={this._showDetail.bind(this,rowData.url,rowData.title)}>
                            <View>
                                <Image
                                    style={styles.img}
                                    resizeMode="cover"
                                    source={{uri:rowData.img}}
                                />
                            </View>
                            <View style={styles.warper}>
                                <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
                                <Text style={styles.date}>{rowData.time.split("T")[0]}</Text>
                            </View>
                        </TouchableOpacity>
                    }/>
            </ScrollView>
        );
    }

    //显示详情
    _showDetail(url, name) {
        //路由跳转
        this.props.navigator.push({
                component: TWebView,
                title: name,
                barTintColor: "#fff",
                passProps: {
                    url: url
                }//路由传递数据
            }
        );
    }

    //页面渲染完成请求数据
    componentDidMount() {
        let url = this.state.url;
        let that = this;
        Uitls.ajax(url, function (data) {
            if (data.status === 1) {
                let obj = data.data;
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                that.setState({
                    dataSource: ds.cloneWithRows(obj)
                })
            } else {
                alert('服务异常,正在紧急修复,请耐心等待');
            }
        }, function (err) {
            alert('服务异常,正在紧急修复,请耐心等待');
        })
    }

}

//样式表
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55,
        backgroundColor: "#fff"
    },
    item: {
        height: 78,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: "#EDEDED",
        borderBottomWidth: Uitls.pixel,
        flexDirection: "row",
        alignItems: "center"
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 3
    },
    warper: {
        marginLeft: 10,
        flex: 1,
        alignItems: "stretch"
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5
    },
    date: {
        color: "#444"
    }
});

module.exports = list;
