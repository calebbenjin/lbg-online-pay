import { useState, useContext } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import Link from 'next/link'
import { AuthContext } from '../context/Authcontext'

const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext)
  
  return (
    <>
      <header className="admin-header">
        <Navbar collapseOnSelect expand='lg' bg="dark" variant='dark'>
          <Container>
            <Link href='/'>
              <Navbar.Brand>
                <h6 className="admin-logo">Admin Dashboard</h6>
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'></Nav>
              <Nav>
              <Link href='/admin/'>
                  <a>Home</a>
                </Link>
                <Link href='/admin/message'>
                  <a>Messages</a>
                </Link>
                <Link href="#">
                  <a onClick={() => logout()}>Logout</a>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main className="container pt-4">
        {children}
      </main>
    </>
  )
}

export default Layout
