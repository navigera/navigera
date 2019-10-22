import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TestPopUpProduct from "./components/TestPopUpProduct"
import ProductList from "./components/ProductList"
import CameraScreen from './Camera';
import ProductDescription from './components/ProductDescription'

export default class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			products: [],
		};

		//todo: generate better unique keys
		this.currentKey = 0;
		this.getProduct = this.getProduct.bind(this);
		this.handleRemoveProduct =  this.handleRemoveProduct.bind(this);
	}

	componentDidMount(){
		this.getProduct("690.178.28");
		this.getProduct("002.638.50");
		this.getProduct("690.178.28");
	}

	render() {
		return (
			//<CameraScreen />
			<View style={styles.container}>
		 	<ProductList products={this.state.products} removeCallback={this.handleRemoveProduct}></ProductList>
			{/*<TestPopUpProduct item={this.state.products[0]}></TestPopUpProduct> */}
			{/*<ProductDescription item={this.state.products[0]}></ProductDescription>*/}
			
			</View>
		);
	}

	getProduct(id){
		fetch("https://europe-west2-ikea-mau-eu.cloudfunctions.net/api/getProduct/" + id)
			.then((response) => response.json())
			.then((responseJson) => {
			//	console.log(responseJson);
				responseJson.key = this.currentKey;
				this.currentKey++;
				var list = this.state.products;
				list.push(responseJson);
				this.setState({products: list});
			  return responseJson;
			})
			.catch((error) => {
			  console.error(error);
			});
	}

	handleRemoveProduct(key){
		var list = this.state.products;
		for(var i = 0; i < list.length; i++){
			if(list[i].key == key){
				list.splice(i, 1);
				break;
			}
		}
		this.setState({products: list});
	}

}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		//backgroundColor:'#0058a3'
	}
});
