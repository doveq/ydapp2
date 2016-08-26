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
	TextInput,
} from 'react-native';

import { connect } from 'react-redux'
import * as Actions from './redux/actions'
import * as CONFIGS from './configs/configs';

import Icon from 'react-native-vector-icons/FontAwesome';

import Loading from './loading'
import Comments from './comments'

var DEVICE_WIDTH = Dimensions.get('window').width;

class Article extends Component
{
	constructor (props) {
    	super(props);

		this.state = {
	      	inputHeight: 0,
			inputText: '',
	    };
  	}

	componentDidMount()
    {

    }

	// 已加载组件收到新的参数时调用
	componentWillReceiveProps (nextProps)
	{
		this.articleData = nextProps.article;
	}


	render ()
	{
		let url = CONFIGS.ARTICLE_CONTENT_API + this.props.id;

		return (
			<View style={styles.container}>
				<View style={styles.topnav}>
					<TouchableOpacity style={styles.navleft} onPress={() => this.props.navigator.pop()} ><Icon name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
					<Text style={styles.navtit}></Text>
					<TouchableOpacity style={styles.navright} onPress={() => this.props.navigator.push({name:'commentPage',params:{postId:this.props.id} })}><Icon name="search" size={24} color="#fff" /></TouchableOpacity>
				</View>

				<WebView
                  automaticallyAdjustContentInsets={false}
                  style={{flex: 1}}
                  source={{uri: url}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  decelerationRate="normal"
                  scalesPageToFit={false}
				  startInLoadingState={true}
                />

				<View style={{flexDirection: 'row', paddingLeft:10, paddingTop:15, paddingRight:10, paddingBottom:15,borderColor: '#dfdfdf', borderTopWidth: 1,}}>
					<View style={{ borderColor: '#dfdfdf', borderWidth: 1,flex:1,}}>
					   <TextInput style={{backgroundColor: '#f7f7f7', height:38,}}
					   		multiline={true}
							onChange={(event) => {
								this.setState({
						            inputText: event.nativeEvent.text,
						            inputHeight: event.nativeEvent.contentSize.height,
						         });
							 }}
					   		value={this.state.inputText}
							placeholder="伟大的言论从你开始..."
						/>
					</View>

					<TouchableOpacity onPress={() => this.navigator.pop()} >
						<Text style={{backgroundColor:'#dfdfdf',width:50, height:40,paddingTop:10,marginLeft:10,textAlign:'center',}}>发表</Text>
					</TouchableOpacity>
				</View>

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
