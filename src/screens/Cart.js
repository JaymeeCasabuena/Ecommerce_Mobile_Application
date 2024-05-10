import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, removeItem } from "../redux/CartSlice";

export default function OrderCart() {
  const dispatch = useDispatch();
  const { cart, totalAmount, totalItems } = useSelector((state) => state.cart);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <View style={styles.productDetails}>
        <Text numberOfLines={4} style={styles.productName}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => dispatch(decrement(item.id))}
            style={[styles.buttons, styles.minusButton]}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.quantityContainer}>
            <Text style={styles.productQuantity}>{item.quantity}</Text>
          </View>
          <TouchableOpacity
            onPress={() => dispatch(increment(item.id))}
            style={[styles.buttons, styles.plusButton]}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {totalItems < 1 ? (
        <Text style={styles.emptyCart}> Your bag is empty </Text>
      ) : (
        <View>
          <View style={styles.cartHeader}>
            <Text style={styles.cartText}>Items: {totalItems}</Text>
            <Text style={styles.cartText}>Total: AUD{totalAmount}</Text>
          </View>
          <View style={styles.scrollView} key={cart.id}>
            <FlatList
              data={cart}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GrayishWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCart: {
    textAlign: "center",
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "Poppins-Bold",
    color: Colors.DarkestBlue,
    letterSpacing: 2,
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 150,
    backgroundColor: Colors.PurplishBlue,
    padding: 20,
  },
  cartText: {
    textAlign: "center",
    fontSize: 18,
    textTransform: "uppercase",
    fontFamily: "Poppins-Bold",
    color: Colors.Peach,
    letterSpacing: 2,
  },
  scrollView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "95%",
    height: 170,
    margin: 10,
    borderWidth: 1,
    borderColor: Colors.Gray,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: 168,
    backgroundColor: "white",
  },
  productImage: {
    width: 150,
    height: 100,
    resizeMode: "center",
  },
  productDetails: {
    width: "55%",
  },
  productName: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    padding: 10,
    color: Colors.DarkestBlue,
    letterSpacing: 1,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    padding: 10,
    paddingTop: 0,
    color: Colors.Peach,
    letterSpacing: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  buttons: {
    borderBlockColor: Colors.DarkestBlue,
    justifyContent: "center",
    paddingBottom: 5,
    borderWidth: 1,
    width: 60,
    height: 40,
  },
  buttonText: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Lato-Bold",
    color: Colors.Peach,
    letterSpacing: 8,
  },
  quantityContainer: {
    borderBlockColor: Colors.DarkestBlue,
    width: 50,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 40,
  },
  productQuantity: {
    fontSize: 16,
    fontFamily: "Lato-Bold",
    color: Colors.DarkestBlue,
  },
});
