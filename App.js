import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from "./components/ListItem"
import ProductList from "./components/ProductList"
import axios from 'axios';
import CameraScreen from './Camera';

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
			</View>
		);
	}

	getProduct(id){
		axios.get("https://us-central1-ikea-mau.cloudfunctions.net/api/getProduct/" + id)
			.then(res => {
				var p = res.data;
				p.key = this.currentKey;
				this.currentKey++;
				var list = this.state.products;
				list.push(p);
				this.setState({products: list});
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
