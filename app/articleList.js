'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	Text,
  	TouchableOpacity,
  	View,
	Dimensions,
	ListView,
	RefreshControl,
	Image,
} from 'react-native';

import { connect } from 'react-redux'
import * as Actions from './redux/actions'
import * as CONFIGS from './configs/configs';

import Loading from './loading'

var DEVICE_WIDTH = Dimensions.get('window').width;

class ArticleList extends Component
{
	constructor (props) {
    	super(props);

		this.state = {
	      	dataSource: new ListView.DataSource({
	        	rowHasChanged: (row1, row2) => row1 !== row2,
	      	})
	    };

		this.articleListData = [];
		this.url = CONFIGS.CATEGORY_CONTENT_API + this.props.id;
		this.page = 1;
  	}

	componentDidMount()
    {
		// 获取分类文章列表
		this.props.dispatch( Actions.getArticleList(this.url) );
    }

	// 已加载组件收到新的参数时调用
	componentWillReceiveProps (nextProps)
	{
		//console.log(nextProps.articleList);
		this.articleListData = nextProps.articleList;
	}

	// 进入详情页
    onPostButton(id)
    {
        this.props.navigator.push({
            name: 'archivesPage',
            params: {id: id},
        });
    }

	// 生成每条数据显示
	renderItem(data, sectionID, rowID)
	{
		// 如果设置了特殊图片,则按图片显示
        if (data.thumbnail_images != null) {
            return (
				<TouchableOpacity onPress={() => this.onPostButton(data.id)} >
                <View style={styles.imgItem} key={data.id} >
                    <Image
                        resizeMode={'cover'}
                        source={{uri:data.thumbnail_images.full.url}}
                        style={styles.imgItemThumb}/>

                    <Text style={styles.imgItemTit} numberOfLines={28} >{data.title}</Text>
                </View>
				</TouchableOpacity>
            );
        } else {
            // 按标题显示
            return (
				<TouchableOpacity onPress={() => this.onPostButton(data.id)} >
                <View style={styles.strItem} key={data.id}>
                    <Text key={'post' + data.id} style={styles.strItemTit} numberOfLines={28}>{data.title}</Text>
                </View>
				</TouchableOpacity>
            );
        }
	}

	// 瀑布流刷新调用
	onEndReached ()
	{
	    if (typeof(this.articleListData[this.url]) != 'undefined' && this.articleListData[this.url].loaded == true && this.articleListData[this.url].isMore == true) {
			//this.setState({isRefreshing: true});
			// 获取分类文章列表
			this.page = this.page +1;
			this.props.dispatch( Actions.getArticleList(this.url, this.page) );
		}
  	}

	renderFooter () {
	    if (typeof(this.articleListData[this.url]) != 'undefined' && this.articleListData[this.url].loading == true ) {
	      	return (
	        	<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
	          		<Text style={{textAlign: 'center', fontSize: 16}}>加载中…</Text>
			  	</View>
	      	);
	    }
	}

	render ()
	{
		// 如果分类数据没有加载完
		if (typeof(this.articleListData[this.url]) == 'undefined' || this.articleListData[this.url].loaded != true) {
			return (
				<Loading />
			)
		}

		return (
      		<ListView
        		initialListSize={10}
        		dataSource={this.state.dataSource.cloneWithRows(this.articleListData[this.url].data)}
        		renderRow={this.renderItem.bind(this)}
        		style={styles.listView}
        		onEndReachedThreshold={10}
				onEndReached={this.onEndReached.bind(this)}
				//renderFooter={this.renderFooter.bind(this)}
      		/>
    	);

	}

}

let styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	flexDirection: 'column'
  	},
	listView: {
    	backgroundColor: '#eeeeec'
  	},
	imgItemThumb: {
      	width: DEVICE_WIDTH,
      	height: 200,
  	},
  	imgItemTit: {
      	position: 'absolute',
      	color: '#fff',
      	textAlign: 'center',
      	bottom: 20,
      	left:15,
  		right:15,
      	fontSize: 18,
      	fontWeight: "600",
      	backgroundColor: 'transparent',
  	},
  	strItem: {
      	borderStyle: 'solid',
      	borderBottomWidth: 0.3,
      	borderBottomColor: '#CECECE',
      	flex: 1,
      	justifyContent: 'center',
      	height: 70,
      	paddingLeft: 15,
      	paddingRight: 15,
  	},
  	strItemTit: {
      	textAlign: 'left',
      	fontSize: 16,
      	fontWeight: "400",
      	color: '#333333',
  	},
});

// 绑定redux数据到this.props
function select(store)
{
	return {
		articleList: store.articleList,
	}
}

export default connect(select)(ArticleList);
