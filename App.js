import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import ProductList from "./components/ProductList";
import CameraScreen from './Camera';
import MapPage from './components/MapPage';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from "@up-shared/components";
import { setCustomText } from 'react-native-global-props';
import SearchPage from './components/SearchPage';
import SettingsPage from './components/SettingsPage';
import SetRoutePage from './components/SetRoutePage';
import SetWarehousePage from './components/SetWarehousePage';


export default class App extends React.Component {
	constructor(props) {
		super(props);

		setCustomText(customTextProps);

		this.addItemCallback = this.addItemCallback.bind(this);
		this.removeItemCallback = this.removeItemCallback.bind(this);
		this.updateWarehouse = this.updateWarehouse.bind(this);
	}

	state = {
		products: [],
		chosenWarehouse: {
			Id: 17,
			Name: "Helsingborg",
			No: "468",
			Latitude: 56.092426,
			Longitude: 12.760899,
			isActive: false,
		},
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<ModalContainer screenProps={{
					products: this.state.products,
					modalVisible: this.state.modalVisible,
					addItemCallback: this.addItemCallback,
					removeItemCallback: this.removeItemCallback,
					chosenWarehouse: this.state.chosenWarehouse,
					updateWarehouse: this.updateWarehouse,
				}}/>
			</SafeAreaView>
		);
	}

	removeItemCallback(id, num){
		var list = this.state.products;
		for(var i = 0; i < list.length; i++){
			if(list[i].product_info.id == id){
				if(list[i].amount > num){
					list[i].amount -= num;
					break;
				} else {
					list.splice(i, 1);
					break;
				}
			}
		}
		this.setState({ products: list });
	}

	addItemCallback(item, num){
		var exists = false;
		var list = this.state.products;
		for(var i = 0; i < list.length; i++){
			if(list[i].product_info.id == item.product_info.id){
				exists = true;
				if(list[i].amount){
					//item exists with an amount
					list[i].amount += num;
				} else {
					//item exists with no amount
					list[i].amount = num + 1;
				}
			}
		}
		if(!exists){
			//item does not exist
			item.amount = num;
			list.push(item);
		}
		this.setState({ products: list });
	}

	updateWarehouse(warehouse) {
		this.setState({chosenWarehouse: warehouse});
	}
}

const AppTabNavigator = createMaterialTopTabNavigator({
	Camera: {
		screen: CameraScreen,
		navigationOptions: {
			tabBarLabel: 'Camera',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="scan" size={30} color={tintColor} />
			)
		}
	},
	List: {
		screen: ProductList,
		navigationOptions: {
			tabBarLabel: 'List',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="list" size={30} color={tintColor} />
			)
		}
	},
	// Map: {
	// 	screen: MapPage,
	// 	navigationOptions: {
	// 		tabBarLabel: 'Map',
	// 		tabBarIcon: ({ tintColor }) => (
	// 			<Icon name="store-24" size={30} color={tintColor} />
	// 		)
	// 	}
	// },
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

const SlideTransition = (index, position, width) => {
	const sceneRange = [index - 1, index, index + 1];
	const outputWidth  = [width, 0, 0];
	const transition = position.interpolate({
		inputRange: sceneRange,
		outputRange: outputWidth,
	});

	return {
		transform: [{ translateX: transition}]
	}
}

const NavigationConfig = () => {
	return {
		screenInterpolator: (sceneProps) => {
			const position = sceneProps.position;
			const scene = sceneProps.scene;
			const index = scene.index;
			const width = sceneProps.layout.initWidth;

			return SlideTransition(index, position, width);
		}
	}
}

const SettingsStack = createStackNavigator(
	{
		Main: {
			screen: AppTabNavigator,
		},
		SettingsMain: {
			screen: SettingsPage,
		},
		SettingWarehouse: {
			screen: SetWarehousePage,
		},
		SettingRoute: {
			screen: SetRoutePage,
		},
	},
	{
		headerMode: 'none',
		transitionConfig: NavigationConfig,
	}	
);

const RootStack = createStackNavigator(
    {
        Main: {
            screen: SettingsStack,
        },
        Modal: {
            screen: SearchPage,
		},
    },
    {
        mode: 'modal',
        headerMode: 'none',
        transparentCard: true,
        cardStyle: {
            opacity: 1,
        }
    }
);


const AppContainer = createAppContainer(AppTabNavigator);
const ModalContainer = createAppContainer(RootStack);
const MainContainer = createAppContainer(SettingsStack);

const customTextProps = {
	style: {
		fontFamily: 'NotoIKEAArabic-Regular' // light gray
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});
