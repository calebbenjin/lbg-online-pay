import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import phoneImage from '../public/phones.png'
import appStore from '../public/app-store.svg'
import playStore from '../public/play-store.svg'
import { IoWalletSharp } from 'react-icons/io5'
import { AiFillCaretRight } from 'react-icons/ai'
import Link from 'next/link'

const MobileSection = () => {
  return (
    <div className='mobile-section'>
      <Container>
        <Row>
          <Col lg={4}>
            <div className="card">
              <div className="cardHead">
                <IoWalletSharp className="icon" />
                <h5>Products and services</h5>
              </div>
              <ul className="cardList">
                <Link href="/login">
                  <a>
                    <li>
                      <p>Business accounts</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Accounting software</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Savings</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Loans</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Credit and Charge cards</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Invoice Finance</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Asset Finance</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
              </ul>
            </div>
          </Col>

          <Col lg={4}>
            <div className="card">
              <div className="cardHead">
                <IoWalletSharp className="icon" />
                <h5>Banking with us</h5>
              </div>
              <ul className="cardList">
                <Link href="/login">
                  <a>
                    <li>
                      <p>Banking online</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Register for Online for Business</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Commercial Banking Online</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Mobile banking</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Sector services and support</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Make a payment online</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Accepting card payments</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
              </ul>
            </div>
          </Col>

          <Col lg={4}>
            <div className="card">
              <div className="cardHead">
                <IoWalletSharp className="icon" />
                <h5>Help and support</h5>
              </div>
              <ul className="cardList">
                <Link href="/login">
                  <a>
                    <li>
                      <p>Business accounts</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Accounting software</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Savings</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Loans</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Credit and Charge cards</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Invoice Finance</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li>
                      <p>Asset Finance</p>
                      <AiFillCaretRight className="icon" />
                    </li>
                  </a>
                </Link>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MobileSection
