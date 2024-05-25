import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { cleanCart } from "../redux/CartSlice";
import { Colors } from "../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import SelectDefaultAddress from "../components/Addresses";
import { handleNewOrder } from "../services/OrderService";

export default function Checkout() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.authentication);
  const [paymentMethod, setPaymentMethod] = useState();
  const [status, setStatus] = useState();
  const { cart, totalItems, totalAmount } = useSelector((state) => state.cart);
  const { defaultAddress } = useSelector((state) => state.address);
  const total = totalAmount.toFixed(2);

  const selectedOption = (method) => {
    if (method === "credit card") {
      setStatus("paid");
    }
    else {
      setStatus("pending");
    }
    setPaymentMethod(method)
  };

  const placeOrder = async () => {
    try {
      await handleNewOrder(userId, cart, total, status, defaultAddress, paymentMethod);
      setPaymentMethod('');
      setStatus('');
      dispatch(cleanCart());
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    }
    catch (err) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summary}>
          Summary: {totalItems} items | ${total}
        </Text>
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
          <Text style={styles.headers}>
            How would you like to get your order?
          </Text>
        </View>
        <View style={styles.addressTab}>
          <SelectDefaultAddress />
        </View>
      </View>
      <View style={styles.paymentContainer}>
        <View style={styles.paymentHeader}>
          <Text style={styles.headers}>How would you like to pay?</Text>
        </View>
        <View style={styles.paymentType}>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => selectedOption("credit card")}
          >
            {paymentMethod && paymentMethod === "credit card" ? (
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
            <Text style={styles.headers}>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => selectedOption("pay later")}
          >
            {paymentMethod && paymentMethod === "pay later" ? (
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
            <Text style={styles.headers}>Pay Later</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.orderButton} onPress={() => placeOrder()}>
        <Text style={[styles.headers, styles.btnText]}>Place your order</Text>
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
  summaryContainer: {
    width: "95%",
    alignSelf: "center",
    margin: 10,
    elevation: 15,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
  },
  summary: {
    fontFamily: "Poppins-Regular",
    padding: 20,
    fontSize: 14,
    color: Colors.Black,
    backgroundColor: Colors.White,
  },
  addressContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "95%",
    alignSelf: "center",
    margin: 10,
    elevation: 15,
    height: 310,
    backgroundColor: Colors.White,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
  },
  headers: {
    fontFamily: "Poppins-Regular",
    padding: 20,
    fontSize: 14,
    color: Colors.Black,
  },
  paymentContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "95%",
    alignSelf: "center",
    margin: 10,
    elevation: 15,
    height: 220,
    backgroundColor: Colors.White,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
  },
  paymentType: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  selectButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 300,
    marginLeft: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.Black,
  },
  orderButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: Colors.PurplishBlue,
    borderColor: Colors.Gray,
    elevation: 15,
  },
  btnText: {
    color: Colors.Peach,
    fontSize: 16,
    padding: 0,
  },
});
