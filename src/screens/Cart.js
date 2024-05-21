import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, removeItem } from "../redux/CartSlice";

export default function OrderCart() {
  const dispatch = useDispatch();
  const { cart, totalAmount, totalItems } = useSelector((state) => state.cart);
  const total = totalAmount.toFixed(2);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <TouchableOpacity
        onPress={() => dispatch(removeItem(item.id))}
        style={styles.removeButton}
      >
        <Feather color={Colors.DarkestBlue} size={22} name="x" />
      </TouchableOpacity>
      <View style={styles.productDetails}>
        <Text numberOfLines={3} style={styles.productName}>
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
        <View style={styles.cartContainer}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartText}>Total: ${total}</Text>
            <TouchableOpacity
              // onPress={() => dispatch(increment(item.id))}
              style={styles.checkOutBtn}
            >
              <Text style={styles.buttonText}>Go to checkout</Text>
            </TouchableOpacity>
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
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colors.GrayishWhite,
  },
  emptyCart: {
    textAlign: "center",
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "Poppins-Bold",
    color: Colors.DarkestBlue,
    letterSpacing: 2,
  },
  cartContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%",
  },
  cartHeader: {
    flexDirection: 'column',
    justifyContent: "flex-end",
    alignItems: "flex-start",
    width: "100%",
    height: 150,
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.Black,
  },
  cartText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: Colors.Peach,
    letterSpacing: 1,
  },
  checkOutBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    marginTop: 10,
    borderWidth: 0.5,
    backgroundColor: Colors.PurplishBlue,
    borderColor: Colors.Gray,
  },
  scrollView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: 700,
    paddingBottom: 20,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "95%",
    height: 170,
    margin: 10,
    borderWidth: 0.5,
    borderColor: Colors.Black,

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
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    padding: 10,
    marginTop: 10,
    color: Colors.DarkestBlue,
    letterSpacing: 1,
    width: "88%",
  },
  productPrice: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
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
  removeButton: {
    position: "absolute",
    right: 0,
    padding: 5,
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
    fontSize: 20,
    padding: 5,
    textAlign: "center",
    textAlignVertical: 'center',
    fontFamily: "Poppins-SemiBold",
    color: Colors.Peach,
    letterSpacing: 1,
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
    fontSize: 12,
    fontFamily: "Lato-Bold",
    color: Colors.DarkestBlue,
  },
});
