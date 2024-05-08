import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Colors } from "../constants/Colors";
import { TabView, SceneMap } from "react-native-tab-view";
import { noTabBar, renderTabBar } from "../components/TabBar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loadPreviewProducts, selectPreviewProducts } from "../redux/PreviewSlice";

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { previewProducts, loading, error } = useSelector(selectPreviewProducts);

  useEffect(() => {
    dispatch(loadPreviewProducts()); 
  }, [dispatch]);

  const goToCategoryScreen = (category) => {
    navigation.navigate("Categories", category);
  };

  const getProductsByCategory = () => {
    const categoryGroup = {};
    previewProducts.forEach((product) => {
      const category = product.category;
      if (!categoryGroup[category]) {
        categoryGroup[category] = [];
      }
      categoryGroup[category].push(product);
    });
    return categoryGroup;
  };

  const categoryGroup = getProductsByCategory();

  const generateCategoryTab = () => {
    const productTabs = {};
    Object.keys(categoryGroup).forEach((category, index) => {
      productTabs[`tab${index}`] = () => (
        <View style={styles.productPage}>
          <FlatList
            style={styles.scrollView}
            data={categoryGroup[category]}
            keyExtractor={(item, itemIndex) => `tab-${index}-${itemIndex}`}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productPrice}>{`$${item.price}`}</Text>
              </View>
            )}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => goToCategoryScreen(category)} style={styles.tabButton}>
              <Text
                style={styles.buttonText}
              >{`Explore More in ${category}`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
    return productTabs;
  };

  const generateTabs = () => {
    const tabs = {};
    Object.keys(categoryGroup).forEach((category, index) => {
      tabs[`tab${index}`] = () => (
        <View style={styles.tabPage}>
          <Text style={styles.textBanner}>{category}</Text>
        </View>
      );
    });
    return tabs;
  };

  const renderFirstScene = SceneMap(generateTabs());
  const renderSecondScene = SceneMap(generateCategoryTab());
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const routes = Object.keys(categoryGroup).map((category, index) => ({
    key: `tab${index}`,
    title: category,
  }));
  return (
    loading ? (
      <ActivityIndicator style={styles.loadingFigure} size="large" color="#0000ff" />
    ) : (
      <View style={styles.container}>
        <View style={styles.firstTabView}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderFirstScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={noTabBar}
          />
        </View>
        <View style={styles.secondTabView}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderSecondScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: Colors.GrayishWhite,
  },
  loadingFigure: {
    flex: 1,
    justifyContent: 'center',
  },
  firstTabView: {
    flex: 1,
  },
  secondTabView: {
    flex: 2.5,
  },
  tabPage: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PurplishBlue,
    height: 250,
  },
  tabText: {
    fontSize: 12,
    fontFamily: "Lato-Bold",
    color: Colors.DarkestBlue,
    textTransform: "uppercase",
    letterSpacing: 2,
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
  productPage: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.GrayishWhite,
  },
  scrollView: {
    marginTop: 10,
  },
  productContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: 380,
    height: 320,
    backgroundColor: "white",
    borderRadius: 6,
    elevation: 5,
  },
  productImage: {
    width: 350,
    height: 300,
    resizeMode: "center",
  },
  productPrice: {
    fontSize: 18,
    fontFamily: "Lato-Regular",
    position: "absolute",
    color: Colors.Peach,
    bottom: 10,
    left: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
    backgroundColor: Colors.White,
  },
  tabButton: {
    width: '100%',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "Lato-Bold",
    textTransform: "uppercase",
    textDecorationLine: 'underline',
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.DarkestBlue,
  },
});
