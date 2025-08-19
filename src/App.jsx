import { Routes, Route } from 'react-router-dom'
import Nav from "./components/Nav";
import Register from './page/Register';
import Shop from './page/Shop';
import Cart from './page/Cart';
import Singleproduct from './page/Singleproduct';
import Login from './page/Login';
import Home from "./page/Home";
import Footer from './components/Footer';
import Dashboard from './page/Dashboard';
import { useState } from 'react';

const App = () => {
const [cartCount, setCartCount] = useState(0);

  return (
    <div>
      <Nav cartCount={cartCount}/>
      <Routes>
        <Route path="/" element={<Home setCartCount={setCartCount} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singleproduct/:id" element={<Singleproduct />} />
        <Route path="/" element={<Register />} />
        <Route path="/" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
