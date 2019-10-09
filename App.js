import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from "./components/ListItem";


const products=[{
	_id:1,
	name:"BILLY / OXBERG ",
	price:"1 495",
	priceNoVat:"1 196",
	color:"vit",
	type:"Bokhylla",
	quantity:0,
	width:80, depth:30, height:202,
	description:"Var femte sekund säljer vi bokhyllan BILLY någonstans i världen. Ganska imponerande med tanke på att vi lanserade den redan 1979. Det är bokälskarens favorit som alltid håller stilen." }]

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
					<ListItem item={products[0]}></ListItem>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		
	}
});
