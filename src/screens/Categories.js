import { StyleSheet, View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import { Colors } from "../constants/Colors";
import getProductsByCategory from "../services/ProductService";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Material from "@expo/vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
  const route = useRoute();
  const category = route.params || {};
  const { isLoading, productsByCategory } = getProductsByCategory(category);
  const navigation = useNavigation();
  const goToProductDetails = (id) => {
    navigation.navigate("Product Details", {
      products: productsByCategory,
      productID: id,
      categories: category,
    });
  };
  const goBackToHome = () => {
    navigation.navigate("Home");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => goToProductDetails(item.id)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <Text numberOfLines={3} style={styles.productName}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
    </TouchableOpacity>
  );

  return isLoading ? (
    <ActivityIndicator
      style={styles.loadingFigure}
      size="large"
      color="#0000ff"
    />
  ) : (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.textBanner}>{category}</Text>
        <TouchableOpacity
          onPress={() => goBackToHome()}
          style={styles.backButton}
        >
          <Material name={"chevron-left"} style={styles.backIcon} size={20} />
          <Text style={styles.backBtnText}>Back to Homepage</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sortAndSearch}>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.buttonText}>Sort</Text>
          <Material
            name={"sort-alphabetical-descending"}
            style={styles.sortIcon}
            size={20}
          />
        </TouchableOpacity>
        <TextInput style={styles.searchInput} placeholder="Search Product">
          <Material name={"magnify"} style={styles.searchIcon} size={20} />
        </TextInput>
      </View>
      <View style={styles.scrollView} key={productsByCategory.id}>
        <FlatList
          data={productsByCategory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GrayishWhite,
  },
  loadingFigure: {
    flex: 1,
    justifyContent: 'center'
  },
  banner: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PurplishBlue,
    height: 250,
  },
  textBanner: {
    textAlign: "center",
    fontSize: 38,
    textTransform: "uppercase",
    fontFamily: "Poppins-Bold",
    color: Colors.Peach,
    width: 350,
    letterSpacing: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    color: Colors.IcyBlue,
  },
  backBtnText: {
    fontSize: 12,
    fontFamily: "Lato-Bold",
    color: Colors.IcyBlue,
    textTransform: "uppercase",
    letterSpacing: 2,
  },

  sortAndSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 30,
  },
  sortButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  sortIcon: {
    color: Colors.Peach,
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "Lato-Bold",
    color: Colors.DarkestBlue,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  searchInput: {
    width: 200,
    height: 30,
    padding: 5,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: Colors.DarkestBlue,
  },
  searchIcon: {
    color: Colors.Peach,
  },
  scrollView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 180,
    height: 300,
    margin: 10,
    borderWidth: 1,
    borderColor: Colors.Gray,
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 178,
    height: 170,
    backgroundColor: "white",
  },
  productImage: {
    width: 150,
    height: 100,
    resizeMode: "center",
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
