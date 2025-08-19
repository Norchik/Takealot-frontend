import { useState } from 'react'


const Footer =() => {


  return (
  <div className='mt'>
  
   <footer className='mt-10'>
    <div className='flex justify-around'>
        <div className='grid grid-cols-5 gap-8'>
          <div >
            <p className='font-bold px-4 py-4'>Shop</p>
            <p>Daily Deals</p>
            <p>App Only Deals</p>
            <p>Clearance Sale</p>
            <p>Gift Vouchers</p>
          </div>
          <div>
            <p className='font-bold px-4 py-4'>Account</p>
            <p>My Account</p>
            <p>Track Order</p>
            <p>Returns</p>
            <p>Personal Details</p>
            <p>Invoices</p>
            <p>TakealotMORE</p>
            <p></p>
          </div>
          <div>
            <p className='font-bold px-4 py-4'>Help</p>
            <p>Help Centre</p>
            <p>Contact Us</p>
            <p>Submit and Idea</p>
            <p>Suggest a Product</p>
            <p>Shipping and Delivery</p>
            <p>Takealot Pickup Points</p>
            <p>Returns</p>
            <p>Log Intellectual Property Complaint</p>
          </div>
          <div>
            <p className='font-bold px-4 py-4'>Company</p>
            <p>About Us</p>
            <p>Careers</p>
            <p>Sell on Takealot</p>
            <p>Deliver for Takealot</p>
            <p>Press & News</p>
            <p>Copetitions</p>
            <p>Business to Business</p>
            <p>Mr D</p>
          </div>
          <div>
            <p className='font-bold px-4 py-4'>Takealot Policy</p>
            <p>Returns Policy</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
            <p>Human Rights Statement</p>
            <p>Code of Advertising Practice</p>
            <p>Speak Up Process</p>
          </div>
        </div>

        </div>
      </footer>
  </div>
  )
}

export default Footer