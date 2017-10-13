import { AppRegistry } from 'react-native';
// import App from './App';
import App from './Main';

AppRegistry.registerComponent('compareResult', () => App);


// import React, { Component } from 'react';
// import { AppRegistry, SectionList, StyleSheet, Text, View } from 'react-native';

// export default class SectionListBasics extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <SectionList
//           sections={[
//             {title: 'D', data: ['Devin']},
//             {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
//           ]}
//           renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
//           renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//    flex: 1,
//    paddingTop: 22
//   },
//   sectionHeader: {
//     paddingTop: 2,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 2,
//     fontSize: 14,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(247,247,247,1.0)',
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// })

// // skip this line if using Create React Native App
// AppRegistry.registerComponent('compareResult', () => SectionListBasics);


// /**
//  * 由 FOX 创建于 2017/09/23
//  */



// import { AppRegistry } from 'react-native';
// import React from 'react';
// import App from './Main';
// export default class Root extends React.Component {
//     render() {
//         return (      
//                 <App />
//         )
//     }
// }


// if (!__DEV__) { //利用rn自带的全局变量__DEV__当他的值为 true 表示在开发环境。
//     global.console = { // 如果不是在开发环境则将console重写为空函数，防止他在生产环境中拖累js线程
//         info: () => { },
//         log: () => { },
//         warn: () => { },
//         error: () => { },
//     }
// }

// AppRegistry.registerComponent('compareResult', () => Root);  //注册组件