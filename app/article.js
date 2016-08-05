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
	WebView,
} from 'react-native';

import { connect } from 'react-redux'
import * as Actions from './redux/actions'
import * as CONFIGS from './configs/configs';

import Icon from 'react-native-vector-icons/FontAwesome';

import Loading from './loading'

var DEVICE_WIDTH = Dimensions.get('window').width;

class Article extends Component
{
	constructor (props) {
    	super(props);
  	}

	componentDidMount()
    {
		//this.props.dispatch( Actions.getArticle(this.props.id) );
    }

	// 已加载组件收到新的参数时调用
	componentWillReceiveProps (nextProps)
	{
		console.log(nextProps.article);
		this.articleData = nextProps.article;
	}

	render ()
	{
		// 如果分类数据没有加载完
		// if (typeof(this.articleData) == 'undefined' || this.articleData.loaded != true) {
		// 	return (
		// 		<Loading />
		// 	)
		// }

		/*
		let data = this.articleData.data;
        let topimg = '';
        if (data.thumbnail_images != null)
            topimg = '<img src="' + data.thumbnail_images.full.url + '" style="max-width:100%;">';

        let html = '<!DOCTYPE html><html><head>'
                    +'<style>html,body{padding:0,margin:0} p{font-size:2.5em;}</style>'
                    +'</head><body>'
                    + topimg
                    + '<div style="padding:20px 0;font-weight:bold;font-size:4em;">'+ data.title +'</div>'
                    + data.content
                    + '</body></html>';

        // 正则替换图片，解决图片超出显示的问题
        html = html.replace(/<\s*img\s+[^>]*?src\s*=\s*(\'|\")(.*?)\1[^>]*?\/?\s*>/g, '<img src="$2" style="width:100%;">');
		html = "hellow~!";
		*/

		let url = CONFIGS.ARTICLE_CONTENT_API + this.props.id;

		return (
			<View style={styles.container}>
				<View style={styles.topnav}>
					<TouchableOpacity style={styles.navleft} onPress={() => this.navigator.pop()} ><Icon name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
					<Text style={styles.navtit}></Text>
					<TouchableOpacity style={styles.navright} onPress={() => this.navigator.push({name:'commentPage',params:{postId:this.props.id} })}><Icon name="search" size={24} color="#fff" /></TouchableOpacity>
				</View>

				<WebView
                  automaticallyAdjustContentInsets={false}
                  style={{flex: 1}}
                  source={{uri: url}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  decelerationRate="normal"
                  scalesPageToFit={true}
				  startInLoadingState={true}
                />
			</View>
    	);

	}

}


let styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	flexDirection: 'column'
  	},
	topnav: {
      	backgroundColor: '#292C35',
      	height:48,
      	justifyContent: 'center',
      	alignItems: 'center',
  	},
	navleft: {
      position: 'absolute',
	  left: 0,
	  top: 0,
	  paddingLeft:15,
	  paddingTop:12,
	  paddingBottom:12,
	  paddingRight:15,
  },
  navright: {
      position: 'absolute',
      right:0,
      top: 0,
	  paddingLeft:15,
	  paddingTop:12,
	  paddingBottom:12,
	  paddingRight:15,
  },
  navtit: {
      flex:1,
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
      marginTop:10,
  },
});

// 绑定redux数据到this.props
function select(store)
{
	return {
		article: store.article,
	}
}

export default connect(select)(Article);
