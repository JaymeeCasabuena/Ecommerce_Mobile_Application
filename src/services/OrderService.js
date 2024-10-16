import axios from "axios";
import { Alert } from "react-native";

const handleNewOrder = (
  userId,
  cart,
  total,
  status,
  defaultAddress,
  paymentMethod
) => {


  const orderData = {
    userId: userId,
    cartItems: cart,
    totalPrice: total,
    status: status,
    shippingAddress: defaultAddress,
    paymentMethod: paymentMethod,
  };

  axios
    .post("http://10.0.2.2:8000/orders", orderData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Alert.alert("Error", "An error occurred while submitting order");
      console.log("Error", err);
      throw err;
    });
};

const fetchOrders = async (userId) => {
  try {
    const response = await axios.get(`http://10.0.2.2:8000/orders/${userId}`);
    return response.data.orders;
  } catch (error) {
    console.log("error fetching orders", error);
  }
};

const handleUpdateStatus = async (orderId, status) => {

  const updateData = {
    _id: orderId,
    status: status,
  };

  axios
    .post("http://10.0.2.2:8000/updateOrderStatus", updateData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Alert.alert("Error", "An error occurred while updating status order");
      console.log("Error", err);
      throw err;
    });
};

export { handleNewOrder, fetchOrders, handleUpdateStatus };
