import { useState } from 'react'
import { Col, Container, Row, Form, Spinner } from 'react-bootstrap'
import Layout from '../../components/AdminLayout'
import { useForm, Controller } from 'react-hook-form'
import Button from '../../components/Button'
import { parseCookies } from '../../config/parseCookies'
import { API_URL, NEXT_URL } from '../../config/index'
import { dateFormater } from '../../helpers'
import TransferForm from '../../components/TransferForm'
import Image from 'next/image'

const UserDetails = ({ userId, user, token }) => {
  const [isLoading, setIsLoding] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      amount: user?.amount,
      referenceNum: user?.referenceNum,
      voulcherNum: user?.voulcherNum,
      taskCode: user.taskCode,
      email: user?.email,
      password: user?.password,
    },
  })

  console.log(user)

  const onSubmit = async (data) => {
    setIsLoding(true)
    try {
      const resUser = await fetch(`${API_URL}/users/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      setTimeout(() => {
        setIsSuccess(true)
        setIsLoding(false)
      }, 3000)

      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
      const resData = await resUser.json()
    } catch (error) {
      setIsSuccess(false)
      setIsLoding(false)
      console.log(`Error Message: ${error.message}`)
    }
  }

  return (
    <Layout>
      <h4>User Details</h4>
      <hr />
      <Image src={user.passport} alt="hello" width="100" height="100" />
      <Container fluid>
        <Row>
          <Col xl='6'>
            <div className='formContainer userForm'>
              <h5 className='mt-4'>Update User details</h5>
              <hr />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='firstname'>First name</label>
                      <Controller
                        name='firstname'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='lastname'>Last name</label>
                      <Controller
                        name='lastname'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='email'>Email Address</label>
                      <Controller
                        name='email'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='password'>password</label>
                      <Controller
                        name='password'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='refNum'>Reference Number</label>
                      <Controller
                        name='referenceNum'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='voulcherNum'>Voulcher Number</label>
                      <Controller
                        name='voulcherNum'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='taskCode'>VAT Code</label>
                      <Controller
                        name='taskCode'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    {/* <div className='formControl'>
                      <label htmlFor='amount'>Amount</label>
                      <Controller
                        name='amount'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div> */}
                  </Col>
                </Row>
                {isSuccess ? <div className='successAlert'>Updated</div> : null}
                <div className='buttonContainer'>
                  <button className='paymentBtn'>
                    {' '}
                    {isLoading ? (
                      <>
                        <Spinner
                          as='span'
                          animation='grow'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />{' '}
                        Saving....
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                  {/* <button className='deletebtn' onClick={handleDelete}>
                    Delete user
                  </button> */}
                </div>
              </form>
            </div>
          </Col>
          <Col xl='6'>
            <TransferForm userId={userId} user={user} token={token} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({ req, query: { id } }) {
  const { token } = parseCookies(req)

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const resUser = await fetch(`${API_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user = await resUser.json()

  return {
    props: {
      user: user,
      token: token,
      userId: id,
    },
  }
}

export default UserDetails
