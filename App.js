import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/screens/Home";
import Categories from "./src/screens/Categories";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { Colors } from "./src/constants/Colors";
import CustomNavIcon from "./src/components/CustomNavIcons";

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
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={({navigation}) => ({
          headerLeft: props => <CustomNavIcon onPress={navigation.toggleDrawer} iconName={'menu'} color={Colors.Peach} size={30}/>,
          headerRight: props => <CustomNavIcon iconName={'shopping-bag'} color={Colors.Peach} size={30}/>,
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
              fontFamily: "Lato-Regular",
              fontSize: 16,
            },
          }}
        />
        <Drawer.Screen
          name="Categories"
          component={Categories}
          options={{
            headerStyle: {
              backgroundColor: Colors.DarkestBlue,
            },
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerTitleStyle: {
              textTransform: "uppercase",
              fontFamily: "Lato-Regular",
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
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
