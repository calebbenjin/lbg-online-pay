import React from 'react'
import Image from 'next/image'
import logo from '../public/img/logo.jpeg'

const Loader = () => {
  return (
    <div className="loaderContainer">
      <div className="containerLoader">
        <div className="imgContainer">
          <Image src={logo} alt="logo" height="150" width="150" />
        </div>
        <div className="loader"></div>
      </div>
    </div>
  )
}

export default Loader
