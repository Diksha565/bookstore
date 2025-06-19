import React,{useState,useEffect,useContext} from 'react'
import Title from './Title'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Autoplay,Pagination} from 'swiper/modules';
import 'swiper/css/pagination';
//import {books} from '../assets/data';
import Item from './Item';
import { ShopContext } from '../context/ShopContext';





const NewArrivals = () => {
  const {books} = useContext(ShopContext);
  const [newArrivals,setNewArrivals] = useState([]);

  // Extract the first new books as new arrivals
  useEffect(()=>{
    const data=books.slice(0,7);
    //console.log(data);
    setNewArrivals(data.reverse());
  },[books]);
  return (
    <section className='max-padd-container bg-white py-16'>
      <Title title1={'New'} title2={'Arrivals'} titleStyles={'pb-10'} paraStyles={'!block'}/>
      {/* Swipe */}
      <Swiper autoplay={{delay:3500,disableOnInteraction:false}}
      pagination={{clickable:true}}
      breakpoints={{400:{slidesPerView:2,spaceBetween:30},
      700:{slidesPerView:3,spaceBetween:30},
      1024:{slidesPerView:4,spaceBetween:30},
      1200:{slidesPerView:5,spaceBetween:30},}}
      //Add swiper modules
      modules={[Pagination,Autoplay]}
      className='h-[455px] sm:h-[488px] xl:h-[499px] mt-5'
      >
      {newArrivals.map((book)=>(
        <SwiperSlide key={book._id}>
          <Item book={book}/>
        </SwiperSlide>
      ))}
      </Swiper>
    </section>
  )
}

export default NewArrivals