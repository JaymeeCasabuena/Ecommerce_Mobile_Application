import {
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors } from "../constants/Colors";

const CustomModal = ({ message, buttonName, isVisible, onClose, item }) => {
  return (
    <View style={styles.container}>
      <Modal animationType="fade" visible={isVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>{message}</Text>
            <View style={styles.productContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
              </View>
              <Text numberOfLines={2} style={styles.productName}>
                {item.title}
              </Text>
              <Text style={styles.productPrice}>Price: ${item.price}</Text>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.buttonText}>{buttonName}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    padding: 20,
    borderRadius: 10,
    width: 380,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: Colors.PurplishBlue,
    marginTop: 20,
  },
  productContainer: {
    flexWrap: 'wrap',
    width: '100%',
    height: 200,
    margin: 10,
    marginTop: 20,
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 160,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.Gray,
  },
  productImage: {
    width: 150,
    height: 100,
    resizeMode: "center",
  },
  productName: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    width: 190,
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
  },
  modalButton: {
    marginTop: -20,
  },
  buttonText: {
    color: Colors.Blue,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
});

export default CustomModal;
