import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useCallback, useContext } from "react";
import { UserType } from "../../UserContext";
import { Colors } from "../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { fetchOrders } from "../services/OrderService";

export default function OrdersScreen() {
  const [orders, setOrders] = useState();
  const { userId, setUserId } = useContext(UserType);
  const [collapsed, setCollapsed] = useState(false);
  const navigation = useNavigation();

  const toggleCollapsibleContent = (tab) => {
    setCollapsed(tab === collapsed ? null : tab);
  };

  const loadOrders = async () => {
    if (userId) {
      const fetchedOrders = await fetchOrders(userId);
      setOrders(fetchedOrders);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  const awaitingPaymentOrders = orders?.filter(
    (order) => order.status === "pending"
  );

  const paidOrders = orders?.filter((order) => order.status === "paid");

  const deliveredOrders = orders?.filter(
    (order) => order.status === "delivered"
  );

  const goToOrderDetails = (id) => {
    const orderToDisplay = id ? orders.find((order) => order._id === id) : null;
    navigation.navigate("Order Details", {
      orderNumber: orderToDisplay.orderNumber,
      orderItems: orderToDisplay.products.length,
      orderPrice: orderToDisplay.totalPrice,
      orderProducts: orderToDisplay.products,
      orderStatus: orderToDisplay.status,
      orderId: id,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headers}>Orders</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleCollapsibleContent("firstTab")}
      >
        <MaterialIcons style={styles.icons} size={18} name="payment" />
        <Text style={styles.buttonName}>Awaiting Payment</Text>
        {collapsed === "firstTab" ? (
          <MaterialIcons
            style={[styles.caretIcon, styles.caretDown]}
            size={18}
            name="keyboard-arrow-up"
          />
        ) : (
          <MaterialIcons
            style={[styles.caretIcon, styles.caretDown]}
            size={18}
            name="keyboard-arrow-down"
          />
        )}
      </TouchableOpacity>
      {collapsed === "firstTab" && (
        <View style={styles.orderContainer}>
          <FlatList
            data={awaitingPaymentOrders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.orderItem}
                onPress={() => goToOrderDetails(item._id)}
              >
                <View style={styles.orderDetails}>
                  <Text style={styles.subHeaders}>#O{item.orderNumber} -</Text>
                  <Text style={styles.subHeaders}>
                    {item.products.length}
                    {item.products.length > 1 ? " items" : " item"}
                  </Text>
                  <Text style={styles.subHeaders}> - ${item.totalPrice}</Text>
                  <MaterialIcons style={styles.caretIcon} name="keyboard-arrow-right" />
                </View>
                <View style={styles.imagesRow}>
                  {item.products.slice(0, 3).map((product, productIndex) => (
                    <View key={productIndex} style={styles.imageContainer}>
                      <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                      />
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleCollapsibleContent("secondTab")}
      >
        <FontAwesome style={styles.icons} size={18} name="truck-plane" />
        <Text style={styles.buttonName}>Pending Orders</Text>
        {collapsed === "secondTab" ? (
          <MaterialIcons
            style={[styles.caretIcon, styles.caretDown]}
            size={18}
            name="keyboard-arrow-up"
          />
        ) : (
          <MaterialIcons
            style={[styles.caretIcon, styles.caretDown]}
            size={18}
            name="keyboard-arrow-down"
          />
        )}
      </TouchableOpacity>
      {collapsed === "secondTab" && (
        <View style={styles.orderContainer}>
          <FlatList
            data={paidOrders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.orderItem}
                onPress={() => goToOrderDetails(item._id)}
              >
                <View style={styles.orderDetails}>
                  <Text style={styles.subHeaders}>#O{item.orderNumber} -</Text>
                  <Text style={styles.subHeaders}>
                    {item.products.length}
                    {item.products.length > 1 ? " items" : " item"}
                  </Text>
                  <Text style={styles.subHeaders}> - ${item.totalPrice}</Text>
                  <MaterialIcons style={styles.caretIcon} name="keyboard-arrow-right" />
                </View>
                <View style={styles.imagesRow}>
                  {item.products.slice(0, 3).map((product, productIndex) => (
                    <View key={productIndex} style={styles.imageContainer}>
                      <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                      />
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleCollapsibleContent("thirdTab")}
      >
        <FontAwesome style={styles.icons} size={18} name="bag-shopping" />
        <Text style={styles.buttonName}>Completed Orders</Text>
        {collapsed === "thirdTab" ? (
          <MaterialIcons
            style={[styles.caretIcon, styles.caretDown]}
            size={18}
            name="keyboard-arrow-up"
          />
        ) : (
          <MaterialIcons
            style={[styles.caretIcon, styles.caretDown]}
            size={18}
            name="keyboard-arrow-down"
          />
        )}
      </TouchableOpacity>
      {collapsed === "thirdTab" && (
        <View style={styles.orderContainer}>
          <FlatList
            data={deliveredOrders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.orderItem}
                onPress={() => goToOrderDetails(item._id)}
              >
                <View style={styles.orderDetails}>
                  <Text style={styles.subHeaders}>#O{item.orderNumber} -</Text>
                  <Text style={styles.subHeaders}>
                    {item.products.length}
                    {item.products.length > 1 ? " items" : " item"}
                  </Text>
                  <Text style={styles.subHeaders}> - ${item.totalPrice}</Text>
                  <MaterialIcons style={styles.caretIcon} name="keyboard-arrow-right" />
                </View>
                <View style={styles.imagesRow}>
                  {item.products.slice(0, 3).map((product, productIndex) => (
                    <View key={productIndex} style={styles.imageContainer}>
                      <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                      />
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
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
  headers: {
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
  orderContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 200,
    paddingBottom: 5,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: Colors.PurplishBlue,
    backgroundColor: Colors.White,
    elevation: 5,
  },
  orderItem: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: Colors.PurplishBlue,
    height: 180,
    width: 370,
    marginTop: 10,
  },
  orderDetails: {
    flexDirection: "row",
    margin: 5,
    width: "100%",
  },
  caretDown: {
    top: 5,
    right: 10,
  },
  caretIcon: {
    fontSize: 18,
    position: "absolute",
    right: 15,
    color: Colors.PurplishBlue,
  },
  subHeaders: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    paddingLeft: 10,
    color: Colors.DarkestBlue,
    letterSpacing: 1,
  },
  imagesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: 350,
  },
  imageContainer: {
    marginTop: 20,
    margin: 15,
    backgroudColor: "white",
    width: 85,
    height: 120,
  },
  productImage: {
    width: 100,
    height: 100,
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
  buttonName: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.Black,
    marginLeft: 20,
  },
});
