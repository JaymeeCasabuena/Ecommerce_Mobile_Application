import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import ProductList from "./src/screens/ProductList";
import ProductDetails from "./src/screens/ProductDetail";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { Colors } from "./src/constants/Colors";
import CustomNavIcon from "./src/components/CustomNavIcons";
import { Provider } from "react-redux";
import { store } from "./src/redux/Store";
import OrderCart from "./src/screens/Cart";
import CustomDrawerContent from "./src/components/CustomDrawerContent";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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

  const MainNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="Product Details" component={ProductDetails} />
        <Stack.Screen name="Order Cart" component={OrderCart} />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          initialRouteName="Home"
          screenOptions={({ navigation, route }) => ({
            headerLeft: () => {
              return route.name === "Order Cart" ? (
                <CustomNavIcon
                  onPress={navigation.toggleDrawer}
                  iconName={"arrow-left"}
                  color={Colors.Peach}
                  size={26}
                  style={{ marginRight: -10}}
                />
              ) : (
                <CustomNavIcon
                  onPress={navigation.toggleDrawer}
                  iconName={"menu"}
                  color={Colors.Peach}
                  size={30}
                />
              );
            },
            headerRight: () => {
              return route.name !== "Order Cart" ? (
                <CustomNavIcon
                  iconName={"shopping-bag"}
                  color={Colors.Peach}
                  size={30}
                />
              ) : null
            },
            drawerStyle: {
              backgroundColor: Colors.GrayishWhite,
            },
          })}
        >
          <Drawer.Screen
            name="Main"
            component={MainNavigator}
            options={{
              headerShown: true,
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
            name="Order Cart"
            component={OrderCart}
            options={{
              title: "Continue Shopping",
              headerStyle: {
                backgroundColor: Colors.DarkestBlue,
              },
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerTitleStyle: {
                textTransform: "uppercase",
                fontFamily: "Lato-Bold",
                fontSize: 14,
                letterSpacing: 2,
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
