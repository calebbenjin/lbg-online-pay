import { useState } from 'react'
import Layout from '../../../components/AccountLayout'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import Button from '../../../components/Button'
import TaskCodeModal from '../../../components/TaskCodeModal'
import { parseCookies } from '../../../config/parseCookies'
import { API_URL } from '../../../config/index'
import { formatToCurrency } from '../../../helpers'
import { IoWalletSharp } from 'react-icons/io5'
import Link from 'next/link'

const SupportPage = ({ user, token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoding] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // console.log(user)

  const onSubmit = async (data) => {
    setIsLoding(true)
    if (user.amount < data.amount || user.amount === undefined) {
      setIsLoding(false)
      setIsAlert(true)
      console.log('Insuficent Balance!!!')
    } else {
      const res = await fetch(`${API_URL}/users/${user?._id}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      const resData = await res.json()

      if (res.ok) {
        setShowModal(false)
        setTimeout(() => {
          setShowModal(true)
          setIsLoding(false)
        }, 3000)
      } else {
        console.log('error')
        setIsLoding(false)
      }
    }
  }

  return (
    <Layout>
      <TaskCodeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={user}
      />

      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-7 mx-auto'>
            <div className='formCard'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className='formTitle'> Enter Account Details</h4>
                {isAlert ? <p className='errAlert'>Insuficent Fund</p> : null}
                <div className='formControl'>
                  <label htmlFor='name'>ACCOUNT NAME</label>
                  <input
                    type='text'
                    placeholder='Beneficiary Account Name'
                    {...register('accountName', { required: true })}
                  />
                  {errors.accName && <small>Account Name is required</small>}
                </div>
                <div className='formControl'>
                  <label htmlFor='accountNum'>ACCOUNT NUMBER</label>
                  <input
                    type='text'
                    placeholder='Beneficiary Account Number'
                    {...register('accountNumber', { required: true })}
                  />
                  {errors.accountNum && (
                    <small>Account Number is required</small>
                  )}
                </div>
                <div className='formControl'>
                  <label htmlFor='accountNum'>BANK NAME</label>
                  <input
                    type='text'
                    placeholder='Bank Name'
                    {...register('bankName', { required: true })}
                  />
                  {errors.bankName && <small>Bank Name is required</small>}
                </div>
                <div className='formControl'>
                  <label htmlFor='narration'>NARRATION</label>
                  <input
                    type='text'
                    placeholder='Narration'
                    {...register('narration', { required: true })}
                  />
                  {errors.narration && <small>Narration is required</small>}
                </div>
                <div className='formControl'>
                  <label htmlFor='accountNum'>AMOUNT</label>
                  <input
                    type='text'
                    placeholder='Amount'
                    {...register('amount', { required: true })}
                  />
                  {errors.amount && <small>Amount is required</small>}
                </div>
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
                      'PROCEED'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const resUser = await fetch(`${API_URL}/profile`, {
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
    },
  }
}

export default SupportPage
