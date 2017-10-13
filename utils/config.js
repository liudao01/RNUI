/**
 * 由 FOX 创建于 2017/07/28
 * 全局配置
 */
import {
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');
//主色系
export const _baseColor = '#ff6a05';
//字体颜色----灰色
export const _fontGrayColor = '#646464';
//背景颜色
export const _backgroundColor = '#eeeeee'
//基 宽度
export const _baseWidth = 480;
//基 高度
export const _baseHeight = 800;
// 获取适配宽度
export const _getWidth = (w) => {
  return ~~((w / _baseWidth) * width);
}
// 获取适配高度
export const _getHeight = (h) => {
  return ~~((h / _baseHeight) * height);
}

//每页数据量 
export const _pageSize = 20;
//paddingTop 
export const _getPaddingTop = () => {
  if (_IOS_) {
    return 20
  } else if (_ANDROID_) {
    return 0
  }
}





 