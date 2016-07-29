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


import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Category extends Component
{
	render ()
	{
		return (
			<View style={styles.container}>
				<View style={styles.topnav}>
					<Icon name="arrow-left" size={24} color="#fff" onPress={() => this.navigator.pop()} style={styles.navleft} />
					<Text style={styles.navtit}>栏目</Text>
					<Icon name="search" size={24} color="#fff" style={styles.navright} onPress={() => this.navigator.push({name:'commentPage',params:{postId:this.props.id} })} />
				</View>
				<ScrollableTabView
					tabBarBackgroundColor="#fff"
					tabBarUnderlineColor="#C4AD7D"
					tabBarActiveTextColor="#C4AD7D"
					tabBarInactiveTextColor="#888"
					renderTabBar={() => <ScrollableTabBar />} >

			        <View tabLabel="React" style={{flex: 1}}><Text>React</Text></View>
					<View tabLabel="Flow" style={{flex: 1}}><Text>Flow</Text></View>
					<View tabLabel="Jest" style={{flex: 1}}><Text>Jest</Text></View>
					<View tabLabel="Jest" style={{flex: 1}}><Text>Jest</Text></View>
					<View tabLabel="Jest" style={{flex: 1}}><Text>Jest</Text></View>
					<View tabLabel="React" style={{flex: 1}}><Text>React</Text></View>
					<View tabLabel="Flow" style={{flex: 1}}><Text>Flow</Text></View>
					<View tabLabel="Jest" style={{flex: 1}}><Text>Jest</Text></View>
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
      left:15,
      top: 12,
	  padding: 5,
  },
  navright: {
      position: 'absolute',
      right:15,
      top: 12,
	  padding: 5,
  },
  navtit: {
      flex:1,
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
      marginTop:10,
  },
});
