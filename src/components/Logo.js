import Image from 'next/image'
import React from 'react'
import logo from '../public/img/logo.jpeg'

const Logo = () => {
  return (
    <div className="logo">
      <Image src={logo} alt="Logo" width="50" height="50" />
      <h4>LLG-OnlinePay</h4>
    </div>
  )
}

export default Logo
