import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useSelector } from "react-redux";

export default function OrderCart() {
  const cart = useSelector((state) => state.cart);
  console.log("Hello", cart.cart);

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
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.scrollView} key={cart.cart.id}>
        <FlatList
          data={cart.cart}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GrayishWhite,
        justifyContent: 'center',
        alignItems: 'center'
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
        width: '95%',
        height: 170,
        margin: 10,
        borderWidth: 1,
        borderColor: Colors.Gray,
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: '45%',
        height: 168,
        backgroundColor: "white",
    },
    productImage: {
        width: 150,
        height: 100,
        resizeMode: "center",
    },
    productDetails: {
        width: '55%'
    },
    productName: {
        fontSize: 14,
        fontFamily: "Lato-Regular",
        padding: 10,
        marginTop: 10,
        color: Colors.DarkestBlue,
        letterSpacing: 1,
      },
      productPrice: {
        fontSize: 14,
        fontFamily: "Lato-Regular",
        padding: 10,
        color: Colors.Peach,
        letterSpacing: 1,
      }
});
