import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useContext, useEffect, useState } from "react";
import { UserType } from "../../UserContext";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { handleAddingNewAddress } from "../services/AddressService";

const AddNewAddress = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [fullName, setFullName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [street, setStreet] = useState();
  const [suburb, setSuburb] = useState();
  const [state, setState] = useState();
  const [postalCode, setPostalCode] = useState();

  const addNewAddress = () => {
    handleAddingNewAddress(
      userId,
      fullName,
      mobileNo,
      street,
      suburb,
      state,
      postalCode
    )
      .then(() => {
        setCustmoreName("");
        setMobileNo("");
        setStreet("");
        setSuburb("");
        setState("");
        setPostCode("");
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.addressContainer}></View>
      <View style={styles.addressTab}>
        <View style={styles.addressTitle}>
          <FontAwesome style={styles.icons} name="location-dot" />
          <Text style={styles.buttonName}>Add a new address</Text>
        </View>
        <View style={styles.textField}>
          <TextInput
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            style={styles.input}
            placeholder="Name"
          />
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            style={styles.input}
            placeholder="Mobile Number"
          />
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            style={styles.input}
            placeholder="Street Address"
          />
          <TextInput
            value={suburb}
            onChangeText={(text) => setSuburb(text)}
            style={styles.input}
            placeholder="Suburb"
          />
          <TextInput
            value={state}
            onChangeText={(text) => setState(text)}
            style={styles.input}
            placeholder="State"
          />
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            style={styles.input}
            placeholder="Post Code"
          />
        </View>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => addNewAddress()}
        >
          <Feather style={styles.icons} name="plus" />
          <Text style={styles.buttonName}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colors.GrayishWhite,
  },
  addressContainer: {
    flexDirection: "column",
    marginLeft: 20,
  },
  addressTab: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: 300,
  },
  addressTitle: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    backgroundColor: Colors.White,
    borderBottomWidth: 0.5,
    borderColor: Colors.Gray,
  },
  textField: {
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 300,
    margin: 30,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Black,
  },
  input: {
    backgroundColor: Colors.White,
    width: 347,
    height: 40,
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: Colors.Black,
  },
  addButton: {},
  button: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.Gray,
    backgroundColor: Colors.White,
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

export default AddNewAddress;
