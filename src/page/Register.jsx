import { Modal, Button, Form, Input, message } from "antd";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = ({ openReg, setOpenReg }) => {

  //for modal functions
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
       setOpenReg(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpenReg(false);
    form.resetFields();
    setEmailError("");
    setPasswordError("");
    form.resetFields()
  };

  //for form functions
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (values) => {
    const { email, password, fname, lname } = values
    let hasError = false

    setEmailError('');
    setPasswordError('');

    if (!email || !email.includes("@")) {
      setEmailError('Please enter a valid email address')
      hasError = true
    }

    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      hasError = true
    }
    if (!hasError) {
      console.log('Form submitted', values);

      const userData = {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password,
      };

      // Save to localStorage
      const existingUsers = JSON.parse(localStorage.getItem("user")) || [];

      const alreadyExists = existingUsers.find(
        (user) => user.email.trim().toLowerCase() === email.trim().toLowerCase()
      );
      if (alreadyExists) {
        setEmailError("User with this email already exists.");
        return;
      }

      existingUsers.push(userData);
      localStorage.setItem("user", JSON.stringify(existingUsers));

      setLoading(true);

      setTimeout(() => {
        form.resetFields();
        setLoading(false);
        setOpenReg(false); // Close register modal


        messageApi.open({
          type: "success",
          content: "Registration successful, kindly click on login ",
        });
      }, 10000);
    }
  }

  return (
    <div>
{contextHolder}
      <Modal
        // onClick={showModal}
        open={openReg}
        title="Register"
        onOk={handleOk}
        onCancel={handleCancel}
        width={450}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <div className='flex justify-between mt-6 gap-4'>
            <Button href="https://google.com" className="!text-gray-500 !text-sm"> <FcGoogle /> Register with Google</Button>
            <Button className="!text-gray-500 !text-sm" > <FaFacebookSquare /> Register with Facebook</Button>
          </div>

          <div className="flex items-center mt-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div>
            <p className='text-xs text-gray-700 mt-6'>First name</p>
            <Form.Item name="fname">
              <Input placeholder="First name" className='border-b !border-gray-200 mt-4 w-100'></Input>
            </Form.Item>

            <p className='text-xs text-gray-700 mt-6'>Last name</p>
            <Form.Item name="lname">
              <Input placeholder="Last name" className='border-b !border-gray-200 mt-4 w-100'></Input>
            </Form.Item>

            <p className='text-xs text-gray-700 mt-6'>Email address</p>
            <Form.Item name="email">
              <Input placeholder="Email Address" className='border-b !border-gray-200 mt-4 w-100'></Input>
            </Form.Item>
            {emailError && <p className="text-red-600">{emailError}</p>}

            <p className='text-xs text-gray-700 mt-6'>Password</p> <Form.Item name="password">
              <Input type="password" placeholder="Password" className='border-b !border-gray-200 mt-4 w-100'></Input>
            </Form.Item>

            <p className='-mt-6 text-xs  text-gray-500 flex justify-self-start'>At least 8 characters and 1 special character or number</p>
            {passwordError && <p className="text-red-600">{passwordError}</p>}

            <p className='text-xs  text-gray-500 flex justify-self-start mt-6'>Code</p>

            <div className="flex gap-8">
              <Form.Item name="country">
                <Input placeholder="ZA(+27)" className='border-b !border-gray-200 mt-4 w-20'></Input>
              </Form.Item>

              <Form.Item name="number">
                <Input placeholder="Mobile Number" className='border-b !border-gray-200 mt-4 w-70'></Input>
              </Form.Item>
            </div>

            <p className='text-xs  text-gray-500 flex justify-self-start'>A One-Time PIN will be sent via SMS to verify this number</p>

            <div className="mt-8">
              <span className="text-sm gap-6"> <input type="checkbox" /> I want to receive offers and wish list newsletters</span>
            </div>

            <div>
              <Button htmlType="submit" className='mt-6 !rounded-none w-100 !bg-[#0b79bf]' type='primary' loading={loading} >Continue</Button>
            </div>

            <p className='text-xs  text-gray-500 flex items-center content-center'>By clicking on 'Continue', you agree to our Terms and Conditions and confirm that you are over 18 years of age</p>

          </div>
        </Form>
      </Modal>
    </div>

  )
}

export default Register