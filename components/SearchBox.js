import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class SearchBox extends React.Component {
	constructor (props){
		super(props);

		this.state = {
			isFocused: false,
			placeholder: "Search",
			query: "",
		  };

		  this.onBlur = this.onBlur.bind(this);
		  this.onChangeText = this.onChangeText.bind(this);
		}

	componentDidMount(){
		console.log('mounted')
	}

	onBlur() {
		if(this.state.query.length > 0){
			this.setState({placeholder: this.state.query});
		}
	}

	onChangeText(text) {
		const {searchTextChanged} = this.props;
		searchTextChanged(text);
		this.setState({query: text});
	}
		
	render() {
		return (
			<View style={styles.focusedContainer}>
				<TextInput 
					ref={ref => (this.ref = ref)}
					style={styles.focused}
					autoFocus={true}
					onFocus={()=> this.setState({placeholder: "" })}
					onBlur={this.onBlur} 
					defaultValue={this.state.placeholder}
					onChangeText={text => this.onChangeText(text)}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	focusedContainer:{
		flexDirection:"column",
		backgroundColor: "#f4f4f4",
		width:"100%",
		padding: 20,
		opacity:0.7
	},
	focused:{
		backgroundColor:"white",
		borderRadius: 30,
		textAlign: "auto",
		padding: 10,
		borderColor:"gray",
		borderWidth:1,
		paddingHorizontal: 20,
		fontSize: 16,
	}
});

