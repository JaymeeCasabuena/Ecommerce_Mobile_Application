import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { handleRegister } from "../services/UserService";

export default function SignUp() {
  const backgroundImage = require("../../assets/BackgroundImages/LoginScreen.jpg");
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setName] = useState("");

  const registerUser = () => {
    handleRegister(email, password, userName);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather size={40} color={Colors.Black} name="x" />
        </TouchableOpacity>
        <Text style={styles.headerText}>LET'S GET YOUR ACCOUNT SETUP!</Text>
        <View style={styles.loginContainer}>
          <TextInput
            value={userName}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            placeholder="Enter your name"
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Enter your email"
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Enter your password"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => registerUser()}
          >
            <Text style={styles.buttonName}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    color: Colors.White,
    fontSize: 40,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 30,
    right: 10,
  },
  loginContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    backgroundColor: Colors.White,
    width: 300,
    height: 40,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.Black,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Black,
    width: 300,
    height: 40,
    marginTop: 10,
  },
  buttonName: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupButton: {
    marginTop: 10,
  },
});
