import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_charges = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [books, setBooks] = useState([]);

  //Adding items to cart
  const addToCart = async (itemId) => {
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData); 

    if(token){
      try {
        await axios.post(backendUrl+'/api/cart/add',{itemId},{headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Getting total CartItems
  const getcartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          totalCount += cartItems[item];
        }
      } catch (error) {
        console.log(error);
      }
    }
    return totalCount;
  };

  //Getting total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = books.find((book) => book._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  //Updating the quantity
  const updateQuantity = async (itemId,quantity)=>{
    const cartData = {...cartItems};
    cartData[itemId] = quantity;
    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }


  // getting all products data
  const getProductsData = async ()=>{
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      //console.log(response.data);
      if(response.data.success){
        setBooks(response.data.products);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // getting user cart data
  const getUserCart = async (token) =>{
    try {
      const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}});
      if(response.data.success){
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token')); // prevent logout upon reloading the page if logged
      getUserCart(localStorage.getItem('token'));

    }
    getProductsData();
  },[])

  const contextValue = {
    books,
    currency,
    navigate,
    token,
    setToken,
    cartItems,
    setCartItems,
    addToCart,
    getcartCount,
    getCartAmount,
    updateQuantity,
    delivery_charges,
    backendUrl,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
