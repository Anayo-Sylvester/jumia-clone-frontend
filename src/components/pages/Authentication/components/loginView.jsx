import React, { useState } from 'react'
import Info from './Info'
import Form from './Form'
import Footer from './Footer'
import Toast from '../../../Layouts/Toast'

const LoginView = ({ action, setIsLoggedIn }) => {

  const [isToastVisible, setIsToastVisible] = useState(false)
  const [ToastData, setToastData] = useState({
    success: false,
    message: ''
  });
  return (
    <div className="h-screen text-center">
      <div className="flex flex-col justify-between pt-6 pb-8 mx-auto max-w-[391px] h-screen">
        <div className="mb-3">
          <Info />
          <Form setIsLoggedIn={setIsLoggedIn} setIsToastVisible={setIsToastVisible} setToastData={setToastData} param ={action} />
        </div>
        <Footer />
        <Toast success={ToastData.success} message={ToastData.message} isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible} />
      </div>
    </div>
  )
}

export default LoginView