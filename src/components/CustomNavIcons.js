import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const CustomNavIcon = ({ iconName, color, size, style }) => {
  const navigation = useNavigation();
  const { totalItems } = useSelector((state) => state.cart);

  const onPressHandler = () => {
    if (iconName === "menu") {
      navigation.toggleDrawer();
    } else if (iconName === "shopping-bag") {
      navigation.navigate("Order Cart");
    } else if (iconName === "arrow-left") {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={[{ marginLeft: 10, marginRight: 10 }, style]}
    >
      <Feather color={color} size={size} name={iconName} />
      {iconName === "shopping-bag" && totalItems > 0 ? (
        <Text style={styles.badge}>{totalItems}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -10,
    top: -10,
    backgroundColor: Colors.Red,
    width: 20,
    fontSize: 14,
    borderRadius: 50,
    textAlign: "center",
    paddingBottom: 2,
    color: Colors.White,
  },
});

export default CustomNavIcon;
