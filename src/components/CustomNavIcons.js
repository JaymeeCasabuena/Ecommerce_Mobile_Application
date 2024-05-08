import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const CustomNavIcon = ({ onPress, iconName, color, size }) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    if (iconName === "menu") {
      navigation.toggleDrawer();
    } else if (iconName === "shopping-bag") {
      navigation.navigate("Order Cart");
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={{ marginLeft: 10, marginRight: 10 }}
    >
      <Feather color={color} size={size} name={iconName} />
    </TouchableOpacity>
  );
};

export default CustomNavIcon;
