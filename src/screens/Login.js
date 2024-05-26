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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleLogin } from "../services/UserService";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SignIn() {
  const backgroundImage = require("../../assets/BackgroundImages/LoginScreen.jpg");
  const navigation = useNavigation();

  const goToSignupPage = () => {
    navigation.navigate("Sign up");
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("MainStack");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (values) => {
    try {
      const response = await handleLogin(values.email, values.password);
      if (response.status === 403) {
        return;
      }
      navigation.replace("MainStack");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        Alert.alert("Login Error", "Your account is not verified");
      } else {
        Alert.alert("Login Error", "Wrong email or password");
      }
      console.error("Login failed", error);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email Address is required"),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.headerText}>Fake Store</Text>
        <View style={styles.loginContainer}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              login(values);
              resetForm();
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <TextInput
                    name="email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    style={styles.input}
                    placeholder="Enter your email"
                  />
                  {values.email.length > 0 ? (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setFieldValue("email", "")}
                    >
                      <MaterialIcons
                        style={styles.icon}
                        name="clear"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <View style={styles.inputWrapper}>
                  <TextInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Enter your password"
                  />
                  {values.password.length > 0 ? (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setFieldValue("password", "")}
                    >
                      <MaterialIcons
                        style={styles.icon}
                        name="clear"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={[styles.button, !isValid && styles.disabledButton]}
                >
                  <Text style={styles.buttonName}>Sign in</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    resizeMode: "cover",
  },
  headerText: {
    fontFamily: "Poppins-Bold",
    color: Colors.IcyBlue,
    fontSize: 40,
    position: "absolute",
    top: 120,
    alignSelf: "center",
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
  errorText: {
    alignSelf: "flex-start",
    marginLeft: 57,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: Colors.Red,
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearButton: {
    marginRight: -24,
    top: 5,
    right: 30,
  },
  disabledButton: {
    backgroundColor: Colors.Gray,
  },
  signupButton: {
    marginTop: 10,
  },
});
