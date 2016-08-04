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

class Article extends Component
{
	constructor (props) {
    	super(props);
  	}

	componentDidMount()
    {
		// 获取分类文章列表
		this.props.dispatch( Actions.getArticle(this.props.id) );
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
		if (typeof(this.articleData) == 'undefined' || this.articleData.loaded != true) {
			return (
				<Loading />
			)
		}

		return (
      		<Text>is ok!</Text>
    	);

	}

}
