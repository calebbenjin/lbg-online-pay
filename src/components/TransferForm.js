import { useState } from 'react'
import { Col, Row,  Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { API_URL } from '../config/index'

const TransferForm = ({ user, userId, token }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const currentAmount = user.amount + Number(data.amount)

    setIsLoading(true)
    
    // console.log(isSuccessful, 'Transfering...')
        const response = await fetch(`${API_URL}/users/${user?._id}/amount`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: currentAmount,
          }),
        })
        const { amount, accountNumber, bankName, accountName, narration } = data
        if (response.ok) {
          const res = await fetch(
            `${API_URL}/users/${user?._id}/transactions`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                amount,
                type: true,
                bankName,
                accountNumber,
                accountName,
                narration,
              }),
            }
          )
          if (res.ok) {
            setIsSuccess(true)
            setIsLoading(false)
          } else {
            console.log('error')
            setIsLoading(false)
          }
        }


    // const resUpdate = await fetch(`${API_URL}/users/${user._id}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({amount}),
    // })

    // if (resUpdate.ok) {
    //   const {amount, accountNumber, bankName, accountName, narration} = data
    //   const res = await fetch(`${API_URL}/users/${user?._id}/transactions`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({
    //       amount, 
    //       type: true,
    //       bankName,
    //       accountNumber,
    //       accountName,
    //       narration
    //     }),
    //   })

    //   const resData = await res.json()

    //   if (res.ok) {
    //     setTimeout(() => {
    //       setIsLoading(false)
    //     }, 3000)
    //   } else {
    //     console.log('error')
    //     setIsLoading(false)
    //   }
    // } else {
    //   console.log('Error...')
    // }
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
        {isSuccess ? <div className='successAlert'>Updated</div> : null}
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
                Funding...
              </>
            ) : (
              'Fund Account'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TransferForm
