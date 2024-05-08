import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/screens/Home";
import Categories from "./src/screens/Categories";
import ProductDetails from "./src/screens/ProductDetail";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { Colors } from "./src/constants/Colors";
import CustomNavIcon from "./src/components/CustomNavIcons";
import { Provider } from "react-redux";
import { store } from "./src/redux/Store";
import OrderCart from "./src/screens/Cart";

const Drawer = createDrawerNavigator();

export default function App() {
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("./assets/Fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/Fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/Fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/Fonts/Poppins-Bold.ttf"),
    "Lato-Bold": require("./assets/Fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/Fonts/Lato-Regular.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerLeft: (props) => (
            <CustomNavIcon
              onPress={navigation.toggleDrawer}
              iconName={"menu"}
              color={Colors.Peach}
              size={30}
            />
          ),
          headerRight: (props) => (
            <CustomNavIcon
              iconName={"shopping-bag"}
              color={Colors.Peach}
              size={30}
            />
          ),
          drawerStyle: {
            backgroundColor: "white",
          },
        })}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "Fake Store",
            headerStyle: {
              backgroundColor: Colors.DarkestBlue,
              height: 80,
            },
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerTitleStyle: {
              textTransform: "uppercase",
              fontFamily: "Lato-Bold",
              fontSize: 16,
              letterSpacing: 4,
            },
          }}
        />
        <Drawer.Screen
          name="Categories"
          component={Categories}
          options={{
            headerTitle: "Fake Store",
            headerStyle: {
              backgroundColor: Colors.DarkestBlue,
            },
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerTitleStyle: {
              textTransform: "uppercase",
              fontFamily: "Lato-Bold",
              fontSize: 16,
              letterSpacing: 4,
            },
          }}
        />
        <Drawer.Screen
          name="Product Details"
          component={ProductDetails}
          options={{
            headerTitle: "Product Details",
            headerStyle: {
              backgroundColor: Colors.DarkestBlue,
            },
            drawerItemStyle: {display: "none"},
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerTitleStyle: {
              textTransform: "uppercase",
              fontFamily: "Lato-Bold",
              fontSize: 16,
              letterSpacing: 4,
            },
          }}
        />
        <Drawer.Screen
          name="Order Cart"
          component={OrderCart}
          options={{
            headerTitle: "Your Cart",
            headerStyle: {
              backgroundColor: Colors.DarkestBlue,
            },
            drawerItemStyle: {display: "none"},
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerTitleStyle: {
              textTransform: "uppercase",
              fontFamily: "Lato-Bold",
              fontSize: 16,
              letterSpacing: 4,
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
