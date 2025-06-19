import React, { useState } from "react";
import upload_icon from "../assets/upload_icon.png";
import { TbTrash } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Add = ({token}) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [price, setPrice] = useState("");
  const [popular, setPopular] = useState("");

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("popular", popular);
      formData.append("image", image);

      const response = await axios.post(`${backend_url}/api/product/create`, formData,{headers:{token}});
      //console.log(response.data);
      if(response.data.success){
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setCategory("Fiction");
        setPrice("");
        setPopular(false);
        setImage(null);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="px-2 sm:px-8 sm:mt-14 pb-16">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-y-3 medium-14 lg:w-[777px]"
      >
        <div className="w-full">
          <h5>Product Name</h5>
          <input
            onChange={(e)=> setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Write here..."
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-full max-w-lg"
          />
        </div>
        <div className="w-full">
          <h5 className="h5">Product Description</h5>
          <textarea
            onChange={(e)=> setDescription(e.target.value)}
            value={description}
            rows={5}
            type="text"
            placeholder="Write here..."
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-full max-w-lg"
          />
        </div>
        <div className="flex items-end gap-x-6">
          {/* categories */}
          <div>
            <h5 className="h5">Category</h5>
            <select onChange={(e)=> setCategory(e.target.value)}
            value={category} className="px-3 py-2 ring-1 ring-slate-900/10 rounded bg-white mt-1 sm:w-full text-gray-30">
              <option value="Fiction">Fiction</option>
              <option value="Children">Children</option>
              <option value="Health">Health</option>
              <option value="Academic">Academic</option>
              <option value="Business">Business</option>
              <option value="Religious">Religious</option>
            </select>
          </div>
          <div className="flex gap-x-2 pt-2">
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : upload_icon}
                alt=""
                className="w-10 h-10 aspect-square object-cover ring-1 ring-slate-900/5 bg-white rounded-lg cursor-pointer"
              />
              <input
                type="file"
                onChange={handleChangeImage}
                name="image"
                id="image"
                hidden
              />
            </label>
          </div>
        </div>
        <div>
          <h5 className="h5">Price</h5>
          <input
            onChange={(e)=> setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="Price"
            min={0}
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white w-20"
          />
        </div>
        <div className = 'flexStart gap-2 my-2'>
          <input onChange={(e)=> setPopular((prev)=>!prev)}
            type="checkbox" checked={popular} id="popular" />
          <label htmlFor="popular" className="cursor-pointer">
            Add to Popular
          </label>
        </div>
        <button type="submit" className="btn-dark mt-3 max-w-44 sm:w-full">Add Product</button>
      </form>
    </div>
  );
};

// 7:45:54
export default Add;
