import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useContext, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { Colors } from "../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { UserType } from "../../UserContext";
import { fetchAddresses } from "../services/AddressService";

export default function UserProfile() {
  const [isShow, setShow] = useState(true);
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [addresses, setAddresses] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  const toggleCollapsibleContent = () => {
    setShow(!isShow);
  };

  const goToLogin = () => {
    clearAuthToken();
  };

  const goToAddAddress = () => {
    navigation.navigate("Add New Address");
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Login");
  };

  const loadAddresses = async () => {
    if (userId) {
      const fetchedAddresses = await fetchAddresses(userId);
      setAddresses(fetchedAddresses);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      loadAddresses();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}></View>
      <Text style={styles.user}>Hi Jaymee Casabuena</Text>
      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
          <FontAwesome style={styles.icons} name="location-dot" />
          <Text style={styles.buttonName}>My Addresses</Text>
        </View>
        <View style={styles.scrollView}>
          <FlatList
            data={addresses}
            renderItem={({ item }) => (
              <View key={addresses._id} style={styles.addressTab}>
                <FontAwesome style={[styles.icons, styles.locationIcon]} name="location-dot" />
                <Text style={styles.addressDetails}>
                  Full Name: {item.fullName}
                </Text>
                <Text style={styles.addressDetails}>
                  Mobile Number: {item.mobileNo}
                </Text>
                <Text style={styles.addressDetails}>Street Address: {item.street}</Text>
                <Text style={styles.addressDetails}>Suburb: {item.suburb}</Text>
                <Text style={styles.addressDetails}>State: {item.state}</Text>
                <Text style={styles.addressDetails}>
                  Post code: {item.postalCode}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => goToAddAddress()}
        >
          <Feather style={styles.icons} name="plus" />
          <Text style={styles.buttonName}>Add a new address</Text>
        </TouchableOpacity>
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
    width: "100%",
  },
  addressContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: 380,
    borderTopWidth: 0.5,
    borderColor: Colors.Gray,
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
  scrollView: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "flex-start",
    width: "85%",
    height: 250,
    backgroundColor: Colors.White,
    elevation: 5,
  },
  addressTab: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: 400,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.Gray,
  },
  locationIcon: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
  addressDetails: {
    fontSize: 16,
    color: Colors.Black,
    marginLeft: 30,
  },
  addButton: {},
  button: {
    flexDirection: "row",
    width: "100%",
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
    width: "100%",
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
  },
});
