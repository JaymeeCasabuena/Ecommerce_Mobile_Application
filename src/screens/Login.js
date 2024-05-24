import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleLogin } from "../services/UserService";

export default function SignIn() {
  const backgroundImage = require("../../assets/BackgroundImages/LoginScreen.jpg");
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToSignupPage = () => {
    navigation.navigate("Sign up");
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);

  const login = () => {
    handleLogin(email, password, navigation);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <Text style={[styles.headerText, styles.appName]}>Fake Store</Text>
        <Text style={styles.headerText}>GOOD TO SEE YOU!</Text>
        <View style={styles.loginContainer}>
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
          <TouchableOpacity style={styles.button} onPress={() => login()}>
            <Text style={styles.buttonName}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => goToSignupPage()}
          >
            <Text style={styles.buttonName}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    resizeMode: "cover",
  },
  appName: {
    color: Colors.IcyBlue,
    fontSize: 24,
    position: "absolute",
    top: 120,
    alignSelf: 'center',
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    color: Colors.White,
    fontSize: 40,
    textAlign: "center",
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
