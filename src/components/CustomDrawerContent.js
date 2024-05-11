import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import getCategories from "../services/CategoriesService";
import { Colors } from "../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const CustomDrawerContent = () => {
  const [isShow, setShow] = useState(false);
  const navigation = useNavigation();
  const categories = getCategories();

  const toggleCollapsibleContent = () => {
    setShow(!isShow);
  };

  const goBackToHome = () => {
    navigation.navigate("Home");
  };
  const goToCategoryScreen = (category) => {
    navigation.navigate("ProductList", category);
  };

  return (
    <DrawerContentScrollView>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => goBackToHome()}
      >
        <AntDesign
          style={styles.icons}
          color={Colors.DarkestBlue}
          size={22}
          name="isv"
        />
        <Text style={styles.mainButtonName}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={toggleCollapsibleContent}
      >
        <AntDesign
          style={styles.icons}
          color={Colors.DarkestBlue}
          size={22}
          name="tagso"
        />
        <Text style={styles.mainButtonName}>Categories</Text>
      </TouchableOpacity>

      {isShow &&
        categories.map((category) => (
          <View key={category}>
            <TouchableOpacity
              style={styles.subButton}
              onPress={() => {
                goToCategoryScreen(category);
              }}
            >
              <AntDesign
                style={styles.icons}
                color={Colors.DarkestBlue}
                size={22}
                name="minus"
              />

              <Text style={styles.subButtonName}>{category}</Text>
            </TouchableOpacity>
          </View>
        ))}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    flexDirection: "row",
    width: 300,
    padding: 10,
    marginTop: 20,
  },
  mainButtonName: {
    fontSize: 18,
    textTransform: "uppercase",
    fontFamily: "Lato-Regular",
    color: Colors.PurplishBlue,
    marginLeft: 10,
  },
  subButton: {
    flexDirection: 'row',
    marginLeft: 60,
  },
  subButtonName: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: Colors.PurplishBlue,
    marginTop: 4,
    marginLeft: 5,
  },
  icons: {
    marginTop: 3,
  },
});

export default CustomDrawerContent;
