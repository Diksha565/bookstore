import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {

  const {navigate,token, backendUrl, cartItems , setCartItems, getCartAmount, delivery_charges, books} = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    Country: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for(const itemId in cartItems){
        if(cartItems[itemId]>0){
          const itemInfo = books.find((book)=>book._id===itemId);
          if(itemInfo){
            orderItems.push({
              ...itemInfo,
              quantity: cartItems[itemId],
            })
          }
        }
      }
      //console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_charges,
      }

      switch (method){
        // api for cod method
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}});
          //console.log(response.data);
          if(response.data.success){
            setCartItems({});
            navigate('/orders');
          }
          else{
            toast.error(response.data.message);
          }
          break;

        // api for stripe method
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData, {headers:{token}});
          if(responseStripe.data.success){
            const {session_url}=responseStripe.data;
            window.location.replace(session_url)
          }
          else{
            toast.error(responseStripe.data.message);
            console.log(error);
          }
          break;
          default:
            break;
      }
    } catch (error) {
      //console.log(error);
      toast.error(error.message);
    }
  };
//10:47:01
  return (
    <section className="max-padd-container">
      {/* Container */}
      <form onSubmit={handleSubmit} className="pt-28">
        <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
          {/* Left Side */}
          <div className="flex flex-1 flex-col gap-3  text-[95%]">
            <Title
              title1={"Delivery"}
              title2={"Information"}
              titleStyles={"h3"}
            />
            <div className="flex gap-3">
              <input
                onChange={handleChange}
                value={formData.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
              <input
                onChange={handleChange}
                value={formData.lastName}
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
            </div>
            <input
              onChange={handleChange}
              value={formData.email}
              type="email"
              name="email"
              placeholder="Email"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              required
            />
            <input
              onChange={handleChange}
              value={formData.phone}
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              required
            />
            <input
              onChange={handleChange}
              value={formData.street}
              type="text"
              name="street"
              placeholder="Street"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              required
            />
            <div className="flex gap-3">
              <input
                onChange={handleChange}
                value={formData.city}
                type="text"
                name="city"
                placeholder="City"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
              <input
                onChange={handleChange}
                value={formData.state}
                type="text"
                name="state"
                placeholder="State"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
            </div>
            <div className="flex gap-3">
              <input
                onChange={handleChange}
                value={formData.pincode}
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
              <input
                onChange={handleChange}
                value={formData.Country}
                type="text"
                name="Country"
                placeholder="Country"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                required
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-1 flex-col">
            <CartTotal />

            {/* Payment Method */}
            <div className="my-6">
              <h3 className="bold-20 mb-5">
                Payment <span className="text-secondary">Method</span>
              </h3>
              <div className="flex gap-3">
                <div
                  onClick={() => setMethod("stripe")}
                  className={`${
                    method === "stripe" ? "btn-secondary" : "btn-white"
                  } !py-1 text-xs cursor-pointer`}
                >
                  Stripe
                </div>
                <div
                  onClick={() => setMethod("cod")}
                  className={`${
                    method === "cod" ? "btn-secondary" : "btn-white"
                  } !py-1 text-xs cursor-pointer`}
                >
                  Cash on Delivery
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="btn-secondaryOne ">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </section>
  );
};

export default PlaceOrder;
