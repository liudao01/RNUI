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

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

var type = true;//顶部ui是否显示图片样式
const SectionChooseList_ITEM_WIDTH = 86;

export default class Main extends React.Component {
    constructor(props) {
        super(props);

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
        for (var index = 0; index < 20; index++) {
            var element = Object.assign({}, baseItem);
            element.key = index;
            this._dataSource.push(element);
        }

        this.state = {
            selectSection: 0,
            myType:true
        };
    }

    _isClickAction = false;

    _dataSource = Array();

    _sectionChooseListRef;
    _captureSectionChooseRef = (ref) => {
        this._sectionChooseListRef = ref;
    };

    _sectionListRef;
    _captureSectionRef = (ref) => {
        this._sectionListRef = ref;
    };

    _scrollToSection(sectionIndex) {
        this._sectionListRef
            .scrollToLocation({sectionIndex: sectionIndex, itemIndex: 0, viewOffset: 35});
    }

    _onViewableItemsChanged = (info) => {
        // Impressions can be logged here
        var indexs = info.changed.map((v) => {
            if (v.isViewable) {
                return v.section.key
            }
        })

        if (!info.viewableItems.length) return;

        var index = info.viewableItems[0].section.key;



        this._updateSelectSection(index);
        if (this._isClickAction && index === this.state.selectSection) {
            this._isClickAction = false;
        }

        var total = this._dataSource.length;
        
        var screenWidth = Dimensions.get('window').width;
        var viewableCount = Math.floor(screenWidth/SectionChooseList_ITEM_WIDTH) - 1; 
        index = Math.max(0,index -= viewableCount);
        this._sectionChooseListRef.scrollToIndex({viewPosition: 0, index: Number(index)});

        // if (index == 0 && type == false) {
        //     this._updateTopUI(true);
        // } else if (index > 0 && type == true) {
        //     this._updateTopUI(false);
        // }
    };

    _updateSelectSection = (index) => {
        if (!this._isClickAction) {
            this.setState({selectSection: index});
        }
    }

    //横向item的点击事件
    _itemClick = (item, index) => {
        this._isClickAction = false;        
        this.setState({selectSection: index});
        this._updateSelectSection(index);
        this._isClickAction = true;
        this._scrollToSection(index);
    }

    //第一个横向的item
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={this._itemClick.bind(this, item, index)}/*{this.itemClick.bind(this, item, index) }*/>
                <View style={styles.itemView}>
                    <Text style={{fontSize:14, color: this.state.selectSection == index ? '#FF5A5A' : '#999999'}}>{item.title}</Text>
                    <View style={styles.itemViewView}></View>
                </View>
            </TouchableOpacity>
        );
    }

    //竖向列表的item
    _renderItemComponent = ({item, index}) => {
        return (
            <View style={[styles.itemMessageView, {borderTopWidth: index == 0 ? 0 : 1}]}>
                <View style={styles.itemMessageViewItwmOne}>
                    <Text
                        style={{fontSize: 12, paddingLeft: 14, paddingRight: 14, color: '#999999'}}>{item.title}</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row', backgroundColor: _judeBackColor(item.okone, item.oktwo)}}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#CCCCD2', /*borderLeftWidth: 1, */
                        borderRightWidth: 1
                    }}>
                        <Text
                            style={{fontSize: 12, color: item.okone ? '#1FB113' : '#FF5A5A'}}>{_jude(item.okone)}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text
                            style={{fontSize: 12, color: item.okone ? '#1FB113' : '#FF5A5A'}}>{_jude(item.oktwo)}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderSectionHeader = ({section}) => (
        <View style={styles.sectionHeader}>
            {/* <Image source={require('./img/cricle.png')} style={styles.imageStyle}></Image> */}
            <View style={{
                marginLeft: 14,
                overflow: "hidden",
                width: 8,
                height: 8,
                borderRadius: 8,
                backgroundColor: '#666666',
            }}/>
            <Text style={styles.textStyle}>{section.title}</Text>
        </View>/*<Text style={styles.sectionHeader}>{section.title}</Text>*/
    );

    //flatlist设置的标识
    _keyExtractor = (item, index) => index;

    _topHeight = () => {
        if (type) {
            return 150;
        } else {
            return 80;
        }
    }

    //更新顶部UI
    _updateTopUI = (flag) => {
        type = flag;
        // console.log("调用的type = " + type);
        // this.forceUpdate();
        this.setState({
            myType: flag
        });
    }

    render() {
        // var ContentWrapper;
        // var wrapperProps = {};
        // // if (this.props.noScroll) {
        // ContentWrapper = ((View: any): React.ComponentType<any>);
        // } else {
        //   ContentWrapper = (ScrollView: React.ComponentType<any>);
        //   // $FlowFixMe found when converting React.createClass to ES6
        //   wrapperProps.automaticallyAdjustContentInsets = !this.props.title;
        //   wrapperProps.keyboardShouldPersistTaps = 'handled';
        //   wrapperProps.keyboardDismissMode = 'interactive';
        // }

        return (
            <View style={styles.pageContainer}>
                <TopHeard title={'车辆对比'} textStyle={{fontSize: 20}} onClick_Left={() => {
                    alert(666)
                }}></TopHeard>
                <View style={{
                    height: this._topHeight(),
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: _backgroundColor,
                    borderBottomWidth: 1,
                    borderTopWidth: 1
                }}>
                    <HeardLook topType={this.state.myType} isFirst="yes" title={' 一 未知'} textMessage={'查看不同'}
                               onClick={() => {
                        alert('查看')
                    }}></HeardLook>
                    <HeardLook topType={this.state.myType}
                               imageUrl={'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1525546566,2404337493&fm=27&gp=0.jpg'}
                               title={' 二 未知后的哈市道具卡数据的静安寺'} textMessage={'电话咨询'}
                               onClick={() => {
                                   alert('电话')
                               }}></HeardLook>
                    <HeardLook topType={this.state.myType}
                               imageUrl={'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1525546566,2404337493&fm=27&gp=0.jpg'}
                               title={' 三 未知的SD卡商机漏斗静安寺里肯定'} textMessage={'电话咨询'}
                               onClick={() => {
                                   alert('查询')
                               }}></HeardLook>
                </View>
                <View>
                    <FlatList
                        ref={this._captureSectionChooseRef}
                        showsHorizontalScrollIndicator={false}
                        /* ItemSeparatorComponent={this.ItemDivideComponent}//分割线组件 */
                        horizontal
                        renderItem={this._renderItem}
                        legacyImplementation={false}
                        keyExtractor={this._keyExtractor}
                        getItemLayout={(data, index) => ({
                            length: SectionChooseList_ITEM_WIDTH,
                            offset: SectionChooseList_ITEM_WIDTH * index,
                            index
                        })}
                        data={this._dataSource}/>
                </View>
                <SectionList
                    style={styles.sectionList}
                    ref={this._captureSectionRef}
                    keyExtractor={this._keyExtractor}
                    onViewableItemsChanged={this._onViewableItemsChanged}
                    renderItem={this._renderItemComponent}
                    renderSectionHeader={this._renderSectionHeader}
                    stickySectionHeadersEnabled={true}
                    sections={this._dataSource}
                   /* viewabilityConfig={VIEWABILITY_CONFIG}*/
                />
            </View>
            //   </ContentWrapper>
            // </View>
        );
    }
}

//样式
const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 20,
    },
    sectionChooseList: {
        height: 45,
        borderBottomColor: '#CCCCD2',
        borderBottomWidth: 1
    },
    sectionList: {
        flex: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        backgroundColor: '#E5E5E5',
        height: 35,
        alignItems: 'center',
    },
    itemView: {
        height: 44,
        width: SectionChooseList_ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemLine: {
        width: 1,
        height: 30,
        backgroundColor: _backgroundColor
    },
    itemViewView: {
        position: 'absolute',
        width: 1,
        height: 21,
        right: 0,
        // top: 12,/*_getHeight(5),*/
        // bottom: 12,/*_getHeight(5),*/
        backgroundColor: _backgroundColor
    },
    itemMessageView: {
        flexDirection: 'row',
        height: 50,
        borderColor: '#CCCCD2',
    },
    itemMessageViewItwmOne: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3'
    },
    textStyle: {
        fontSize: 14,
        marginLeft: 10,
        color: '#666666'
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