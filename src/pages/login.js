import { useState, useContext } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { AuthContext } from '../context/Authcontext'
import { useForm } from 'react-hook-form'

const LoginPage = () => {
  const {login, isLoading, isError} = useContext(AuthContext)
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
    login(data)
  }

  return (
    <Layout>
      <main className='display-container'>
        <div className='form-container'>
          <div className='form'>
            <h3>Welcome to Internet Banking</h3>
            {isError ? <div className="errorBadge">Incorrect User ID: or password</div> : null}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='input-group'>
                <label htmlFor='email'>User ID:</label>
                <input type='email' {...register('email', { required: true })} placeholder='Your User ID:' />
                {errors.email && <span>User ID: field is required</span>}
              </div>
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
                {errors.email && <span>Email field is required</span>}
              </div>
              <button className='login-btn'>{isLoading ? 'Loading...' : 'Login'}</button>
              <p>
                <a className='forgetPassword' href='#'>
                  Forget password?
                </a>
              </p>
            </form>
            <div className='signup'>
              <p>If you don&apos;t already use Internet Banking, it&apos;s simple to</p>

              <Link href='/register' passHref>
                <a className='btn-signup'>Register online</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default LoginPage
