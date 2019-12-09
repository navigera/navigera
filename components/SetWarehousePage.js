import React, { Component } from 'react';
import { Text, View, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import { Icon } from "@up-shared/components";
import { globalStyles } from "../utilities";
import MapView, { Marker } from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import SettingsHeader from "./SettingsHeader.js";

const stores = [
    {
        Id: 1,
        Name: "Stockholm Kungens Kurva",
        No: "012",
        Address: "Modulvägen 1, 141 08 Kungens Kurva",
        Latitude: 59.271155,
        Longitude: 17.916201,
        isActive: false,
    },
    {
        Id: 2,
        Name: "Göteborg Kållered",
        No: "014",
        Address: "Ekenleden 2, 428 36 Kållered",
        Latitude: 57.60379,
        Longitude: 12.048397,
        isActive: false,
    },
    {
        Id: 3,
        Name: "Linköping",
        No: "017",
        Address: "Västra Svedengatan 7, 581 28 Linköping",
        Latitude: 58.433189,
        Longitude: 15.58755,
        isActive: false,
    },
    {
        Id: 4,
        Name: "Stockholm Barkarby",
        No: "019",
        Address: "Folkungavägen 50, 177 35 Järfälla",
        Latitude: 59.420331,
        Longitude: 17.857064,
        isActive: false,
    },
    {
        Id: 5,
        Name: "Västerås",
        No: "020",
        Address: "Domkraftsgatan 2, 721 38 Västerås",
        Latitude: 59.607596,
        Longitude: 16.456017,
        isActive: false,
    },
    {
        Id: 6,
        Name: "Uddevalla",
        No: "053",
        Address: "Östra Torpsvägen 30, 451 76 Uddevalla",
        Latitude: 58.355878,
        Longitude: 11.818371,
        isActive: false,
    },
    {
        Id: 7,
        Name: "Uppsala",
        No: "070",
        Address: "Rapsgatan 3, 753 23 Uppsala",
        Latitude: 59.847755,
        Longitude: 17.692156,
        isActive: false,
    },
    {
        Id: 8,
        Name: "Örebro",
        No: "106",
        Address: "Kundvägen 2, 702 31 Örebro",
        Latitude: 59.211089,
        Longitude: 15.134397,
        isActive: false,
    },
    {
        Id: 9,
        Name: "Jönköping",
        No: "109",
        Address: "A6 Center, Kompanigatan 6, 553 05 Jönköping",
        Latitude: 57.77267,
        Longitude: 14.205751,
        isActive: false,
    },
    {
        Id: 10,
        Name: "Gävle",
        No: "122",
        Address: "Valbovägen 307, 818 32 Valbo",
        Latitude: 60.633906,
        Longitude: 16.989895, 
        isActive: false,
    },
    {
        Id: 11,
        Name: "Borlänge",
        No: "248",
        Address: "Norra Backagatan 1, 781 70 Borlänge",
        Latitude: 60.482664,
        Longitude: 15.421457,
        isActive: false,
    },
    {
        Id: 12,
        Name: "Älmhult",
        No: "268",
        Address: "Handelsvägen 4, 343 33 Älmhult",
        Latitude: 56.550534,
        Longitude: 14.161674,
        isActive: false,
    },
    {
        Id: 13,
        Name: "Göteborg Bäckebol",
        No: "398",
        Address: "Transportgatan 23, 422 46 Hisings Backa",
        Latitude: 57.771771,
        Longitude: 11.999672,
        isActive: false,
    },
    {
        Id: 14,
        Name: "Umeå",
        No: "416",
        Address: "Marknadsgatan 1, 904 22 Umeå",
        Latitude: 63.80771,
        Longitude: 20.25501,
        isActive: false,
    },
    {
        Id: 15,
        Name: "Malmö",
        No: "445",
        Address: "Kulthusgatan 1, 215 86 Malmö",
        Latitude: 55.552634,
        Longitude: 12.986215,
        isActive: false,
    },
    {
        Id: 16,
        Name: "Sundsvall",
        No: "467",
        Address: "Gesällvägen 3, 857 53 Sundsvall",
        Latitude: 62.444195,
        Longitude: 17.334119,
        isActive: false,
    },
    {
        Id: 17,
        Name: "Helsingborg",
        No: "468",
        Address: "Marknadsvägen, Väla Centrum 7, 260 36 Ödåkra",
        Latitude: 56.092426,
        Longitude: 12.760899,
        isActive: false,
    },
    {
        Id: 18,
        Name: "Kalmar",
        No: "469",
        Address: "Bilbyggarvägen 6, 395 56 Kalmar",
        Latitude: 56.68556,
        Longitude: 16.321199,
        isActive: false,
    },
    {
        Id: 19,
        Name: "HaparandaTornio",
        No: "470",
        Address: "Norrmalmsvägen 2, 953 36 Haparanda",
        Latitude: 65.842982,
        Longitude: 24.13192,
        isActive: false,
    },
    {
        Id: 20,
        Name: "Karlstad",
        No: "471",
        Address: "Bergviksvägen 43, 653 46 Karlstad",
        Latitude: 59.378797,
        Longitude: 13.41966,
        isActive: false,
    },

]

export default class SetWarehousePage extends Component {
    constructor(props){
        super(props);

        this.setWarehouseClosed = this.setWarehouseClosed.bind(this);
        this.onPressMarker = this.onPressMarker.bind(this);
        this.updateWarehouse = this.updateWarehouse.bind(this);
        this.unSelectMarker = this.unSelectMarker.bind(this);
        this.copyObject = this.copyObject.bind(this);
        this.assignState = this.assignState.bind(this);

        this.state = {
            chosenWarehouse: this.props.screenProps.chosenWarehouse,
            selectedMarker: {
                Id: null,
                Name: null,
                No: null,
                Address: null,
                Latitude: null,
                Longitude: null,
                isActive: false,
            },
            ableToUpdate: true,
            showInfo: false,
        }
        
    }

    setWarehouseClosed(){
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.setWarehouseClosed
        );
        this.assignState();
    }

    componentWillUnmount() { 
        this.backHandler.remove();
    }

    assignState() {
        stores.map(marker => {
            if(JSON.stringify(this.state.chosenWarehouse) === JSON.stringify(marker)) {
                marker.isActive = true;
                this.setState({chosenWarehouse: marker});
            }
        });    
    }

    copyObject(src) {
        return Object.assign({}, src);
    }

    onPressMarker(e, index) {
        var same = false;
        stores.map(marker => {
            if(index === marker.Id) {
                if(index === this.state.chosenWarehouse.Id) {
                    same = true;
                }
                var selMarker = this.copyObject(marker); 
                this.setState({selectedMarker: selMarker, ableToUpdate: same}); 
            }
        })
        this.setState({showInfo: true});
    }

    updateWarehouse() {
        var cur;
        stores.map(marker => {
            if(this.state.selectedMarker.Id === marker.Id) {
                marker.isActive = true;
                cur = this.copyObject(marker);
            }
            if(this.state.chosenWarehouse.Id === marker.Id) {
                marker.isActive = false;
            }
        })
        this.setState({chosenWarehouse: cur, ableToUpdate: true, showInfo: false});
        this.unSelectMarker();  
        this.props.screenProps.updateWarehouse(cur);
    }

    unSelectMarker() {
        for (var val in this.state.selectedMarker) {
            this.state.selectedMarker[val] = null;
        }
    }
    
  render() {
    return (
        <View style={styles.container}>

            <SettingsHeader titleText={"Warehouse location"} method={this.setWarehouseClosed}/>

            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: 61.383105,
                            longitude: 15.085107,
                            latitudeDelta: 12.0000,
                            longitudeDelta: 12.0000,
                        }}
                    >
                        {stores.map(marker => (
                            <Marker
                                coordinate={{latitude: marker.Latitude, longitude: marker.Longitude}}
                                title={marker.Name}
                                key={`${marker.Id}-${marker.isActive ? 'active' : 'inactive'}`}
                                pinColor={marker.isActive==true ? 'yellow' : '#0058a3'}
                                onPress={(e) => this.onPressMarker(e, marker.Id)}
                            />
                        ))}
                    </MapView>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.infoTitleText, globalStyles.regular]}> {this.state.showInfo ? 'IKEA Warehouse ' + this.state.selectedMarker.Name : ''} </Text>
                    <Text style={[styles.infoText, globalStyles.regular]}> {this.state.showInfo ? this.state.selectedMarker.Address : ''} </Text>
                    <TouchableOpacity style={[styles.updateButton, {backgroundColor: this.state.ableToUpdate==true? '#b8b8b6' : '#0058a3'}]} onPress={this.updateWarehouse} disabled={this.state.ableToUpdate}>
                        <Text style={[styles.updateText, globalStyles.regular]}>Select {this.state.selectedMarker.Name}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.currentWarehouseText, globalStyles.regular]}>Current warehouse: {this.state.chosenWarehouse.Name}</Text>
                </View>
            </View>  
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapContainer: {
   // height: 440,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    //flex: 1,
    height: 150,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  infoTitleText: {
    color: 'black',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 60,
    width: '100%'
  },
  infoText: {
    color: 'grey',
    fontSize: 14,
    marginLeft: 60,
    width: '100%'
  },
  updateButton: {
    height: 40,
    width: 350,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  updateText: {
    color: 'white',
    fontSize: 17,
  },
  currentWarehouseText: {
    color: 'grey',
    fontSize: 14,
  },
})