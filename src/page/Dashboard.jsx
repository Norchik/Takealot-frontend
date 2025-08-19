import { Button, Card, Modal, Input, Form, message } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const { TextArea } = Input
const { Meta } = Card;


const Dashboard = () => {

  const [user, setUser] = useState(null)

  //to get the user that logged in
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (savedUser) {
        setUser(savedUser);
      }
    }
    catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [form] = Form.useForm() //form instance for resetting
  const [messageApi, contextHolder] = message.useMessage();

  const getProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:3001/items')
      console.log('fetched items:', res.data)
      setProducts(res.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  //function to open and close modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };

  //function to add products
  const addProduct = async (values) => {
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:3001/items', values)
      messageApi.open({
        type: "success",
        content: "Product added successfully"
      });
      console.log(res);
      setIsModalOpen(false)
      getProducts() // refresh the product list
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Error adding product"
      });
    } finally {
      setLoading(false)
    }
  }

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
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false)
    }
  }


  //function to edit product
  const [editedId, setEditedId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({
    name: '', price: '', category: '', image: '', stock: '', description: ''
  });

  // Function to open modal and prefill data
  const openEditModal = (product) => {
    setCurrentProduct({
      name: product.name || '',
      price: product.price || '',
      category: product.category || '',
      image: product.image || '',
      stock: product.stock || '',
      description: product.description || ''
    });
    form.setFieldsValue({
      name: product.name || '',
      price: product.price || '',
      category: product.category || '',
      image: product.image || '',
      stock: product.stock || '',
      description: product.description || ''
    });
    setEditedId(product.id);
    setIsModalOpen(true);
    setIsEditMode(true)
  };

  // Function to handle form submission for both add and edit
  const handleFormSubmit = (values) => {
    if (isEditMode) {
      editProduct(editedId, values);
    } else {
      addProduct(values);
    }
  };

  const editProduct = async (id, updatedValues, e) => {
    e.preventDefault()
    try {
      setIsEditing(true)
      const res = await axios.patch(`http://localhost:3001/items/${id}`, updatedValues)
      console.log(res.data);
      setEditedId(null)
      setIsModalOpen(false)
      setIsEditMode(false)
      getProducts()
      form.resetFields()
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false)
    }
  }


  return (
    <div>
      <div>
        <p>My Account</p>
        {user ? (
          <p>Welcome, {user.fname} {user.lname}!</p>
        ) : (
          <p>Please log in to view your account.</p>
        )}
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          {contextHolder}
          <h1 className="text-3xl font-bold text-gray-700">📦 Product Dashboard</h1>
          <Button onClick={showModal} className="!bg-pink-500 !text-white px-4 py-2 rounded hover:bg-pink-600 transition"> Add Product </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 vhlg:grid-cols-4 gap-6 p-4">
          {products.map((product) => {
            return (
              <Card
                key={product.id}
                className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 w-70"
                hoverable
                cover={< img
                  alt={product.name} src={product.image}
                  className='w-full h-40 object-contain rounded-t-xl py-2'
                />}
              >
                <Meta
                  title={<h2 className="text-base font-semibold text-gray-800">              {product.name}                  </h2>}
                  description={<p className="text-sm text-gray-500 line-clamp-2">              {product.description}                  </p>}
                />

                <div className='flex justify-between text-sm mt-2'>
                  <Link to={`/products/${product.id}`} ><p className="text-gray-500 font-bold">{product.category}</p> </Link>
                  <p className="text-gray-700">{product.price}</p>
                </div>

                <div className="flex justify-end gap-2 mt-4m">
                  <Button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-800">
                    <MdDelete size={20} className="text-red-500" /></Button>
                  <Button onClick={() => openEditModal(product)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit size={20} className="text-green-600"/></Button>
                </div>
              </Card>
            )
          })}
        </div>
        {/* modal content */}
        <Modal
          title={isEditMode ? "Edit Product" : "Add a Product"}
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >

          {/* form inside the modal */}
          <Form form={form} onFinish={handleFormSubmit} className="space-y-4">
            <Form.Item name="name">
              <Input placeholder="Enter product name" className="w-full border px-3 py-2 rounded"></Input>
            </Form.Item>
            <Form.Item name="price">
              <Input placeholder="Enter product price" className="w-full border px-3 py-2 rounded"></Input>
            </Form.Item>
            <Form.Item name="category">
              <Input placeholder="Enter product category" className="w-full border px-3 py-2 rounded"></Input>
            </Form.Item>
            <Form.Item name="image">
              <Input placeholder="Enter product image(URL)" className="w-full border px-3 py-2 rounded"></Input>
            </Form.Item>
            <Form.Item name="stock">
              <Input placeholder="Enter stock(Ex. 1234)" className="w-full border px-3 py-2 rounded"></Input>
            </Form.Item>
            <Form.Item name="description">
              <TextArea rows={4} placeholder="Enter product description" className="w-full border px-3 py-2 rounded"></TextArea>
            </Form.Item>
            {/* Make the button text to be dynamic: */}
            <Form.Item>
              <Button htmlType="submit" className="!bg-pink-500 !text-white px-4 py-2 rounded hover:bg-gray-800" >{isEditMode ? 'Update Product' : 'Add Product'}</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

    </div>
  )
}

export default Dashboard