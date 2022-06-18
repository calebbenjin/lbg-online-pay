import { useState } from 'react'
import Layout from '../../../components/AccountLayout'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import Button from '../../../components/Button'
import TaskCodeModal from '../../../components/TaskCodeModal'
import { API_URL, NEXT_URL } from '../../../config/index'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SupportModal from '../../../components/SupportModal'

const Card = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoding] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [supportModal, setSupportModal] = useState(false)

  const router = useRouter()


  const onSubmit = async (data) => {
    setIsLoding(true)
    setShowModal(false)
    try {
      const resUser = await fetch(`${API_URL}/card`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      // setTimeout(() => {
      //   setIsSuccess(true)
      //   setIsLoding(false)
      // }, 3000)

      // setTimeout(() => {
      //   setIsSuccess(false)
      // }, 5000)
      const resData = await resUser.json()
      console.log(resData)
  
    } catch (error) {
      // setIsSuccess(false)
      // setIsLoding(false)
      console.log(`Error Message: ${error.message}`)
    }
    // setTimeout(() => {
    //   router.push('/account/payment/success')
    //   setIsLoding(false)
    // }, 3000)
  }

  const handleSupport = () => {
    setSupportModal(true)
  }

  return (
    <Layout>
      <TaskCodeModal show={showModal} onClose={() => setShowModal(false)} />
      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-6 mx-auto'>
            <div className='balanceCard'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h5 className='formTitle'>Add card details to complete transaction</h5>
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
                      {errors.validDate && <small>Valid Number is required</small>}
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
                  <Button>
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
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Card
