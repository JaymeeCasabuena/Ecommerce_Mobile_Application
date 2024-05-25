import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/Store";
import StackNavigator from "./src/navigation/StackNavigation";

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
      <StackNavigator />
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
