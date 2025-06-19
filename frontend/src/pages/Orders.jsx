import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import Title from './../components/Title';
import Footer from './../components/Footer';


const Orders = () => {
  const {backendUrl,currency,token}=useContext(ShopContext);

  const [orderData, setOrderData]=useState([]);

  const loadOrderData = async ()=>{
    try{
      if(!token){
        //console.log("No token found");
        return null;
      }
      //console.log("Token found");
      //console.log("calling api")
      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}});
      //console.log(response.data);
      if(response.data.success){
        let allOrderItems = [];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status;
            item['payment']=order.payment;
            item['paymentMethod']=order.paymentMethod;
            item['date']=order.date;
            allOrderItems.push(item);
          })
        })
        setOrderData(allOrderItems.reverse());
      }
    } catch(error){
      console.log(error);
      //toast.error(error.message);
    }
  }

  useEffect(()=>{
    loadOrderData();
  },[token]);

  return (
    <section className='max-padd-container'>
      <div className='pt-28 pb-10'>
        {/* title */}
        <Title title1={"Order"} title2={"List"} title1Styles={'h3'}/>

        {orderData.map((item,i)=>(
          <div key={i} className='bg-white p-2 mt-3 rounded-lg'>
            <div className='text-gray-700 flex flex-col gap-4'>
              <div className='flex gap-x-3 w-full'>
                {/* Image */}
                <div className='flex gap-6'>
                  <img src={item.image} alt="orderItemImg" width={55} className='object-cover aspect-square rounded' />
                </div>
                {/* order info */}
                <div className='block w-full'>
                  <h5 className='h5 capitalize line-clamp-1'>{item.name}</h5>
                  <div className='flexBetween'>
                    <div>
                      <div className='flex items-center gap-x-1 sm:gap-x-3'>
                        <div className='flexCenter gap-x-1  '>
                          <h5 className='medium-14'>Price:</h5>
                          <p>{currency}{item.price}</p>
                        </div>
                        <div className='flexCenter gap-x-1  '>
                          <h5 className='medium-14'>Quantity:</h5>
                          <p>{item.quantity}</p>
                        </div>
                        <div className='sm:flexCenter gap-x-1 hidden  '>
                          <h5 className='medium-14'>Payment:</h5>
                          <p className='text-gray-400'>{item.paymentMethod}</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-x-1 '>
                          <h5 className='medium-14'>Date:</h5>
                          <p className='text-gray-400'>{new Date(item.date).toDateString()}</p>
                        </div>
                      <div className='flex items-center gap-x-1 sm:hidden  '>
                          <h5 className='medium-14'>Payment:</h5>
                          <p className='text-gray-400'>{item.paymentMethod}</p>
                        </div>
                    </div>
                    {/* Status and button */}
                    <div className='flex flex-col xl:flex-row gap-3'>
                      <div className='flex items-center gap-2'>
                        <p className='min-w-2 h-2 rounded-full bg-secondary'></p>
                        <p>{item.status}</p>
                      </div>
                      <button onClick={loadOrderData} className='btn-secondaryOne !px-1.5 !py-1 ~text-xs'>Track Order</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </section>
  );
}

export default Orders;