import React, { Component } from 'react';
import { Text, View, StyleSheet, BackHandler, TouchableOpacity, Switch } from 'react-native';
import { Icon } from "@up-shared/components";
import { globalStyles } from "../utilities";


export default class SetRoutePage extends Component {
    constructor(props){
        super(props);

        this.setRouteClosed = this.setRouteClosed.bind(this);
    }

    setRouteClosed(){
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount(){
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.setRouteClosed
        );
    }

    componentWillUnmount(){
        this.backHandler.remove();
    }

  render() {
    return (
        <View style={styles.container}>

            <View style={styles.header}>  
                <TouchableOpacity style={styles.button} onPress={this.setRouteClosed}>
                    <Icon name="arrow-left" size={33} color="white"></Icon>
                </TouchableOpacity>  
                <Text style={[styles.headerText, globalStyles.bold]}>Order route by</Text>  
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.optionContainer}>
                    <Text style={[styles.optionText, globalStyles.regular]}>Order by package volume</Text>
                    <Switch disabled={true} trackColor={{false:'#b8b8b6', true:'#68ed8c'}} thumbColor={'white'} value={true}/>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={[styles.optionText, globalStyles.regular]}>Order by package weight</Text>
                    <Text style={[styles.featureText, globalStyles.bold]}>Feature coming soon</Text>
                    <Switch disabled={true} trackColor={{false:'#b8b8b6', true:'#68ed8c'}} thumbColor={'white'} value={false} />
                </View>
                
                <View style={styles.optionContainer}>
                    <Text style={[styles.optionText, globalStyles.regular]}>Order by quickest route</Text>
                    <Text style={[styles.featureText, globalStyles.bold]}>Feature coming soon</Text>
                    <Switch disabled={true} trackColor={{false:'#b8b8b6', true:'#68ed8c'}} thumbColor={'white'} value={false} />
                </View>
                
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
    marginTop: 15,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0058a3',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    marginTop: 15,
    marginRight: 115,
  },
  button: {
    height: 40,
    marginTop: 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0058a3',  
  },
  optionContainer: {
    height: 60,
    //borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  optionText: {
    color: 'black',
    fontSize: 15,
  },
  featureText: {
    color: 'grey',
    fontSize: 11,
    marginHorizontal: 15,
  }
})