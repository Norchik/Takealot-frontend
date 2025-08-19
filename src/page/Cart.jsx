import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";
import takemore from '../images/take.png'
import { FaShoppingBag } from "react-icons/fa";
import { IoMdCard } from "react-icons/io";
import { FaTruck } from "react-icons/fa6";
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart)
  }, [])

  const totalPrice = cartItems.reduce((total, item) => {
    if (!item || !item.price) return total;;
    return total + parseFloat(item.price);
  }, 0).toFixed(2);

  //function to delete product
  const [deletedId, setDeletedId] = useState(null)
  const [isDeleting, setIsDeleting] = useState("")

  const deleteProduct = async (id) => {
    const asktodelete = window.confirm("Are you sure you want to delete this product?")
    if (!asktodelete) {
      return
    }
    try {
      setIsDeleting(true)
      const res = await axios.delete(`http://localhost:3001/items/${id}`)
      console.log(res.data)
      setDeletedId(id)
      const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);

    // 🧠 Keep localStorage in sync
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className='bg-gray-100  h-screen relative'>
      {cartItems.length === 0 ? (<p></p>) : (
        cartItems.map((item, index) => (
          item && item.image && item.name && item.price ? (
            <React.Fragment key={index}>
              <div className='flex flex-col bg-white h-20 w-210 ml-40 py-4 px-4 absolute top-4'>
                <p className='text-xs text-black font-bold mb-4'>Shipped from Takealot Warehouse</p>
                <div className='flex-1 h-px bg-gray-100'></div>
              </div>

              <div className='flex bg-white h-50 w-210 ml-40 py-4 px-4 relative top-26 justify-between'>
                <div className='flex ml-10'>
                  <div>
                    <img src={item.image} alt={item.name} className='object-contain h-30 w-30' />
                  </div>
                  <div className='ml-10 gap-4'>
                    <p className='text-xl font-bold text-gray-700'>{item.name}</p>
                     <p className='text-sm text-gray-600'>{item.description}</p>
                    <p className='font-bold text-xs mt-6'> In stock
                      <label className='bg-gray-200 rounded ml-2'> CPT</label>
                      <label className='bg-gray-200 rounded ml-2'>JHB</label>
                    </p>
                  </div>
                </div>
                <div className='text-right flex flex-col gap-6'>
                  <p className='text-2xl text-gray-700 font-bold'>R {item.price}</p>
                  <p className='flex gap-4 ml-30'>Qty: <span className='underline'>1</span> <RxCaretDown className='text-2xl underline' /></p>
                  <button onClick={() => deleteProduct(item.id)} className='items-center flex gap-4 mt-4'>
                    <span className='flex items-center gap-2'> <MdDelete className='text-gray-600' /> Remove</span>
                    <span span className='flex items-center gap-2'> <FaHeart className='text-gray-600' /> Move to List</span> 
                     </button>
                </div>
              </div>
            </React.Fragment>
          ) : null
        ))
      )}

      <div className='bg-white flex flex-col h-40 w-80 absolute top-4 right-40 px-4 py-4'>
        <div className='gap-4'>
          <img src={takemore} alt="" className='w-30' />
          <p className='text-gray-700 text-lg mt-2'>Stop paying delivery fees! Get unlimited FREE delivery with TakealotMORE</p>
          <p className='font-thin text-sm text-sky-400 text-right'> Unlock FREE Delivery</p>
        </div>
      </div>

      <div className='bg-white flex flex-col h-40 w-80 absolute top-47 right-40 px-4 py-4'>
        <p className='text-md text-gray-600 flex items-center gap-2 font-bold'> Cart Summary</p>
        <div className='flex justify-between mt-6'>
          <p className='text-sm'>TOTAL:
            <span className='text-xs' > {cartItems.length} items</span>
          </p>
          <label className='text-green-600 text-3xl font-bold'>R {totalPrice} </label>
        </div>
        <p className='bg-green-600 text-white text-sm items-center font-bold flex justify-center h-15'>Proceed to Checkout</p>
      </div>

      <div className='bg-white flex flex-col h-30 w-80 absolute top-90 right-40 gap-2 px-6 py-6'>
        <p className='items-center flex gap-4 text-sm'> <FaShoppingBag className='text-gray-500 text-md' /> Secure checkout</p>
        <p className='items-center flex gap-4 text-sm'> <IoMdCard className='text-gray-500 text-md' /> Many ways to pay</p>
        <p className='items-center flex gap-4 text-sm'> <FaTruck className='text-gray-500 text-md' />Fast, reliable delivery</p>
      </div>
    </div>
  )
}

export default Cart