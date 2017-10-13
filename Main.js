/**
 * 由 FOX 创建于 2017/09/23
 */
import React, {Component} from 'react'
import {View, SectionList, FlatList, TouchableOpacity, StyleSheet, Text, Image, Dimensions, Alert} from 'react-native'
import {_baseColor, _getWidth, _getHeight, _backgroundColor} from './utils/config'
import TopHeard from './page/TopHeard';//头部页面
import {_jude, _judeBackColor} from './utils/Judge';//导入判断接口
const {height, width} = Dimensions.get('window')
import HeardLook from './page/HeardLook';//导入头部的选择页面

// const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

// const VIEWABILITY_CONFIG = {
//   minimumViewTime: 3000,
//   viewAreaCoveragePercentThreshold: 100,
//   waitForInteraction: true,
// };

var type = true;//顶部ui是否显示图片样式
const renderSectionHeader = ({section}) => (
    ({section}) => <View style={styles.sectionHeader}>
        <Image source={require('./img/cricle.png')} style={styles.imageStyle}></Image>
        <Text style={styles.textStyle}>{section.title}</Text>
    </View>/*<Text style={styles.sectionHeader}>{section.title}</Text>*/
);

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        // this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);

        baseItem = {
            title: "骨架检查", data: [
                {title: '前围骨架', okone: true, oktwo: true},
                {title: '悬挂系统工作是否无异常', okone: false, oktwo: false},
                {title: '后横梁', okone: true, oktwo: false},
                {title: '后纵梁', okone: false, oktwo: true},
                {title: '爸爸信息', okone: false, oktwo: false},
                {title: '悟空信息', okone: false, oktwo: false},
                {title: '闪光信息', okone: false, oktwo: false},
                {title: '攻壳信息', okone: false, oktwo: false},
                {title: '速度信息', okone: false, oktwo: false},
                {title: '蝙蝠信息', okone: false, oktwo: false},
                {title: '攻壳信息', okone: false, oktwo: false},
                {title: '激情信息', okone: false, oktwo: false},
                {title: '超人信息', okone: false, oktwo: false},]
        }
        for (var index = 0; index < 5; index++) {
            var element = Object.assign({}, baseItem);
            element.key = index;
            this._dataSource.push(element);
        }

        this.state = {
            selectSection: 0,
        };
    }

    // state = {
    //   data: genItemData(1000),
    //   debug: false,
    //   filterText: '',
    //   logViewable: false,
    //   virtualized: true,
    // };

    _dataSource = Array();

    _sectionChooseListRef;
    _captureSectionChooseRef = (ref) => {
        this._sectionChooseListRef = ref;
    };

    _sectionListRef;
    _captureSectionRef = (ref) => {
        this._sectionListRef = ref;
    };

    _scrollToLocation(sectionIndex, itemIndex) {
        this._sectionListRef
            .getNode()
            .scrollToLocation({sectionIndex, itemIndex});
    }

    _onViewableItemsChanged = (info) => {
        // Impressions can be logged here
        var indexs = info.changed.map((v) => {
            if (v.isViewable) {
                return v.section.key
            }
        })
        var total = this._dataSource.length;
        var index = info.viewableItems[0].section.key;
        console.log("index" + index);
        // console.log(this._sectionChooseListRef.getMetrics().visibleRows);
        this.setState({selectSection: index});
        index -= 4;
        index = index < 0 ? 0 : index;
        this._sectionChooseListRef.scrollToIndex({index: Number(index)});
    };
    // _onViewableItemsChanged =(info) =>  {
    //   // Impressions can be logged here
    //   var indexs = info.changed.map((v) => {
    //     if (v.isViewable) {
    //       return v.section.key
    //     }
    //   })

    //   var index = info.viewableItems[0].section.key;
    //   console.log("index" + index);

    //   // this._sectionListRef
    //   // .getNode()
    //   // .scrollToLocation({ sectionIndex, itemIndex });
    //   this._sectionChooseListRef.getNode().scrollToIndex({viewPosition: 0, index: Number(index)});
    // };

    //第一个横向的item
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={this.itemClick.bind(this, item, index)}>
                <View style={styles.itemView}>
                    <Text
                        style={{color: this.state.selectSection == index ? 'red' : _backgroundColor}}>{item.title}</Text>
                    <View style={styles.itemViewView}></View>
                </View>
            </TouchableOpacity>
        );
    }

    //横向item的点击事件
    itemClick(item, index) {
        // let message = [
        //   { name: '大护信息', onclick: false },
        //   { name: '绣春信息', onclick: false },
        //   { name: '神偷信息', onclick: false },
        //   { name: '女侠信息', onclick: false },
        //   { name: '爸爸信息', onclick: false },
        //   { name: '悟空信息', onclick: false },
        //   { name: '闪光信息', onclick: false },
        //   { name: '攻壳信息', onclick: false },
        //   { name: '速度信息', onclick: false },
        //   { name: '蝙蝠信息', onclick: false },
        //   { name: '攻壳信息', onclick: false },
        //   { name: '激情信息', onclick: false },
        //   { name: '超人信息', onclick: false }
        // ]
        // message[index]['onclick'] = true;
        // this.setState({ data: message, selectItem: index, dataTwo: this._sourceDataMessagetwo });
        this._sectionListRef
    }

    //flatlist在横向出现的一个bug、、、、、要加入这个
    ItemDivideComponent() {
        return (
            <View style={styles.itemLine}/>
        );
    }

    //竖向列表的item
    _renderItemComponent = ({item, index}) => {
        return (
            <View style={styles.itemMessageView}>
                <View style={styles.itemMessageViewItwmOne}>
                    <Text style={{marginLeft: _getWidth(30)}}>{item.title}</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: _judeBackColor(item.okone, item.oktwo),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: _backgroundColor,
                    borderLeftWidth: 1,
                    borderRightWidth: 1
                }}>
                    <Text style={{color: item.okone ? 'green' : 'red'}}>{_jude(item.okone)}</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: _judeBackColor(item.okone, item.oktwo),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: item.oktwo ? 'green' : 'red'}}>{_jude(item.oktwo)}</Text>
                </View>
            </View>
        );
    }
    //flatlist设置的标识
    _keyExtractor = (item, index) => index;

    _topHeight=()=>{
        if(type){
            return _getHeight(150);
        }else{
            return _getHeight(80);
        }
    }

    //更新顶部UI
    _updateTopUI = ()=>{
        type = !type;
        console.log("调用的type = " + type);
        this.forceUpdate();
    }

    render() {
        return (
            <View style={styles.allView}>
                <TopHeard title={'车辆对比'} textStyle={{fontSize: 20}} onClick_Left={() => {
                    alert(666)
                   this._updateTopUI();
                }}></TopHeard>
                <View style={{
                    height:this._topHeight() ,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: _backgroundColor,
                    borderBottomWidth: 1,
                    borderTopWidth: 1
                }}>
                    <HeardLook topType={type} isFirst="yes" title={' 一 未知'} textMessage={'查看不同'} onClick={() => {
                        alert('查看')
                    }}></HeardLook>
                    <HeardLook topType={type} imageUrl={'http://7xoaj5.com1.z0.glb.clouddn.com/3_hd171012155632_86NWM.JPG?imageMogr2/auto-orient/strip/quality/75'} title={' 二 未知后的哈市道具卡数据的静安寺'} textMessage={'电话咨询'}
                               onClick={() => {
                                   alert('电话')
                               }}></HeardLook>
                    <HeardLook topType={type} imageUrl={'http://7xoaj5.com1.z0.glb.clouddn.com/3_hd171012153421_59NWM.JPG?imageMogr2/auto-orient/strip/quality/75'} title={' 三 未知的SD卡商机漏斗静安寺里肯定'} textMessage={'电话咨询'}
                               onClick={() => {
                                   alert('查询')
                               }}></HeardLook>
                </View>
                <FlatList
                    ref={this._captureSectionChooseRef}
                    ItemSeparatorComponent={this.ItemDivideComponent}//分割线组件
                    renderItem={this._renderItem}
                    horizontal={true}
                    legacyImplementation={false}
                    keyExtractor={this._keyExtractor}
                    getItemLayout={(data, index) => ({length: _getHeight(50), offset: _getHeight(81) * index, index})}
                    data={this._dataSource}>
                </FlatList>
                {/* <View style={styles.viewCenter}>
                 <Image source={require('./img/cricle.png')} style={styles.imageStyle}></Image>
                 <Text style={styles.textStyle} >{this.state.data[this.state.selectItem].name}</Text>
                 </View> */}
                {/* <FlatList
                 ref="_flatlist1"
                 renderItem={this._renderItemMessage}
                 keyExtractor={this._keyExtractor}
                 data={this.state.dataTwo}>
                 </FlatList> */}
                {/* <View style={styles.container}> */}
                <SectionList

                    ref={this._captureSectionRef}
                    /* keyExtractor={this._keyExtractor} */
                    onViewableItemsChanged={this._onViewableItemsChanged}
                    renderItem={this._renderItemComponent}
                    /* renderSectionHeader={renderSectionHeader} */
                    sections={this._dataSource}
                    /* viewabilityConfig={VIEWABILITY_CONFIG} */
                />
            </View>
        )
    }

}
//样式
const styles = StyleSheet.create({
    allView: {
        flex: 1,
        backgroundColor: 'white',
        height: _getHeight(15)
    },
    itemView: {
        height: _getHeight(50),
        width: _getWidth(80),
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemViewView: {
        position: 'absolute',
        width: 1,
        right: 0,
        top: _getHeight(5),
        bottom: _getHeight(5),
        backgroundColor: _backgroundColor
    },
    itemMessageView: {
        flexDirection: 'row',
        height: _getHeight(80),
        borderColor: _backgroundColor,
        borderTopWidth: 1
    },
    itemMessageViewItwmOne: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: _backgroundColor
    },

    viewCenter: {
        flexDirection: 'row',
        backgroundColor: _backgroundColor,
        height: _getHeight(50),
        alignItems: 'center',
        borderTopColor: _backgroundColor,
        borderBottomColor: _backgroundColor,
        borderTopWidth: 1
    },
    imageStyle: {
        height: _getHeight(10),
        width: _getWidth(10),
        marginLeft: _getWidth(30)
    },
    textStyle: {
        fontSize: 15,
        marginLeft: _getWidth(10),
        color: 'black'
    },
    itemLine: {
        width: 1,
        height: _getHeight(30),
        backgroundColor: _backgroundColor
    },
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        flexDirection: 'row',
        backgroundColor: _backgroundColor,
        height: _getHeight(50),
        alignItems: 'center',
        borderTopColor: _backgroundColor,
        borderBottomColor: _backgroundColor,
        borderTopWidth: 1,
        // paddingTop: 2,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingBottom: 2,
        // fontSize: 14,
        // fontWeight: 'bold',
        // backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
// _scrollPos = new Animated.Value(0);
// _scrollSinkY = Animated.event(
//   [{nativeEvent: { contentOffset: { y: this._scrollPos } }}],
//   {useNativeDriver: true},
//   console.log("abcdefg")
// )

// _onScroll = {(event)=>{
//   console.log(event.nativeEvent.contevtOffset.x);//水平滚动距离
//   console.log(event.nativeEvent.contevtOffset.y)；//垂直滚动距离
// }}

// _onScroll(event) {
// console.log(event.nativeEvent.contentOffset.y);
// console.log(event);
// }
// _handleScroll = ({ event }) => {
// console.log(event.nativeEvent.contevtOffset.x);//水平滚动距离
// console.log(event.nativeEvent.contevtOffset.y);//垂直滚动距离
// console.log(event);
// }