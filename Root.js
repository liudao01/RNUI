/**
 * 由 FOX 创建于 2017/09/23
 */



import { AppRegistry } from 'react-native';
import React from 'react';
import App from './Main';
export default class Root extends React.Component {
    render() {
        return (      
                <App />
        )
    }
}


if (!__DEV__) { //利用rn自带的全局变量__DEV__当他的值为 true 表示在开发环境。
    global.console = { // 如果不是在开发环境则将console重写为空函数，防止他在生产环境中拖累js线程
        info: () => { },
        log: () => { },
        warn: () => { },
        error: () => { },
    }
}

AppRegistry.registerComponent('FoxPlan', () => Root);  //注册组件