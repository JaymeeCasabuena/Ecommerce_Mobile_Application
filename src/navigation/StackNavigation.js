import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomNavIcon from "../components/CustomNavIcons";
import OrderCart from "../screens/Cart";
import Home from "../screens/Home";
import ProductList from "../screens/ProductList";
import SignIn from "../screens/Login";
import SignUp from "../screens/RegisterUser";
import ProductDetails from "../screens/ProductDetail";
import UserProfile from "../screens/Profile";
import { Colors } from "../constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { useSelector } from "react-redux";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const { totalItems } = useSelector((state) => state.cart);

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
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
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome
                  name="florin-sign"
                  size={22}
                  color={Colors.Peach}
                />
              ) : (
                <FontAwesome name="florin-sign" size={22} color={Colors.Gray} />
              ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={Home}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome
                  name="magnifying-glass"
                  size={22}
                  color={Colors.Peach}
                />
              ) : (
                <FontAwesome
                  name="magnifying-glass"
                  size={22}
                  color={Colors.Gray}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={OrderCart}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarBadge: totalItems ? totalItems : null,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome
                  name="bag-shopping"
                  size={24}
                  color={Colors.Peach}
                />
              ) : (
                <FontAwesome
                  name="bag-shopping"
                  size={24}
                  color={Colors.Gray}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={UserProfile}
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
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="grip-lines" size={24} color={Colors.Peach} />
              ) : (
                <FontAwesome name="grip-lines" size={24} color={Colors.Gray} />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign up"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -10,
    top: -10,
    backgroundColor: Colors.Red,
    width: 20,
    fontSize: 14,
    borderRadius: 50,
    textAlign: "center",
    paddingBottom: 2,
    color: Colors.White,
  },
});

export default StackNavigator;
