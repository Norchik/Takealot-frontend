import logo from '../images/logo.svg'
import { RxDividerVertical, } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from 'react'
import Login from '../page/Login';
import Register from '../page/Register';
import { Button} from 'antd'
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';


const Nav = ({cartCount}) => {
  //for the login
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => setOpenModal(true);

  //for the register
  const [openRegModal, setOpenRegModal] = useState(false);
  const showRegModal = () => setOpenRegModal(true);

  const navigate = useNavigate();

  return (
    <nav className='w-full  mt-4 mb-4'>
      <div className='flex items-center justify-around'>
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-4'>
            <img src={logo} onClick={() => navigate('/')} alt="" className='h-8' />
          </div>
          <div className='flex items-center gap-4 text-sm text-gray-700 px-4 py-2 '>
            <p className='text-sm text-gray-700 hover:underline'>Help Centre</p>
            <RxDividerVertical />
            <p className='text-sm text-gray-700 hover:underline'>Sell on Takealot</p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <p className="hover:underline text-gray-700 text-sm" onClick={showModal}>
            Login
          </p>
          <RxDividerVertical />
          <p className="hover:underline text-gray-700 text-sm" onClick={showRegModal}>Register</p>
          <RxDividerVertical />
          <p className="hover:underline text-gray-700 text-sm">Orders</p>
          <RxDividerVertical />
          <p className="hover:underline text-gray-700 text-sm">My Account</p>
          <button className='bg-pink-400 text-white rounded-full h-8 w-8 items-center flex'>
            <FaHeart /> </button>
          <button onClick={() => navigate('/cart')} className='relative bg-green-800 text-white w-15 rounded-full px-3 py-2 '>
            <FaShoppingCart /> 
            <span className='absolute top-1 right-1 font-bold text-white'> {cartCount} </span>
          </button>
        </div>
      </div>

      <div className='w-screen bg-[#0b79bf] h-20 flex flex-col justify-center items-center'>
        <div className='flex w-500 h-7 max-w-4xl bg-gray-100 mb-2 mt-2 !rounded-md'>
          <input type="text" placeholder='Search for products, brands...' className='text-xs flex-1 px-4 py-4 rounded-l-md' />
          <Button className='!rounded-none !bg-gray-700 !text-white px-4 !rounded-r-md !outline-none'><CiSearch /></Button>
        </div>
        <div className='max-w-4xl h-7 gap-4 font-medium text-center grid grid-cols-8 divide-x bg-gray-100 rounded-md'>
          <div className='text-xs text-gray-600'>ALOT For Less</div>
          <div className='text-xs text-gray-600'>New Arrivals</div>
          <div className='text-xs text-gray-600'>Winter</div>
          <div className='text-xs text-gray-600'>Best of Mzansi</div>
          <div className='text-xs text-gray-600 w-30'>Deals & Promotions</div>
          <div className='text-xs text-gray-600'>Brands Store</div>
          <div className='text-xs text-gray-600 bg-red-400'>TakealotMore</div>
          <div className='text-xs text-gray-600'>Clearance</div>
        </div>
      </div>

      <Login open={openModal} setOpen={() => setOpenModal(false)} />
      <Register openReg={openRegModal} setOpenReg={() => setOpenRegModal(false)} />


    </nav>
  )
}

export default Nav