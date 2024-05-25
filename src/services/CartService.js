import axios from "axios";



const handleCartUpdate = ( userId, totalAmount, totalItems, cart
) => {
  const cartData = {
    userId: userId,
    totalPrice: totalAmount,
    totalItems: totalItems,
    cartProducts: cart,
  };

  return axios
    .post("http://10.0.2.2:8000/updateCart", cartData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("Error", err);
      throw err;
    });
};

const fetchCartData = async (userId) => {
  try {
    const response = await axios.get(`http://10.0.2.2:8000/cart/${userId}`);
    return response.data.cart;
  } catch (error) {
    console.log("error fetching cart data", error);
  }
};

export { fetchCartData, handleCartUpdate };
