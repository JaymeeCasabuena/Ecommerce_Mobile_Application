import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons"

export default function UserProfile() {
  const [isShow, setShow] = useState(true);
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
      <View style={styles.profileContainer}></View>
      <Text style={styles.user}>Hi Jaymee Casabuena</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleCollapsibleContent}
      >
        <FontAwesome
          style={styles.icons}
          name="user"
        />
        <Text style={styles.buttonName}>My Account</Text>
      </TouchableOpacity>
      {isShow && (
        <View style={styles.accountContainer}>
          <TouchableOpacity style={styles.subButton}>
            <FontAwesome
              style={styles.icons}
              name="user"
            />
            <Text style={styles.buttonName}>My Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subButton}>
            <FontAwesome
              style={styles.icons}
              name="bag-shopping"
            />
            <Text style={styles.buttonName}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subButton}>
            <FontAwesome
              style={styles.icons}
              name="key"
            />
            <Text style={styles.buttonName}>Change Password</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => goToLogin()}
      >
        <MaterialIcons
          style={styles.icons}
          color={Colors.Red}
          name="logout"
        />
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
    alignItems: "flex-start",
    backgroundColor: Colors.GrayishWhite,
  },
  profileContainer: {
    flexDirection: "column",
    marginLeft: 20,
  },
  user: {
    padding: 20,
    fontSize: 16,
    letterSpacing: 2,
    color: Colors.Black,
    backgroundColor: Colors.White,
    width: '100%'
  },
  button: {
    flexDirection: "row",
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    borderTopWidth: 0.5,
    borderColor: Colors.Gray,
    backgroundColor: Colors.White,
  },
  accountContainer: {
    width: "85%",
    height: 180,
    marginLeft: 40,
    margin: 10,
    backgroundColor: Colors.White,
    elevation: 5,
  },
  subButton: {
    flexDirection: "row",
    width: '100%',
    marginLeft: 40,
    marginTop: 25,
  },
  buttonName: {
    fontSize: 16,
    color: Colors.Black,
    marginLeft: 20,
  },
  icons: {
    fontSize: 18,
  }
});
