import React from "react";
import { StyleSheet, SafeAreaView, Text, Alert } from "react-native";
import ProductList from "./components/ProductList";
import CameraScreen from "./Camera";
import SelfServePage from "./components/SelfServePage";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "@up-shared/components";
import { setCustomText } from "react-native-global-props";
import SearchPage from "./components/SearchPage";
import SettingsPage from "./components/SettingsPage";
import SetRoutePage from "./components/SetRoutePage";
import SetWarehousePage from "./components/SetWarehousePage";
import LandingPage from "./components/LandingPage";
import WarehouseLocationPage from "./components/WarehouseLocationPage";
import { GetProduct } from "./utilities";
import AboutPage from "./components/AboutPage";
import AsyncStorage from "@react-native-community/async-storage";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    setCustomText(customTextProps);

    this.bindMethods = this.bindMethods.bind(this);
    this.bindMethods();

    this.state = {
      products: [],
      packages: [],
      chosenWarehouse: null,
      chosenRoute: "classic"
    };
  }

  bindMethods() {
    this.addItemCallback = this.addItemCallback.bind(this);
    this.updatePackages = this.updatePackages.bind(this);
    this.removeItemCallback = this.removeItemCallback.bind(this);
    this.setPickedCallback = this.setPickedCallback.bind(this);
    this.updateWarehouse = this.updateWarehouse.bind(this);
    this.updateRoute = this.updateRoute.bind(this);
    this.clearShoppingList = this.clearShoppingList.bind(this);
    this.handlePackageResults = this.handlePackageResults.bind(this);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ModalContainer
          screenProps={{
            products: this.state.products,
            packages: this.state.packages,
            chosenWarehouse: this.state.chosenWarehouse,
            chosenRoute: this.state.chosenRoute,
            modalVisible: this.state.modalVisible,
            setPickedCallback: this.setPickedCallback,
            addItemCallback: this.addItemCallback,
            removeItemCallback: this.removeItemCallback,
            updateWarehouse: this.updateWarehouse,
            updateRoute: this.updateRoute,
            clearShoppingList: this.clearShoppingList
          }}
        />
      </SafeAreaView>
    );
  }

  async saveStateToStorage(products, packages, chosenWarehouse, chosenRoute) {
    if (products) {
      await AsyncStorage.setItem(
        "products",
        JSON.stringify(this.state.products)
      );
    }
    if (packages) {
      await AsyncStorage.setItem(
        "packages",
        JSON.stringify(this.state.packages)
      );
    }
    if (chosenWarehouse) {
      await AsyncStorage.setItem(
        "chosenWarehouse",
        JSON.stringify(this.state.chosenWarehouse)
      );
    }
    if (chosenRoute) {
      await AsyncStorage.setItem("chosenRoute", this.state.chosenRoute);
    }
  }

  componentDidMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const products = await AsyncStorage.getItem("products");
      const packages = await AsyncStorage.getItem("packages");
      const chosenWarehouse = await AsyncStorage.getItem("chosenWarehouse");
      const chosenRoute = await AsyncStorage.getItem("chosenRoute");

      this.setState({
        products: products ? JSON.parse(products) : [],
        packages: packages ? JSON.parse(packages) : [],
        chosenWarehouse: JSON.parse(chosenWarehouse),
        chosenRoute: chosenRoute ? chosenRoute : "default"
      });

      this.updatePackages();
    } catch (error) {
      // Error retrieving data
    }
  };

  setPickedCallback(id) {
    var packages = this.state.packages;
    packages.forEach(pkg => {
      if (id == pkg.id) {
        pkg.isPicked = !pkg.isPicked;
      }
    });
    this.setState({
      packages: packages
    });

    console.log(this.state.packages);
  }

  removeItemCallback(id, num) {
    //Remove product from shopping list
    var productList = this.state.products;
    var packageList = this.state.packages;
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].product_info.id == id) {
        //Remove packages from package list
        productList[i].packages.forEach(pkg => {
          for (var j = 0; j < packageList.length; j++) {
            if (packageList[j].id == pkg.id) {
              if (packageList[j].amount > num * pkg.count) {
                packageList[j].amount -= num * pkg.count;
                break;
              } else {
                packageList.splice(j, 1);
                break;
              }
            }
          }
        });
      }

      if (productList[i].amount > num) {
        productList[i].amount -= num;
        break;
      } else {
        productList.splice(i, 1);
        break;
      }
    }

    console.log("PRODUCTS:", productList);
    console.log("PACKAGES:", packageList);

    this.setState({ products: productList, packages: packageList });
    this.saveStateToStorage({ products: productList, packages: packageList });
  }

  addItemCallback(item, num) {
    var exists = false;
    //Add product to shopping list
    var productList = this.state.products;
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].product_info.id == item.product_info.id) {
        exists = true;
        if (productList[i].amount) {
          //item exists with an amount
          productList[i].amount += num;
        } else {
          //item exists with no amount
          productList[i].amount = num + 1;
        }
      }
    }
    if (!exists) {
      //item does not exist
      item.amount = num;
      productList.push(item);
    }

    //Add packages to package list
    var packageList = this.state.packages;

    item.packages.forEach(pkg => {
      var pkgExists = false;

      for (var j = 0; j < packageList.length; j++) {
        if (packageList[j].id == pkg.id) {
          pkgExists = true;

          packageList[j].amount += num * pkg.count;
        }
      }

      if (!pkgExists) {
        packageList.push({
          id: pkg.id,
          amount: pkg.count * num,
          isPicked: false
        });
      }
    });

    console.log("PRODUCTS:", productList);
    console.log("PACKAGES:", packageList);

    this.setState({ products: productList, packages: packageList });
    this.updatePackages();
  }

  clearShoppingList() {
    Alert.alert(
      "Clear shopping list",
      "Are you sure you want to clear your shopping list?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () =>
            this.setState({
              products: [],
              packages: []
            })
        }
      ],
      { cancelable: true }
    );

    this.saveStateToStorage({
      products: this.state.products,
      packages: this.state.packages
    });
  }

  updatePackages() {
    var packageList = this.state.packages;
    var promises = [];

    packageList.forEach(pkg => {
      promises.push(GetProduct(pkg.id));
    });

    Promise.all(promises).then(results => {
      this.handlePackageResults(packageList, results);
    });
  }

  handlePackageResults(packageList, results) {
    results.forEach(result => {
      packageList.forEach(pkg => {
        this.comparePackageData(pkg, result);
      });
    });

    this.setState({
      packages: packageList
    });

    this.saveStateToStorage({
      products: this.state.products,
      packages: this.state.packages
    });
  }

  comparePackageData(pkg, result) {
    if (pkg.id == result.product_info.id) {
      pkg.data = result;
    }
  }

  updateWarehouse(warehouse) {
    this.setState({ chosenWarehouse: warehouse });
    this.saveStateToStorage({ chosenWarehouse: this.state.chosenWarehouse });
  }

  updateRoute(route) {
    this.setState({ chosenRoute: route });
    this.saveStateToStorage({ chosenRoute: this.state.chosenRoute });
  }
}

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarLabel: "Camera",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="scan" size={30} color={tintColor} />
        )
      }
    },
    List: {
      screen: ProductList,
      navigationOptions: {
        tabBarLabel: "List",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" size={30} color={tintColor} />
        )
      }
    },
    SelfServe: {
      screen: SelfServePage,
      navigationOptions: {
        tabBarLabel: "SelfServe",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="trolley-loaded" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Camera",
    tabBarPosition: "bottom",
    swipeEnabled: true,
    lazy: false,
    tabBarOptions: {
      activeTintColor: "#0058a3",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "white",
        height: 50
      },
      iconStyle: {
        width: 30,
        margin: 0
      },
      indicatorStyle: {
        height: 0
      },
      showIcon: true,
      showLabel: false
    }
  }
);

const LandingTabNavigator = createMaterialTopTabNavigator(
  {
    LandingPage: {
      screen: LandingPage,
      navigationOptions: {
        tabBarLabel: "LandingPage"
      }
    },
    WarehouseLocationPage: {
      screen: WarehouseLocationPage,
      navigationOptions: {
        tabBarLabel: "WarehouseLocationPage"
      }
    }
  },
  {
    initialRouteName: "LandingPage",
    tabBarPosition: "bottom",
    swipeEnabled: true,
    removeClippedSubviews: true,
    tabBarOptions: {
      style: {
        backgroundColor: "#0058a3"
      },
      showIcon: false,
      showLabel: false,
      indicatorStyle: {
        height: 0
      }
    }
  }
);

const SlideTransition = (index, position, width) => {
  const sceneRange = [index - 1, index, index + 1];
  const outputWidth = [width, 0, 0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputWidth
  });

  return {
    transform: [{ translateX: transition }]
  };
};

const NavigationConfig = () => {
  return {
    screenInterpolator: sceneProps => {
      const position = sceneProps.position;
      const scene = sceneProps.scene;
      const index = scene.index;
      const width = sceneProps.layout.initWidth;

      return SlideTransition(index, position, width);
    }
  };
};

const SettingsStack = createStackNavigator(
  {
    Main: {
      screen: AppTabNavigator
    },
    SettingsMain: {
      screen: SettingsPage
    },
    SettingWarehouse: {
      screen: SetWarehousePage
    },
    SettingRoute: {
      screen: SetRoutePage
    },
    SettingAbout: {
      screen: AboutPage
    }
  },
  {
    headerMode: "none",
    transitionConfig: NavigationConfig
  }
);

const RootStack = createStackNavigator(
  {
    Start: {
      screen: LandingTabNavigator
    },
    Main: {
      screen: SettingsStack
    },
    Modal: {
      screen: SearchPage
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    transparentCard: true,
    cardStyle: {
      opacity: 1
    }
  }
);

const AppContainer = createAppContainer(AppTabNavigator);
const ModalContainer = createAppContainer(RootStack);
const MainContainer = createAppContainer(SettingsStack);

const customTextProps = {
  style: {
    fontFamily: "NotoIKEAArabic-Regular" // light gray
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
