import React, { useState, useRef, useEffect } from 'react'
import { IoShareSocialSharp } from "react-icons/io5";
import { MdFlag } from "react-icons/md";
import brand1 from '../images/clinique.webp'
import brand2 from '../images/tp-link.webp'
import brand3 from '../images/samsung.webp'
import brand4 from '../images/imou.webp'
import { RxCaretDown } from "react-icons/rx";
import { FaStar } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { RxDividerVertical, } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Singleproduct = () => {
  const previewContainerRef = useRef(null);
  const [currentPreview, setCurrentPreview] = useState(null);
  const images = [brand1, brand2, brand3, brand4];
  
  const handleImageHover = (imageSrc) => {
    setCurrentPreview(imageSrc);
  };

  const handleImageLeave = () => {
    // Keep the last hovered image or set to first image
    // setCurrentPreview(null); // Uncomment if you want to clear on leave
  };

  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://ecommerce.reworkstaging.name.ng/v2${id}`)

        setProduct(res.data)

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    getProducts()
  }, [id])

  return (
    <div className='bg-gray-100  h-screen relative'>


      <div className='flex justify-around '>
        <div className='text-sky-500'>
          Clothes / Mens clothes / {product.category}
        </div>
        <div className='flex gap-6'>
          <span className='flex gap-4 items-center'> <IoShareSocialSharp className='top' /> Share</span>
          <span className='flex gap-4 items-center'>  <MdFlag /> Report this product</span>
        </div>
      </div>

      <div className='flex bg-white mt-10 h-90 w-210 ml-40 gap-10 px-4 py-10'>
        <div className='flex flex-col px-4 py-4 gap-4 h-80'>
          {[product.image, images].filter(Boolean).map((imageSrc, index) => (
            <img
              key={index}
              width={100}
              height={150}
              src={imageSrc}
              alt={`Product ${index + 1}`}
              className='object-contain border border-gray-300 hover:border-sky-500 cursor-pointer transition-colors duration-200'
              onMouseEnter={() => handleImageHover(imageSrc)}
              onMouseLeave={handleImageLeave}
            />
          ))}
        </div>

        <div
          ref={previewContainerRef}
          className='border flex items-center justify-center'
          style={{ position: 'relative', width: '250px', height: '250px', overflow: 'hidden', background: '#f9f9f9' }}
        > {currentPreview ? (
          <img
            src={currentPreview}
            alt="Preview"
            className='w-full h-full object-contain'
          />
        ) : (
          <div className='text-gray-500 text-center'>
            <div className='text-sm'>Hover over images to preview</div>
          </div>
        )}</div>

        <div className='gap-4 w-80'>
          <p className='text-2xl text-gray-700 '>{product.title}</p>
          <p className='text-sm text-sky-500 mt-2'>{product.category}</p>
          <p className='text-sm text-gray-700 mt-2 text-ellipsis'>{product.description?.slice(0, 50) + "..." }</p>
          <span className='gap-4 items-center flex text-sky-500 mt-2 mb-6'> 
            <FaStar className='text-yellow-300' />
            {product.rating?.rate} Review <RxCaretDown className='text-2xl text-gray-700' /> </span>
          <div className='flex-1 h-px items-center bg-gray-300'></div>
          <p className='font-bold text-lg'>Ships in 5-7 work days <label className='text-sky-500 font-thin !text-xs'>Learn More</label></p>
          <div className='flex-1 h-px items-center bg-gray-300'></div>

          <div className='mt-5'>
            <span className='flex text-xs items-center gap-10 mb-1'> <GoDotFill className='text-gray-400' /> Eligible for Cash on Delivery</span>
            <span className='flex text-xs items-center gap-10 mb-1'> <GoDotFill className='text-gray-400' /> Free Delivery Available.</span>
            <span className='flex text-xs items-center gap-10 mb-1'> <GoDotFill className='text-gray-400' /> Hassle-Free Exchanges & Returns for 30 Days.</span>
            <span className='flex text-xs items-center gap-10 mb-1'> <GoDotFill className='text-gray-400' /> 6-Month Limited Warranty.</span>
          </div>

        </div>
      </div>

      <div className='bg-white flex flex-col h-60 w-80 absolute top-16 right-40 px-4 py-4'>
        <div>
          <p className='font-bold text-3xl'>R {product.price}</p>
          <p className='text-gray-700 text-xs'>Estimated Delivery</p>
          <p className='font-bold text-sm text-gray-600'>28 July - 31 July <label className='text-sky-300 font-lg' >T&Cs Apply</label></p>
        </div>
        <div className='flex-1 h-0.2px outline-dotted items-center outline  mt-2 mb-2'></div>
        <p className='font-bold text-sm text-gray-600 mb-4'>FREE DELIVERY WITH <label className='text-sky-300'>TAKEALOTMORE</label></p>
        <span className='flex items-center bg-green-600 gap-2 justify-center text-white mb-4'> + <FaShoppingCart />  Add to Cart</span>
        <span className='flex items-center bg-gray-200 gap-2 justify-center text-black'> <FaHeart /> Add to List <label className='flex items-center self-end ml-5 -mr-10'> <RxDividerVertical className='text-3xl font-thin' /> <RxCaretDown className='text-2xl' /> </label></span>
      </div>

      <div className='bg-white flex flex-col h-25 w-80 absolute top-80 right-40 px-4 py-4'>
        <p className='text-sm flex items-center gap-2'> Sold by  <span className='text-sky-300'> TorchSA </span> <GoDotFill className='text-xs text-gray-200' />  VAT Registered <BsFillQuestionCircleFill className='text-xs text-gray-1
300' /> </p>
        <div className='outline outline-gray-300 h-15 text-sm flex items-center gap-4 mt-4 px-2'>
          <p className='flex items-center gap-1 '>Seller Score <BsFillQuestionCircleFill className='text-green-600' /> </p>
          <span className='items-center flex justify-around ml-5'> <FaStar className='text-sky-300' /> {product.rating?.rate} <GoDotFill className='ml-2 text-gray-300' /> {product.rating?.count} Reviews</span>
        </div>
      </div>


      <div className='bg-white mt-4 w-300 h-35 ml-40 px-4 py-4 mb-10'>
        <p className='text-lg text-gray-500 font-bold mb-4'>Description</p>
        <p className='text-sm text-gray-600'>{product.description}</p>
      </div>

    </div>
  )
}

export default Singleproduct