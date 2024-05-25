import { StyleSheet, Text, Modal, View, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const CustomAlert = ({ message, buttonName, isVisible, onClose }) => {
  return (
    <View style={styles.container}>
      <Modal animationType="fade" visible={isVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <AntDesign name="checkcircleo" style={styles.icon} size={60} />
            <Text style={styles.modalText}>{message}</Text>
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.White,
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "green",
    margin: 20,
    marginBottom: 0,
  },
  modalText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: Colors.Peach,
    marginTop: 20,
  },
  modalButton: {
    marginTop: 10,
  },
  buttonText: {
    color: Colors.PurplishBlue,
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
  },
});

export default CustomAlert;
