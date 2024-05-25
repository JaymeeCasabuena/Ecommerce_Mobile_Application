import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomAlert from "../components/CustomAlert";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { handleRegister } from "../services/UserService";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SignUp() {
  const backgroundImage = require("../../assets/BackgroundImages/LoginScreen.jpg");
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const registerUser = async (values) => {
    try {
      await handleRegister(values.userName, values.email, values.password);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather size={40} color={Colors.Black} name="x" />
        </TouchableOpacity>
        <Text style={styles.headerText}>LET'S GET YOUR ACCOUNT SETUP!</Text>
        <View style={styles.loginContainer}>
          <Formik
            initialValues={{ userName: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              registerUser(values);
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
                    name="userName"
                    value={values.userName}
                    onChangeText={handleChange("userName")}
                    onBlur={handleBlur("userName")}
                    style={styles.input}
                    placeholder="Enter your name"
                  />
                  {values.userName.length > 0 ? (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setFieldValue("userName", "")}
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
                {errors.userName && touched.userName && (
                  <Text style={styles.errorText}>{errors.userName}</Text>
                )}
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
                  style={[styles.button, !isValid && styles.disabledButton]}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text style={styles.buttonName}>Sign up</Text>
                </TouchableOpacity>
                <CustomAlert
                  message={"Account created successfully!"}
                  buttonName={"Login"}
                  isVisible={isModalVisible}
                  onClose={closeModal}
                />
              </>
            )}
          </Formik>
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
    fontFamily: "Poppins-Bold",
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
