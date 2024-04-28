import { View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "../constants/Colors";
import Material from "@expo/vector-icons/MaterialIcons"

const StarRating = ({ rating }) => {
  let content;

  switch (true) {
    case rating < 1 && rating > 0:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star-half-empty"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
        </View>
      );
      break;
    case rating === 1:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
        </View>
      );
      break;
    case rating > 1 && rating < 2:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-half-empty"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
        </View>
      );
      break;
    case rating === 2:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
        </View>
      );
      break;
    case rating > 2 && rating < 3:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-half-empty"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
        </View>
      );
      break;
    case rating === 3:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
        </View>
      );
      break;
    case rating > 3 && rating < 4:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-half-empty"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
        </View>
      );
      break;
    case rating === 4:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
        </View>
      );
      break;
    case rating > 4 && rating < 5:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-half-empty"
          />
        </View>
      );
      break;
    case rating === 5:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star"
          />
        </View>
      );
    default:
      content = (
        <View style={styles.ratings}>
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
          <FontAwesome
            style={styles.icons} size={18}
            name="star-o"
          />
        </View>
      );
      break;
  }

  return content;
};

const styles = StyleSheet.create({
  ratings: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 12,
    marginTop: 2,
  },
  icons: {
    color: Colors.DarkestBlue
  },
});

export default StarRating;
