import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ProductList from "./components/ProductList";
import CameraScreen from './Camera';
import SearchPage from './components/SearchPage';
import MapPage from './components/MapPage';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Icon } from "@up-shared/components";


export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.currentKey = 0;

		this.addItemCallback = this.addItemCallback.bind(this);
		this.removeItemCallback = this.removeItemCallback.bind(this);
	}

	state = {
		products: [],
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<AppContainer screenProps={{
					products: this.state.products,
					modalVisible: this.state.modalVisible,
					addItemCallback: this.addItemCallback,
					removeItemCallback: this.removeItemCallback,
				}} />
			</SafeAreaView>
		);
	}

	removeItemCallback(key) {
		var list = this.state.products;
		for (var i = 0; i < list.length; i++) {
			if (list[i].key == key) {
				list.splice(i, 1);
				break;
			}
		}
		this.setState({ products: list });
	}

	addItemCallback(item, num) {
		//todo: add num items instead of 1
		var list = this.state.products;
		item.key = this.currentKey;
		this.currentKey++;
		list.push(item);
		this.setState({ products: list });
	}
}

const AppTabNavigator = createMaterialTopTabNavigator({
	Camera: {
		screen: CameraScreen,
		navigationOptions: {
			tabBarLabel: 'Camera',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="scan-barcode-24" size={30} color={tintColor} />
			)
		}
	},
	Search: {
		screen: SearchPage,
		navigationOptions: {
			tabBarLabel: 'Search',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="search-24" size={30} color={tintColor} />
			)
		}
	},
	List: {
		screen: ProductList,
		navigationOptions: {
			tabBarLabel: 'List',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="list-view-24" size={30} color={tintColor} />
			)
		}
	},
	Map: {
		screen: MapPage,
		navigationOptions: {
			tabBarLabel: 'Map',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="store-24" size={30} color={tintColor} />
			)
		}
	},
},
	{
		initialRouteName: 'Camera',
		tabBarPosition: 'bottom',
		swipeEnabled: true,
		lazy: true,
		tabBarOptions: {
			activeTintColor: 'blue',
			inactiveTintColor: 'black',
			style: {
				backgroundColor: 'white',
				height: 50,
			},
			iconStyle: {
				width: 30,
				margin: 0,
			},
			indicatorStyle: {
				height: 0.
			},
			showIcon: true,
			showLabel: false,
		},
	}
);

const AppContainer = createAppContainer(AppTabNavigator);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});
