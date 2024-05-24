import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { handleUpdateStatus } from "../services/OrderService";

export default function OrderDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { orderNumber, orderProducts, orderItems, orderPrice, orderStatus, orderId } =
    route.params || {};

  const updateStatus = async () => {
    const status = orderStatus === "paid" ? "delivered" : "paid";
    try {
      await handleUpdateStatus(orderId, status);
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <View style={styles.productDetails}>
        <Text numberOfLines={3} style={styles.productName}>
          {item.name}
        </Text>
        <Text style={styles.productName}>Quantity: {item.quantity}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headers}>Order #O{orderNumber}</Text>
      <View style={styles.scrollView} key={orderProducts._id}>
        <FlatList
          data={orderProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
      <View style={[styles.headers, styles.summary]}>
        <Text style={styles.text}>
          {orderItems}
          {orderItems > 1 ? " items" : " item"}
        </Text>
        <Text style={[styles.text, styles.total]}>${orderPrice}</Text>
        <Text style={styles.text}>
          {orderStatus === "pending" ? "Pay Later" : "Credit Card"}
        </Text>
      </View>
      {orderStatus != "delivered" ? (
        <TouchableOpacity style={styles.button} onPress={() => updateStatus()}>
          <Text style={styles.text}>
            {orderStatus === "paid" ? "Mark as delivered" : "Pay Now"}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.button} onPress={() => updateStatus()}>
          <Text style={styles.text}>
            Received
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.GrayishWhite,
  },
  headers: {
    width: "95%",
    height: 40,
    margin: 10,
    fontFamily: "Poppins-Regular",
    padding: 10,
    fontSize: 14,
    color: Colors.Black,
    backgroundColor: Colors.White,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
    elevation: 15,
  },
  cartContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  summary: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 10,
    height: 60,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.Black,
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  total: {
    position: "absolute",
    right: 10,
    top: 33,
  },
  button: {
    flexDirection: "row",
    width: "95%",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
    backgroundColor: Colors.White,
  },
  scrollView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: 600,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "95%",
    height: 100,
    margin: 10,
    borderWidth: 0.5,
    borderColor: Colors.Black,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    height: 99,
    backgroundColor: "white",
  },
  productImage: {
    width: 90,
    height: 90,
    resizeMode: "center",
  },
  productDetails: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "65%",
    height: "100%",
  },
  productName: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    paddingLeft: 10,
    paddingBottom: 2,
    color: Colors.DarkestBlue,
    letterSpacing: 1,
    width: "88%",
  },
  productPrice: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    paddingLeft: 10,
    color: Colors.Peach,
    letterSpacing: 1,
  },
});
