import { useState } from 'react'
import { Col, Container, Row, Form, Spinner } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import Button from './Button'
import { parseCookies } from '../config/parseCookies'
import { API_URL, NEXT_URL } from '../config/index'
import { dateFormater } from '../helpers'

const TransferForm = ({ user, userId, token }) => {
  const [isLoading, setIsLoding] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log(userId)

  const onSubmit = async (data) => {
    setIsLoding(true)
    try {
      const resUser = await fetch(`${API_URL}/users/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      if (resUser.ok) {
        console.log(resData)
      }
    } catch (error) {
      setIsSuccess(false)
      setIsLoding(false)
      console.log(`Error Message: ${error.message}`)
    }
  }

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5 className='mt-4'>Fund User Account</h5>
        <hr />
        <Row>
          <Col xl='6'>
            <div className='formControl'>
              <label htmlFor='accountNum'>Beneficiary Account Name</label>
              <input
                type='text'
                placeholder='Account Name'
                {...register('accountName', { required: true })}
              />
              {errors.accountName && <small>Account Name is required</small>}
            </div>
          </Col>
          <Col xl='6'>
            <div className='formControl'>
              <label htmlFor='accountNum'>Beneficiary Account Number</label>
              <input
                type='text'
                placeholder='Account Number'
                {...register('accountNumber', { required: true })}
              />
              {errors.accountNumber && (
                <small>Account Number is required</small>
              )}
            </div>
          </Col>
          <Col xl='12'>
            <div className='formControl'>
              <label htmlFor='narration'>NARRATION</label>
              <input
                type='text'
                placeholder='Narration'
                {...register('narration', { required: true })}
              />
              {errors.narration && <small>Narration is required</small>}
            </div>
          </Col>
          <Col xl='6'>
            <div className='formControl'>
              <label htmlFor='Bank name'>Bank name</label>
              <input
                type='text'
                placeholder='Bank Name'
                {...register('bankName', { required: true })}
              />
              {errors.bankName && <small>Bank Name is required</small>}
            </div>
          </Col>
          <Col xl='6'>
            <div className='formControl'>
              <label htmlFor='accountNum'>AMOUNT</label>
              <input
                type='text'
                placeholder='Amount'
                {...register('amount', { required: true })}
              />
              {errors.amount && <small>Amount is required</small>}
            </div>
          </Col>
        </Row>
        <div className='formBtn'>
          <button className='paymentBtn'>
            {isLoading ? (
              <>
                <Spinner
                  as='span'
                  animation='grow'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />{' '}
                Sending...
              </>
            ) : (
              'Creadit Account'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TransferForm
