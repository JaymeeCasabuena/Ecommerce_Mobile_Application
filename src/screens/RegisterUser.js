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
  
  export default function SignUp() {
    const backgroundImage = require("../../assets/BackgroundImages/LoginScreen.jpg");
    const navigation = useNavigation();
  
    
    const goToSignupPage = () => {
      navigation.navigate("Sign up");
    };
  
  
    return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <Text style={styles.headerText}>LET'S GET YOUR ACCOUNT SETUP!</Text>
          <View style={styles.loginContainer}>
          <TextInput style={styles.input} placeholder="Enter your name" />
            <TextInput style={styles.input} placeholder="Enter your email" />
            <TextInput style={styles.input} placeholder="Enter your password" />
            <TouchableOpacity style={styles.button}>
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
      color: Colors.White,
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "center",
    },
    loginContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      backgroundColor: Colors.White,
      width: 300,
      height: 40,
      padding: 10,
      marginTop: 10,
      borderWidth: 2,
      borderColor: Colors.Black,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
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
    }
  });