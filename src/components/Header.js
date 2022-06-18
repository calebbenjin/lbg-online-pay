import { useState } from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo2.svg'
import { AiFillLock } from 'react-icons/ai'
import { RiMapPinLine } from 'react-icons/ri'
import { FaQuestion } from 'react-icons/fa'
import { IoMdMenu } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import TopHeader from './TopHeader'
import Logo from './Logo'

const Header = () => {
  const [showNav, setShowNav] = useState(false)

  const handleShowNav = () => {
    setShowNav(!showNav)
  }

  return (
    <header className='main-header'>
      <TopHeader />
      <div className='header'>
        <div className='container'>
          <Logo />

          <div className={showNav ? 'Sidenav showNav' : 'Sidenav closeNav'}>
            <IoClose className='closeBtn' onClick={handleShowNav} />
            <li>
              <Link href='/' passHref>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/login' passHref>
                <a>Internet banking</a>
              </Link>
            </li>
            <li>
              <Link href='/login' passHref>
                <a>About us</a>
              </Link>
            </li>
            <li>
              <Link href='/login' passHref>
                <a>Contact us</a>
              </Link>
            </li>
            <li className="btnNav">
              <Link href='/login'>
                <button className='btnLight'>Login</button>
              </Link>
            </li>
          </div>

          <IoMdMenu className='menuToggle' onClick={handleShowNav} />
        </div>
      </div>
    </header>
  )
}

export default Header
