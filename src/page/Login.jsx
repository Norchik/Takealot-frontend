import { Modal, Button, message, Input } from "antd";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Login = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // const handleOk = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setOpen(false);
  //   }, 3000);
  // };

  const handleCancel = () => {
    setOpen(false);
    setEmail("");
  setPassword("");
  };


  const onFinish = async (e) => {
    e.preventDefault()
  //   if (!email.trim() || !password.trim()) {
  //   messageApi.open({
  //     type: "warning",
  //     content: "Please enter both email and password.",
  //   });
  //   return;
  // }
    setLoading(true);

    try {
      const storedUser = JSON.parse(localStorage.getItem("user")) || [];

      const foundUser = storedUser.find(user =>
        user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
      );

      if
        (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
              messageApi.open({
          type: "success",
          content: "Login successful",
        })
        setOpen(false);
        navigate('/dashboard')

      } else {
        messageApi.open({
          type: "error",
          content: "Invalid login details"
        })
        console.log("Invalid login details");
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Login failed. Please try again"
      })
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div>
      {contextHolder}
      <Modal
        // onClick={showModal}
        open={open}
        title="Login"
        // onOk={handleOk}
        onCancel={handleCancel}
        width={400}
        footer={null}
      >
        <div>
          <form onSubmit={onFinish}>
            <p className='text-xs text-gray-700'>Email Address</p>
            <Input type="email" placeholder='Email address' className='border-b !border-gray-200 mt-4 w-87'
              value={email} onChange={(e) => setEmail(e.target.value)}></Input>
            <p className='text-xs text-sky-500 flex justify-self-end mt-6'>Forgot Password?</p>

            <p className='text-xs text-gray-700'>Password</p>
            <Input type="password" placeholder='Password' className='border-b !border-gray-200 mt-4 w-87'
              value={password} onChange={(e) => setPassword(e.target.value)}></Input>

            <div>
              <Button className='mt-4 !rounded-none w-87 !bg-[#0b79bf]' type='primary' htmlType="submit" loading={loading}  >Login</Button>
            </div>
          </form>

          <div className="flex items-center mt-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className='flex justify-between mt-4'>
            <Button href="https://google.com"> <FcGoogle /> Login with Google</Button>
            <Button > <FaFacebookSquare /> Login with Facebook</Button>
          </div>

          <div className="flex-1 h-px bg-gray-300 mt-6"></div>

          <div className='flex justify-center gap-2'>
            <p className='text-gray-700 text-sm'>New to Takealot?</p>
            <p className='text-sky-500 text-sm'>Register</p>
          </div>

        </div>

      </Modal>
    </div>
  )
}

export default Login