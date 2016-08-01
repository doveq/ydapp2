'use strict';

import React, { Component } from 'react';
import {
  	StyleSheet,
  	ListView,
  	RefreshControl,
  	ScrollView,
  	Text,
  	TouchableOpacity,
  	PropTypes,
  	Image,
  	View
} from 'react-native';

import { connect } from 'react-redux'
import * as Actions from './redux/actions'

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

class Category extends Component
{

	constructor (props) {
    	super(props);
  	}

	// 获取分类数据
	getCategary()
	{
		//dispatch(getCategoryList());
	}

	componentDidMount()
    {
		// 获取分类数据
		this.props.dispatch( Actions.getCategoryList() );
    }

	// 已加载组件收到新的参数时调用
	componentWillReceiveProps (nextProps)
	{
		console.log(nextProps.category);
		this.categoryData = nextProps.category;
	}

	render ()
	{
		return (
			<View style={styles.container}>
				<View style={styles.topnav}>
					<TouchableOpacity style={styles.navleft} onPress={() => this.navigator.pop()} ><Icon name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
					<Text style={styles.navtit}>栏目</Text>
					<TouchableOpacity style={styles.navright} onPress={() => this.navigator.push({name:'commentPage',params:{postId:this.props.id} })}><Icon name="search" size={24} color="#fff" /></TouchableOpacity>
				</View>
				<ScrollableTabView
					tabBarBackgroundColor="#fff"
					tabBarUnderlineColor="#C4AD7D"
					tabBarActiveTextColor="#C4AD7D"
					tabBarInactiveTextColor="#888"
					renderTabBar={() => <ScrollableTabBar />} >

					{
						/*
						this.categoryData.map((itme) => {
							return (
								<View tabLabel="React" style={{flex: 1}}><Text>React</Text></View>
							);
						})
						*/
					}

			    </ScrollableTabView>
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
		category: store.category,
	}
}

export default connect(select)(Category);
