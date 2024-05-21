import axios from "axios";
import { Alert } from "react-native";

const handleAddingNewAddress = (
  userId,
  fullName,
  mobileNo,
  street,
  suburb,
  state,
  postalCode
) => {
  const address = {
    fullName,
    mobileNo,
    street,
    suburb,
    state,
    postalCode,
  };

  axios
    .post("http://10.0.2.2:8000/addresses", { userId, address })
    .then((response) => {
      Alert.alert("Success", "Address added successfully");
      return response;
    })
    .catch((err) => {
      Alert.alert("Error", "An error occurred while adding the address");
      console.log("Error", err);
      throw err;
    });
};

const fetchAddresses = async (userId) => {

  try {
    const response = await axios.get(
      `http://10.0.2.2:8000/addresses/${userId}`
    );
    return response.data.addresses;
  } catch (error) {
    console.log("error fetching addresses", error);
  }
};

export { handleAddingNewAddress, fetchAddresses };
