import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, BackHandler, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Icon } from "@up-shared/components";
import { globalStyles } from "../utilities";
import MapView, { Marker } from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps';

const stores = [
    {
        Id: 1,
        Name: "Stockholm Kungens Kurva",
        No: "012",
        Latitude: 59.271155,
        Longitude: 17.916201,
        isActive: false,
    },
    {
        Id: 2,
        Name: "Göteborg Kållered",
        No: "014",
        Latitude: 57.60379,
        Longitude: 12.048397,
        isActive: false,
    },
    {
        Id: 3,
        Name: "Linköping",
        No: "017",
        Latitude: 58.433189,
        Longitude: 15.58755,
        isActive: false,
    },
    {
        Id: 4,
        Name: "Stockholm Barkarby",
        No: "019",
        Latitude: 59.420331,
        Longitude: 17.857064,
        isActive: false,
    },
    {
        Id: 5,
        Name: "Västerås",
        No: "020",
        Latitude: 59.607596,
        Longitude: 16.456017,
        isActive: false,
    },
    {
        Id: 6,
        Name: "Uddevalla",
        No: "053",
        Latitude: 58.355878,
        Longitude: 11.818371,
        isActive: false,
    },
    {
        Id: 7,
        Name: "Uppsala",
        No: "070",
        Latitude: 59.847755,
        Longitude: 17.692156,
        isActive: false,
    },
    {
        Id: 8,
        Name: "Örebro",
        No: "106",
        Latitude: 59.211089,
        Longitude: 15.134397,
        isActive: false,
    },
    {
        Id: 9,
        Name: "Jönköping",
        No: "109",
        Latitude: 57.77267,
        Longitude: 14.205751,
        isActive: false,
    },
    {
        Id: 10,
        Name: "Gävle",
        No: "122",
        Latitude: 60.633906,
        Longitude: 16.989895, 
        isActive: false,
    },
    {
        Id: 11,
        Name: "Borlänge",
        No: "248",
        Latitude: 60.482664,
        Longitude: 15.421457,
        isActive: false,
    },
    {
        Id: 12,
        Name: "Älmhult",
        No: "268",
        Latitude: 56.550534,
        Longitude: 14.161674,
        isActive: false,
    },
    {
        Id: 13,
        Name: "Göteborg Bäckebol",
        No: "398",
        Latitude: 57.771771,
        Longitude: 11.999672,
        isActive: false,
    },
    {
        Id: 14,
        Name: "Umeå",
        No: "416",
        Latitude: 63.80771,
        Longitude: 20.25501,
        isActive: false,
    },
    {
        Id: 15,
        Name: "Malmö",
        No: "445",
        Latitude: 55.552634,
        Longitude: 12.986215,
        isActive: false,
    },
    {
        Id: 16,
        Name: "Sundsvall",
        No: "467",
        Latitude: 62.444195,
        Longitude: 17.334119,
        isActive: false,
    },
    {
        Id: 17,
        Name: "Helsingborg",
        No: "468",
        Latitude: 56.092426,
        Longitude: 12.760899,
        isActive: false,
    },
    {
        Id: 18,
        Name: "Kalmar",
        No: "469",
        Latitude: 56.68556,
        Longitude: 16.321199,
        isActive: false,
    },
    {
        Id: 19,
        Name: "HaparandaTornio",
        No: "470",
        Latitude: 65.842982,
        Longitude: 24.13192,
        isActive: false,
    },
    {
        Id: 20,
        Name: "Karlstad",
        No: "471",
        Latitude: 59.378797,
        Longitude: 13.41966,
        isActive: false,
    },

]

export default class SetWarehousePage extends Component {
    constructor(props){
        super(props);

        this.settingsClosed = this.settingsClosed.bind(this);
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
                Latitude: null,
                Longitude: null,
                isActive: false,
            },
            ableToUpdate: true,
        }
        
    }

    settingsClosed(){
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.settingsClosed
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
        this.setState({chosenWarehouse: cur, ableToUpdate: true});
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

            <View style={styles.header}>  
                <TouchableOpacity style={styles.button} onPress={this.settingsClosed}>
                    <Icon name="arrow-left" size={33} color="white"></Icon>
                </TouchableOpacity>  
                <Text style={[styles.headerText, globalStyles.bold]}>Change Warehouse</Text>  
            </View>
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
                    <View style={styles.textContainer}>
                        <Text style={[styles.infoText, globalStyles.bold]}>Chosen Warehouse: {this.state.chosenWarehouse.Name}</Text>
                        <Text style={[styles.infoText, globalStyles.bold]}> {this.state.selectedMarker.Name} </Text>
                    </View>
                    <TouchableOpacity style={[styles.updateButton, {backgroundColor: this.state.ableToUpdate==true? 'grey' : 'yellow'}]} onPress={this.updateWarehouse} disabled={this.state.ableToUpdate}>
                        <Text style={[styles.infoText, globalStyles.bold]}>Update</Text>
                    </TouchableOpacity>
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
  mapContainer: {
    height: 500,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
  },
  textContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
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
  infoText: {
      color: 'black',
      fontSize: 15,
  },
  updateButton: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
})