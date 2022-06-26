import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col lg={4}>
            <h5>Banking with us</h5>
            <div>
              <li>Internet Banking</li>
              <li>Mobile Banking</li>
              <li>Security</li>
              <li>Rates & Charges</li>
              <li>Glossary</li>
              <li>Service status</li>
            </div>
          </Col>
          <Col lg={4}>
            <h5>About us</h5>
            <div>
              <li>About LBG Bank</li>
              <li>Communities</li>
              <li>Lloyds Banking Group</li>
              <li>Careers</li>
              <li>Internet Banking</li>
              <li>Internet Banking</li>
            </div>
          </Col>
          <Col lg={4}>
            <h5>Products and services</h5>
            <div>
              <li>Current accounts</li>
              <li>Credit cards</li>
              <li>Savings</li>
              <li>Investing</li>
              <li>Retirement</li>
              <li>Mortgages</li>
              <li>Loans</li>
              <li>Car finance</li>
              <li>Insurance</li>
              <li>Travel services</li>
              <li>Sending money outside the UK</li>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="footer">
        <p>
          Legal Privacy Terms and conditions Cookies Accessibility and
          disability Sitemap Modern Slavery Statement (PDF, 4.6MB) opens in a
          new tab{' '}
        </p>
      </div>
    </footer>
  )
}

export default Footer
