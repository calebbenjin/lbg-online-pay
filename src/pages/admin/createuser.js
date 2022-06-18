import { useState, useContext } from 'react'
import Link from 'next/link'
import Layout from '../../components/AdminLayout'
import { useForm } from 'react-hook-form'
import { Col, Row, Form } from 'react-bootstrap'
import { AuthContext } from '../../context/Authcontext'

const SignPage = () => {
  const { createUser, isLoading } = useContext(AuthContext)
  const [showAdmin, setShowAdmin] = useState(true)
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
    createUser(data)
  }

  return (
    <Layout>
      <main className='container display-container'>
        <div className='signup-container'>
          <div className='form'>
            <h3 className='signout-title'>Create an account. Its free!</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
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
                <Col lg='12'>
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
                <Col lg='12'>
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
