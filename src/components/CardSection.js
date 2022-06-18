import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsQuestionCircle } from 'react-icons/bs'
import Image from 'next/image'
import mastercard from '../public/mastercard.svg'
import visacard from '../public/visa.svg'
import maestrocard from '../public/maestro.svg'
import paycard from '../public/pay.svg'

const CardSection = () => {
  return (
    <section className="card-section">
      <Container>
        <div className="titleContainer">
          <h1 className="title">Our services</h1>
        </div>
        <Row>
          <Col lg={4}>
            <div className="card">
              <h4 className="card-title">Foreign Exchange services</h4>
              <p>We won&apos;t charge you for making international transfers and our commission-free Foreign Exchange services can help you manage currency fluctuation.</p>
              <small><BsQuestionCircle className="icon" /> <a href="#"> Foreign Exchange services</a></small>
            </div>
          </Col>
          <Col lg={4}>
            <div className="card">
              <h4 className="card-title">Your tax</h4>
              <p>When moving country you need to be aware of your tax liabilities. We have a service for our customers who require specific advice and we can arrange an initial review or assistance with tax filings from specialist Ernst & Young LLP. Preferential rates apply.</p>
              <small><BsQuestionCircle className="icon" /> <a href="#"> Find out more</a></small>
            </div>
          </Col>
          <Col lg={4}>
            <div className="card">
              <h4 className="card-title">Access to your money</h4>
              <p>Choose an account that is easy to access and manage from anywhere whether for checking balances or making payments.</p>
              <small><BsQuestionCircle className="icon" /> <a href="#"> learn more</a></small>
            </div>
          </Col>
        </Row>
      </Container>      
    </section>
  )
}

export default CardSection
