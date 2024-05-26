import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { fetchAddresses } from "../services/AddressService";
import { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setDefaultAddress } from "../redux/AddressSlice";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../constants/Colors";

const SelectDefaultAddress = () => {
  const { userId } = useSelector((state) => state.authentication);
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState();
  const [selectedAddress, setSelected] = useState();
  const { defaultAddress } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const loadAddresses = async () => {
    if (userId) {
      const fetchedAddresses = await fetchAddresses(userId);
      setAddresses(fetchedAddresses);
      const [initialValue] = fetchedAddresses.slice(0, 1);
      dispatch(setDefaultAddress(initialValue));
      setSelected(initialValue);
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

  const goToAddAddress = () => {
    navigation.navigate("Add New Address");
  };

  const selectAddress = (item) => {
    if (item != selectAddress) dispatch(setDefaultAddress(item));
  };

  return addresses?.length > 0 ? (
    <View style={styles.scrollView}>
      <FlatList
        data={addresses?.sort(
          (a, b) =>
            (b._id === defaultAddress?._id ? 1 : 0) -
            (a._id === defaultAddress?._id ? 1 : 0)
        )}
        renderItem={({ item }) => (
          <View key={addresses._id} style={styles.addressContainer}>
            <TouchableOpacity
              style={styles.addressButton}
              onPress={() => selectAddress(item)}
            >
              {defaultAddress && defaultAddress._id === item?._id ? (
                <MaterialIcons
                  style={styles.icons}
                  name="record-circle-outline"
                  size={22}
                  color={Colors.PurplishBlue}
                />
              ) : (
                <MaterialIcons
                  style={styles.icons}
                  name="circle-outline"
                  size={22}
                  color={Colors.Gray}
                />
              )}
              <View style={styles.addressTab}>
                {defaultAddress && defaultAddress._id === item?._id ? (
                  <Text style={[styles.addressDetails, styles.defaultText]}>
                    Selected Address
                  </Text>
                ) : null}
                <Text style={styles.addressDetails}>{item.street}</Text>
                <Text style={styles.addressDetails}>
                  {item.fullName} - {item.mobileNo}
                </Text>
                <Text style={styles.addressDetails}>
                  {item.street} {item.suburb} {item.state} {item.postalCode}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => goToAddAddress()}
      >
        <Feather
          style={styles.icons}
          name="plus"
          size={20}
          color={Colors.PurplishBlue}
        />
        <Text style={styles.addressDetails}>Add a new address</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.scrollView}>
      <Text style={styles.header}>No saved address yet</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => goToAddAddress()}
      >
        <Feather
          style={styles.icons}
          name="plus"
          size={20}
          color={Colors.PurplishBlue}
        />
        <Text style={styles.addressDetails}>Add a new address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "flex-start",
    width: 350,
    height: 240,
    backgroundColor: Colors.White,
  },
  header: {
    fontFamily: "Poppins-Regular",
    fontSize: 25,
    color: Colors.Black,
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 120,
  },
  addressButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 350,
    borderBottomWidth: 0.5,
    borderColor: Colors.Black,
  },
  icons: {
    marginLeft: 20,
  },
  addressTab: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
  },
  defaultText: {
    color: Colors.Gray,
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 5,
  },
  addressDetails: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.Black,
    marginLeft: 30,
  },
  addButton: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 0.5,
    borderColor: Colors.Black,
    backgroundColor: Colors.White,
  },
});

export default SelectDefaultAddress;
