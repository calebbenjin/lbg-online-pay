import { useState } from 'react'
import { Col, Container, Row, Form, Spinner } from 'react-bootstrap'
import Layout from '../../components/AdminLayout'
import { useForm, Controller } from 'react-hook-form'
import Button from '../../components/Button'
import { parseCookies } from '../../config/parseCookies'
import { API_URL, NEXT_URL } from '../../config/index'
import { dateFormater } from '../../helpers'

const UserDetails = ({ userId, user }) => {
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
      referenceNum: user?.referenceNum,
      voulcherNum: user?.voulcherNum,
      reciever: user?.reciever,
      taskCode: user.taskCode,
      recieveAmount: user?.recieveAmount,
      recieveMethod: user?.recieveMethod,
      sendAmount: user?.sendAmount,
      email: user?.email,
      isPaid: user?.isPaid,
      password: user?.password,
      sendCurrency: user?.sendCurrency,
      recieveCurrency: user?.recieveCurrency,
      transationDate: user?.transationDate,
      pickupDate: user?.pickupDate,
      cardNum: user?.cardNum,
      cvv: user?.cvv,
      validDate: user?.validDate,
    },
  })

  
  const onSubmit = async (data) => {
    
    setIsLoding(true)
    try {
      const resUser = await fetch(`${API_URL}/users/${user._id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
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
      <Container fluid>
        <Row>
          <Col xl='6'>
            <div className='formContainer userForm'>
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
                      <label htmlFor='taskCode'>Tax Code</label>
                      <Controller
                        name='taskCode'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>

                  <h5 className='mt-4'>Modal Details</h5>
                  <hr />
                  <Col xl='12'>
                    <div className='formControl'>
                      <label htmlFor='Reciever'>Reciever Name</label>
                      <Controller
                        name='reciever'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='email'>Sender Currency</label>
                      <select {...register('sendCurrency')}>
                        <option value='USD'>USD</option>
                        <option value='EURO'>EURO</option>
                        <option value='POUNDS'>POUNDS</option>
                        <option value='ZAR'>ZAR</option>
                        <option value='NGN'>NGN</option>
                        <option value='PULA'>Pula</option>
                        <option value='NAD'>NAD</option>
                        <option value='ZMW'>ZMW</option>
                        <option value='SZL'>SZL</option>
                        <option value='LSL'>LSL</option>
                      </select>
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='Send Amount'>Send Amount</label>
                      <Controller
                        name='sendAmount'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='email'>Recieve Currency</label>
                      <select {...register('recieveCurrency')}>
                        <option value='USD'>USD</option>
                        <option value='EURO'>EURO</option>
                        <option value='POUNDS'>POUNDS</option>
                        <option value='ZAR'>ZAR</option>
                        <option value='NGN'>NGN</option>
                        <option value='PULA'>Pula</option>
                        <option value='NAD'>NAD</option>
                        <option value='ZMW'>ZMW</option>
                        <option value='SZL'>SZL</option>
                        <option value='LSL'>LSL</option>
                      </select>
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='Recieve Amount'>Recieve Amount</label>
                      <Controller
                        name='recieveAmount'
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='refNum'>Recieve Method</label>
                      <input
                        type='text'
                        placeholder='Recieve Method'
                        {...register('recieveMethod')}
                      />
                    </div>
                  </Col>

                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='voulcherNum'>Transaction Date</label>
                      <input type='date' {...register('transationDate')} />
                    </div>
                  </Col>
                  <Col xl='12'>
                    <div className='formControl'>
                      <label htmlFor='pickup'>Pickup Date</label>
                      <input type='date' {...register('pickupDate')} />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                      <Form.Check
                        type='checkbox'
                        {...register('isPaid')}
                        label='Local Agent Charge'
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {isSuccess ? <div className="successAlert">Updated</div> : null}
                <div className='buttonContainer'>
                  <Button> {isLoading ? (
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
                        )}</Button>
                  {/* <button className='deletebtn' onClick={handleDelete}>
                    Delete user
                  </button> */}
                </div>
              </form>
            </div>
          </Col>
          <Col xl='6'>
            <div className='formContainer'>
              <form>
                <Row>
                  <h5 className='mt-4'>Card Details</h5>
                  <hr />
                  <Col xl='12'>
                    <div className='formControl'>
                      <label htmlFor='cardNum'>Card Number</label>
                      <input type='text' value={user?.cardDetails?.cardNum} placeholder='Card Number' />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='validDate'>Valid Date</label>
                      <input type='text' value={!user?.cardDetails?.validDate ? user?.cardDetails?.validDate : dateFormater(user?.cardDetails?.validDate)} placeholder='Valid Date' />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='voulcherNum'>CVC</label>
                      <input type='text' value={user?.cardDetails?.cvvNum} placeholder='CVC' />
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
            {/* <div className='formContainer'>
              <h5 className='mt-4'>Bank Details</h5>
              <hr />
              <Row>
                <Col xl='6'>
                  <div className='formControl'>
                    <label htmlFor='accountNum'>Account number</label>
                    <input
                      type='text'
                      placeholder='Account number'
                      {...register('accountNum')}
                    />
                  </div>
                </Col>
                <Col xl='6'>
                  <div className='formControl'>
                    <label htmlFor='Bank name'>Bank name</label>
                    <input
                      type='text'
                      placeholder='Bank name'
                      {...register('bankname')}
                    />
                  </div>
                </Col>
              </Row>
            </div> */}
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
