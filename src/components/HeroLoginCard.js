import Link from 'next/link'
import React from 'react'
import { Button } from 'react-bootstrap'
import { AiFillLock } from 'react-icons/ai'

const HeroLoginCard = () => {
  return (
    <div className="heroLoginCard">
      <p className="logTitle"><AiFillLock className="icon" /> Log on to Internet Banking</p>
      
      <div className="btnContainer">
        <div className="row">
          <div className="col-md-6">
            <Link href="/login">
              <button className="btnLight">Login</button>
            </Link>
          </div>
          <div className="col-md-6">
            <Link href="/register">
              <button className="btnDark">Register</button>
            </Link>
          </div>
        </div>
      </div>
      <p className="notice">See how much you could borrow with a loan</p>
      <p className="notice">Check your credit card eligibility</p>
      <p className="notice">Take a look at our 10 year fixed rate mortgages</p>
    </div>
  )
}

export default HeroLoginCard