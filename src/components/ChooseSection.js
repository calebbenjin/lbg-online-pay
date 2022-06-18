import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import clockIcon from '../public/img/gherkin-for-lunch-desktop.jpg'
import valueIcon from '../public/img/cta-expatriate-guidance-desktop.jpg'
import safeIcon from '../public/img/wood-ghosts-desktop.jpg'

const ChooseSection = () => {
  return (
    <section className="chooseSection">
      <div className="container">
        <h1 className="section-title">Internet Banking at your fingertips</h1>
        <p className="subtitle">Managing your money through Internet Banking is quick and secure - and it only take a few simple steps to register. You can do things like pay people, check your balance and manage bills, standing orders and direct debits.</p>
        <Row>
          <Col lg="4">
            <div className="cards">
              <Image src={clockIcon} alt="icon" width="300" height="200" />
              <h3>International Current Accounts</h3>
              <p>Our banking accounts give you a great range of features for your daily needs at all stages of your life.</p>
            </div>
          </Col>
          <Col lg="4">
            <div className="cards">
              <Image src={safeIcon} alt="icon" width="300" height="200" />
              <h3>We&lsquo;re Safe</h3>
              <p>We use industry-leading technology to protect your money.</p>
            </div>
          </Col>
          <Col lg="4">
            <div className="cards">
              <Image src={valueIcon} alt="icon" width="300" height="200" />
              <h3>We&lsquo;re Low-Cost</h3>
              <p>We offer better exchange rates and lower fees than most conventional banks and money transfer services.</p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default ChooseSection