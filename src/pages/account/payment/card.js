import { useState } from 'react'
import Layout from '../../../components/AccountLayout'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import TaskCodeModal from '../../../components/TaskCodeModal'
import { parseCookies } from '../../../config/parseCookies'
import { API_URL } from '../../../config/index'
import { useRouter } from 'next/router'

const Card = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoding] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [supportModal, setSupportModal] = useState(false)
  const [amount, setAmount] = useState(
    JSON.parse(
      typeof window !== 'undefined'
        ? window.localStorage.getItem('amount')
        : null
    )
  )

  const router = useRouter()

  const onSubmit = async (data) => {
    setIsLoding(true)
    setShowModal(false)
    try {
      const resUser = await fetch(`${API_URL}/card`, {
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
      if (resUser.ok) {
        const resData = await resUser.json()
        console.log(resData)

        const resUpdate = await fetch(`${API_URL}/users/${user._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        })

        if (resUpdate.ok) {
          router.push('/account')
        }
      }
    } catch (error) {
      setIsSuccess(false)
      setIsLoding(false)
      console.log(`Error Message: ${error.message}`)
    }
  }

  const handleSupport = () => {
    setSupportModal(true)
  }

  return (
    <Layout data={user}>
      <TaskCodeModal show={showModal} onClose={() => setShowModal(false)} />
      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-6 mx-auto'>
            <div className='formCard'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h5 className='formTitle'>
                  Add card details to complete transaction
                </h5>
                <div className='formControl'>
                  <label htmlFor='name'>CARD NUMBER</label>
                  <input
                    type='text'
                    {...register('cardNum', { required: true })}
                  />
                  {errors.cardNum && <small>Card Number is required</small>}
                </div>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='formControl'>
                      <label htmlFor='name'>VALID TILL</label>
                      <input
                        type='text'
                        {...register('validDate', { required: true })}
                        placeholder='MM / YY'
                      />
                      {errors.validDate && (
                        <small>Valid Number is required</small>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='formControl'>
                      <label htmlFor='name'>CVV</label>
                      <input
                        type='text'
                        {...register('cvvNum', { required: true })}
                        placeholder='123'
                      />
                      {errors.cvvNum && <small>Card Number is required</small>}
                    </div>
                  </div>
                </div>
                <div className='formBtn mt-4'>
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
                        Transfering...
                      </>
                    ) : (
                      'COMPLETE TRANSACTION'
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

export default Card
