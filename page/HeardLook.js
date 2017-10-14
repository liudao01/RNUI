/**
 * 由 FOX 创建于 2017/09/23
 */
import React from 'react'
import PropTypes from 'prop-types';
import {View, Text, Dimensions, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {_baseColor, _getHeight, _getWidth, _backgroundColor} from '../utils/config';
const {height, width} = Dimensions.get('window')
var itemHeight = 150;
var currentImage = "";
var isNeedUpdate = true;
export default class HeardLook extends React.Component {
    static defaultProps = {
        topType: true,
    }

    constructor(props) {
        super(props)
        propTypes = {
            imageUrl: PropTypes.string,//图片
            title: PropTypes.string, // 标题
            topType: PropTypes.bool, // 顶部的样式 显示图片或者不显示图片
            textMessage: Text.propTypes.string, // 标题文本样式
            onClick: PropTypes.func, // 定义出点击事件
        }
    }

    shouldComponentUpdate() {
        //
        // if (isNeedUpdate) {
        //
        //     isNeedUpdate = false;
        //     return true;
        // } else {
        //
        //     // isNeedUpdate = false;
        //     return false;
        // }
        return true;
    }

    _imageUrlIsNot = (mimageUrl, topType) => {
        // console.log("传入的 topType = " + topType);
        if (!topType || mimageUrl == "" || mimageUrl == null || mimageUrl == undefined) {
            itemHeight = 80;
            isNeedUpdate = true;
            return (null);
        } else {
            isNeedUpdate = true;
            // console.log("传入的 mimageUrl = " + mimageUrl);
            return <Image style={styles.carImgStyle} source={{
                uri: mimageUrl,
                cache: 'force-cache'
            }}/>
            // return (null);
        }
    }

    _isFirst = (isfirst, title) => {

        console.log("传入的 imageUrl = " + imageUrl);
        if (isfirst == "" || isfirst == null || isfirst == undefined) {
            return <View style={styles.firstTextStyle}>
                <Text numberOfLines={2} style={styles.itemText}>
                    {title}
                </Text>
                <Text numberOfLines={2} style={styles.itemText}>
                    {title}
                </Text>
            </View>
        } else {
            return <View style={styles.firstTextStyle}>
                <Text numberOfLines={2} style={styles.itemText}>
                    {title}
                </Text>
            </View>

        }
    }

    // componentWillReceiveProps() {
    //
    // }
    render() {
        var {topType, imageUrl, title, textMessage, onClick} = this.props
        return (
            <View style={styles.allView}>
                <View style={styles.itemView}>
                    {
                        this._imageUrlIsNot(imageUrl, topType)
                    }
                    <View style={styles.firstTextStyle}>
                        <Text numberOfLines={2} style={styles.itemText}>
                            {title}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        onClick()
                    }}>
                        <View style={styles.itemViewTwo}>
                            <Text style={styles.textNext}>
                                {textMessage}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}
// 样式
const styles = StyleSheet.create({
    firstTextStyle: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    allView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: _backgroundColor,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    itemView: {
        justifyContent: 'center',
        flexDirection: 'column',
        width: width / 3,
        flex: 1,
        alignItems: 'center'
    }
    ,
    itemText: {
        fontSize: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: (20),
        marginRight: (20)
    },
    textNext: {
        fontSize: 10,
        color: 'white'
    },
    itemViewTextView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: (30),
        width: width / 3 - (40),
        backgroundColor: 'red',
        borderRadius: (8)
    },
    itemViewTwo: {
        marginTop: (5),
        marginBottom: (8),
        alignItems: 'center',
        justifyContent: 'center',
        height: (30),
        width: width / 3 - (40),
        backgroundColor: 'red',
        borderRadius: (8)
    },
    carImgStyle: {
        width: (80),
        height: (80)
    }

})
