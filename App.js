import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ProductList from "./components/ProductList";
import CameraScreen from './Camera';
import SearchPage from './components/SearchPage';
import MapPage from './components/MapPage';
import PopUpProduct from './components/PopUpProduct'
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from "@up-shared/components";


export default class App extends React.Component {
	constructor(props){
		super(props);

		this.addItemCallback = this.addItemCallback.bind(this);
		this.removeItemCallback = this.removeItemCallback.bind(this);
	}

	state = {
		products: [],
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<ModalContainer screenProps={{
					products: this.state.products,
					addItemCallback: this.addItemCallback,
					removeItemCallback: this.removeItemCallback,
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
		this.setState({products: list});
	}

	addItemCallback(item, num){
		console.log(item);
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
}

const AppTabNavigator = createMaterialTopTabNavigator({
		Camera : {screen: CameraScreen,
			navigationOptions: {
				tabBarLabel:'Camera',
				tabBarIcon: ({tintColor})=>(
					<Icon name="scan-barcode-24" size={40} color={tintColor}/>
				)
			}
		},
		Search : {screen: SearchPage,
			navigationOptions: {
				tabBarLabel:'Search',
				tabBarIcon: ({tintColor})=>(
					<Icon name="search-24" size={40} color={tintColor}/>
				)
			}
		},
		List : {screen: ProductList,
			navigationOptions: {
				tabBarLabel:'List',
				tabBarIcon: ({tintColor})=>(
					<Icon name="list-view-24" size={40} color={tintColor}/>
				)
			}
		},
		Map : {screen: MapPage,
			navigationOptions: {
				tabBarLabel:'Map',
				tabBarIcon: ({tintColor})=>(
					<Icon name="store-24" size={40} color={tintColor}/>
				)
			}
		},
	},
	{
		initialRouteName:'Camera',
		tabBarPosition: 'bottom',
		swipeEnabled: true,
		lazy: true,
		tabBarOptions: {
			activeTintColor: 'blue',
			inactiveTintColor: 'black',
			style: {
				backgroundColor: 'white',
				height: 70,
			},
			iconStyle: {
				width: 40,
				margin: 5,
			},
			indicatorStyle: {
				height: 0.
			},
			showIcon: true,
			showLabel: false,
		},
	}
);

const RootStack = createStackNavigator(
	{
		Main: {
			screen: AppTabNavigator,
		},
		Modal: {
			screen: PopUpProduct,
		}
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



const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: 'white',
	},
});
