import React from 'react'
import { AiFillLock } from 'react-icons/ai'
import { RiMapPinLine } from 'react-icons/ri'
import { FaQuestion } from 'react-icons/fa'
import Link from 'next/link'

const TopHeader = () => {
  return (
    <div className='topHeader'>
      <div className='container'>
        <nav>
          <button className='btnActive'>Personal</button>
          <button>Business</button>
          <button>Private Banking</button>
          <button>International Banking</button>
        </nav>
        <nav>
          <a>
            <div>
              <FaQuestion className='icon' />
            </div>
            <small>Help & support</small>
          </a>
          <a>
            <div>
              <RiMapPinLine className='icon' />
            </div>
            <small>Branch finder</small>
          </a>
          <Link href="/login">
            <a className='loginIcon'>
              <div>
                <AiFillLock className='icon' />
              </div>
              <small>Login</small>
            </a>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default TopHeader
