import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { Colors } from "../constants/Colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import StarRating from "../components/StarRating";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import CustomModal from "../components/CustomModal";
import { handleCartUpdate } from "../services/CartService";

export default function ProductDetails() {
  const { userId } = useSelector((state) => state.authentication);
  const { cart, totalAmount, totalItems } = useSelector((state) => state.cart);
  const route = useRoute();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { products, productID, categories } = route.params || {};
  const getProductToDisplay = () => {
    return productID
      ? products.find((product) => product.id === productID)
      : null;
  };
  const goBackToProductList = (categories) => {
    navigation.navigate("ProductList", categories);
  };

  const product = getProductToDisplay();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setIsModalVisible(true);
  };

  useEffect(() => {
    handleCartUpdate(userId, totalAmount, totalItems, cart);
  }, [cart, totalAmount, totalItems, userId]);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>
        <View style={styles.buttonContainer}>
          <CustomModal
            message={"Added to your bag"}
            buttonName={"Continue shopping"}
            isVisible={isModalVisible}
            onClose={closeModal}
            item={product}
          ></CustomModal>
          <TouchableOpacity
            onPress={() => goBackToProductList(categories)}
            style={[styles.buttons, styles.backButton]}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddToCart(product)}
            style={[styles.buttons, styles.addButton]}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.storeName}>Fake Store</Text>
          <Text style={styles.productName}>{product.title}</Text>
          <Text style={styles.productPrice}>Price: ${product.price}</Text>
        </View>
        <View style={styles.addtlDetails}>
          <StarRating rating={product.rating.rate} />
          <Text style={styles.productRating}>{product.rating.rate}</Text>
          <Text style={styles.productSold}>Sold: {product.rating.count}</Text>
        </View>
        <ScrollView style={styles.descriptionTab}>
          <Text style={styles.productDescription}>
            Product Description: {product.description}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GrayishWhite,
  },
  productContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
    backgroundColor: "white",
  },
  productImage: {
    width: "70%",
    height: "70%",
    resizeMode: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: 40,
  },
  buttons: {
    borderBlockColor: Colors.DarkestBlue,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  backButton: {
    width: 150,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  addButton: {
    width: 262,
    borderRightWidth: 0,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: Colors.Peach,
    letterSpacing: 8,
  },
  storeName: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    padding: 10,
    marginTop: 10,
    color: Colors.DarkestBlue,
    letterSpacing: 3,
  },
  productName: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    padding: 10,
    paddingTop: 0,
    marginTop: 2,
    color: Colors.DarkestBlue,
    letterSpacing: 2,
  },
  productPrice: {
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    padding: 10,
    padding: 10,
    paddingTop: 0,
    color: Colors.Peach,
    letterSpacing: 2,
  },
  addtlDetails: {
    flexDirection: "row",
  },
  productRating: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    padding: 10,
    paddingTop: 0,
    marginTop: 2,
    color: Colors.DarkestBlue,
    letterSpacing: 2,
  },
  productSold: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    padding: 10,
    paddingTop: 0,
    marginTop: 2,
    color: Colors.DarkestBlue,
    letterSpacing: 2,
    marginLeft: 20,
  },
  descriptionTab: {
    width: "100%",
    backgroundColor: Colors.PurplishBlue,
    marginTop: 30,
  },
  productDescription: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    padding: 10,
    paddingTop: 20,
    color: Colors.White,
    letterSpacing: 2,
    textAlign: "left",
  },
});
