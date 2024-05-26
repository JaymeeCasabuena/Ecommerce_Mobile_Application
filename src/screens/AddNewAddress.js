import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import CustomAlert from "../components/CustomAlert";
import { handleAddingNewAddress } from "../services/AddressService";

const AddNewAddress = () => {
  const navigation = useNavigation();
  const { userId } = useSelector((state) => state.authentication);
  const [fullName, setFullName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [street, setStreet] = useState();
  const [suburb, setSuburb] = useState();
  const [state, setState] = useState();
  const [postalCode, setPostalCode] = useState();
  const [isValid, setValidity] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addNewAddress = async () => {
    try {
      if (
        !fullName ||
        !mobileNo ||
        !street ||
        !suburb ||
        !state ||
        !postalCode
      ) {
        setValidity(false);
      } else {
        await handleAddingNewAddress(
          userId,
          fullName,
          mobileNo,
          street,
          suburb,
          state,
          postalCode
        );
        setIsModalVisible(true);
        setFullName("");
        setMobileNo("");
        setStreet("");
        setSuburb("");
        setState("");
        setPostalCode("");
        setValidity(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.goBack();
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
            placeholder="Full Name"
            required
          />
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            style={styles.input}
            placeholder="Mobile Number"
            required
          />
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            style={styles.input}
            placeholder="Street Address"
            required
          />
          <TextInput
            value={suburb}
            onChangeText={(text) => setSuburb(text)}
            style={styles.input}
            placeholder="Suburb"
            required
          />
          <TextInput
            value={state}
            onChangeText={(text) => setState(text)}
            style={styles.input}
            placeholder="State"
            required
          />
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            style={styles.input}
            placeholder="Post Code"
            required
          />
        </View>
        {!isValid && (
          <Text style={styles.errorText}>All fields are required!</Text>
        )}
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => addNewAddress()}
          disabled={!isValid}
        >
          <Feather style={styles.icons} name="plus" />
          <Text style={styles.buttonName}>Add</Text>
          <CustomAlert
            message={"New address added successfully"}
            buttonName={"OK"}
            isVisible={isModalVisible}
            onClose={closeModal}
          />
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
    marginBottom: 0,
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
  addButton: {
    marginTop: 20,
  },
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
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.Black,
    marginLeft: 20,
  },
  icons: {
    fontSize: 18,
  },
  errorText: {
    alignSelf: "flex-start",
    marginLeft: 30,
    marginBottom: 30,
    margin: 10,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: Colors.Red,
  },
});

export default AddNewAddress;
