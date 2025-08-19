import React, { useState, useEffect } from "react"
import { Button, Card, message } from 'antd'
import img1 from "../images/carousel 1.avif"
import brand1 from '../images/clinique.webp'
import brand2 from '../images/tp-link.webp'
import brand3 from '../images/samsung.webp'
import brand4 from '../images/imou.webp'
import brand5 from '../images/the-ordinary.webp'
import Viewmorebtn from '../components/Viewmorebtn';
import grid1 from '../images/grid1.webp'
import grid2 from '../images/grid2.avif'
import grid3 from '../images/grid3.webp'
import grid4 from '../images/grid4.avif'
import grid5 from '../images/grid5.webp'
import grid6 from '../images/grid6.webp'
import grid7 from '../images/grid7.webp'
import grid8 from '../images/grid8.webp'
import grid9 from '../images/grid9.webp'
import grid10 from '../images/grid10.webp'
import axios from 'axios'
import { Link } from "react-router-dom"

const { Meta } = Card;

const Home = ({ setCartCount }) => {

  const [loading, setLoading] = useState(false) //for loading
  const [product, setProduct] = useState([]) //for products

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3001/items`)
      setProduct(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  //for message when added to cart
  const [messageApi, contextHolder] = message.useMessage()

  //for adding to cart count
  const incrementCount = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(item)
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCartCount(existingCart.length);
    messageApi.open({
      type: "success",
      content: "Product added successfully"
    });
  }

  return (
    <div>

      <div className='flex justify-center mt-6'><img src={img1} alt="" className='h-70 w-220 object-cover' />        </div>

      <div className='flex flex-col items-center mt-6'>
        <p className='justify-left mr-190 font-bold text-gray-600 !text-start mt-4 text-lg'>Featured Brands</p>
        <div className='grid grid-cols-5 gap-8 mb-10'>
          <div> <img src={brand1} alt="" className='' /> </div>
          <div> <img src={brand2} alt="" className='' /> </div>
          <div> <img src={brand3} alt="" className='' /> </div>
          <div> <img src={brand4} alt="" className='' /></div>
          <div> <img src={brand5} alt="" className='' /> </div>
        </div>
      </div>

      <div className='bg-gray-200 w-full'>
        <div className='ml-20 mr-20'>
          <div className='flex justify-between'>
            <p className='m-4 font-bold text-gray-700 text-xl'>Pick Up Where You Left Off</p>
            <div className=''><Viewmorebtn />
              <Button className="!border-black !text-black !bg-inherit !rounded-none m-4 !font-bold !text-gray-700" type="primary">
                Clear All
              </Button></div>
          </div>


          <div>
            {contextHolder}
            {product.slice(0, 1).map((e) => (

              <Card
                hoverable
                style={{ width: 180 }}
                cover={<Link to={`/singleproduct/${e.id}`} >
                  <img alt="example" src={e.image} /> </Link>}
              >
                <Meta title={e.name} description={`From R${e.price}`} />
                <button onClick={() => incrementCount(e)} className="bg-pink-500 rounded text-white text-xl mt-2 w-30">Add to Cart</button>
              </Card>
            ))}
          </div>

          <div className='flex justify-between'>
            <p className='m-4 font-bold text-gray-700 text-xl'>Winter Home Appliances</p>
            <Viewmorebtn />
          </div>

          <div className="grid grid-cols-6 gap-10 py-4 h-50">
            {product.slice(1, 7).map((item) => (
              <Card
                key={item.id}
                hoverable
                className="bg-white shadow-md rounded-md"
                style={{ width: 180, border: '1px solid #eee' }}
                cover={<Link to={`/singleproduct/${item.id}`}>
                  <div className="h-40 w-full flex justify-center items-center bg-white">
                    <img alt={item.name}
                      src={item.image}
                      className="max-h-full max-w-full object-contain" /> </div> </Link>}
              >
                <Meta title={<p className="text-md font-semibold text-gray-600 overflow-hidden text-ellipsis">{item.name}</p>}
                  description={<p className="text-black text-xl -mt-2 font-bold">R{item.price}</p>}
                />

                <button onClick={() => incrementCount(item)} className="bg-pink-500 rounded text-white text-xl mt-2 w-30">Add to Cart</button>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-10 py-4 mt-28">
            <img src={grid1} alt="" className='' />
            <img src={grid2} alt="" />
            <img src={grid3} alt="" />
            <img src={grid4} alt="" />
          </div>

          <div className='flex justify-between'>
            <p className='font-bold text-gray-700 text-xl'>TakealotMORE Member Exclusive Deals</p>
            <Viewmorebtn />
          </div>

          <div className="grid grid-cols-6 gap-10 py-4 h-50">
            {product.slice(7, 13).map((e) => (
              <Card
                key={e.id}
                hoverable
                className="bg-white shadow-md rounded-md"
                style={{ width: 180, border: '1px solid #eee' }}
                cover={<Link to={`/singleproduct/${e.id}`}>
                  <div className="h-40 w-full flex justify-center items-center bg-white">
                    <img alt={e.name}
                      src={e.image}
                      className="max-h-full max-w-full object-contain" /> </div> </Link>}
              >
                <Meta title={<p className="text-md font-semibold text-gray-600 overflow-hidden text-ellipsis">{e.name}</p>}
                  description={<p className="text-black text-xl -mt-2 font-bold">R{e.price}</p>}
                />

                <button onClick={() => incrementCount()} className="bg-pink-500 rounded text-white text-xl mt-2 w-30">Add to Cart</button>
              </Card>
            ))}
          </div>

          <div className='flex justify-between mt-30 '>
            <p className='font-bold text-gray-700 text-xl'>Winter Health & Wellness</p>
            <Viewmorebtn />
          </div>

          <div className="grid grid-cols-6 gap-10 py-4 h-50">
            {product.slice(13, 19).map((e) => (
              <Card
                key={e.id}
                hoverable
                className="bg-white shadow-md rounded-md"
                style={{ width: 180, border: '1px solid #eee' }}
                cover={<Link to={`/singleproduct/${e.id}`}>
                  <div className="h-40 w-full flex justify-center items-center bg-white">
                    <img alt={e.name}
                      src={e.image}
                      className="max-h-full max-w-full object-contain" /> </div> </Link>}
              >
                <Meta title={<p className="text-md font-semibold text-gray-600 overflow-hidden text-ellipsis">{e.name}</p>}
                  description={<p className="text-black text-xl -mt-2 font-bold">R{e.price}</p>}
                />

                <button onClick={() => incrementCount()} className="bg-pink-500 rounded text-white text-xl mt-2 w-30">Add to Cart</button>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-10 py-4 mt-30">
            <img src={grid5} alt="" className='' />
            <img src={grid6} alt="" />
            <img src={grid7} alt="" />
            <img src={grid8} alt="" />
          </div>

          <div className='flex justify-between '>
            <p className='font-bold text-gray-700 text-xl'>Christmas in July</p>
            <Viewmorebtn />
          </div>

          <div className="grid grid-cols-6 gap-10 py-4 h-50">
            {product.slice(19, 25).map((e) => (
              <Card
                key={e.id}
                hoverable
                className="bg-white shadow-md rounded-md"
                style={{ width: 180, border: '1px solid #eee' }}
                cover={<Link to={`/singleproduct/${e.id}`}>
                  <div className="h-40 w-full flex justify-center items-center bg-white">
                    <img alt={e.name}
                      src={e.image}
                      className="max-h-full max-w-full object-contain" /> </div> </Link>}
              >
                <Meta title={<p className="text-md font-semibold text-gray-600 overflow-hidden text-ellipsis">{e.name}</p>}
                  description={<p className="text-black text-xl -mt-2 font-bold">R{e.price}</p>}
                />

                <button onClick={() => incrementCount()} className="bg-pink-500 rounded text-white text-xl mt-2 w-30">Add to Cart</button>
              </Card>
            ))}
          </div>


          <div className='flex justify-between mt-30'>
            <p className='font-bold text-gray-700 text-xl'>Shop Skincolab</p>
            <Viewmorebtn />
          </div>

          <div className="grid grid-cols-6 gap-10 py-4 h-50">
            {product.slice(25, 31).map((e) => (
              <Card
                key={e.id}
                hoverable
                className="bg-white shadow-md rounded-md"
                style={{ width: 180, border: '1px solid #eee' }}
                cover={<Link to={`/singleproduct/${e.id}`}>
                  <div className="h-40 w-full flex justify-center items-center bg-white">
                    <img alt={e.name}
                      src={e.image}
                      className="max-h-full max-w-full object-contain" /> </div> </Link>}
              >
                <Meta title={<p className="text-md font-semibold text-gray-600 overflow-hidden text-ellipsis">{e.name}</p>}
                  description={<p className="text-black text-xl -mt-2 font-bold">R{e.price}</p>}
                />

                <button onClick={() => incrementCount()} className="bg-pink-500 rounded text-white text-xl mt-2 w-30">Add to Cart</button>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-10 py-4 mt-28">
            <img src={grid9} alt="" className='' />
            <img src={grid10} alt="" />
          </div>

          <div className='flex justify-between '>
            <p className='font-bold text-gray-700 text-xl'>Pre-Order the New Samsung Z Series</p>
            <Viewmorebtn />
          </div>

          <div className="grid grid-cols-6 gap-10 py-4 h-50">
            {product.slice(31, 37).map((e) => (
              <Card
                key={e.id}
                hoverable
                className="bg-white shadow-md rounded-md"
                style={{ width: 180, border: '1px solid #eee' }}
                cover={<Link to={`/singleproduct/${e.id}`}>
                  <div className="h-40 w-full flex justify-center items-center bg-white">
                    <img alt={e.name}
                      src={e.image}
                      className="max-h-full max-w-full object-contain" /> </div> </Link>}
              >
                <Meta title={<p className="text-md font-semibold text-gray-600 overflow-hidden text-ellipsis">{e.name}</p>}
                  description={<p className="text-black text-xl -mt-2 font-bold">R{e.price}</p>}
                />

                <button onClick={() => incrementCount()} className="bg-pink-500 rounded text-white text-xl mt-2 w-30">Add to Cart</button>
              </Card>
            ))}
          </div>

          <div className='flex justify-between mt-30'>
            <p className='font-bold text-gray-700 text-xl'>Shop Samsung Galaxy Deals</p>
            <Viewmorebtn />
          </div>

          <div className="grid grid-cols-6 gap-10 py-4 h-50">
            {product.slice(37, 43).map((e) => (
              <Card
                key={e.id}
                hoverable
                className="bg-white shadow-md rounded-md"
                style={{ width: 180, border: '1px solid #eee' }}
                cover={<Link to={`/singleproduct/${e.id}`}>
                  <div className="h-40 w-full flex justify-center items-center bg-white">
                    <img alt={e.name}
                      src={e.image}
                      className="max-h-full max-w-full object-contain" /> </div> </Link>}
              >
                <Meta title={<p className="text-md font-semibold text-gray-600 overflow-hidden text-ellipsis">{e.name}</p>}
                  description={<p className="text-black text-xl -mt-2 font-bold">R{e.price}</p>}
                />

                <button onClick={() => incrementCount()} className="bg-pink-500 rounded text-white text-xl mt-2 w-30">Add to Cart</button>
              </Card>
            ))}
          </div>

        </div>
      </div>


    </div>
  )
}

export default Home