import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SelectDefaultAddress from "../components/Addresses";


export default function UserProfile() {
  const [isShow, setShow] = useState(false);
  const navigation = useNavigation();

  const toggleCollapsibleContent = () => {
    setShow(!isShow);
  };

  const goToLogin = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.user}>Hi Jaymee Casabuena</Text>
      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
          <FontAwesome style={styles.icons} name="location-dot" />
          <Text style={styles.buttonName}>My Addresses</Text>
        </View>
        <SelectDefaultAddress/>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleCollapsibleContent}
      >
        <FontAwesome style={styles.icons} name="user" />
        <Text style={styles.buttonName}>My Account</Text>
      </TouchableOpacity>
      {isShow && (
        <View style={styles.accountContainer}>
          <TouchableOpacity style={styles.subButton}>
            <FontAwesome style={styles.icons} name="user" />
            <Text style={styles.buttonName}>My Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subButton}>
            <FontAwesome style={styles.icons} name="bag-shopping" />
            <Text style={styles.buttonName}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subButton}>
            <FontAwesome style={styles.icons} name="key" />
            <Text style={styles.buttonName}>Change Password</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={() => goToLogin()}>
        <MaterialIcons style={styles.icons} color={Colors.Red} name="logout" />
        <Text style={styles.buttonName}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.GrayishWhite,
  },
  user: {
    width: "95%",
    margin: 10,
    fontFamily: "Poppins-Regular",
    padding: 20,
    fontSize: 14,
    color: Colors.Black,
    backgroundColor: Colors.White,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
    elevation: 15,
  },
  addressContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "95%",
    margin: 10,
    marginBottom: 0,
    height: 300,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
    backgroundColor: Colors.White,
    elevation: 15,
  },
  addressHeader: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    backgroundColor: Colors.White,
    borderBottomWidth: 0.5,
    borderColor: Colors.Gray,
  },
  button: {
    flexDirection: "row",
    width: "95%",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
    backgroundColor: Colors.White,
  },
  accountContainer: {
    width: "95%",
    alignSelf: 'center',
    height: 149,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: Colors.PurplishBlue,
    backgroundColor: Colors.White,
    elevation: 5,
  },
  subButton: {
    flexDirection: "row",
    width: "87%",
    marginLeft: 50,
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderColor: Colors.Gray,
  },
  buttonName: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.Black,
    marginLeft: 20,
  },
  icons: {
    fontSize: 18,
  },
});
