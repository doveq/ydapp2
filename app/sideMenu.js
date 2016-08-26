'use strict';

/**
   左侧滑动菜单
*/

import React, { Component } from 'react';
import {
  	StyleSheet,
  	Text,
  	TouchableOpacity,
  	View
} from 'react-native';

import { connect } from 'react-redux'
import * as Actions from './redux/actions'
import * as CONFIGS from './configs/configs';

import Loading from './loading'

import Icon from 'react-native-vector-icons/FontAwesome';

export default class sideMenu extends Component
{
	constructor (props) {
    	super(props);
  	}


	render ()
	{
		let login =  <View style={styles.item} key={9998} >
                <TouchableOpacity onPress={() => this.onGoto('loginPage')} >
                <Text style={styles.itemStr}>
                    <Icon name="sign-in" size={18} color="#fff" />     {'登录'}
                </Text>
                </TouchableOpacity>
            </View>;

        let reg =  <View style={styles.item} key={9999} >
                <TouchableOpacity onPress={() => this.onGoto('registerPage')} >
                <Text style={styles.itemStr}>
                    <Icon name="user-plus" size={18} color="#fff" />    {'注册'}
                </Text>
                </TouchableOpacity>
            </View>;

		return (
			<View style={styles.container}>
				<View key={9995} style={{paddingBottom:10,}}>
					<TouchableOpacity onPress={this.props.closeDrawer} >
						<Text style={{textAlign:"right",}}><Icon name="chevron-right" size={18} color="#fff" /></Text>
					</TouchableOpacity>
				</View>

				<View style={styles.item} key={1} >
					<TouchableOpacity  onPress={ () => this.props.navigator.push({name:'homePage'}) } >
					<Text style={styles.itemStr}>
						<Icon name="ellipsis-h" size={18} color="#fff" />     首页
					</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.item} key={2} >
					<TouchableOpacity  onPress={ () => this.props.navigator.push({name:'categoryPage'}) } >
					<Text style={styles.itemStr}>
						<Icon name="ellipsis-h" size={18} color="#fff" />     栏目专题
					</Text>
					</TouchableOpacity>
				</View>

				<View style={{marginTop:20,}}></View>

				{login}
				{reg}

			</View>

		);
	}

}

let styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	flexDirection: 'column',
		backgroundColor: '#292C35',
  	},
	item: {
	    paddingTop: 10,
	    paddingBottom: 10,
	    paddingLeft: 10,
	    marginLeft:10,
	    marginRight:10,
	    borderStyle: 'solid',
	    borderBottomWidth: 0.3,
	    borderBottomColor: '#626B76',
	},
	itemStr: {
		fontSize: 18,
	    color:'#fff',
	    textAlign:'left',
	},
});
