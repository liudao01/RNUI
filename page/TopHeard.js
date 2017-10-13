/**
* 由 FOX 创建于 2017/09/23
*/
import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { _baseColor, _getHeight, _getWidth } from '../utils/config';
export default class TopHeard extends React.Component {

  constructor (props) {
    super(props)
    propTypes = {
      title: PropTypes.string, // 标题
      textStyle: Text.propTypes.style, // 标题文本样式 
      onClick_Left: PropTypes.func, // 定义出左边的点击事件
    }
  }
  render () {
    var { title, textStyle, onClick_Left } = this.props
    return (
      <View style={styles.allView}>
        <TouchableOpacity style={styles.itemView} onPress={() => { onClick_Left()}}>
          <Image source={require('../img/left.png')} style={styles.imageView}></Image>
        </TouchableOpacity>
        <Text style={[textStyle]}>
          {title}
        </Text>
      </View>
    )
  }

}
// 样式
const styles = StyleSheet.create({
  allView: {
    height: _getHeight(50),justifyContent: 'center',alignItems: 'center'
  },
  itemView: {
    position: 'absolute',
    left: _getWidth(15),
    top: _getHeight(15)
  },
  imageView:{
      height: _getHeight(20),
      width: _getWidth(20)
  }

})
