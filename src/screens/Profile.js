import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserProfile, handleProfileUpdate } from "../services/UserService";
import { Colors } from "../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomAlert from "../components/CustomAlert";
import SelectDefaultAddress from "../components/Addresses";
import { setUserID } from "../redux/AuthenticationSlice";
import { resetUpdate } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

export default function UserProfile() {
  const { newOrders } = useSelector((state) => state.newOrder);
  const { userId } = useSelector((state) => state.authentication);
  const [userDetails, setUserDetails] = useState();
  const [initialFormValues, setInitialFormValues] = useState({
    userName: "",
    password: "",
  });
  const [isShow, setShow] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [switchScreen, setSwitchScreen] = useState(false);

  const toggleCollapsibleContent = () => {
    setShow(!isShow);
  };

  const loadUserProfile = async () => {
    if (userId) {
      const fetchedUserProfile = await fetchUserProfile(userId);
      setUserDetails(fetchedUserProfile);
      setInitialFormValues({
        userName: fetchedUserProfile.fullName,
        password: fetchedUserProfile.password,
      });
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, [userId, initialFormValues]);

  useFocusEffect(
    useCallback(() => {
      loadUserProfile();
    }, [])
  );

  const goToLogin = async () => {
    dispatch(resetUpdate());
    dispatch(setUserID(""));
    await clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Login");
  };

  const flip = () => {
    setSwitchScreen(true);
    setShow(false);
  };

  const closeForm = () => {
    setSwitchScreen(false);
    setShow(true);
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const submitUpdate = async (values) => {
    try {
      await handleProfileUpdate(userId, values.userName, values.password);
      setIsModalVisible(true);
      await loadUserProfile();
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    closeForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.user}>Hi {userDetails?.fullName}</Text>
      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
          <FontAwesome size={18} name="location-dot" />
          <Text style={styles.buttonName}>My Addresses</Text>
        </View>
        <SelectDefaultAddress />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleCollapsibleContent}
      >
        <FontAwesome size={18} name="user" />
        {!switchScreen ? (
          <Text style={styles.buttonName}>My Account</Text>
        ) : (
          <Text style={styles.buttonName}>Change Profile Details</Text>
        )}
      </TouchableOpacity>

      {isShow ? (
        <View style={styles.accountContainer}>
          <TouchableOpacity style={styles.subButton} onPress={() => flip()}>
            <FontAwesome size={18} name="user" />
            <Text style={styles.buttonName}>My Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subButton}
            onPress={() => navigation.navigate("Orders")}
          >
            <FontAwesome size={18} name="bag-shopping" />
            <Text style={styles.buttonName}>My Orders</Text>
            {newOrders > 0 ? (<Text style={styles.badge}>{newOrders}</Text>) : null}
            {}
          </TouchableOpacity>
          <TouchableOpacity style={styles.subButton} onPress={() => flip()}>
            <FontAwesome size={18} name="key" />
            <Text style={styles.buttonName}>Change Password</Text>
          </TouchableOpacity>
        </View>
      ) : switchScreen ? (
        <View style={styles.accountContainer}>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              submitUpdate(values);
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
                <View style={styles.inputWrapper}>
                  <Text style={[styles.input, styles.disabled]}>
                    {userDetails?.email}
                  </Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    style={styles.input}
                    secureTextEntry={true}
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
                {errors.userName && touched.userName && (
                  <Text style={styles.errorText}>{errors.userName}</Text>
                )}
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.updateBtn,
                      !isValid ? { marginTop: 5 } : { marginTop: 20 },
                      !isValid && styles.disabledButton,
                    ]}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <FontAwesome style={styles.icons} size={18} name="check" />
                    <Text style={[styles.buttonName, styles.update]}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => closeForm()}
                    style={[
                      styles.updateBtn,
                      !isValid ? { marginTop: 5 } : { marginTop: 20 },
                    ]}
                  >
                    <FontAwesome style={styles.icons} size={15} name="x" />
                    <Text style={[styles.buttonName, styles.update]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={() => goToLogin()}>
        <MaterialIcons size={18} color={Colors.Red} name="logout" />
        <Text style={styles.buttonName}>Sign Out</Text>
        <CustomAlert
          message={"Profile details updated successfully"}
          buttonName={"OK"}
          isVisible={isModalVisible}
          onClose={closeModal}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.GrayishWhite,
  },
  user: {
    width: "95%",
    margin: 10,
    fontFamily: "Poppins-Regular",
    padding: 20,
    fontSize: 14,
    color: Colors.Black,
    backgroundColor: Colors.White,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
    elevation: 15,
  },
  addressContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "95%",
    margin: 10,
    marginBottom: 0,
    height: 300,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
    backgroundColor: Colors.White,
    elevation: 15,
  },
  addressHeader: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    backgroundColor: Colors.White,
    borderBottomWidth: 0.5,
    borderColor: Colors.Gray,
  },
  button: {
    flexDirection: "row",
    width: "95%",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: Colors.PurplishBlue,
    backgroundColor: Colors.White,
  },
  accountContainer: {
    width: "95%",
    alignSelf: "center",
    height: 210,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: Colors.PurplishBlue,
    backgroundColor: Colors.White,
    elevation: 5,
  },
  subButton: {
    flexDirection: "row",
    width: "90%",
    marginLeft: 45,
    marginTop: 35,
  },
  buttonName: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.Black,
    marginLeft: 20,
  },
  icons: {
    marginRight: -10,
    marginTop: 2,
  },
  input: {
    backgroundColor: Colors.White,
    width: 370,
    height: 40,
    padding: 10,
    marginTop: 5,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: Colors.Gray,
  },
  errorText: {
    alignSelf: "flex-start",
    marginLeft: 10,
    fontSize: 10,
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
    right: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  updateBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    height: 30,
    width: "30%",
    alignSelf: "center",
    padding: 5,
    marginRight: 10,
  },
  disabledButton: {
    color: Colors.Gray,
  },
  update: {
    fontSize: 14,
    color: Colors.Black,
  },
  disabled: {
    color: Colors.Gray,
  },
  badge: {
    position: "absolute",
    backgroundColor: "red",
    borderRadius: 20,
    width: 20,
    height: 20,
    right: 215,
    top: 0,
    color: Colors.White,
    alignSelf: "center",
    textAlign: "center",
  },
});
