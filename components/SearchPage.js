import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import SearchBox from "./SearchBox";
import {GetSearchResult} from '../utilities.js';
import SearchItem from "./SearchItem.js"
import PopUpProduct from "./PopUpProduct";

export default class SearchPage extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isFocused: false,
      products: [],
      modalVisible: false
    };
    
    this.modalClosed = this.modalClosed.bind(this);
    this.searchTextChanged = this.searchTextChanged.bind(this);
    this.searchBarFocused = this.searchBarFocused.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  modalClosed() {
    this.setState({modalVisible: false}); 
  }

  searchBarFocused(){
    const {pausePreview} = this.props;
    pausePreview();
    this.setState({
    isFocused: !this.state.isFocused,
    });
  }

  async searchTextChanged(text){
    if(text){
      let result = await GetSearchResult(text);
      if(result!=null){
        let list = [];
        result.map(p => {
          list.push(p);
          this.setState({
            products:list
          })
        })
      } 
    }
  }

  handlePress(product){
    this.modal.showPopover(product);
    this.setState({ modalVisible : true, })
  }
    
  getSearchView(){
    if(!this.state.isFocused){
      return (
        <View style={styles.container}>
          <SearchBox isFocused = {this.state.isFocused} searchBarFocused = {this.searchBarFocused} searchTextChanged = {this.searchTextChanged}></SearchBox>
        </View>
      );
    }
    else{
      const {addItemCallback} = this.props;
      return (
        <View style={styles.focusedContainer}>
          <PopUpProduct style={styles.modal} addItemCallback={addItemCallback} modalCloseCallback={this.modalClosed} ref={modal => { this.modal = modal }}></PopUpProduct>
          <SearchBox isFocused = {this.state.isFocused} searchBarFocused = {this.searchBarFocused} searchTextChanged = {this.searchTextChanged}></SearchBox>
          {this.getProducts()}
        </View>
      );
    }
  }

  getProducts(){
    if(this.state.products.length>0){
      return(
        <ScrollView style={[styles.productsContainer, styles.padding]}>
          {this.state.products.map(p => {
            return <SearchItem product={p} handlePress = {this.handlePress} key={p.product_info.id}/>
          })}
        </ScrollView>
      );
    }
  }

  render() {
    return (
       <View style={{width:"100%"}}>
        {this.getSearchView()}
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  focusedContainer:{
    height:"100%",
    backgroundColor:"#f4f4f4"
  },
  contentContainer: {
  },
  flex:{
    flex: 1,
  },
  productsContainer:{
    flex: 1,
    backgroundColor:"#f4f4f4"
  },
  padding:{
    padding: 20,
  }
})

