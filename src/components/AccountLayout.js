import { useContext } from 'react'
import { NavDropdown } from 'react-bootstrap'
import Image from 'next/image'
import userProfile from '../public/user.png'
import Sidebar from './Sidebar'
import { AuthContext } from '../context/Authcontext'
import Logo from './Logo'
import TradingWiget from './TradingWiget'

const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext)

  return (
    <div className="layoutContainer">
      <header className='account-header'>
        <div className='container'>
          <Logo />

          <NavDropdown
            title={
              <Image
                src={userProfile}
                alt='user profile'
                width='50'
                height='50'
                className='profile'
              />
            }
            id='basic-nav-dropdown'
          >
            <div className='container'>
              <div onClick={() => logout()}>
                Logout
              </div>
            </div>
          </NavDropdown>
        </div>
      </header>
      <TradingWiget />
      <main className='adminMain'>
        <Sidebar />  
        <article className="mainContainer">
          {children}
        </article>
      </main>
    </div>
  )
}

export default Layout
