import { useState, useEffect } from 'react'
import { Col, Row,  Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { API_URL } from '../config/index'
import { formatToCurrency } from '../helpers'
import { useRouter } from 'next/router'

const TransferForm = ({ userId, token }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({})
  const [user, setUser] = useState({})
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // console.log(user)

  useEffect(() => fastRefresh(), [formData])

  const fastRefresh = async () => {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    setUser(data)
  }

  const handleAmount = async (data) => {
    setIsLoading(true)
    setFormData(data)

      console.log(user)

      const response = await fetch(`${API_URL}/users/${user?._id}/amount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: user.amount + Number(data.amount)
        }),
      })
      const { amount, accountNumber, bankName, accountName, narration } = data

      if (data.amount) {
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
          router.reload()
          setIsLoading(false)
        } else {
          console.log('error')
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
        console.log(" Error")
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
      <h4 className="mb-4">Current Balance: <b>{user?.currency}{formatToCurrency(Number(user?.amount))}</b></h4>
      <form onSubmit={handleSubmit(handleAmount)}>
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
