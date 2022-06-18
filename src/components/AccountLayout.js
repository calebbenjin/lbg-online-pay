import { useContext } from 'react'
import { NavDropdown } from 'react-bootstrap'
import Image from 'next/image'
import userProfile from '../public/user.png'
import Sidebar from './Sidebar'
import { AuthContext } from '../context/Authcontext'

const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext)

  return (
    <>
      <header className='account-header'>
        <div className='container'>
          <h4 className='logo'>Wdremit</h4>

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
      <main className='container adminMain'>
      <Sidebar />  
      <article>
        {children}
      </article>
      </main>
    </>
  )
}

export default Layout
