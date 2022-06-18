import { useState, useContext } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import { Col, Row, Form, Select } from 'react-bootstrap'
import { AuthContext } from '../context/Authcontext'

let randomNum = ''
const SignPage = () => {
  const { signup, isLoading } = useContext(AuthContext)
  const [showAdmin, setShowAdmin] = useState(true)
  const [accountNumber, setAccountNumber] = useState(
    (randomNum += Math.round(Math.random() * 9) + 2779864789)
  )
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data) => {
    signup(data)
  }

  const handleShowAdmin = () => {
    setShowAdmin(!showAdmin)
  }

  console.log(accountNumber)

  return (
    <Layout>
      <main className='container display-container'>
        <div className='signup-container'>
          <div className='form'>
            <h2 className='signout-title'>Savings Account Application Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg={6}>
                  <div className='input-group'>
                    <label htmlFor='lastname'>Title</label>
                    <select>
                      <option>Select Title</option>
                      <option value='1'>Mr</option>
                      <option value='2'>Mrs</option>
                      <option value='3'>Ms</option>
                      <option value='3'>Miss</option>
                      <option value='3'>Dr</option>
                    </select>
                  </div>
                </Col>
                <Col lg='6'>
                  <div className='input-group'>
                    <label htmlFor='text'>First name</label>
                    <input
                      type='text'
                      {...register('firstname', { required: true })}
                      placeholder='Your firstname'
                    />
                    {errors.firstname && <span>This field is required</span>}
                  </div>
                </Col>
                <Col lg='6'>
                  <div className='input-group'>
                    <label htmlFor='lastname'>Last name</label>
                    <input
                      type='text'
                      {...register('lastname', { required: true })}
                      placeholder='Your Last name'
                    />
                    {errors.lastname && <span>This field is required</span>}
                  </div>
                </Col>
                {/* <Col lg='6'>
                  <div className='input-group'>
                    <label htmlFor='accountNum'>Account Number</label>
                    <input
                      type='text'
                      {...register('accountNum', { required: true })}
                      placeholder='Your Account Number'
                    />
                    {errors.accountNum && <span>This field is required</span>}
                  </div>
                </Col>
                <Col lg='6'>
                  <div className='input-group'>
                    <label htmlFor='accountName'>Account Name</label>
                    <input
                      type='text'
                      {...register('accountName', { required: true })}
                      placeholder='Your Account Name'
                    />
                    {errors.accountNum && <span>This field is required</span>}
                  </div>
                </Col> */}
                <Col lg='6'>
                  <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <div className='password'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { required: true })}
                        placeholder='Your password'
                      />
                      <span onClick={handleShowPassword}>show</span>
                    </div>
                    {errors.password && <span>This field is required</span>}
                  </div>
                </Col>
                <p className="showBtn" onClick={handleShowAdmin}>{showAdmin ? 'Next' : 'Previous'}</p>
                <div className={showAdmin ? 'hideForm' : "showContainer"}>
                  <Row>
                    <Col xl='6'>
                      <div className='formControl'>
                        <label htmlFor='email'>Currency</label>
                        <select {...register('currency')}>
                          <option value='ZAR'>ZAR</option>
                          <option value='NGN'>NGN</option>
                          <option value='Pula'>Pula</option>
                          <option value='NAD'>NAD</option>
                          <option value='N$'>ZMW</option>
                          <option value='N$'>SZL</option>
                          <option value='N$'>LSL</option>
                        </select>
                      </div>
                    </Col>
                    {/* <Col xl='6'>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      >
                        <Form.Check
                          type='checkbox'
                          {...register('isPaid')}
                          label='Local Agent Charge'
                        />
                      </Form.Group>
                    </Col> */}
                  </Row>
                </div>
              </Row>

              <p className='sub_title'>Contact details</p>
              <Row>
                <Col lg='6'>
                  <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      {...register('email', { required: true })}
                      placeholder='Your email address'
                    />
                    {errors.email && <span>This field is required</span>}
                  </div>
                </Col>
                <Col lg='6'>
                  <div className='input-group'>
                    <label htmlFor='phone'>Cell Phone</label>
                    <input
                      type='phone'
                      {...register('phone', { required: true })}
                      placeholder='Your Cell Number'
                    />
                    {errors.phone && <span>This field is required</span>}
                  </div>
                </Col>
              </Row>

              <p className='sub_title'>Identification</p>
              <Row>
                <Col lg='6'>
                  <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      {...register('email', { required: true })}
                      placeholder='Your email address'
                    />
                    {errors.email && <span>This field is required</span>}
                  </div>
                </Col>
                <Col lg='6'>
                  <div className='input-group'>
                    <label htmlFor='phone'>Cell Phone</label>
                    <input
                      type='phone'
                      {...register('phone', { required: true })}
                      placeholder='Your Cell Number'
                    />
                    {errors.phone && <span>This field is required</span>}
                  </div>
                </Col>
              </Row>

              <button className='login-btn'>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default SignPage
