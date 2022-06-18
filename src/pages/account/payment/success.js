import { useState } from 'react'
import Layout from '../../../components/AccountLayout'
import Button from '../../../components/Button'
import Link from 'next/link'
import { AiFillCheckCircle } from 'react-icons/ai'
import { NavDropdown } from 'react-bootstrap'
import Image from 'next/image'
import userProfile from '../../../public/user.png'

const SuccessPage = () => {
  return (
    <div>
      <header className='account-header'>
        <div className='container'>
          <h6 className='logo'>My Account</h6>

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
              <Link href='/signin'>
                <a>Logout</a>
              </Link>
            </div>
          </NavDropdown>
        </div>
      </header>
      <main className='container adminMain'>
        <article>
          <section className='accSection'>
            <div className='row'>
              <div className='col-lg-6 mx-auto'>
                <div className='balanceCard'>
                  <div className='successCard'>
                    <AiFillCheckCircle className='successIcon' />
                    <h3>Transactions Successful</h3>
                    <Link href="/account">
                      <a>
                        <Button>Back Home</Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}

export default SuccessPage
