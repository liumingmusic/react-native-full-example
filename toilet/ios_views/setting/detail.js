import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

//工具类
import Uitls from '../../common/utils';

//推荐组件
class Detail extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.text}>
                    1、服务条款的确认和接纳
                    APP的各项内容和服务的所有权归本App拥有。用户在接受本服务之前，请务必仔细阅读本条款。用户使用服务，表示用户接受所有服务条款。
                    APP将不公开用户的姓名、地址、电子邮箱、帐号和电话号码等信息（请阅隐私保护条款）。
                    用户在本APP的任何行为必须遵循：
                    (1) 传输资料时必须符合中国有关法规。
                    (2) 使用信息服务不作非法用途和不道德行为。
                    (3) 不干扰或混乱网络服务。
                    (4) 遵守所有使用服务的网络协议、规定、程序和惯例。用户的行为准则是以因特网法规，政策、程序和惯例为根据的。
                </Text>
                <Text style={styles.text}>
                    2、服务条款的修改
                    本APP有权在必要时修改条款，将会在页面公布。
                    一切使用APP服务,则视为接受服务条款的变动。
                </Text>
                <Text style={styles.text}>
                    3、 用户的帐号、密码和安全性
                    本APP目前不提供注册和登录功能,因此不存在用户的帐号、密码和安全性等问题。
                </Text>
                <Text style={styles.text}>
                    4、拒绝提供担保
                    用户明确同意使用本公司服务，由用户个人承担风险。
                    本网站及APP不担保服务一定满足用户的要求，也不担保服务不会中断，对服务的及时性、安全性、出错发生都不作担保。
                    用户理解并接受：任何通过服务取得的信息资料的可靠性有用性取决于用户自己的判断，用户自己承担所有风险和责任。
                </Text>
                <Text style={styles.text}>
                    5、有限责任
                    本APP对任何由于使用服务引发的直接、间接、偶然及继起的损害不负责任。
                    这些损害可能来自（包括但不限于）：不正当使用服务，或传送的信息不符合规定等。
                </Text>
                <Text style={styles.text}>
                    6、对用户信息的存储和限制
                    本APP暂时不提供发布上处数据服务。
                    如果用户违背了服务条款的规定，有中断对其提供服务的权利。
                </Text>
                <Text style={styles.text}>
                    7、信息内容的所有权
                    本公司的信息内容包括：文字、软件、声音、相片、录象、图表；以及其它信息，所有这些内容受版权、商标、标签和其它财产所有权法律的保护。
                    用户只能在授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。
                </Text>
                <Text style={styles.text}>
                    8、保护条款
                    本APP将严格保守用户的个人隐私，承诺未经过您的同意不将您的个人信息任意披露,所以资源都将标明出处。
                </Text>
                <Text style={styles.text}>
                    9、适用法律
                    上述条款将适用中华人民共和国的法律，所有的争端将诉诸于本网所在地的人民法院。
                    如发生服务条款与中华人民共和国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它条款则依旧保持约束力。
                </Text>
                <Text style={styles.text}></Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
        marginTop: 10
    }
});


module.exports = Detail;