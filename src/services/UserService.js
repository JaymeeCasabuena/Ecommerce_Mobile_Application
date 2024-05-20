import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleLogin = (email, password, navigation) => {
  const user = {
    email: email,
    password: password,
  };

  axios
    .post("http://10.0.2.2:8000/login", user)
    .then((response) => {
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      navigation.replace("Main");
    })
    .catch((err) => {
      Alert.alert("Login Error", "An error occurred while logging in");
      console.log("login failed", err);
    });
};

const handleRegister = (userName, email, password) => {
  const user = {
    name: userName,
    email: email,
    password: password,
  };

  axios
    .post("http://10.0.2.2:8000/register", user, { withCredentials: true })
    .then((response) => {
      Alert.alert(
        "Registration successful",
        "You have been registered Successfully"
      );
    })
    .catch((err) => {
      Alert.alert("Registration Error", "An error occurred while registering");
      console.log("registration failed", err);
    });
};

export { handleLogin, handleRegister };
