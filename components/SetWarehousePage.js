import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, BackHandler, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Icon } from "@up-shared/components";
import { globalStyles } from "../utilities";


export default class SetWarehousePage extends Component {
    constructor(props){
        super(props);

        this.settingsClosed = this.settingsClosed.bind(this);
    }

    settingsClosed(){
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount(){
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.settingsClosed
        );
    }

    componentWillUnmount(){
        this.backHandler.remove();
    }

  render() {
    return (
        <View style={styles.container}>

            <View style={styles.header}>  
                <TouchableOpacity style={styles.button} onPress={this.settingsClosed}>
                    <Icon name="arrow-left" size={33} color="white"></Icon>
                </TouchableOpacity>  
                <Text style={[styles.headerText, globalStyles.bold]}>Change Warehouse</Text>  
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
    marginRight: 85,
  },
  button: {
    height: 40,
    marginTop: 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0058a3',  
  },
})