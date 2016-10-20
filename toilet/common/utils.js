import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PixelRatio
} from 'react-native';

//工具类
module.exports = {

    //TODO 1) ajax方法;2) 获取屏幕宽高;3) 获取最小线宽;
    //获取屏幕尺寸
    size: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    //获取线宽
    pixel: 1 / PixelRatio.get(),
    /**
     * fetch --> ajax
     * @param url 请求的url地址
     * @param successCallback 成功之后的回调函数
     * @param failCallback 失败之后的回调函数
     */
    ajax: function (url, successCallback, failCallback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                //回调函数，返回数据消息
                successCallback(JSON.parse(responseText));
            })
            .catch(function (err) {
                failCallback(err);
            });
    }
};